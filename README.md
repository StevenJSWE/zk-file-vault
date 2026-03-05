# zk-file-vault

A zero-knowledge file storage app. Uses the Web Crypto API to encrypt files client-side before uploading to Supabase, ensuring the server never sees raw data or keys.

---

## Architecture

```
src/
├── app/
│   ├── layout.tsx          # Root layout — wrap with <VaultProvider> here
│   ├── globals.css
│   ├── page.tsx            # Root — redirects to /login or /vault
│   ├── login/
│   │   └── page.tsx        # Auth + key derivation
│   └── vault/
│       └── page.tsx        # Main file manager
├── components/
│   ├── FileUploader.tsx    # File picker → encrypt → upload
│   └── FileList.tsx        # List files → download/delete
├── context/
│   └── VaultContext.tsx    # In-memory CryptoKey store (never persisted)
└── lib/
    ├── crypto.ts           # Web Crypto API helpers (AES-GCM, PBKDF2)
    └── supabase.ts         # Supabase client + storage/metadata helpers
```

---

## Zero-knowledge flow

```
User passphrase
      │
      ▼
  PBKDF2 (100k iter, SHA-256, random salt)
      │
      ▼
  CryptoKey (AES-GCM 256-bit)  ←── lives in memory only, never sent to server
      │
      ├─── encrypt ──▶  [IV + ciphertext]  ──▶  Supabase Storage
      │
      └─── decrypt ◀──  [IV + ciphertext]  ◀──  Supabase Storage
```

Supabase stores **only** encrypted bytes + metadata (salt, IV, filename). The key is never uploaded.

---

## Setup

1. Copy `.env.local.example` to `.env.local` and fill in your Supabase project URL and anon key.
2. In Supabase:
   - Enable **Authentication** (email/password).
   - Create a **Storage bucket** named `vault` (private).
   - Create a **`files` table** (see schema below).
   - Add **Row Level Security** policies so users can only access their own records.
3. Install dependencies and run:
   ```bash
   npm install
   npm run dev
   ```

### `files` table schema

```sql
create table files (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references auth.users not null,
  name         text not null,
  storage_path text not null,
  salt         text not null,   -- base64 PBKDF2 salt
  iv           text not null,   -- base64 AES-GCM IV
  size         bigint not null,
  created_at   timestamptz default now()
);

-- RLS
alter table files enable row level security;
create policy "Users own their files" on files
  for all using (auth.uid() = user_id);
```

---

## TODO (implementation checklist)

### `src/lib/crypto.ts`
- [ ] `deriveKey` — PBKDF2 with `crypto.subtle.importKey` + `crypto.subtle.deriveKey`
- [ ] `generateSalt` — `crypto.getRandomValues(new Uint8Array(16))`
- [ ] `encryptFile` — `crypto.subtle.encrypt` (AES-GCM, random IV)
- [ ] `decryptFile` — `crypto.subtle.decrypt` (AES-GCM, stored IV)
- [ ] `toBase64` / `fromBase64` — `btoa`/`atob` helpers

### `src/lib/supabase.ts`
- [ ] `uploadEncryptedFile` — upload bytes to `vault` bucket
- [ ] `downloadEncryptedFile` — download bytes from `vault` bucket
- [ ] `deleteFile` — remove from `vault` bucket
- [ ] `insertFileRecord` — insert into `files` table
- [ ] `listFileRecords` — query `files` table

### `src/app/login/page.tsx`
- [ ] Form state (email, password)
- [ ] `supabase.auth.signInWithPassword(...)`
- [ ] Call `deriveKey(password, salt)` and store in `VaultContext`
- [ ] Redirect to `/vault` on success

### `src/app/vault/page.tsx`
- [ ] Auth guard (redirect to `/login` if no session)
- [ ] Load file list on mount
- [ ] Wire up `<FileUploader>` and `<FileList>`
- [ ] Implement download handler (decrypt → browser save)
- [ ] Implement delete handler

### `src/app/layout.tsx`
- [ ] Wrap `{children}` with `<VaultProvider>`

### General
- [ ] Add Tailwind CSS (optional but recommended)
- [ ] Error handling and loading states throughout
- [ ] Auto-lock vault after inactivity (clear key from context)
- [ ] Consider encrypting filename as well for stronger ZK guarantees

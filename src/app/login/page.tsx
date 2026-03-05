"use client";

/**
 * Login page
 * TODO: Implement Supabase auth (email+password or magic link).
 * TODO: After login, derive the encryption key from the passphrase and store
 *       it in memory (e.g. React context) — never persist it to disk/storage.
 */
export default function LoginPage() {
  // TODO: form state, supabase.auth.signInWithPassword(...)
  // TODO: derive CryptoKey via deriveKey() and store in VaultContext

  return (
    <main>
      <h1>Sign in to ZK File Vault</h1>

      <form>
        <label>
          Email
          {/* TODO: controlled input */}
          <input type="email" name="email" placeholder="you@example.com" />
        </label>

        <label>
          Password / Passphrase
          {/* TODO: controlled input — this is also used for key derivation */}
          <input type="password" name="password" placeholder="••••••••" />
        </label>

        {/* TODO: wire up onSubmit */}
        <button type="submit">Unlock Vault</button>
      </form>
    </main>
  );
}

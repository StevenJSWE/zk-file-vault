/**
 * crypto.ts
 * Zero-knowledge encryption utilities using the Web Crypto API.
 * All encryption/decryption happens client-side — the server never sees plaintext.
 *
 * Algorithm: AES-GCM (256-bit key, 96-bit IV)
 * Key derivation: PBKDF2 (SHA-256, 100,000 iterations)
 */

// ---------------------------------------------------------------------------
// Key derivation
// ---------------------------------------------------------------------------

/**
 * Derives a CryptoKey from a user-supplied passphrase and a salt.
 * TODO: Call this when the user logs in or unlocks the vault.
 */
export async function deriveKey(
  passphrase: string,
  salt: Uint8Array
): Promise<CryptoKey> {
  // TODO: implement PBKDF2 derivation
  throw new Error("Not implemented");
}

/**
 * Generates a cryptographically random salt (16 bytes).
 * TODO: Store this alongside the encrypted file metadata in Supabase.
 */
export function generateSalt(): Uint8Array {
  // TODO: implement using crypto.getRandomValues
  throw new Error("Not implemented");
}

// ---------------------------------------------------------------------------
// Encryption
// ---------------------------------------------------------------------------

export interface EncryptedPayload {
  iv: Uint8Array;       // 12-byte initialisation vector
  ciphertext: Uint8Array;
}

/**
 * Encrypts an ArrayBuffer with AES-GCM.
 * TODO: Call before uploading a file to Supabase Storage.
 */
export async function encryptFile(
  key: CryptoKey,
  plaintext: ArrayBuffer
): Promise<EncryptedPayload> {
  // TODO: generate random IV, run AES-GCM encrypt
  throw new Error("Not implemented");
}

// ---------------------------------------------------------------------------
// Decryption
// ---------------------------------------------------------------------------

/**
 * Decrypts an AES-GCM ciphertext back to the original ArrayBuffer.
 * TODO: Call after downloading a file from Supabase Storage.
 */
export async function decryptFile(
  key: CryptoKey,
  payload: EncryptedPayload
): Promise<ArrayBuffer> {
  // TODO: run AES-GCM decrypt with stored IV
  throw new Error("Not implemented");
}

// ---------------------------------------------------------------------------
// Serialisation helpers
// ---------------------------------------------------------------------------

/** Converts a Uint8Array to a Base64 string for safe storage/transport. */
export function toBase64(bytes: Uint8Array): string {
  // TODO: implement
  throw new Error("Not implemented");
}

/** Converts a Base64 string back to a Uint8Array. */
export function fromBase64(b64: string): Uint8Array {
  // TODO: implement
  throw new Error("Not implemented");
}

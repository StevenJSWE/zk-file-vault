/**
 * supabase.ts
 * Supabase client initialisation.
 * Import `supabase` from this file throughout the app.
 *
 * Required env vars (see .env.local.example):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ---------------------------------------------------------------------------
// Storage helpers (stubs)
// ---------------------------------------------------------------------------

/**
 * Uploads an encrypted file blob to Supabase Storage.
 * TODO: Accept the EncryptedPayload bytes and upload to the "vault" bucket.
 * @param userId  - Owner's user ID (used as path prefix for RLS)
 * @param name    - Original filename (can be stored as metadata)
 * @param data    - Raw encrypted bytes to upload
 */
export async function uploadEncryptedFile(
  userId: string,
  name: string,
  data: Uint8Array
): Promise<string> {
  // TODO: supabase.storage.from("vault").upload(...)
  // TODO: return the storage path
  throw new Error("Not implemented");
}

/**
 * Downloads an encrypted file blob from Supabase Storage.
 * TODO: Return raw bytes; decryption happens in the caller.
 * @param storagePath - Path returned by uploadEncryptedFile
 */
export async function downloadEncryptedFile(
  storagePath: string
): Promise<Uint8Array> {
  // TODO: supabase.storage.from("vault").download(...)
  throw new Error("Not implemented");
}

/**
 * Deletes an encrypted file from Supabase Storage.
 * @param storagePath - Path returned by uploadEncryptedFile
 */
export async function deleteFile(storagePath: string): Promise<void> {
  // TODO: supabase.storage.from("vault").remove([storagePath])
  throw new Error("Not implemented");
}

// ---------------------------------------------------------------------------
// Metadata helpers (stubs)
// ---------------------------------------------------------------------------

export interface FileRecord {
  id: string;
  user_id: string;
  name: string;           // original filename (not secret, but could be encrypted too)
  storage_path: string;
  salt: string;           // Base64-encoded salt used to derive the encryption key
  iv: string;             // Base64-encoded IV used during encryption
  size: number;
  created_at: string;
}

/**
 * Inserts a file metadata record into the `files` table.
 * TODO: Call after a successful upload.
 */
export async function insertFileRecord(
  record: Omit<FileRecord, "id" | "created_at">
): Promise<FileRecord> {
  // TODO: supabase.from("files").insert(record).select().single()
  throw new Error("Not implemented");
}

/**
 * Fetches all file records belonging to the current user.
 * TODO: RLS on the `files` table should enforce user_id = auth.uid().
 */
export async function listFileRecords(): Promise<FileRecord[]> {
  // TODO: supabase.from("files").select("*").order("created_at", { ascending: false })
  throw new Error("Not implemented");
}

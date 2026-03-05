"use client";

/**
 * Main vault page — shows the user's encrypted files and allows upload.
 * TODO: Guard this route (redirect to /login if not authenticated).
 * TODO: Load file records from Supabase on mount.
 * TODO: Implement upload flow:
 *   1. User picks a file
 *   2. Read as ArrayBuffer
 *   3. encryptFile(key, buffer)  ← crypto.ts
 *   4. uploadEncryptedFile(...)  ← supabase.ts
 *   5. insertFileRecord(...)     ← supabase.ts
 * TODO: Implement download flow:
 *   1. downloadEncryptedFile(storagePath)
 *   2. decryptFile(key, payload)
 *   3. Trigger browser download with the decrypted bytes
 */
export default function VaultPage() {
  // TODO: read encryption key from VaultContext
  // TODO: useState for fileList, uploading flag, error message

  return (
    <main>
      <h1>My Vault</h1>

      {/* Upload section */}
      <section>
        <h2>Upload a file</h2>
        {/* TODO: <FileUploader /> component */}
        <p>TODO: drag-and-drop or file picker</p>
      </section>

      {/* File list section */}
      <section>
        <h2>Your files</h2>
        {/* TODO: <FileList files={fileList} onDownload={...} onDelete={...} /> */}
        <p>TODO: render file records here</p>
      </section>
    </main>
  );
}

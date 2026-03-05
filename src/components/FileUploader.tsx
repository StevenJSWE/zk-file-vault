"use client";

/**
 * FileUploader component
 * Renders a file input (or drag-and-drop zone) and triggers the encrypt+upload flow.
 *
 * TODO:
 *   1. Read selected file as ArrayBuffer (FileReader or file.arrayBuffer())
 *   2. Call encryptFile(key, buffer) from crypto.ts
 *   3. Call uploadEncryptedFile() + insertFileRecord() from supabase.ts
 *   4. Emit onUploadComplete so the parent can refresh the file list
 */

interface FileUploaderProps {
  onUploadComplete: () => void;
}

export default function FileUploader({ onUploadComplete }: FileUploaderProps) {
  // TODO: useVault() to get the CryptoKey
  // TODO: uploading state, progress indicator

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    // TODO: encrypt and upload
    console.log("Selected file:", file.name);
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {/* TODO: upload button, progress bar, error message */}
    </div>
  );
}

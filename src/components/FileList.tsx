"use client";

/**
 * FileList component
 * Displays the user's encrypted file records with download and delete actions.
 *
 * TODO:
 *   - Download: downloadEncryptedFile → decryptFile → trigger browser save
 *   - Delete: deleteFile (storage) + remove record from `files` table
 */

import type { FileRecord } from "@/lib/supabase";

interface FileListProps {
  files: FileRecord[];
  onDownload: (file: FileRecord) => Promise<void>;
  onDelete: (file: FileRecord) => Promise<void>;
}

export default function FileList({ files, onDownload, onDelete }: FileListProps) {
  if (files.length === 0) {
    return <p>No files yet. Upload one above!</p>;
  }

  return (
    <ul>
      {files.map((file) => (
        <li key={file.id}>
          <span>{file.name}</span>
          <span>{(file.size / 1024).toFixed(1)} KB</span>
          <button onClick={() => onDownload(file)}>Download</button>
          <button onClick={() => onDelete(file)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

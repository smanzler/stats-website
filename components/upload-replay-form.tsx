"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { uploadReplayAction } from "@/app/actions";
import { useSearchParams } from "next/navigation";

export default function UploadReplayForm() {
  const [file, setFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (!selectedFile.name.endsWith(".replay")) {
      return;
    }

    setFile(selectedFile);
  };

  return (
    <form action={uploadReplayAction} className="flex flex-col gap-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <label
          htmlFor="replay"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Replay File
        </label>
        <input
          id="replay"
          name="replay"
          type="file"
          accept=".replay"
          onChange={handleFileChange}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isPending}
          aria-label="Choose replay file"
        />
      </div>

      {error && (
        <p className="text-sm text-red-500" role="alert">
          {decodeURIComponent(error)}
        </p>
      )}

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        disabled={!file || isPending}
      >
        {isPending ? (
          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
        ) : (
          "Upload Replay"
        )}
      </button>
    </form>
  );
}

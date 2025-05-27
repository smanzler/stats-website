import { Suspense } from "react";
import UploadReplayForm from "@/components/upload-replay-form";

function UploadFormSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-10 w-full max-w-sm rounded-md bg-muted/70"></div>
      <div className="space-y-2">
        <div className="h-4 w-24 rounded bg-muted/70"></div>
        <div className="h-10 w-full max-w-sm rounded-md bg-muted/70"></div>
      </div>
      <div className="h-10 w-32 rounded-md bg-primary/30"></div>
    </div>
  );
}

export default async function UploadReplay() {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          Upload Replay File
        </h1>
        <p className="text-sm text-muted-foreground">
          Upload your .replay file to analyze your game
        </p>
      </div>
      <Suspense fallback={<UploadFormSkeleton />}>
        <UploadReplayForm />
      </Suspense>
    </div>
  );
}

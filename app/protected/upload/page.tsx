import UploadReplayForm from "@/components/upload-replay-form";

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
      <UploadReplayForm />
    </div>
  );
}

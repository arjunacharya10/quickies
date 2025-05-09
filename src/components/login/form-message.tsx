export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({
  message,
  error,
}: {
  message: string | null;
  error: string | null;
}) {
  return (
    error && (
      <div className="flex flex-col gap-2 w-full max-w-md text-sm mt-5">
        <div className="text-foreground border-l-2 px-4">{message}</div>
        <div className="text-red-500 border-l-2 border-red-500 px-4">
          {error}
        </div>
      </div>
    )
  );
}

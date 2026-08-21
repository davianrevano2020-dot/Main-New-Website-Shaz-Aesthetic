'use client';
import { useEffect } from 'react';
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("App Error Boundary caught:", error);
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center flex-col gap-4">
      <h2>Something went wrong!</h2>
      <p className="text-red-500">{error.message}</p>
      <button onClick={() => reset()} className="px-4 py-2 bg-black text-white rounded">Try again</button>
    </div>
  );
}

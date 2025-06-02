"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Something Went Wrong!
        </h1>
        <p className="text-gray-700 mb-6">
          An unexpected error occurred. Please try again or contact support if
          the issue persists.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Error: {error.message}
          {error.digest && <span> (Digest: {error.digest})</span>}
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={reset}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
          >
            Try Again
          </Button>
          <Link href="/">
            <Button
              variant="outline"
              className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-md"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

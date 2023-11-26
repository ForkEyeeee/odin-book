'use client';

import { useEffect } from 'react';

export default function Error404({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex h-screen items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="text-9xl font-bold text-gray-800">404</div>
            <h1 className="text-6xl font-bold text-gray-800">Oops!</h1>
            <p className="mt-2 text-lg text-gray-600">
              We can&apos;t seem to find the page you&apos;re looking for.
            </p>
            <a
              className="mt-6 inline-block rounded-md bg-blue-500 px-6 py-3 text-sm font-medium text-white transition duration-200 ease-in-out hover:bg-blue-600"
              href="/"
            >
              Go back home
            </a>
            <button
              onClick={() => reset()}
              className="mt-4 ml-4 inline-block rounded-md border border-blue-500 px-6 py-3 text-sm font-medium text-blue-500 transition duration-200 ease-in-out hover:bg-blue-50"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

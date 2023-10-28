"use client";
import { signIn } from "next-auth/react"; // Import signIn from next-auth
import { lusitana } from "@/app/ui/fonts";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "./button";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/app/lib/actions";

export default function LoginForm() {
  const [code, action] = useFormState(authenticate, undefined);
  const { pending } = useFormStatus();

  // Function to handle Google Sign-In
  const handleGoogleSignIn = async () => {
    await signIn("google"); // "google" should match the name you used when setting up the provider in next-auth
  };

  return (
    <form action={action} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          {/* Existing email input field */}
          {/* ... */}
          {/* Existing password input field */}
          {/* ... */}
        </div>
        <LoginButton />

        {/* Google Sign-In Button */}
        <button
          className="mt-4 w-full bg-[#4285F4] text-white p-2 rounded"
          onClick={handleGoogleSignIn}
          type="button"
        >
          Sign in with Google
        </button>

        <div className="flex h-8 items-end space-x-1">
          {code === "CredentialSignin" && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p aria-live="polite" className="text-sm text-red-500">
                Invalid credentials
              </p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}

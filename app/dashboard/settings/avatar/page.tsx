"use client";

import { useActionState, useRef, useState } from "react";
import SubmitButton from "@/components/submitButton";
import { uploadAvatar } from "@/lib/actions";
import { Ban, Check, Plus } from "lucide-react";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import Alert from "@/components/alert";

const initialState = {
  error: false,
  message: "",
};

export default function AvatarPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [state, formAction] = useActionState(uploadAvatar, initialState);
  const pending = useFormStatus().pending;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  if (pending) {
    return <p className="text-gray-500">Uploading...</p>;
  }

  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">Avatar</h1>
      {state?.error && (
        <Alert
          title="Error uploading avatar"
          icon={<Ban className="w-6 h-6 text-red-500" />}
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {state?.message}
          </p>
        </Alert>
      )}
      {!state?.error && state?.message && state?.message.length > 0 && (
        <Alert
          title="Avatar uploaded successfully"
          icon={<Check className="w-6 h-6 text-green-500" />}
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Your avatar has been uploaded successfully.
          </p>
        </Alert>
      )}
      <form
        action={formAction}
        className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-8 flex flex-col items-center gap-6 max-w-md mx-auto"
      >
        <label
          htmlFor="file"
          className="flex flex-col items-center justify-center w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-full cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition relative overflow-hidden"
        >
          {preview ? (
            <Image
              src={preview}
              alt="Avatar Preview"
              className="absolute inset-0 w-full h-full object-cover rounded-full z-10"
              fill
            />
          ) : (
            <Plus className="z-20" />
          )}
          {!preview && (
            <span className="text-sm text-gray-500 dark:text-gray-400 z-20">
              Choose Avatar
            </span>
          )}
          <input
            type="file"
            accept="image/png, image/jpeg"
            name="file"
            id="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </label>
        <SubmitButton className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition">
          Upload Avatar
        </SubmitButton>
      </form>
    </>
  );
}

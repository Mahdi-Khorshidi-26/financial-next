"use client";
import { useFormStatus } from "react-dom";
import { Loader } from "lucide-react";
import Button from "../button";

export default function SubmitButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { pending } = useFormStatus();
  return (
    <Button
      {...props}
      className={`${props.className} flex items-center justify-center space-x-2`}
    >
      {pending && <Loader className="animate-spin w-4 h-4" />}
      <span>{props.children}</span>
    </Button>
  );
}

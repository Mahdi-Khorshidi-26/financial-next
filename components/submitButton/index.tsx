"use client";
import { useFormStatus } from "react-dom";
import { Loader } from "lucide-react";
import Button from "../button";
import { ButtonProps } from "../button/types";

export default function SubmitButton(props: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      {...props}
      className={`${props.className} flex items-center justify-center space-x-2`}
    >
      <div className="flex items-center gap-2">
        {pending && <Loader className="animate-spin w-4 h-4" />}
        <span>{props.children}</span>
      </div>
    </Button>
  );
}

"use client";
import Alert from "@/components/alert";
import SubmitButton from "@/components/submitButton";
import { updateUserSettings } from "@/lib/actions";
import { Ban, Check } from "lucide-react";
import { useActionState } from "react";
import { RangeSelect } from "../../components/rangeSelect";

const initialState = {
  error: false,
  message: "",
};

type SettingsFormProps = {
  defaults: {
    fullName?: string;
    email?: string;
    defaultPreference?: string;
  };
};

export function SettingsForm({ defaults }: SettingsFormProps) {
  const [state, formAction] = useActionState(updateUserSettings, initialState);
  console.log("Defaults:", defaults);
  if (!defaults) {
    defaults = {
      fullName: "",
      email: "",
      defaultPreference: "",
    };
  }

  return (
    <form className="space-y-4" action={formAction}>
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
      <label htmlFor="fullName">User full name</label>
      <input
        type="text"
        id="fullName"
        name="fullName"
        defaultValue={defaults.fullName ?? defaults.email ?? ""}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your full name"
        required
      />
      <div className="flex flex-col space-y-1">
        <label htmlFor="defaultPreference">Default Preference</label>
        <RangeSelect
          defaultValue={defaults.defaultPreference || ""}
          onChange={() => {}}
          name="defaultPreference"
          id="defaultView"
        />
      </div>

      <SubmitButton>Update Profile</SubmitButton>
    </form>
  );
}

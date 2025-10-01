"use client";
import Alert from "@/components/alert";
import SubmitButton from "@/components/submitButton";
import { updateUserSettings } from "@/lib/actions";
import { Ban, Check } from "lucide-react";
import { useActionState, useState } from "react";
import { RangeSelect } from "../../components/rangeSelect";

type Errors = {
  fullName?: string[];
  defaultPreference?: string[];
  [key: string]: string[] | undefined;
};

const initialState: {
  error: boolean;
  message: string;
  errors: Errors;
} = {
  error: false,
  message: "",
  errors: {},
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
  const [value, setValue] = useState("");
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
          title="Error updating settings"
          icon={<Ban className="w-6 h-6 text-red-500" />}
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {state?.message}
          </p>
        </Alert>
      )}
      {!state?.error && state?.message && state?.message?.length > 0 && Object.keys(state?.errors || {}).length === 0 && (
        <Alert
          title="Settings updated successfully"
          icon={<Check className="w-6 h-6 text-green-500" />}
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Your settings has been updated successfully.
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
      {state?.errors?.fullName && (
        <p className="text-sm text-red-500">{state?.errors?.fullName[0]}</p>
      )}
      <div className="flex flex-col space-y-1">
        <label htmlFor="defaultPreference">Default Preference</label>
        <RangeSelect
          defaultValue={value || defaults.defaultPreference || ""}
          value={value}
          onChange={(e) => {
            e.preventDefault();
            setValue(e.target.value);
          }}
          name="defaultPreference"
          id="defaultView"
        />
        {state?.errors?.defaultPreference && (
          <p className="text-sm text-red-500">
            {state?.errors?.defaultPreference[0]}
          </p>
        )}
      </div>

      <SubmitButton>Update Profile</SubmitButton>
    </form>
  );
}

import { ButtonProps, sizeTypes, variantTypes } from "./types";

export default function Button(props: ButtonProps) {
  const variants: Record<variantTypes, string> = {
    default:
      "bg-black text-white dark:bg-white dark:text-black rounded-md hover:bg-gray-700 dark:hover:bg-gray-200 cursor-pointer",
  };

  const sizes: Record<sizeTypes, string> = {
    base: "text-base px-4 py-2",
  };

  return (
    <button
      {...props}
      className={`${
        props.variant ? variants[props.variant] : variants["default"]
      } ${props.size ? sizes[props.size] : sizes["base"]}`}
    ></button>
  );
}

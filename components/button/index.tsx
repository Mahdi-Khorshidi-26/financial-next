import { sizes, variants } from "@/lib/variants";
import { ButtonProps } from "./types";

export default function Button(props: ButtonProps) {
 

  return (
    <button
      {...props}
      className={`${
        props.variant ? variants[props.variant] : variants["default"]
      } ${props.size ? sizes[props.size] : sizes["base"]}`}
    ></button>
  );
}

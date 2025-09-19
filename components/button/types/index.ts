export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: variantTypes;
  size?: sizeTypes;
};

export type variantTypes = "default" | "outline" | "ghost" | "danger" | "success";
export type sizeTypes = "base" | "xs" | "sm" | "lg";

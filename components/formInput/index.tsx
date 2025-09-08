import { styles } from "./utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={styles[props.type as keyof typeof styles] ?? styles.default}
    />
  );
}

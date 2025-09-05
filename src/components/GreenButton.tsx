interface GreenButtonProps {
  label?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  extendedClassName?: string;
  disabled?: boolean;
}

const GreenButton = ({
  label = "Save",
  type = "submit",
  onClick,
  className,
  extendedClassName = "",
  disabled = false
}: GreenButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={
        className ??
        `self-end cursor-pointer font-semibold bg-green-500 text-white py-2 h-fit px-3 rounded-md duration-300 hover:bg-green-600 hover:duration-300 ${extendedClassName}`
      }
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default GreenButton;

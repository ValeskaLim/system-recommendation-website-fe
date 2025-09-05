interface BlueButtonProps {
  label?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  extendedClassName?: string;
  disabled?: boolean;
}

const BlueButton = ({
  label = "Edit",
  type = "button",
  onClick,
  className,
  extendedClassName = "",
  disabled = false
}: BlueButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={
        className ??
        `self-end cursor-pointer font-semibold bg-blue-500 text-white py-2 h-fit px-3 rounded-md duration-300 hover:bg-blue-600 hover:duration-300 ${extendedClassName}`
      }
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default BlueButton;

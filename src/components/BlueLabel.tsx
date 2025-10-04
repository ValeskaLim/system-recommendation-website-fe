interface BlueLabelProps {
  text: string;
  className?: string;
  extendedClassName?: string;
}

const BlueLabel = ({
  text,
  className,
  extendedClassName = "",
}: BlueLabelProps) => {
  return (
    <span
      className={className ?? `cursor-default text-blue-500 border-2 px-3 py-2.5 rounded-3xl text-center text-xs font-bold ${extendedClassName}`}
    >
      {text}
    </span>
  );
};

export default BlueLabel;

interface ProgressCircleProps {
  size?: number;
  strokeWidth?: number;
  percentage: number;
  color?: string;
  bgColor?: string;
}

const ProgressCircle = ({
  size = 120,
  strokeWidth = 8,
  percentage,
  color = "text-blue-500",
  bgColor = "text-white",
}: ProgressCircleProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center justify-center">
      <svg width={size} height={size}>
        {/* Background Circle */}
        <circle
          className={bgColor}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
        {/* Progress Circle */}
        <circle
          className={color}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        {/* Percentage Text */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="text-lg font-semibold fill-current"
        >
          {percentage}%
        </text>
      </svg>
    </div>
  );
};

export default ProgressCircle;

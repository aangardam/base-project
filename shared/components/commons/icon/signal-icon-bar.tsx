const SignalBarIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 28 28"
    fill="currentColor"
    className={className}
  >
    <rect x="2" y="10" width="4" height="10" rx="2" />
    <rect x="10" y="7" width="4" height="16" rx="2" />
    <rect x="18" y="4" width="4" height="22" rx="2" />
    {/* <rect x="10" y="10" width="4" height="15" rx="2" />
    <rect x="18" y="6" width="4" height="22" rx="2" /> */}
  </svg>
);

export default SignalBarIcon;

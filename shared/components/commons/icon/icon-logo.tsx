const LogoIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="5" y1="19" x2="19" y2="5" />
      <path d="M12 14c1.5-1.5 1.5-4 0-5.5" />
    </svg>
  );
  
  export default LogoIcon;
  
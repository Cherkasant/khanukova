type PlasType = {
  className?: string;
};

const Plas: React.FC<PlasType> = ({ className }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M12 6L12 18M18 12L6 12" stroke="#1258CA" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

export default Plas;

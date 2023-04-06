type MoreType = {
  className: string;
};

const More: React.FC<MoreType> = ({ className }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="4" r="2" transform="rotate(90 12 4)" fill="#1258CA" />
      <circle cx="12" cy="12" r="2" transform="rotate(90 12 12)" fill="#1258CA" />
      <circle cx="12" cy="20" r="2" transform="rotate(90 12 20)" fill="#1258CA" />
    </svg>
  );
};

export default More;

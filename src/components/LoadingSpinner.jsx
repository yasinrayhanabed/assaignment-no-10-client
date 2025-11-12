import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const LoadingSpinner = ({ size = 'text-4xl' }) => {
  return (
    <div className="flex justify-center items-center">
      <AiOutlineLoading3Quarters className={`animate-spin text-primary ${size}`} />
    </div>
  );
};

export default LoadingSpinner;
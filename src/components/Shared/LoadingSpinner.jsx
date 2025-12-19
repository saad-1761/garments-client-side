import { FadeLoader } from "react-spinners";

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? "h-[250px]" : "h-[70vh]"}
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
      <FadeLoader size={100} color="blue-100" />
    </div>
  );
};

export default LoadingSpinner;

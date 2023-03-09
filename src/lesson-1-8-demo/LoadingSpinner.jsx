import "./loading-spinner.css";

export const LoadingSpinner = ({ variant = "ellipses " }) => {
  if (variant === "hourglass") {
    return <div className="lds-hourglass"></div>;
  }

  if (variant === "ellipses") {
    return (
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  return <>Loading...</>;
};

export default LoadingSpinner;

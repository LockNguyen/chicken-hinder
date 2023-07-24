import { Spinner } from "reactstrap";

function LoadingSpinner() {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <Spinner />
    </div>
  );
}

export default LoadingSpinner;
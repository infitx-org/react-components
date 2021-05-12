import Spinner from "../Spinner";
import { Size } from "../types";
import { getIconSizeByComponentSize } from "../shared";

interface LoaderProps {
  size: `${Size}`;
}

export default function Loader({ size = Size.Large }: LoaderProps) {
  return (
    <div className="mb-input__inner-icon mb-loader">
      <Spinner size={getIconSizeByComponentSize(size)} />
    </div>
  );
}

import Spinner from "../../Spinner";
import { InputSize } from "../../types";
import { getIconSizeByComponentSize } from "../../shared";

export interface LoaderProps {
  size: `${InputSize}`;
}

export default function Loader({ size = InputSize.Large }: LoaderProps) {
  return (
    <div className="mb-input__inner-icon mb-loader">
      <Spinner size={getIconSizeByComponentSize(size)} />
    </div>
  );
}

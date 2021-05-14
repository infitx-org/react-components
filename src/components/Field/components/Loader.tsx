import { InputSize } from "types";
import Spinner from "../../Spinner";
import { getIconSizeByComponentSize } from "../../shared";
import "./Loader.scss";

export interface LoaderProps {
  size: `${InputSize}`;
}

export default function Loader({ size = InputSize.Large }: LoaderProps) {
  return (
    <div className="rc-loader">
      <Spinner size={getIconSizeByComponentSize(size)} />
    </div>
  );
}

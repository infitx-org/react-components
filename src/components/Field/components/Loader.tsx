import Spinner from "components/Spinner";
import { getIconSizeByComponentSize } from "utils/size";
import { InputSize } from "../../../types";
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

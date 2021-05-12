import Search from "../../assets/icons/search-small.svg";
import Icon from "../Icon";
import { InputSize } from "../types";
import { getIconSizeByComponentSize } from "../shared";

interface FilterProps {
  size: `${InputSize}`;
}

function Filter({ open, size }: FilterProps) {
  return (
    <div className="mb-input__inner-icon input-select__icon">
      <Icon size={getIconSizeByComponentSize(size)} icon={<Search />} />
    </div>
  );
}

export default Filter;

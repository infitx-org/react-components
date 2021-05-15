import Icon from "components/Icon";
import { InputSize } from "types";
import { getIconSizeByComponentSize } from "utils/size";
import Search from "../../../assets/icons/search-small.svg";
import "./Filter.scss";

interface FilterProps {
  size: `${InputSize}`;
}

function Filter({ size }: FilterProps) {
  return (
    <div className="rc-select__filter">
      <Icon size={getIconSizeByComponentSize(size)} icon={<Search />} />
    </div>
  );
}

export default Filter;

import { Select } from "antd";

const { Option } = Select;

interface PageSizeSelectorProps {
  pageSize: number;
  onPageSizeChange: (value: number) => void;
}

const PageSizeSelector = ({pageSize, onPageSizeChange}:  PageSizeSelectorProps) => {
  return (
    <div>
      <Select
        defaultValue={pageSize}
        onChange={onPageSizeChange}
        style={{ width: 80 }}
      >
        <Option value={5}>5 / page</Option>
        <Option value={10}>10 / page</Option>
        <Option value={25}>25 / page</Option>
        <Option value={50}>50 / page</Option>
      </Select>
    </div>
  );
};
export default PageSizeSelector;

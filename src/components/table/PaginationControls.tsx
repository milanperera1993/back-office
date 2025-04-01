import styled from "styled-components";
import PageSizeSelector from "../PageSizeSelector";
import { Pagination } from "antd";

interface PaginationControlsProps {
  currentPage: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (value: number) => void;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  bottom: 0;
`;

const PaginationControls = ({
  currentPage,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}: PaginationControlsProps) => {
  return (
    <PaginationContainer>
      <PageSizeSelector
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChange}
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={total}
        onChange={onPageChange}
        showSizeChanger={false}
        showLessItems={true}
      />
    </PaginationContainer>
  );
};
export default PaginationControls;

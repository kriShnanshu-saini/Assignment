import React from "react";
import { Pagination } from "antd";

const PaginationComponent = ({ total, pageSize, onChange, current }) => {
  return (
    <Pagination
      total={total}
      pageSize={pageSize}
      onChange={onChange}
      current={current}
    />
  );
};

export default PaginationComponent;

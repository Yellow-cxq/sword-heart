export const defaultPagination = {
  current: 1,
  pageSize: 20,
  total: 0,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number) => `共 ${total} 条记录`,
};

export const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';
export const TABLE_HEADER = 38; //表头高度

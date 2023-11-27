type PaginatedResponse<T> = {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: Array<T>;
};

export default PaginatedResponse;

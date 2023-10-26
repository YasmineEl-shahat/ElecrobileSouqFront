import ReactPaginate from "react-paginate";

export default function Pagination({ pageNumber, pageChangeHandler }) {
  return (
    <ReactPaginate
      previousLabel={
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.00098 1.6189L2.00098 6.9519L7.00098 12.3799"
            stroke="#586A84"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      }
      nextLabel={
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.54688 1.61902L6.54688 6.95202L1.54688 12.38"
            stroke="#586A84"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      }
      breakLabel={"..."}
      pageCount={pageNumber}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      containerClassName={"pagination justify-content-center"}
      onPageChange={pageChangeHandler}
    />
  );
}

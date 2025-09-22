import clsx from 'clsx';
import scss from './ContactFormsPaginationControls.module.scss';

export default function ContactFormsPaginationControls({
  handlePageChange,
  currentPage,
  totalPages,
}) {
  return (
    <div className={scss.pagination}>
      <button
        className={scss.paginationButton}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}>
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={clsx(
            scss.paginationButton,
            currentPage === index + 1 && scss.paginationButtonActive,
          )}
          onClick={() => handlePageChange(index + 1)}>
          {index + 1}
        </button>
      ))}
      <button
        className={scss.paginationButton}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}

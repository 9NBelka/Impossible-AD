import { useEffect, useState } from 'react';
import scss from './ContactForms.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchContactForms,
  deleteContactForm,
  completeContactForm,
} from '../../../store/slices/contactFormSlice';
import ContactFormsFilterAndSearch from './ContactFormsFilterAndSearch/ContactFormsFilterAndSearch';
import clsx from 'clsx';
import ContactFormsPaginationControls from './ContactFormsPaginationControls/ContactFormsPaginationControls';
import ContactFormsCalendar from './ContactFormsCalendar/ContactFormsCalendar';

const formatDateTime = (isoDate) => {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

export default function ContactForms() {
  const dispatch = useDispatch();
  const { forms, status, error } = useSelector((state) => state.contactForm);

  useEffect(() => {
    dispatch(fetchContactForms());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    sortByDate: 'новые',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const formsPerPage = 10;

  const filteredForms = forms
    .filter((form) => {
      const matchesSearch =
        form.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        '' ||
        form.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        '';

      const matchesStatus = filters.status ? form.status === filters.status : true;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (filters.sortByDate === 'новые') {
        return new Date(b.dateTime) - new Date(a.dateTime);
      } else {
        return new Date(a.dateTime) - new Date(b.dateTime);
      }
    });

  const totalPages = Math.ceil(filteredForms.length / formsPerPage);
  const indexOfLastForms = currentPage * formsPerPage;
  const indexOfFirstForms = indexOfLastForms - formsPerPage;
  const currentForms = filteredForms.slice(indexOfFirstForms, indexOfLastForms);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этого клиента?')) {
      dispatch(deleteContactForm(id));
    }
  };

  const handleComplete = (form) => {
    if (window.confirm('Вы уверены, что хотите отметить этого клиента как завершенного?')) {
      dispatch(completeContactForm(form));
    }
  };

  const resetFilters = () => {
    setFilters({
      status: '',
      sortByDate: 'новые',
    });
    setSearchTerm('');
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className={scss.mainBlock}>
      <h2>Contact Forms Table</h2>
      <div className={scss.tableUsersMain}>
        <div className={scss.tableTitleAndButtonAdd}>
          <h3 className={scss.tableTitleName}>Contact Forms table</h3>
        </div>

        <ContactFormsFilterAndSearch
          filters={filters}
          setFilters={setFilters}
          resetFilters={resetFilters}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <table className={scss.tableUsers}>
          <thead>
            <tr className={scss.tableTitles}>
              <th>Client</th>
              <th>Phone</th>
              <th>STATUS</th>
              <th>Date Call</th>
              <th>Date Create</th>
              <th>Action</th>
            </tr>
          </thead>
          {currentForms.map((form) => (
            <tbody key={form.id}>
              <tr className={scss.tableRow}>
                <td className={scss.tableWidthNameAndEmail}>
                  <span className={scss.tableName}>{form.name}</span>
                  <br />
                  <span className={scss.tableEmail}>{form.city}</span>
                </td>
                <td>{form.phone}</td>
                <td>
                  <span
                    className={clsx(
                      scss.tableStatus,
                      form.status === 'В обработке' && scss.blueStatus,
                      form.status === 'Завершенный' && scss.greenStatus,
                    )}>
                    {form.status}
                  </span>
                </td>
                <td className={scss.tableDate}>{formatDateTime(form.dateTime)}</td>
                <td className={scss.tableDate}>{formatDateTime(form.dateCreate)}</td>
                <td>
                  <div className={scss.tableActionBlock}>
                    <button
                      className={clsx(scss.tableDeleteButton, scss.tableEditButton)}
                      onClick={() => handleComplete(form)}>
                      Checked
                    </button>
                    <button
                      className={scss.tableDeleteButton}
                      onClick={() => handleDelete(form.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
        </table>

        <ContactFormsPaginationControls
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
      <h2>Available Slots Calendar</h2>
      <ContactFormsCalendar />
    </div>
  );
}

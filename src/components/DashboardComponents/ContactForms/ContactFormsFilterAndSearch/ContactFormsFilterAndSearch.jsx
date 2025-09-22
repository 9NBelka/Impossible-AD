import ContactFormsCustomSelect from '../ContactFormsCustomSelect/ContactFormsCustomSelect';
import scss from './ContactFormsFilterAndSearch.module.scss';

export default function ContactFormsFilterAndSearch({
  filters,
  setFilters,
  resetFilters,
  searchTerm,
  setSearchTerm,
}) {
  return (
    <div className={scss.searchAndFilter}>
      <div className={scss.filterButtons}>
        <ContactFormsCustomSelect
          value={filters.status}
          onChange={(value) => setFilters({ ...filters, status: value })}
          options={['', 'Завершенный', 'В обработке']}
          placeholder='Filter by Status'
        />
        <ContactFormsCustomSelect
          value={filters.sortByDate}
          onChange={(value) => setFilters({ ...filters, sortByDate: value })}
          options={['новые', 'старые']}
          placeholder='Сортировать по дате звонка'
        />
        <button className={scss.resetButton} onClick={resetFilters}>
          Reset Filters
        </button>
      </div>
      <input
        type='text'
        placeholder='Search by Name or Phone'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={scss.searchInput}
      />
    </div>
  );
}

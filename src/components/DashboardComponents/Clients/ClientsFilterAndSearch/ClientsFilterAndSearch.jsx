import ClientsCustomSelect from '../ClientsCustomSelect/ClientsCustomSelect';
import scss from './ClientsFilterAndSearch.module.scss';

export default function ClientsFilterAndSearch({
  filters,
  setFilters,
  resetFilters,
  searchTerm,
  setSearchTerm,
}) {
  return (
    <div className={scss.searchAndFilter}>
      <div className={scss.filterButtons}>
        <ClientsCustomSelect
          value={filters.plan}
          onChange={(value) => setFilters({ ...filters, plan: value })}
          options={[
            '', // Added empty option for "no filter"
            'Реклама в социальных сетях',
            'Реклама на веб-сайтах',
            'SEO оптимизация',
            'Индивидуальные лендинг-страницы',
            'Полный маркетинговый пакет',
          ]}
          placeholder='Filter by Plan'
        />
        <ClientsCustomSelect
          value={filters.status}
          onChange={(value) => setFilters({ ...filters, status: value })}
          options={['', 'Завершенный', 'В процессе', 'Отмененный', 'В обработке']}
          placeholder='Filter by Status'
        />
        <ClientsCustomSelect
          value={filters.dateRange}
          onChange={(value) => setFilters({ ...filters, dateRange: value })}
          options={['', 'за сегодня', 'за неделю', 'за месяц']}
          placeholder='Filter by Date'
        />
        <ClientsCustomSelect
          value={filters.hasPayments}
          onChange={(value) => setFilters({ ...filters, hasPayments: value })}
          options={['', 'оплаты', 'без оплаты']}
          placeholder='Filter by Payments'
        />
        <button className={scss.resetButton} onClick={resetFilters}>
          Reset Filters
        </button>
      </div>
      <input
        type='text'
        placeholder='Search by Name or Email'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={scss.searchInput}
      />
    </div>
  );
}

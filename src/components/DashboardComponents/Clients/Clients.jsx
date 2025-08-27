import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import scss from './Clients.module.scss';
import clsx from 'clsx';
import {
  BsCheckCircleFill,
  BsChevronDown,
  BsFacebook,
  BsFillInfoCircleFill,
  BsGearFill,
  BsGlobe,
  BsInstagram,
  BsPlusCircleFill,
} from 'react-icons/bs';
import {
  fetchClients,
  addClient,
  updateClient,
  deleteClient,
} from '../../../store/slices/clientsSlice';

// Custom Select Component
const CustomSelect = ({ value, onChange, options, placeholder = 'Select...' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={scss.customSelect}>
      <div className={scss.customSelectTrigger} onClick={() => setIsOpen(!isOpen)}>
        <span>{value || placeholder}</span>
        <BsChevronDown className={scss.customSelectArrow} />
      </div>
      {isOpen && (
        <div className={scss.customSelectOptions}>
          {options.map((option, index) => (
            <div
              key={`${option}-${index}`} // Use option and index to ensure uniqueness
              className={scss.customSelectOption}
              onClick={() => handleSelect(option)}>
              {option || placeholder} {/* Display placeholder for empty option */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Helper function to format ISO date to DD.MM.YYYY HH:MM
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

export default function Clients() {
  const dispatch = useDispatch();
  const { clients, status, error } = useSelector((state) => state.clients);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    plan: '',
    status: '',
    dateRange: '',
    language: '',
    hasPayments: '',
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 10;

  // Modal state
  const [modalType, setModalType] = useState(null);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);

  // Payment editing state
  const [openPayments, setOpenPayments] = useState(null);
  const [localPayments, setLocalPayments] = useState([]);
  const [newDate, setNewDate] = useState('');
  const [newAmount, setNewAmount] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchClients());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (openPayments) {
      const client = clients.find((c) => c.id === openPayments);
      if (client) {
        setLocalPayments([...(client.payments || [])]);
      }
      setNewDate('');
      setNewAmount('');
    }
  }, [openPayments, clients]);

  // Filter and search logic
  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPlan = filters.plan ? client.plan === filters.plan : true;
    const matchesStatus = filters.status ? client.status === filters.status : true;
    const matchesPayments = filters.hasPayments
      ? filters.hasPayments === 'оплаты'
        ? client.payments && client.payments.length > 0
        : !client.payments || client.payments.length === 0
      : true;

    const matchesDateRange = filters.dateRange
      ? (() => {
          const date = new Date(client.dateCreate);
          const now = new Date();
          if (filters.dateRange === 'за сегодня') {
            return date.toDateString() === now.toDateString();
          } else if (filters.dateRange === 'за неделю') {
            const weekAgo = new Date();
            weekAgo.setDate(now.getDate() - 7);
            return date >= weekAgo;
          } else if (filters.dateRange === 'за месяц') {
            const monthAgo = new Date();
            monthAgo.setDate(now.getDate() - 30);
            return date >= monthAgo;
          }
          return true;
        })()
      : true;

    return matchesSearch && matchesPlan && matchesStatus && matchesPayments && matchesDateRange;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openAddModal = () => {
    setFormData({
      name: '',
      email: '',
      status: 'В процессе',
      dateCreate: new Date().toISOString(),
      plan: '',
      website: '',
      instagram: '',
      facebook: '',
      payments: [],
    });
    setModalType('add');
  };

  const openEditModal = (client) => {
    setFormData({ ...client, payments: client.payments || [] });
    setEditingId(client.id);
    setModalType('edit');
  };

  const closeModal = () => {
    setModalType(null);
    setFormData({});
    setEditingId(null);
  };

  const handleSave = () => {
    if (modalType === 'add') {
      dispatch(addClient(formData));
    } else if (modalType === 'edit') {
      dispatch(updateClient({ id: editingId, data: formData }));
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      dispatch(deleteClient(id));
    }
  };

  const togglePayments = (id) => {
    setOpenPayments(openPayments === id ? null : id);
  };

  const handleChangeDate = (index) => (e) => {
    const updated = [...localPayments];
    updated[index].date = e.target.value;
    setLocalPayments(updated);
  };

  const handleChangeAmount = (index) => (e) => {
    const updated = [...localPayments];
    updated[index].amount = parseFloat(e.target.value) || 0;
    setLocalPayments(updated);
  };

  const handleDeletePayment = (index) => {
    const updated = [...localPayments];
    updated.splice(index, 1);
    setLocalPayments(updated);
  };

  const handleAddPayment = () => {
    if (newDate && newAmount) {
      setLocalPayments([...localPayments, { date: newDate, amount: parseFloat(newAmount) }]);
      setNewDate('');
      setNewAmount('');
    }
  };

  const handleSavePayments = () => {
    dispatch(updateClient({ id: openPayments, data: { payments: localPayments } }));
    setOpenPayments(null);
  };

  const closeMiniTable = () => {
    setOpenPayments(null);
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      plan: '',
      status: '',
      dateRange: '',
      language: '',
      hasPayments: '',
    });
    setSearchTerm('');
    setCurrentPage(1); // Reset to first page when filters are cleared
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={scss.mainBlock}>
      <h2>Clients Table</h2>
      <div className={scss.tableUsersMain}>
        <div className={scss.tableTitleAndButtonAdd}>
          <h3 className={scss.tableTitleName}>Clients table</h3>
          <button className={scss.tableAddButton} onClick={openAddModal}>
            Add Client <BsPlusCircleFill className={scss.tableAddIcon} />
          </button>
        </div>

        {/* Search and Filter Controls */}
        <div className={scss.searchAndFilter}>
          <div className={scss.filterButtons}>
            <CustomSelect
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
            <CustomSelect
              value={filters.status}
              onChange={(value) => setFilters({ ...filters, status: value })}
              options={['', 'Завершенный', 'В процессе', 'Отмененный', 'В обработке']}
              placeholder='Filter by Status'
            />
            <CustomSelect
              value={filters.dateRange}
              onChange={(value) => setFilters({ ...filters, dateRange: value })}
              options={['', 'за сегодня', 'за неделю', 'за месяц']}
              placeholder='Filter by Date'
            />
            <CustomSelect
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

        <table className={scss.tableUsers}>
          <thead>
            <tr className={scss.tableTitles}>
              <th>client</th>
              <th>links</th>
              <th>plan</th>
              <th>payment</th>
              <th>STATUS</th>
              <th>Date Create</th>
              <th>ACTION</th>
            </tr>
          </thead>

          {currentClients.map((client) => (
            <tbody key={client.id}>
              <tr className={scss.tableRow}>
                <td className={scss.tableWidthNameAndEmail}>
                  <span className={scss.tableName}>{client.name}</span>
                  <br />
                  <span className={scss.tableEmail}>{client.email}</span>
                </td>
                <td>
                  <div className={scss.socialIcons}>
                    {client.website && (
                      <a href={client.website} target='_blank' rel='noopener noreferrer'>
                        <BsGlobe className={scss.socialIcon} />
                      </a>
                    )}
                    {client.instagram && (
                      <a href={client.instagram} target='_blank' rel='noopener noreferrer'>
                        <BsInstagram className={scss.socialIcon} />
                      </a>
                    )}
                    {client.facebook && (
                      <a href={client.facebook} target='_blank' rel='noopener noreferrer'>
                        <BsFacebook className={scss.socialIcon} />
                      </a>
                    )}
                  </div>
                </td>
                <td className={scss.tablePlan}>
                  <ul>
                    {client.plan && <li>{client.plan}</li>}
                    {client.serviceE && <li>{client.serviceE}</li>}
                  </ul>
                </td>
                <td className={scss.tablePayment}>
                  <button
                    className={scss.tablePaymentButton}
                    onClick={() => togglePayments(client.id)}>
                    Payment
                  </button>
                </td>
                <td>
                  <span
                    className={clsx(
                      scss.tableStatus,
                      client.status === 'Завершенный' && scss.greenStatus,
                      client.status === 'В процессе' && scss.orangeStatus,
                      client.status === 'Отмененный' && scss.redStatus,
                      client.status === 'В обработке' && scss.blueStatus,
                    )}>
                    {client.status}
                  </span>
                </td>
                <td className={scss.tableDate}>{formatDateTime(client.dateCreate)}</td>
                <td>
                  <div className={scss.tableActionBlock}>
                    <button className={scss.tableEditButton} onClick={() => openEditModal(client)}>
                      Edit
                    </button>
                    <button
                      className={clsx(scss.tableEditButton, scss.tableDeleteButton)}
                      onClick={() => handleDelete(client.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              {openPayments === client.id && (
                <tr>
                  <td colSpan='7'>
                    <div className={scss.paymentMiniTable}>
                      <h4 className={scss.miniTableTitleName}>Payments for {client.name}</h4>
                      <table>
                        <thead>
                          <tr className={scss.paymentMiniTitles}>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {localPayments.map((payment, index) => (
                            <tr key={index} className={scss.miniTableRow}>
                              <td>
                                <input
                                  type='date'
                                  value={payment.date}
                                  onChange={handleChangeDate(index)}
                                  className={scss.miniTableModalInput}
                                />
                              </td>
                              <td>
                                <input
                                  type='number'
                                  value={payment.amount}
                                  onChange={handleChangeAmount(index)}
                                  className={scss.miniTableModalInput}
                                />
                              </td>
                              <td>
                                <button
                                  onClick={() => handleDeletePayment(index)}
                                  className={scss.miniTableDeleteButton}>
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div>
                        <input
                          type='date'
                          placeholder='New Date'
                          value={newDate}
                          onChange={(e) => setNewDate(e.target.value)}
                          className={scss.miniTableModalInputNew}
                        />
                        <input
                          type='number'
                          placeholder='New Amount'
                          value={newAmount}
                          onChange={(e) => setNewAmount(e.target.value)}
                          className={scss.miniTableModalInputNew}
                        />
                        <button onClick={handleAddPayment} className={scss.miniTableAddPayment}>
                          Add Payment
                        </button>
                      </div>
                      <div className={scss.miniTableButtonsSaveAndCancel}>
                        <button
                          onClick={handleSavePayments}
                          className={scss.miniTableSaveChangeButton}>
                          Save Changes
                        </button>
                        <button onClick={closeMiniTable} className={scss.miniTableSaveCancel}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          ))}
        </table>

        {/* Pagination Controls */}
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
      </div>

      {/* Modal Popup */}
      {modalType && (
        <div className={scss.modalOverlay} onClick={closeModal}>
          <div className={scss.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>{modalType === 'add' ? 'Add Client' : 'Edit Client'}</h3>
            <div className={scss.modalForm}>
              <div className={scss.modalInputAndIconBlock}>
                <input
                  className={scss.modalInput}
                  placeholder='Name'
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className={scss.modalInputAndIconBlock}>
                <input
                  className={scss.modalInput}
                  placeholder='Email'
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <CustomSelect
                value={formData.plan}
                onChange={(value) => setFormData({ ...formData, plan: value })}
                options={[
                  '',
                  'Реклама в социальных сетях',
                  'Реклама на веб-сайтах',
                  'SEO оптимизация',
                  'Индивидуальные лендинг-страницы',
                  'Полный маркетинговый пакет',
                ]}
                placeholder='Select Plan'
              />
              <div className={scss.modalInputAndIconBlock}>
                <BsGlobe className={scss.modalInputIcon} />
                <input
                  className={scss.modalInput}
                  placeholder='Website'
                  value={formData.website || ''}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>
              <div className={scss.modalInputAndIconBlock}>
                <BsInstagram className={scss.modalInputIcon} />
                <input
                  className={scss.modalInput}
                  placeholder='Instagram'
                  value={formData.instagram || ''}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                />
              </div>
              <div className={scss.modalInputAndIconBlock}>
                <BsFacebook className={scss.modalInputIcon} />
                <input
                  className={scss.modalInput}
                  placeholder='Facebook'
                  value={formData.facebook || ''}
                  onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                />
              </div>
              <CustomSelect
                value={formData.status}
                onChange={(value) => setFormData({ ...formData, status: value })}
                options={['', 'Завершенный', 'В процессе', 'Отмененный', 'В обработке']}
                placeholder='Select Status'
              />
              <div className={scss.modalButtons}>
                <button className={scss.modalSaveButton} onClick={handleSave}>
                  Save
                </button>
                <button className={scss.modalCancelButton} onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

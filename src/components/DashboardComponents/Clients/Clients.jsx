import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import scss from './Clients.module.scss';
import { BsPlusCircleFill } from 'react-icons/bs';
import {
  fetchClients,
  addClient,
  updateClient,
  deleteClient,
} from '../../../store/slices/clientsSlice';
import ClientsFilterAndSearch from './ClientsFilterAndSearch/ClientsFilterAndSearch';
import ClientsPaginationControls from './ClientsPaginationControls/ClientsPaginationControls';
import ClientsAddOrEditPopUp from './ClientsAddOrEditPopUp/ClientsAddOrEditPopUp';
import ClientsViewDetailsPopUp from './ClientsViewDetailsPopUp/ClientsViewDetailsPopUp';
import ClientsTablesUsers from './ClientsTablesUsers/ClientsTablesUsers';

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

  // Modal states
  const [modalType, setModalType] = useState(null); // For add/edit modal
  const [viewClientId, setViewClientId] = useState(null); // For view details modal
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
      client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      '' ||
      client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      '';

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
      city: '',
      phone: '',
      payments: [],
    });
    setModalType('add');
  };

  const openEditModal = (client) => {
    console.log('Opening edit modal for client:', client); // Debug log
    setFormData({
      name: client.name || '',
      email: client.email || '',
      status: client.status || 'В процессе',
      dateCreate: client.dateCreate || new Date().toISOString(),
      plan: client.plan || '',
      website: client.website || '',
      instagram: client.instagram || '',
      facebook: client.facebook || '',
      city: client.city || '',
      phone: client.phone || '',
      payments: client.payments || [],
    });
    setEditingId(client.id);
    setModalType('edit');
  };

  const openViewModal = (clientId) => {
    setViewClientId(clientId);
  };

  const closeModal = () => {
    setModalType(null);
    setFormData({});
    setEditingId(null);
    setViewClientId(null);
  };

  const handleSave = async () => {
    try {
      console.log('Saving client with ID:', editingId, 'and data:', formData); // Debug log
      if (modalType === 'add') {
        await dispatch(addClient(formData)).unwrap();
      } else if (modalType === 'edit') {
        await dispatch(updateClient({ id: editingId, data: formData })).unwrap();
      }
      closeModal();
    } catch (error) {
      console.error('Failed to save client:', error);
      alert('Ошибка при сохранении клиента: ' + error.message);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этого клиента?')) {
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
    setCurrentPage(1);
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

        <ClientsFilterAndSearch
          filters={filters}
          setFilters={setFilters}
          resetFilters={resetFilters}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <ClientsTablesUsers
          currentClients={currentClients}
          openViewModal={openViewModal}
          togglePayments={togglePayments}
          formatDateTime={formatDateTime}
          openEditModal={openEditModal}
          handleDelete={handleDelete}
          openPayments={openPayments}
          localPayments={localPayments}
          handleChangeDate={handleChangeDate}
          handleChangeAmount={handleChangeAmount}
          handleDeletePayment={handleDeletePayment}
          newDate={newDate}
          setNewDate={setNewDate}
          newAmount={newAmount}
          setNewAmount={setNewAmount}
          handleAddPayment={handleAddPayment}
          handleSavePayments={handleSavePayments}
          closeMiniTable={closeMiniTable}
        />

        <ClientsPaginationControls
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>

      <ClientsAddOrEditPopUp
        modalType={modalType}
        closeModal={closeModal}
        formData={formData}
        setFormData={setFormData}
        handleSave={handleSave}
      />

      <ClientsViewDetailsPopUp
        viewClientId={viewClientId}
        closeModal={closeModal}
        clients={clients}
        formatDateTime={formatDateTime}
      />
    </div>
  );
}

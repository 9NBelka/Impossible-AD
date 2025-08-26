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
} from '../../../store/slices/clientsSlice'; // Adjust path

// Custom Select Component
const CustomSelect = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={scss.customSelect}>
      <div className={scss.customSelectTrigger} onClick={() => setIsOpen(!isOpen)}>
        <span>{value || 'Select...'}</span>
        <BsChevronDown className={scss.customSelectArrow} />
      </div>
      {isOpen && (
        <div className={scss.customSelectOptions}>
          {options.map((option) => (
            <div
              key={option}
              className={scss.customSelectOption}
              onClick={() => handleSelect(option)}>
              {option}
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
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

export default function Clients() {
  const dispatch = useDispatch();
  const { clients, status, error } = useSelector((state) => state.clients);

  // Modal state
  const [modalType, setModalType] = useState(null); // 'add' or 'edit'
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

  const openAddModal = () => {
    setFormData({
      name: '',
      email: '',
      status: 'В процессе',
      dateCreate: new Date().toISOString(), // Store in ISO format for consistency
      plan: 'Site',
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

        <table className={scss.tableUsers}>
          <thead>
            <tr className={scss.tableTitles}>
              <th>client</th>
              <th>
                <div className={scss.tableTitleAndIconInfo}>
                  links <BsFillInfoCircleFill className={scss.tableIconInfo} />
                </div>
              </th>
              <th>plan</th>
              <th>payment</th>
              <th>STATUS</th>
              <th>Date Create</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <>
                <tr key={client.id} className={scss.tableRow}>
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
                      <button
                        className={scss.tableEditButton}
                        onClick={() => openEditModal(client)}>
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
              </>
            ))}
          </tbody>
        </table>
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
                  'Реклама в социальных сетях',
                  'Реклама на веб-сайтах',
                  'SEO оптимизация',
                  'Индивидуальные лендинг-страницы',
                  'Полный маркетинговый пакет',
                ]}
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
                options={['Завершенный', 'В процессе', 'Отмененный']}
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

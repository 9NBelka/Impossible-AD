import clsx from 'clsx';
import scss from './ClientsTablesUsers.module.scss';
import ClientsOpenPayments from '../ClientsOpenPayments/ClientsOpenPayments';
import { BsFacebook, BsGlobe, BsInstagram } from 'react-icons/bs';

export default function ClientsTablesUsers({
  currentClients,
  openViewModal,
  togglePayments,
  formatDateTime,
  openEditModal,
  handleDelete,
  openPayments,
  localPayments,
  handleChangeDate,
  handleChangeAmount,
  handleDeletePayment,
  newDate,
  setNewDate,
  newAmount,
  setNewAmount,
  handleAddPayment,
  handleSavePayments,
  closeMiniTable,
}) {
  return (
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
            <td className={scss.tableWidthNameAndEmail} onClick={() => openViewModal(client.id)}>
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
            <td className={scss.tablePlan}>{client.plan}</td>
            <td className={scss.tablePayment}>
              <button className={scss.tablePaymentButton} onClick={() => togglePayments(client.id)}>
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
          <ClientsOpenPayments
            openPayments={openPayments}
            client={client}
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
        </tbody>
      ))}
    </table>
  );
}

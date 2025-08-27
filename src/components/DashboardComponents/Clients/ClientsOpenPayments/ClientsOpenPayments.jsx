import scss from './ClientsOpenPayments.module.scss';

export default function ClientsOpenPayments({
  openPayments,
  client,
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
    <>
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
                <button onClick={handleSavePayments} className={scss.miniTableSaveChangeButton}>
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
  );
}

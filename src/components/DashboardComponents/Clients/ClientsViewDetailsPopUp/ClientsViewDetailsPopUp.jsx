import scss from './ClientsViewDetailsPopUp.module.scss';

export default function ClientsViewDetailsPopUp({
  viewClientId,
  closeModal,
  clients,
  formatDateTime,
}) {
  return (
    <>
      {viewClientId && (
        <div className={scss.modalOverlay} onClick={closeModal}>
          <div className={scss.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>Client Details</h3>
            <div className={scss.modalForm}>
              {clients.find((client) => client.id === viewClientId) && (
                <>
                  <div className={scss.modalInputAndIconBlock}>
                    <strong>Name:</strong>{' '}
                    <span>
                      {clients.find((client) => client.id === viewClientId).name || 'N/A'}
                    </span>
                  </div>
                  <div className={scss.modalInputAndIconBlock}>
                    <strong>Email:</strong>{' '}
                    <span>
                      {clients.find((client) => client.id === viewClientId).email || 'N/A'}
                    </span>
                  </div>
                  <div className={scss.modalInputAndIconBlock}>
                    <strong>Phone:</strong>{' '}
                    <span>
                      {clients.find((client) => client.id === viewClientId).phone || 'N/A'}
                    </span>
                  </div>
                  <div className={scss.modalInputAndIconBlock}>
                    <strong>Company:</strong>{' '}
                    <span>
                      {clients.find((client) => client.id === viewClientId).company || 'N/A'}
                    </span>
                  </div>
                  <div className={scss.modalInputAndIconBlock}>
                    <strong>Message:</strong>{' '}
                    <span>
                      {clients.find((client) => client.id === viewClientId).message || 'N/A'}
                    </span>
                  </div>
                  <div className={scss.modalInputAndIconBlock}>
                    <strong>GdprConsent:</strong>{' '}
                    <span>
                      {clients.find((client) => client.id === viewClientId).gdprConsent && 'есть'}
                    </span>
                  </div>
                  <div className={scss.modalInputAndIconBlock}>
                    <strong>Plan:</strong>{' '}
                    <span>
                      {clients.find((client) => client.id === viewClientId).plan || 'N/A'}
                    </span>
                  </div>
                  <div className={scss.modalInputAndIconBlock}>
                    <strong>Website:</strong>{' '}
                    <span>
                      {clients.find((client) => client.id === viewClientId).website || 'N/A'}
                    </span>
                  </div>
                  <div className={scss.modalInputAndIconBlock}>
                    <strong>Instagram:</strong>{' '}
                    <span>
                      {clients.find((client) => client.id === viewClientId).instagram || 'N/A'}
                    </span>
                  </div>
                  <div className={scss.modalInputAndIconBlock}>
                    <strong>Facebook:</strong>{' '}
                    <span>
                      {clients.find((client) => client.id === viewClientId).facebook || 'N/A'}
                    </span>
                  </div>
                  <div className={scss.modalInputAndIconBlock}>
                    <strong>Status:</strong>{' '}
                    <span>
                      {clients.find((client) => client.id === viewClientId).status || 'N/A'}
                    </span>
                  </div>
                  <div className={scss.modalInputAndIconBlock}>
                    <strong>Date Created:</strong>{' '}
                    <span>
                      {formatDateTime(
                        clients.find((client) => client.id === viewClientId).dateCreate,
                      ) || 'N/A'}
                    </span>
                  </div>
                  <div className={scss.modalInputAndIconBlock}>
                    <strong>Payments:</strong>
                    <ul>
                      {(clients.find((client) => client.id === viewClientId).payments || []).map(
                        (payment, index) => (
                          <li key={index}>
                            {formatDateTime(payment.date)} - {payment.amount}{' '}
                            {payment.currency || 'грн.'}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </>
              )}
              <div className={scss.modalButtons}>
                <button className={scss.modalCancelButton} onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

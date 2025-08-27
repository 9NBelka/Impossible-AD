import { BsFacebook, BsGlobe, BsInstagram } from 'react-icons/bs';
import scss from './ClientsAddOrEditPopUp.module.scss';
import ClientsCustomSelect from '../ClientsCustomSelect/ClientsCustomSelect';

export default function ClientsAddOrEditPopUp({
  modalType,
  closeModal,
  formData,
  setFormData,
  handleSave,
}) {
  return (
    <>
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
              <ClientsCustomSelect
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
              <ClientsCustomSelect
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
    </>
  );
}

import clsx from 'clsx';
import scss from './TrelloTablePopUp.module.scss';

export default function TrelloTablePopUp({
  modalOpen,
  handleSubmit,
  currentTask,
  handleChange,
  users,
  priorityOptions,
  isEdit,
  setModalOpen,
}) {
  // Обработчик для закрытия модалки при клике на оверлей
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains(scss.modalOverlay)) {
      setModalOpen(false);
    }
  };

  return (
    <>
      {modalOpen && (
        <div className={scss.modalOverlay} onClick={handleOverlayClick}>
          <div className={scss.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>{isEdit ? 'Редактировать задачу' : 'Добавить задачу'}</h3>
            <form onSubmit={handleSubmit} className={scss.modalForm}>
              <input
                className={scss.modalInput}
                type='text'
                name='title'
                value={currentTask.title}
                onChange={handleChange}
                placeholder='Название'
                required
              />

              <textarea
                className={clsx(scss.modalInput, scss.modalTextarea)}
                name='description'
                value={currentTask.description}
                onChange={handleChange}
                placeholder='Описание'
                required
              />

              <select
                className={scss.modalInput}
                name='assignedUserId'
                value={currentTask.assignedUserId}
                onChange={handleChange}>
                <option value=''>Никто</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>

              <select
                name='priority'
                value={currentTask.priority}
                onChange={handleChange}
                className={scss.modalInput}>
                {priorityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <div className={scss.modalButtons}>
                <button type='submit' className={scss.modalSaveButton}>
                  {isEdit ? 'Сохранить' : 'Создать'}
                </button>
                <button
                  type='button'
                  onClick={() => setModalOpen(false)}
                  className={scss.modalCancelButton}>
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

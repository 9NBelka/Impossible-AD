import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import {
  fetchTasks,
  fetchUsers,
  addTask,
  editTask,
  deleteTask,
  moveTask,
  reorderTasks,
} from '../../../store/slices/trelloTableSlicee';
import scss from './TrelloTable.module.scss';
import clsx from 'clsx';
import {
  BsCheckSquareFill,
  BsExclamationSquareFill,
  BsFillCheckSquareFill,
  BsPlus,
  BsPlusSquareFill,
  BsQuestionSquareFill,
} from 'react-icons/bs';
import TrelloTablePopUp from './TrelloTablePopUp/TrelloTablePopUp';

const columns = [
  { id: 'todo', title: 'К выполнению', icon: <BsPlusSquareFill className={scss.iconTitle} /> },
  {
    id: 'inprogress',
    title: 'Делается',
    icon: <BsQuestionSquareFill className={scss.iconTitle} />,
  },
  {
    id: 'review',
    title: 'На проверке',
    icon: <BsExclamationSquareFill className={scss.iconTitle} />,
  },
  { id: 'done', title: 'Сделано', icon: <BsCheckSquareFill className={scss.iconTitle} /> },
];

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' },
];

const TrelloTable = () => {
  const dispatch = useDispatch();
  const { tasks, users, loading, error } = useSelector((state) => state.trelloTable);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    title: '',
    description: '',
    assignedUserId: '',
    status: 'todo',
    priority: 'low',
    order: 0,
  });
  const [selectedColumn, setSelectedColumn] = useState('todo');

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchUsers());
  }, [dispatch]);

  const getTasksByColumn = (columnId) =>
    tasks.filter((task) => task.status === columnId).sort((a, b) => a.order - b.order); // Sort by order

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    const sourceColumn = source.droppableId;
    const destColumn = destination.droppableId;
    const sourceTasks = getTasksByColumn(sourceColumn);

    if (sourceColumn === destColumn) {
      // Reordering within the same column
      const newOrder = [...sourceTasks];
      const [movedTask] = newOrder.splice(source.index, 1);
      newOrder.splice(destination.index, 0, movedTask);

      const updatedTasks = newOrder.map((task, index) => ({
        id: task.id,
        order: index,
      }));

      dispatch(reorderTasks({ columnId: sourceColumn, updatedTasks }));
    } else {
      // Moving between columns
      dispatch(moveTask({ taskId: draggableId, newStatus: destColumn }));

      // Update order in the destination column
      const destTasks = getTasksByColumn(destColumn);
      const newDestTasks = [...destTasks, sourceTasks[source.index]].sort(
        (a, b) => a.order - b.order,
      );
      const updatedDestTasks = newDestTasks.map((task, index) => ({
        id: task.id,
        order: index,
      }));

      dispatch(reorderTasks({ columnId: destColumn, updatedTasks: updatedDestTasks }));
    }
  };

  const handleAdd = (columnId) => {
    setIsEdit(false);
    setCurrentTask({
      title: '',
      description: '',
      assignedUserId: '',
      status: columnId,
      priority: 'low',
      order: getTasksByColumn(columnId).length, // Set order to end of column
    });
    setSelectedColumn(columnId);
    setModalOpen(true);
  };

  const handleEdit = (task) => {
    setIsEdit(true);
    setCurrentTask({ ...task });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      dispatch(
        editTask({
          taskId: currentTask.id,
          updates: {
            title: currentTask.title,
            description: currentTask.description,
            assignedUserId: currentTask.assignedUserId,
            priority: currentTask.priority,
          },
        }),
      );
    } else {
      dispatch(
        addTask({
          title: currentTask.title,
          description: currentTask.description,
          assignedUserId: currentTask.assignedUserId,
          status: selectedColumn,
          priority: currentTask.priority,
          order: currentTask.order,
        }),
      );
    }
    setModalOpen(false);
  };

  const handleDelete = (taskId) => {
    if (window.confirm('Удалить задачу?')) {
      const task = tasks.find((t) => t.id === taskId);
      dispatch(deleteTask(taskId));
      // Reorder remaining tasks in the column
      const columnId = task.status;
      const remainingTasks = getTasksByColumn(columnId).filter((t) => t.id !== taskId);
      const updatedTasks = remainingTasks.map((task, index) => ({
        id: task.id,
        order: index,
      }));
      dispatch(reorderTasks({ columnId, updatedTasks }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className={scss.trelloTable}>
      <h2>Contact Forms Table</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className={scss.board}>
          {columns.map((column) => (
            <div key={column.id} className={scss.boardColumn}>
              <h2 className={scss.boardTitle}>
                {column.icon}
                {column.title}
              </h2>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={scss.droppableArea}>
                    {getTasksByColumn(column.id).map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={clsx(
                              scss.card,
                              task.priority === 'low' && scss.priorityLow,
                              task.priority === 'medium' && scss.priorityMedium,
                              task.priority === 'high' && scss.priorityHigh,
                              task.priority === 'critical' && scss.priorityCritical,
                            )}>
                            <h3 className={scss.cardTitle}>{task.title}</h3>
                            <p className={scss.cardDescription}>{task.description}</p>
                            <div className={scss.nameAndPriorityRow}>
                              <p className={scss.cardName}>
                                Назначено:{' '}
                                {users.find((u) => u.id === task.assignedUserId)?.name || 'Никто'}
                              </p>
                              <p className={scss.cardPriority}>
                                Приоритет:{' '}
                                <span
                                  className={clsx(
                                    task.priority === 'low' && scss.priorityLow,
                                    task.priority === 'medium' && scss.priorityMedium,
                                    task.priority === 'high' && scss.priorityHigh,
                                    task.priority === 'critical' && scss.priorityCritical,
                                  )}>
                                  {priorityOptions.find((p) => p.value === task.priority)?.label ||
                                    'Неизвестно'}
                                </span>
                              </p>
                            </div>
                            <p className={scss.cardDateCreate}>
                              Создано:{' '}
                              {task.createdAt
                                ? new Date(task.createdAt).toLocaleString()
                                : 'Неизвестно'}
                            </p>
                            <div className={scss.buttonFlexRow}>
                              <button
                                onClick={() => handleEdit(task)}
                                className={scss.changeButton}>
                                Редактировать
                              </button>
                              <button
                                onClick={() => handleDelete(task.id)}
                                className={scss.deleteButton}>
                                Удалить
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <button onClick={() => handleAdd(column.id)} className={scss.buttonAddCard}>
                <BsPlus className={scss.buttonAddCardIcon} />
                добавить задачу
              </button>
            </div>
          ))}
        </div>
      </DragDropContext>

      <TrelloTablePopUp
        modalOpen={modalOpen}
        handleSubmit={handleSubmit}
        currentTask={currentTask}
        handleChange={handleChange}
        users={users}
        priorityOptions={priorityOptions}
        isEdit={isEdit}
        setModalOpen={setModalOpen}
      />
    </div>
  );
};

export default TrelloTable;

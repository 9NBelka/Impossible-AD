import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ContactFormsCalendar.scss';
import {
  updateAvailableSlots,
  fetchAvailableSlots,
  saveAvailableSlots,
} from '../../../../store/slices/calendarSlice';
import HourCells from './HourCells/HourCells';

const daysUa = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
const daysEn = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const timeSlots = Array.from({ length: 14 * 4 }, (_, i) => {
  const hour = 8 + Math.floor(i / 4);
  const minute = (i % 4) * 15;
  return { hour, minute };
});

export default function ContactFormsCalendar() {
  const dispatch = useDispatch();
  const { availableSlots, status } = useSelector((state) => state.calendar);

  const [gridData, setGridData] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  // Загружаем слоты из Firestore
  useEffect(() => {
    dispatch(fetchAvailableSlots());
  }, [dispatch]);

  // Синхронизация gridData с Redux
  useEffect(() => {
    if (availableSlots.slots.length > 0) {
      const initialGrid = daysEn.flatMap((day) =>
        timeSlots.map(({ hour, minute }) => {
          const slot = availableSlots.slots.find(
            (s) => s.day === day && s.hour === hour && s.minute === minute,
          );
          return { day, hour, minute, isActive: !!slot, id: slot?.id || null };
        }),
      );
      setGridData(initialGrid);
    } else {
      const emptyGrid = daysEn.flatMap((day) =>
        timeSlots.map(({ hour, minute }) => ({ day, hour, minute, isActive: false, id: null })),
      );
      setGridData(emptyGrid);
    }
  }, [availableSlots]);

  const toggleCell = (day, hour, minute) => {
    setGridData((prev) =>
      prev.map((cell) =>
        cell.day === day && cell.hour === hour && cell.minute === minute
          ? { ...cell, isActive: !cell.isActive }
          : cell,
      ),
    );
  };

  const handleMouseDown = (day, hour, minute) => {
    setIsDragging(true);
    toggleCell(day, hour, minute);
  };

  const handleMouseOver = (day, hour, minute) => {
    if (isDragging) {
      toggleCell(day, hour, minute);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const slots = gridData
      .filter((cell) => cell.isActive)
      .map((cell) => ({
        day: cell.day,
        hour: cell.hour,
        minute: cell.minute,
        id: cell.id,
      }));
    dispatch(updateAvailableSlots(slots));
  };

  const handleSave = () => {
    const slots = gridData
      .filter((cell) => cell.isActive)
      .map((cell) => ({
        day: cell.day,
        hour: cell.hour,
        minute: cell.minute,
        id: cell.id,
      }));

    dispatch(saveAvailableSlots(slots));
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error loading calendar slots</div>;

  return (
    <div className='calendar-grid'>
      {/* Часы слева */}
      <div className='hour-labels'>
        {Array.from({ length: 14 }, (_, i) => 8 + i).map((hour) => (
          <div key={hour} className='hour-label'>{`${hour}:00`}</div>
        ))}
      </div>

      {/* Сетка с днями и часами */}
      {daysUa.map((dayUa, index) => {
        const dayEn = daysEn[index];
        const isLastDay = index === daysUa.length - 1;
        return (
          <div key={dayEn} className={`dayLabel ${isLastDay ? 'lastDayLabel' : ''}`}>
            {dayUa}

            <HourCells
              dayEn={dayEn}
              timeSlots={timeSlots}
              gridData={gridData}
              handleMouseDown={handleMouseDown}
              handleMouseOver={handleMouseOver}
              handleMouseUp={handleMouseUp}
            />
          </div>
        );
      })}

      <button onClick={handleSave}>Save</button>
    </div>
  );
}

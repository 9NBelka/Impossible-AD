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

export default function ContactFormsCalendar({ forms }) {
  const dispatch = useDispatch();
  const { availableSlots, status } = useSelector((state) => state.calendar);

  const [gridData, setGridData] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [weekDates, setWeekDates] = useState([]);

  // Function to calculate dates for the current week
  const getWeekDates = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Adjust to get Monday
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);
    monday.setHours(0, 0, 0, 0); // Reset time for comparison

    // Check if current date is past Sunday of the displayed week
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    if (today > sunday) {
      monday.setDate(monday.getDate() + 7); // Move to next week
    }

    // Generate dates for the week
    const dates = [];
    const displayDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      dates.push(new Date(date)); // Store full Date object for comparison
      displayDates.push(date.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit' }));
    }
    return { dates, displayDates };
  };

  useEffect(() => {
    // Установить начальные даты недели
    const { displayDates } = getWeekDates();
    setWeekDates(displayDates);

    // Настройка интервала для проверки смены недели
    const interval = setInterval(() => {
      const { displayDates } = getWeekDates();
      setWeekDates((prevWeekDates) => {
        if (displayDates[0] !== prevWeekDates[0]) {
          return displayDates;
        }
        return prevWeekDates; // Не обновлять, если даты не изменились
      });
    }, 24 * 60 * 60 * 1000); // Проверять раз в день

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    dispatch(fetchAvailableSlots());
  }, [dispatch]);

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

  // Get full Date objects for week dates for comparison
  const { dates: fullWeekDates } = getWeekDates();

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error loading calendar slots</div>;

  return (
    <div className='calendar-container'>
      {/* Шапка с временем */}
      <h3>Available Slots Calendar</h3>
      <div className='scrollEffect'>
        <div className='calendar-header'>
          <div className='corner-cell'>Дни/часы</div>
          <div className='time-row'>
            {Array.from({ length: 14 }, (_, i) => 8 + i).map((hour) => (
              <div key={hour} className='time-header'>{`${hour}:00`}</div>
            ))}
          </div>
          <div className='corner-cell rightSection'>Дни/часы</div>
        </div>

        {/* Строки с днями */}
        <div className='calendar-body'>
          {daysUa.map((dayUa, index) => {
            const dayEn = daysEn[index];
            const date = weekDates[index] || ''; // Get display date
            return (
              <div key={dayEn} className='calendar-row'>
                <div className='day-label'>{`${dayUa} ${date}`}</div>
                <div className='row-cells'>
                  <HourCells
                    dayEn={dayEn}
                    timeSlots={timeSlots}
                    gridData={gridData}
                    handleMouseDown={handleMouseDown}
                    handleMouseOver={handleMouseOver}
                    handleMouseUp={handleMouseUp}
                    bookedSlots={forms} // Pass forms as bookedSlots
                    weekDate={fullWeekDates[index]} // Pass full Date object for the day
                  />
                </div>
                <div className='day-label rightSection'>{`${dayUa} ${date}`}</div>
              </div>
            );
          })}
        </div>
      </div>

      <button className='save-button' onClick={handleSave}>
        Сохранить изменения
      </button>
    </div>
  );
}

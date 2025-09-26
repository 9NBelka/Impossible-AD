import React from 'react';

export default function HourCells({
  dayEn,
  timeSlots,
  gridData,
  handleMouseDown,
  handleMouseOver,
  handleMouseUp,
  bookedSlots,
  weekDate,
}) {
  const isBooked = (hour, minute) => {
    if (!bookedSlots || !weekDate) return false;
    return bookedSlots.some((slot) => {
      const slotDate = new Date(slot.dateTime);
      return (
        slotDate.getFullYear() === weekDate.getFullYear() &&
        slotDate.getMonth() === weekDate.getMonth() &&
        slotDate.getDate() === weekDate.getDate() &&
        slotDate.getHours() === hour &&
        slotDate.getMinutes() === minute
      );
    });
  };

  return (
    <>
      {timeSlots.map(({ hour, minute }) => {
        const cell = gridData.find(
          (c) => c.day === dayEn && c.hour === hour && c.minute === minute,
        );
        const booked = isBooked(hour, minute);
        return (
          <div
            key={`${dayEn}-${hour}-${minute}`}
            className={`cell ${cell?.isActive ? 'active' : 'inactive'} ${booked ? 'booked' : ''}`}
            onMouseDown={() => handleMouseDown(dayEn, hour, minute)}
            onMouseOver={() => handleMouseOver(dayEn, hour, minute)}
            onMouseUp={handleMouseUp}>
            {`${hour}:${minute.toString().padStart(2, '0')}`}
          </div>
        );
      })}
    </>
  );
}

import React from 'react';

export default function HourCells({
  dayEn,
  timeSlots,
  gridData,
  handleMouseDown,
  handleMouseOver,
  handleMouseUp,
}) {
  return (
    <>
      {timeSlots.map(({ hour, minute }) => {
        const cell = gridData.find(
          (c) => c.day === dayEn && c.hour === hour && c.minute === minute,
        );
        return (
          <div
            key={`${dayEn}-${hour}-${minute}`}
            className={`cell ${cell?.isActive ? 'active' : 'inactive'}`}
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

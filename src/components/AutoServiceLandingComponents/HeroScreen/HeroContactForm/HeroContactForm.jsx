import { useDispatch, useSelector } from 'react-redux';
import scss from './HeroContactForm.module.scss';
import { useState, useEffect } from 'react';
import React, { forwardRef } from 'react';
import { BsCalendar } from 'react-icons/bs';
import clsx from 'clsx';
import { BsArrowRightShort } from 'react-icons/bs';
import { addContactForm } from '../../../../store/slices/contactFormSlice';
import { addAppointment } from '../../../../store/slices/appointmentsSlice';
import DatePicker from 'react-datepicker';
import { collection, getDocs, query, where } from 'firebase/firestore';
import 'react-datepicker/dist/react-datepicker.css';
import { db } from '../../../../firebase';
import { fetchAvailableSlots } from '../../../../store/slices/calendarSlice';

export default function HeroContactForm() {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({ gdprConsent: false });
  const [submitMessage, setSubmitMessage] = useState('');
  const [bookedTimes, setBookedTimes] = useState([]);
  const dispatch = useDispatch();
  const { availableSlots } = useSelector((state) => state.calendar);

  useEffect(() => {
    const fetchBookedTimes = async () => {
      try {
        const q = query(collection(db, 'appointments'));
        const querySnapshot = await getDocs(q);
        const booked = querySnapshot.docs.map((doc) => new Date(doc.data().dateTime));
        setBookedTimes(booked);
      } catch (error) {
        console.error('Error fetching booked times:', error);
      }
    };
    fetchBookedTimes();
  }, []);

  useEffect(() => {
    if (!availableSlots.slots.length) {
      dispatch(fetchAvailableSlots());
    }
  }, [dispatch, availableSlots.slots.length]);

  const handleInputChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const filterTimes = (time) => {
    const slotHour = time.getHours();
    const slotMinute = time.getMinutes();
    const slotDay = time.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

    const isAvailable = availableSlots.slots.some(
      (slot) => slot.day === slotDay && slot.hour === slotHour && slot.minute === slotMinute,
    );

    const isBooked = bookedTimes.some(
      (booked) =>
        booked.getFullYear() === time.getFullYear() &&
        booked.getMonth() === time.getMonth() &&
        booked.getDate() === time.getDate() &&
        booked.getHours() === slotHour &&
        booked.getMinutes() === slotMinute,
    );

    return isAvailable && !isBooked;
  };

  const filterDate = (date) => {
    const day = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    return availableSlots.slots.some((slot) => slot.day === day);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.gdprConsent) {
      setSubmitMessage('Будь ласка, погодьтеся з політикою конфіденційності');
      return;
    }
    if (!selectedDate) {
      setSubmitMessage('Будь ласка, оберіть дату та час');
      return;
    }

    const formPayload = {
      name,
      phone,
      city,
      plan: 'СТО Hero',
      source: 'stoHero',
      dateTime: selectedDate.toISOString(),
      dateCreate: new Date().toISOString(),
      status: 'В обработке',
    };

    try {
      const q = query(
        collection(db, 'appointments'),
        where('dateTime', '==', formPayload.dateTime),
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setSubmitMessage('Цей час вже зайнятий. Оберіть інший.');
        return;
      }

      const contactResult = await dispatch(addContactForm(formPayload)).unwrap();

      await dispatch(
        addAppointment({
          dateTime: formPayload.dateTime,
          contactFormId: contactResult.id,
          status: 'booked',
        }),
      ).unwrap();

      setSubmitMessage('Дякуємо! Ваша заявка успішно відправлена.');
      setName('');
      setCity('');
      setPhone('');
      setSelectedDate(null);
      setFormData({ gdprConsent: false });
      setBookedTimes([...bookedTimes, new Date(formPayload.dateTime)]);
    } catch (error) {
      setSubmitMessage('Помилка при відправці заявки. Спробуйте ще раз.');
      console.error('Form submission error:', error);
    }
  };

  const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
    <div className={scss.customDateInput} onClick={onClick} ref={ref}>
      <input
        type='text'
        value={value}
        readOnly // ⬅️ запрет ручного ввода
        className={scss.input}
        placeholder='Оберіть дату та час'
      />
      <BsCalendar className={scss.calendarIcon} />
    </div>
  ));

  return (
    <div className={scss.formWidth}>
      <div className={scss.formMainBlock}>
        <div className={scss.formInputsAndCheckoutBlock}>
          <div className={scss.formInputsAndCheckout}>
            <h3>Потрібні кліенти?</h3>
            <div className={scss.formGroup}>
              <label>
                Ім'я <span className={scss.importantText}>*</span>
              </label>
              <input
                type='text'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={scss.input}
                required
              />
            </div>
            <div className={scss.formGroup}>
              <label>
                Телефон <span className={scss.importantText}>*</span>
              </label>
              <input
                type='tel'
                name='tel'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={scss.input}
                required
              />
            </div>
            <div className={scss.formGroup}>
              <label>
                Місто <span className={scss.importantText}>*</span>
              </label>
              <input
                type='text'
                name='city'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={scss.input}
                required
              />
            </div>
            <div className={scss.formGroup}>
              <label>
                Дата та час дзвінка <span className={scss.importantText}>*</span>
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                showTimeSelect
                timeFormat='HH:mm'
                timeIntervals={15}
                dateFormat='dd/MM/yyyy HH:mm'
                wrapperClassName={scss.datePickerWrapper}
                minDate={new Date()}
                filterTime={filterTimes}
                filterDate={filterDate}
                timeClassName={(time) => {
                  const slotHour = time.getHours();
                  const slotDay = time
                    .toLocaleDateString('en-US', { weekday: 'long' })
                    .toLowerCase();

                  const isAvailable = availableSlots.slots.some(
                    (slot) => slot.day === slotDay && slot.hour === slotHour,
                  );

                  const isBooked = bookedTimes.some(
                    (booked) =>
                      booked.getFullYear() === time.getFullYear() &&
                      booked.getMonth() === time.getMonth() &&
                      booked.getDate() === time.getDate() &&
                      booked.getHours() === slotHour,
                  );

                  if (!isAvailable) return scss.unavailableTime;
                  if (isBooked) return scss.bookedTime;
                  return scss.freeTime;
                }}
                customInput={<CustomDateInput />} // ⬅️ подключаем кастомный инпут
                required
              />
            </div>
          </div>
          <div className={clsx(scss.formGroup, scss.checkboxGroup)}>
            <label className={scss.checkboxLabel}>
              <input
                type='checkbox'
                name='gdprConsent'
                checked={formData.gdprConsent}
                onChange={handleInputChange}
                required
              />
              <span className={scss.checkmark}></span>
              <span className={scss.checkmarkText}>
                Я згоден на обробку моїх персональних даних відповідно до
                <a href='/privacy-policy' className={scss.privacyLink} target='_blank'>
                  Політики конфіденційності
                </a>
              </span>
            </label>
          </div>
          <div className={scss.blockButtonFlex}>
            <button type='button' onClick={handleSubmit} className={scss.button}>
              Відправити заявку <BsArrowRightShort className={scss.buttonIconDownload} />
            </button>
          </div>
          {submitMessage && (
            <div
              className={clsx(
                scss.submitMessage,
                submitMessage.includes('Дякуємо!') ? scss.success : scss.error,
              )}>
              {submitMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, forwardRef } from 'react';
import { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { BsArrowRightShort, BsCalendar } from 'react-icons/bs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import uk from 'date-fns/locale/uk';
import scss from './ContactForm.module.scss';
import { addContactForm, fetchContactForms } from '../../../../store/slices/contactFormSlice'; // Added fetchContactForms import

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { useNavigate } from 'react-router-dom';
import { fetchAvailableSlots } from '../../../../store/slices/calendarSlice';

export default function ContactForm() {
  const dispatch = useDispatch();
  const { availableSlots } = useSelector((state) => state.calendar);
  const { forms, status: contactFormStatus } = useSelector((state) => state.contactForm);

  const [name, setName] = useState('');
  const [companySTO, setCompanySTO] = useState('');
  const [site, setSite] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({ gdprConsent: false });
  const [submitMessage, setSubmitMessage] = useState('');
  const [bookedTimes, setBookedTimes] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const navigate = useNavigate();
  registerLocale('uk', uk);

  // Fetch contact forms on mount
  useEffect(() => {
    dispatch(fetchContactForms());
  }, [dispatch]);

  // Derive booked times from Redux forms
  useEffect(() => {
    if (contactFormStatus === 'succeeded') {
      const booked = forms.filter((form) => form.dateTime).map((form) => new Date(form.dateTime));

      setBookedTimes(booked);
    }
  }, [forms, contactFormStatus]);

  // Load available slots if not already loaded
  useEffect(() => {
    if (!availableSlots?.slots?.length) {
      dispatch(fetchAvailableSlots());
    }
  }, [dispatch, availableSlots?.slots?.length]);

  const handleInputChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  // Validate and handle phone input
  const handlePhoneChange = (e) => {
    const cleaned = e.target.value.replace(/\D/g, '');
    setPhone(cleaned.slice(0, 12));
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10,12}$/;
    return phoneRegex.test(phone);
  };

  const getFirstAvailableTimeForDate = useCallback(
    (date) => {
      if (!date || !availableSlots?.slots?.length) return null;

      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

      // Находим все доступные слоты на этот день недели
      const daySlots = availableSlots.slots
        .filter((slot) => slot.day === dayName)
        .sort((a, b) => a.hour - b.hour || a.minute - b.minute); // сортируем по времени

      if (daySlots.length === 0) return null;

      for (const slot of daySlots) {
        const candidate = new Date(date);
        candidate.setHours(slot.hour, slot.minute, 0, 0);

        // Проверяем, не забронирован ли этот слот
        const isBooked = bookedTimes.some(
          (booked) =>
            booked.getFullYear() === candidate.getFullYear() &&
            booked.getMonth() === candidate.getMonth() &&
            booked.getDate() === candidate.getDate() &&
            booked.getHours() === slot.hour &&
            booked.getMinutes() === slot.minute,
        );

        if (!isBooked) {
          return candidate;
        }
      }

      return null; // все слоты на этот день забронированы
    },
    [availableSlots?.slots, bookedTimes],
  );

  const handleDateChange = (date) => {
    if (!date) {
      setSelectedDate(null);
      return;
    }

    // При смене ДАТЫ — ищем первое свободное время
    const firstAvailable = getFirstAvailableTimeForDate(date);

    // Если есть свободное время — ставим его, иначе — просто дату (чтобы можно было открыть список)
    setSelectedDate(firstAvailable || new Date(date.setHours(12, 0, 0, 0))); // 12:00 как fallback
  };

  const handleTimeChange = (newDateTime) => {
    // При смене ВРЕМЕНИ — просто берём как есть (оно уже отфильтровано!)
    setSelectedDate(newDateTime);
  };

  const filterTime = useCallback(
    (time) => {
      const hour = time.getHours();
      const minute = time.getMinutes();
      const dayName = time.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

      // 1. Должен быть в доступных слотах
      const isInAvailableSlots = availableSlots?.slots?.some(
        (slot) => slot.day === dayName && slot.hour === hour && slot.minute === minute,
      );

      if (!isInAvailableSlots) return false;

      // 2. Не должен быть забронирован
      const isBooked = bookedTimes.some(
        (booked) =>
          booked.getFullYear() === time.getFullYear() &&
          booked.getMonth() === time.getMonth() &&
          booked.getDate() === time.getDate() &&
          booked.getHours() === hour &&
          booked.getMinutes() === minute,
      );

      return !isBooked;
    },
    [availableSlots?.slots, bookedTimes],
  );

  // Filter dates to only show days with available slots (weekday-based, since slots are recurring)
  const filterDate = (date) => {
    const day = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    return availableSlots?.slots?.some((slot) => slot.day === day) ?? false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage('');

    // Validate required fields
    if (!name.trim() || !city.trim() || !phone.trim() || !selectedDate) {
      setSubmitMessage('Будь ласка, заповніть усі обов’язкові поля');
      return;
    }

    // Validate phone
    if (!validatePhone(phone)) {
      setSubmitMessage('Введіть правильний номер телефону (наприклад: 380123456789)');
      return;
    }

    if (!formData.gdprConsent) {
      setSubmitMessage('Будь ласка, погодьтеся з політикою конфіденційності');
      return;
    }

    const formPayload = {
      name,
      companySTO,
      phone,
      site,
      city,
      plan: 'СТО',
      source: 'sto',
      dateCreate: new Date().toISOString(),
      dateTime: selectedDate.toISOString(),
      status: 'В обработке',
    };

    try {
      // Check if the selected time is already booked
      const q = query(
        collection(db, 'contactform'), // Fixed collection name to match slice and rules
        where('dateTime', '==', formPayload.dateTime),
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setSubmitMessage('Цей час вже зайнятий. Оберіть інший.');
        return;
      }

      await dispatch(addContactForm(formPayload)).unwrap();

      // Update bookedTimes locally
      setBookedTimes((prev) => [...prev, new Date(formPayload.dateTime)]);

      // Show thank-you message
      // setIsFormSubmitted(true);
      navigate('/thanks-auto-service');

      // Clear form
      setName('');
      setCompanySTO('');
      setSite('');
      setCity('');
      setPhone('');
      setSelectedDate(null);
      setFormData({ gdprConsent: false });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitMessage('Помилка при відправці заявки. Спробуйте ще раз.');
    }
  };

  const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
    <div className={scss.customDateInput} onClick={onClick} ref={ref}>
      <input
        type='text'
        value={value}
        readOnly
        className={scss.input}
        placeholder='Оберіть дату та час'
      />
      <BsCalendar className={scss.calendarIcon} />
    </div>
  ));

  // Show loading if contact forms are loading
  if (contactFormStatus === 'loading') {
    return <div>Завантаження доступних часів...</div>;
  }

  return (
    <div className={scss.formMainBlock} id='contacts'>
      {!isFormSubmitted ? (
        <div className={scss.formInputsAndCheckoutBlock}>
          <form className={scss.formInputsAndCheckout} onSubmit={handleSubmit}>
            <p>Якісно заповнені вами поля дають найкращий результат</p>

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
                onChange={handlePhoneChange}
                className={scss.input}
                required
                maxLength={12}
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
              <label>Назва СТО</label>
              <input
                type='text'
                name='companySTO'
                value={companySTO}
                onChange={(e) => setCompanySTO(e.target.value)}
                className={scss.input}
              />
            </div>

            <div className={scss.formGroup}>
              <label>Ваш сайт (якщо маєте)</label>
              <input
                type='text'
                name='site'
                value={site}
                onChange={(e) => setSite(e.target.value)}
                className={scss.input}
              />
            </div>

            <div className={scss.formGroup}>
              <label>
                Дата та час дзвінка <span className={scss.importantText}>*</span>
              </label>
              <DatePicker
                locale='uk'
                selected={selectedDate}
                onChange={(date) => {
                  if (!selectedDate || date.getDate() !== selectedDate.getDate()) {
                    const firstAvailable = getFirstAvailableTimeForDate(date);
                    setSelectedDate(firstAvailable || date);
                  } else {
                    setSelectedDate(date);
                  }
                }}
                showTimeSelect
                timeFormat='HH:mm'
                timeIntervals={15}
                dateFormat='dd/MM/yyyy HH:mm'
                filterTime={filterTime}
                filterDate={filterDate}
                minDate={new Date()}
                customInput={<CustomDateInput />}
                placeholderText='Оберіть дату та час'
                wrapperClassName={scss.datePickerWrapper}
              />
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
                  <a
                    href='/privacy-policy'
                    className={scss.privacyLink}
                    target='_blank'
                    rel='noreferrer'>
                    Політики конфіденційності
                  </a>
                </span>
              </label>
            </div>

            <div className={scss.blockButtonFlex}>
              <button type='submit' className={scss.button} id='mainForm'>
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
          </form>
        </div>
      ) : (
        <div className={scss.formAfterMain}>
          <div className={scss.formAfterBlockForImage}>
            <img src='/images/Email-send.png' alt='email-send' />
          </div>
          <h4>Дякуємо за вашу заявку!</h4>
          <p>Ми зв’яжемося з вами найближчим часом для підтвердження.</p>
          <a
            className={scss.linkForInstagram}
            href='https://www.instagram.com/ad_impossible/'
            target='_blank'>
            Закулісся та корисні поради у нашому Instagram
          </a>
        </div>
      )}
    </div>
  );
}

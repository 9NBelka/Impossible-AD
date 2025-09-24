import React, { useState, useEffect, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { BsArrowRightShort, BsCalendar } from 'react-icons/bs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import scss from './ContactForm.module.scss';
import { addContactForm } from '../../../../store/slices/contactFormSlice';
import { addAppointment } from '../../../../store/slices/appointmentsSlice';
import { fetchAvailableSlots } from '../../../../store/slices/calendarSlice';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../../firebase';

export default function ContactForm() {
  const dispatch = useDispatch();
  const { availableSlots } = useSelector((state) => state.calendar);

  const [name, setName] = useState('');
  const [companySTO, setCompanySTO] = useState('');
  const [site, setSite] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({ gdprConsent: false });
  const [submitMessage, setSubmitMessage] = useState('');
  const [bookedTimes, setBookedTimes] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Новое состояние для управления видимостью

  // Загружаем занятые времена
  useEffect(() => {
    const fetchBookedTimes = async () => {
      try {
        const q = query(collection(db, 'appointments'));
        const querySnapshot = await getDocs(q);
        const booked = querySnapshot.docs.map((doc) => new Date(doc.data().dateTime));
        setBookedTimes(booked);
      } catch (err) {
        console.error('Error fetching booked times:', err);
      }
    };
    fetchBookedTimes();
  }, []);

  // Подгружаем слоты (если ещё не загружены)
  useEffect(() => {
    if (!availableSlots?.slots?.length) {
      dispatch(fetchAvailableSlots());
    }
  }, [dispatch, availableSlots?.slots?.length]);

  const handleInputChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  // Разрешаем ввод только цифр в телефон
  const handlePhoneChange = (e) => {
    const cleaned = e.target.value.replace(/\D/g, '');
    setPhone(cleaned.slice(0, 12));
  };

  // Валидация телефона: только цифры, длина 10..12
  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10,12}$/;
    return phoneRegex.test(phone);
  };

  // Фильтр дат — только дни с доступными слотами
  const filterDate = (date) => {
    const day = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    return availableSlots?.slots?.some((slot) => slot.day === day) ?? false;
  };

  // Фильтр времени — учитываем hour + minute и занятые слоты
  const filterTimes = (time) => {
    const slotHour = time.getHours();
    const slotMinute = time.getMinutes();
    const slotDay = time.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

    const isAvailable =
      availableSlots?.slots?.some(
        (slot) => slot.day === slotDay && slot.hour === slotHour && slot.minute === slotMinute,
      ) ?? false;

    const isBooked =
      bookedTimes?.some(
        (booked) =>
          booked.getFullYear() === time.getFullYear() &&
          booked.getMonth() === time.getMonth() &&
          booked.getDate() === time.getDate() &&
          booked.getHours() === slotHour &&
          booked.getMinutes() === slotMinute,
      ) ?? false;

    return isAvailable && !isBooked;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage('');

    // Проверка обязательных полей
    if (!name.trim() || !city.trim() || !phone.trim() || !selectedDate) {
      setSubmitMessage('Будь ласка, заповніть усі обов’язкові поля');
      return;
    }

    // Валидация телефона
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
      // Двойная проверка на уже забронированное время
      const q = query(
        collection(db, 'appointments'),
        where('dateTime', '==', formPayload.dateTime),
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setSubmitMessage('Цей час вже зайнятий. Оберіть інший.');
        return;
      }

      // Сохраняем контактную форму
      const contactResult = await dispatch(addContactForm(formPayload)).unwrap();

      // Создаём appointment
      await dispatch(
        addAppointment({
          dateTime: formPayload.dateTime,
          contactFormId: contactResult.id,
          status: 'booked',
        }),
      ).unwrap();

      // Устанавливаем состояние для показа блока благодарности
      setIsFormSubmitted(true);

      // Очистка полей
      setName('');
      setCompanySTO('');
      setSite('');
      setCity('');
      setPhone('');
      setSelectedDate(null);
      setFormData({ gdprConsent: false });

      // Обновляем локально bookedTimes
      setBookedTimes((prev) => [...prev, new Date(formPayload.dateTime)]);
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
                  const slotMinute = time.getMinutes();
                  const slotDay = time
                    .toLocaleDateString('en-US', { weekday: 'long' })
                    .toLowerCase();

                  const isAvailable =
                    availableSlots?.slots?.some(
                      (slot) =>
                        slot.day === slotDay &&
                        slot.hour === slotHour &&
                        slot.minute === slotMinute,
                    ) ?? false;

                  const isBooked =
                    bookedTimes?.some(
                      (booked) =>
                        booked.getFullYear() === time.getFullYear() &&
                        booked.getMonth() === time.getMonth() &&
                        booked.getDate() === time.getDate() &&
                        booked.getHours() === slotHour &&
                        booked.getMinutes() === slotMinute,
                    ) ?? false;

                  if (!isAvailable) return scss.unavailableTime;
                  if (isBooked) return scss.bookedTime;
                  return scss.freeTime;
                }}
                customInput={<CustomDateInput />}
                required
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
              <button type='submit' className={scss.button}>
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
            <img src='/images/plane.jpg' />
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

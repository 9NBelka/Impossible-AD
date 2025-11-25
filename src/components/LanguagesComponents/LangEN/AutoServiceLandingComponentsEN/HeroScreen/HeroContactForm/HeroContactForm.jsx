import React, { useState, useEffect, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { BsArrowRightShort, BsCalendar } from 'react-icons/bs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import scss from './HeroContactForm.module.scss';
import { addContactForm, fetchContactForms } from '../../../../store/slices/contactFormSlice';
import { fetchAvailableSlots } from '../../../../store/slices/calendarSlice';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../../firebase';

export default function HeroContactForm() {
  const dispatch = useDispatch();
  const { availableSlots } = useSelector((state) => state.calendar);
  const { forms, status: contactFormStatus } = useSelector((state) => state.contactForm);

  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({ gdprConsent: false });
  const [submitMessage, setSubmitMessage] = useState('');
  const [bookedTimes, setBookedTimes] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // Fetch contact forms (including appointments) on mount
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

  // Filter dates to only show days with available slots
  const filterDate = (date) => {
    const day = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    return availableSlots?.slots?.some((slot) => slot.day === day) ?? false;
  };

  // Filter times to only show available and non-booked slots
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

    // Validate required fields
    if (!name.trim() || !city.trim() || !phone.trim() || !selectedDate) {
      setSubmitMessage('Будь ласка, заповніть усі обов’язкові поля');
      return;
    }

    // Validate phone
    if (!validatePhone(phone)) {
      setSubmitMessage('Введіть правильний номер телефону (наприклад: 0990915435)');
      return;
    }

    if (!formData.gdprConsent) {
      setSubmitMessage('Будь ласка, погодьтеся з політикою конфіденційності');
      return;
    }

    const formPayload = {
      name,
      phone,
      city,
      plan: 'СТО Hero',
      source: 'stoHero',
      dateCreate: new Date().toISOString(),
      dateTime: selectedDate.toISOString(),
      status: 'В обработке',
    };

    try {
      // Check if the selected time is already booked
      const q = query(
        collection(db, 'contactform'), // Updated to match ContactForm collection name
        where('dateTime', '==', formPayload.dateTime),
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setSubmitMessage('Цей час вже зайнятий. Оберіть інший.');
        return;
      }

      // Submit form to Firebase
      await dispatch(addContactForm(formPayload)).unwrap();

      // Update bookedTimes locally
      setBookedTimes((prev) => [...prev, new Date(formPayload.dateTime)]);

      // Show thank-you message
      setIsFormSubmitted(true);

      // Clear form
      setName('');
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

  return (
    <div className={scss.formWidth}>
      <div className={scss.formMainBlock}>
        {!isFormSubmitted ? (
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

                    if (isBooked) return scss.bookedTime; // Grayed out
                    if (!isAvailable) return scss.unavailableTime;
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
        ) : (
          <div className={scss.formAfterMain}>
            <div className={scss.formAfterBlockForImage}>
              <img src='/images/Email-send.png' alt='Дякуємо за заявку' />
            </div>
            <h4>Дякуємо за вашу заявку!</h4>
            <p>Ми зв’яжемося з вами найближчим часом для підтвердження.</p>
            <a
              className={scss.linkForInstagram}
              href='https://www.instagram.com/ad_impossible/'
              target='_blank'
              rel='noreferrer'>
              Закулісся та корисні поради у нашому Instagram
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { BsArrowRightShort, BsCalendar } from 'react-icons/bs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import scss from './ContactForm.module.scss';
import { addContactForm, fetchContactForms } from '../../../../../../store/slices/contactFormSlice';
import { fetchAvailableSlots } from '../../../../../../store/slices/calendarSlice';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../../../../firebase';
import { useNavigate } from 'react-router-dom';

export default function ContactForm() {
  const dispatch = useDispatch();
  const { availableSlots } = useSelector((state) => state.calendar);
  const { forms, status: contactFormStatus } = useSelector((state) => state.contactForm); // Added status for loading check

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

  // Filter dates to only show days with available slots (weekday-based, since slots are recurring)
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
      setSubmitMessage('Please fill in all required fields');
      return;
    }

    // Validate phone
    if (!validatePhone(phone)) {
      setSubmitMessage('Enter a valid phone number (example: 380123456789)');
      return;
    }

    if (!formData.gdprConsent) {
      setSubmitMessage('Please agree to the Privacy Policy');
      return;
    }

    const formPayload = {
      name,
      companySTO,
      phone,
      site,
      city,
      plan: 'СТО',
      source: 'stoTwo',
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
        setSubmitMessage('This time slot is already booked. Please choose another one.');
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
      setSubmitMessage('Error sending your request. Please try again.');
    }
  };

  const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
    <div className={scss.customDateInput} onClick={onClick} ref={ref}>
      <input
        type='text'
        value={value}
        readOnly
        className={scss.input}
        placeholder='Select a date and time'
      />
      <BsCalendar className={scss.calendarIcon} />
    </div>
  ));

  // Show loading if contact forms are loading
  if (contactFormStatus === 'loading') {
    return <div>Loading available time slots...</div>;
  }

  return (
    <div className={scss.formMainBlock} id='contacts'>
      {!isFormSubmitted ? (
        <div className={scss.formInputsAndCheckoutBlock}>
          <form className={scss.formInputsAndCheckout} onSubmit={handleSubmit}>
            <p>Accurately completed fields help us achieve the best results</p>

            <div className={scss.formGroup}>
              <label>
                Name <span className={scss.importantText}>*</span>
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
                Phone <span className={scss.importantText}>*</span>
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
                City <span className={scss.importantText}>*</span>
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
              <label>Shop Name</label>
              <input
                type='text'
                name='companySTO'
                value={companySTO}
                onChange={(e) => setCompanySTO(e.target.value)}
                className={scss.input}
              />
            </div>

            <div className={scss.formGroup}>
              <label>Your website (if available)</label>
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
                Call date and time <span className={scss.importantText}>*</span>
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

                  if (isBooked) return scss.bookedTime; // Booked times gray/unselectable
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
                  I agree to the processing of my personal data in accordance with the
                  <a
                    href='/privacy-policy'
                    className={scss.privacyLink}
                    target='_blank'
                    rel='noreferrer'>
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            <div className={scss.blockButtonFlex}>
              <button type='submit' className={scss.button} id='mainForm'>
                Send Request <BsArrowRightShort className={scss.buttonIconDownload} />
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
          <h4>Thank you for your request!</h4>
          <p>We will contact you shortly to confirm.</p>
          <a
            className={scss.linkForInstagram}
            href='https://www.instagram.com/ad_impossible/'
            target='_blank'>
            Behind the scenes and useful tips on our Instagram
          </a>
        </div>
      )}
    </div>
  );
}

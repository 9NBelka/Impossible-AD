import { useDispatch } from 'react-redux';
import scss from './HeroContactForm.module.scss';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { BsArrowRightShort } from 'react-icons/bs';
import { addContactForm } from '../../../../store/slices/contactFormSlice';
import { addAppointment } from '../../../../store/slices/appointmentsSlice';
import DatePicker from 'react-datepicker';
import { collection, getDocs, query, where } from 'firebase/firestore';
import 'react-datepicker/dist/react-datepicker.css';
import { db } from '../../../../firebase';

export default function HeroContactForm() {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({ gdprConsent: false });
  const [submitMessage, setSubmitMessage] = useState('');
  const [bookedTimes, setBookedTimes] = useState([]);
  const dispatch = useDispatch();

  // Получение занятых временных слотов из Firebase
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

  const handleInputChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  // Функция для фильтрации времени
  const filterTimes = (time) => {
    const selected = new Date(time);
    return !bookedTimes.some(
      (booked) =>
        booked.getTime() === selected.getTime() ||
        (booked.getDate() === selected.getDate() &&
          booked.getMonth() === selected.getMonth() &&
          booked.getFullYear() === selected.getFullYear() &&
          booked.getHours() === selected.getHours() &&
          booked.getMinutes() === selected.getMinutes()),
    );
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
      // Обновляем список занятых времен
      setBookedTimes([...bookedTimes, new Date(formPayload.dateTime)]);
    } catch (error) {
      setSubmitMessage('Помилка при відправці заявки. Спробуйте ще раз.');
      console.error('Form submission error:', error);
    }
  };

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
                className={scss.input}
                wrapperClassName={scss.datePickerWrapper}
                minDate={new Date()}
                filterTime={filterTimes} // Фильтрация занятых времен
                timeClassName={(time) => {
                  const isBooked = bookedTimes.some(
                    (booked) =>
                      booked.getTime() === time.getTime() ||
                      (booked.getDate() === time.getDate() &&
                        booked.getMonth() === time.getMonth() &&
                        booked.getFullYear() === time.getFullYear() &&
                        booked.getHours() === time.getHours() &&
                        booked.getMinutes() === time.getMinutes()),
                  );
                  return isBooked ? scss.bookedTime : '';
                }}
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

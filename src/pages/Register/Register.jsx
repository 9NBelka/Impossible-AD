import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import scss from './Register.module.scss';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Перенаправление после успешной регистрации
  useEffect(() => {
    if (user && (user.role === 'admin' || user.role === 'moderator')) {
      navigate('/home', { replace: true });
    }
  }, [user, navigate]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Неверный формат email').required('Email обязателен'),
      password: Yup.string()
        .min(6, 'Пароль должен быть не менее 6 символов')
        .required('Пароль обязателен'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
        .required('Подтверждение пароля обязательно'),
    }),
    onSubmit: async (values) => {
      dispatch(registerUser({ email: values.email, password: values.password }));
    },
  });

  return (
    <div className={scss.registerPage}>
      <div className={scss.registerContainer}>
        <h2 className={scss.registerTitle}>Регистрация</h2>
        <form onSubmit={formik.handleSubmit} className={scss.registerForm}>
          <div className={scss.formGroup}>
            <label htmlFor='email' className={scss.formLabel}>
              Email
            </label>
            <input
              id='email'
              name='email'
              type='email'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={scss.formInput}
              placeholder='Введите ваш email'
            />
            {formik.touched.email && formik.errors.email ? (
              <div className={scss.formError}>{formik.errors.email}</div>
            ) : null}
          </div>
          <div className={scss.formGroup}>
            <label htmlFor='password' className={scss.formLabel}>
              Пароль
            </label>
            <input
              id='password'
              name='password'
              type='password'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={scss.formInput}
              placeholder='Введите ваш пароль'
            />
            {formik.touched.password && formik.errors.password ? (
              <div className={scss.formError}>{formik.errors.password}</div>
            ) : null}
          </div>
          <div className={scss.formGroup}>
            <label htmlFor='confirmPassword' className={scss.formLabel}>
              Подтверждение пароля
            </label>
            <input
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className={scss.formInput}
              placeholder='Подтвердите ваш пароль'
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className={scss.formError}>{formik.errors.confirmPassword}</div>
            ) : null}
          </div>
          {error && <div className={scss.formError}>{error}</div>}
          <button type='submit' disabled={loading} className={scss.submitButton}>
            {loading ? 'Загрузка...' : 'Зарегистрироваться'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

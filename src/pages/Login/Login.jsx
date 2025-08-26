import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import scss from './Login.module.scss';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Если уже залогинен — отправляем в админку
  useEffect(() => {
    if (user && (user.role === 'admin' || user.role === 'moderator')) {
      navigate('/home', { replace: true });
    }
  }, [user, navigate]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Неверный формат email').required('Email обязателен'),
      password: Yup.string()
        .min(6, 'Пароль должен быть не менее 6 символов')
        .required('Пароль обязателен'),
    }),
    onSubmit: async (values) => {
      dispatch(loginUser({ email: values.email, password: values.password }));
    },
  });

  return (
    <div className={scss.loginPage}>
      <div className={scss.loginContainer}>
        <h2 className={scss.loginTitle}>Вход в админ-панель</h2>
        <form onSubmit={formik.handleSubmit} className={scss.loginForm}>
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
            {formik.touched.email && formik.errors.email && (
              <div className={scss.formError}>{formik.errors.email}</div>
            )}
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
            {formik.touched.password && formik.errors.password && (
              <div className={scss.formError}>{formik.errors.password}</div>
            )}
          </div>
          {error && <div className={scss.formError}>{error}</div>}
          <button type='submit' disabled={loading} className={scss.submitButton}>
            {loading ? 'Загрузка...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

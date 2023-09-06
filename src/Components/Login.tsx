import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { RouteComponentProps } from 'react-router';
import { useCustomDispatch } from '../redux/hooks/useRedux';
import { loginUser } from '../redux/thunks/authThunk';

type SomeComponentProps = RouteComponentProps;
const Login: FC<SomeComponentProps> = ({ history }): JSX.Element => {
  const dispatch = useCustomDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data: any) => {
    await dispatch(loginUser(data))
    history.push('/')
  };

  return (
    <>
      <div className='container'>
        <div
          className='row d-flex justify-content-center align-items-center'
          style={{ height: '100vh' }}
        >
          <div className='card mb-3' style={{ maxWidth: '320px' }}>
            <div className='col-md-12'>
              <div className='card-body'>
                <h3 className='card-title text-center text-secondary mt-3'>
                  Login Form
                </h3>
                <form autoComplete='off' onSubmit={handleSubmit(handleLogin)}>
                  <div className='mb-3 mt-4'>
                    <label className='form-label'>identityCard</label>
                    <input
                      type='identityCard'
                      className='form-control shadow-none'
                      id='exampleFormControlInput1'
                      {...register('identityCard', { required: 'identityCard is required!' })}
                    />
                    {errors.identityCard && (
                      <p className='text-danger' style={{ fontSize: 14 }}>
                        {errors.identityCard.message}
                      </p>
                    )}
                  </div>
                  <div className='mb-3'>
                    <label className='form-label'>Password</label>
                    <input
                      type='password'
                      className='form-control shadow-none'
                      id='exampleFormControlInput2'
                      {...register('password', {
                        required: 'Password is required!',
                      })}
                    />
                    {errors.password && (
                      <p className='text-danger' style={{ fontSize: 14 }}>
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div className='text-center mt-4 '>
                    <button
                      className='btn btn-outline-primary text-center shadow-none mb-3'
                      type='submit'
                    >
                      Submit
                    </button>
                    <p className='card-text pb-2'>
                      Have an Account?{' '}
                      <Link style={{ textDecoration: 'none' }} to={'/register'}>
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        limit={1}
        transition={Flip}
      />
    </>
  );
};
export default Login;

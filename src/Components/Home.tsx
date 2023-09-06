import React, { FC, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './home.css';
import { useCustomDispatch, useCustomSelector } from '../redux/hooks/useRedux';
import { fetchSurveyed } from '../redux/thunks/surveyedThunk';

type SomeComponentProps = RouteComponentProps;
const Home: FC<SomeComponentProps> = ({ history }) => {
  const dispatch = useCustomDispatch();
  const { surveyed } = useCustomSelector((state) => state.surveyed);

  const logout = () => {
    localStorage.clear();
    history.push('/login');
  };

  useEffect(() => {
    dispatch(fetchSurveyed())
  }, [dispatch])

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingLeft: 50,
          paddingRight: 50,
        }}
      >
        <div>
          <h3 className='m-3'>Home</h3>
        </div>
        <div>
          <button type='submit' className='butn' onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      <div className='container'>
        {JSON.stringify(surveyed)}
      </div>
    </>
  );
};

export default Home;

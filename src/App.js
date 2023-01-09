import { Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cover from './components/coverpic';
import Component from './components/home';
import Details from './components/detail';
import Payment from './components/payment';
import Profile from './components/Profile';
import Transactions from './components/transactions';
import Addtour from './components/addtour';
import Detailadmin from './components/detail-admin';
import { useContext, useEffect } from 'react';
import { API, setAuthToken } from './config/api';
import { UserContext } from './context/userContext';

function App() {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
    
    const [state, dispatch] = useContext(UserContext);

    // useEffect(() => {
    //     if (state.isLogin === false) {
    //       navigate('/');
    // //     } else {
    // //       if (state.user.role === 'admin') {
    // //         navigate('/transactions');
    // //       } else if (state.user.role === 'user') {
    // //         navigate('/');
    // //       }
    //     }
    //   }, [state]);

      const checkUser = async () => {
        try {
          const response = await API.get('/check-auth');
      
          if (response.status === 404) {
            return dispatch({
              type: 'AUTH_ERROR',
            });
          }
      
          let payload = response.data.data;
          payload.token = localStorage.token;
      
          dispatch({
            type: 'USER_SUCCESS',
            payload,
          });
        } catch (error) {
          console.log(error);
          
        }
      };
      
      useEffect(() => {
        checkUser();
        // eslint-disable-next-line
      }, []);

    return (
        <>
            <Cover />
            <Routes>
                  <Route exact path="/" element={state.user.role === "admin" ? <Transactions /> : <Component />} />
                  <Route exact path="/add-trip" element={state.user.role === "admin" ? <Addtour /> : <Navigate to="/" />} />
                  <Route exact path="/detail-trip" element={state.user.role === "admin" ? <Detailadmin /> : <Navigate to="/" />} />
                  <Route exact path="/details/:id" element={<Details/>} />
                  <Route exact path="/payment/:book" element={<Payment />} />
                  <Route exact path="/profile" element={<Profile />} />

                  {/* <Route element={state.user.role === 'admin' ? <Outlet /> : <Navigate to="/" />}>
                        <Route path='/transactions' element={<Transactions />} />
                        <Route path='/add-trip' element={<Addtour />} />
                        <Route path='/detail-trip' element={<Detailadmin />} />
                  </Route> */}
            </Routes>
        </>
    )
}

export default App;
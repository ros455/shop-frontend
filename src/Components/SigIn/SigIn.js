import React from 'react'
import { Link } from 'react-router-dom';
import {Nav, Button} from 'react-bootstrap';
import { selectIsAuth, logout } from '../../store/auth';
import { useSelector, useDispatch } from 'react-redux';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import sigin from './sigin.css'
 function SigIn() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const [showRegistration, setShowRegistration] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);

  const handleCloseRegistration = React.useCallback(() => setShowRegistration(false),[]);
  const handleShowRegistration =  React.useCallback(() => setShowRegistration(true),[]);

  const handleCloseLogin = React.useCallback(() => setShowLogin(false),[]);
  const handleShowLogin = React.useCallback(() => setShowLogin(true),[]);

  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

    return (
      <>
      {isAuth ?
      <>
        <Nav className="sig-in-wrapper">
          <Link to='page-user'>
          <Button variant="success">Історія замовлень</Button>
          </Link>
          <Button variant="danger" onClick={onClickLogout}>
            Вийти
          </Button>
        </Nav>
        <Registration showRegistration={showRegistration} handleCloseRegistration={handleCloseRegistration} />
        <Login handleShowLogin={showLogin} handleCloseLogin={handleCloseLogin} />
      </>
    :
    <>
            <Nav className="sig-in-wrapper">
          <Button variant="success" onClick={handleShowLogin}>Вхід</Button>
          <Button variant="danger" onClick={handleShowRegistration}>
            Реєстрація
          </Button>
        </Nav>
        <Registration showRegistration={showRegistration} handleCloseRegistration={handleCloseRegistration} />
        <Login handleShowLogin={showLogin} handleCloseLogin={handleCloseLogin} />
    </>}
      </>
    );
}

export default React.memo(SigIn)
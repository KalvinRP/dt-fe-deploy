import icon from './asset/Icon.svg';
import { Container, Dropdown, Row, Col, Button, Form, Modal, Image } from 'react-bootstrap';
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from '../context/userContext';
import bill from './asset/bill.svg';
import user from './asset/user.svg';
import logout from './asset/logout.svg';
import admin from './asset/Admin Icon.png'
import journey from './asset/journey.svg';
import { redirect, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { API } from '../config/api';
import Details from './detail';

function NavbarUnlog(props) {
  let [showLog, setShowLog] = useState(false);
  let handleCloseLog = () => setShowLog(false);
  let handleShowLog = () => setShowLog(true);

  let [showReg, setShowReg] = useState(false);
  let handleCloseReg = () => setShowReg(false);
  let handleShowReg = () => setShowReg(true);

  let handleSwitchReg = (event) => {
    event.preventDefault()
    setShowLog(false)
    setShowReg(true)
  }

  let [reg, setReg] = useState(
    {
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      gender: "",
    }
  );

  let RegTyped = (e) => {
    setReg({
      ...reg,
      [e.target.name]: e.target.value,
    })
  };

  let RegSubmitted = useMutation(async (e) => {
    try {
      e.preventDefault()
      setShowReg(false)
      setShowLog(true)
      await API.post('/register', reg);
    } catch (error) {
      console.log(error)
    }
  });

  let [login, setLogin] = useState(
    {
      email: "",
      password: "",
    }
  );

  let LogTyped = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    })
  };

  const redirect = useNavigate()

  let LogSubmitted = useMutation(async (e) => {
    try {
      e.preventDefault()
      setShowLog(false)
      const logging = await API.post('/login', login)

      if (logging?.statusText === "OK") {
        props.dispatch({
          type: 'LOGIN_SUCCESS',
          payload: logging.data.data,
        })
      };
      redirect('/')
    } catch (error) {
        alert("Password or email dont match!")
        console.log(error)
    }
  });

  <Details handleShowLog={handleShowLog} />

  return (
    <>
      <Button style={{ border: 'none', backgroundColor: 'transparent' }} href='/'>
        <img
          alt="icon"
          src={icon}
          width='20%'
          style={{ position: 'absolute', top: '2vw', left: '10vw' }}
        />
      </Button>

      <Button variant='outline-light' size='lg' className='position-absolute px-5' style={{ top: '4vw', left: '70vw', }} onClick={handleShowLog}>Login</Button>
      <Button variant='warning' size='lg' className='position-absolute px-5' style={{ top: '4vw', left: '80vw', }} onClick={handleShowReg}>Register</Button>

      <Modal show={showLog} onHide={handleCloseLog}>
        <Modal.Body>
          <Modal.Title className='fw-bold mx-auto text-center fs-1 pb-2 mb-5'>Login</Modal.Title>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold fs-4">Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                onChange={LogTyped}
                className='border border-secondary'
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold fs-4">Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={LogTyped}
                className='border border-secondary'
              />
              <div className='w-100 me-0 mt-2 pe-0 d-flex'>
                <p style={{ width: '45%' }}>Don't have an account? Click</p>
                <button onClick={handleSwitchReg} style={{ border: 'none', backgroundColor: 'transparent', padding: '0px' }}>
                  <p className='fw-bold text-primary'><u>here.</u></p>
                </button>
              </div>
            </Form.Group>
          </Form>
          <Button variant="warning" onClick={(e) => LogSubmitted.mutate(e)}>
            Login
          </Button>
        </Modal.Body>
      </Modal>

      <Modal show={showReg} onHide={handleCloseReg}>
        <Modal.Body>
          <Modal.Title className='fw-bold mx-auto text-center fs-1 pb-2 mb-5'>Register</Modal.Title>
          <Form className='w-75 m-auto'>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold fs-4">Full Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                onChange={RegTyped}
                className='border border-secondary'
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold fs-4">Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                onChange={RegTyped}
                className='border border-secondary'
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold fs-4">Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                onChange={RegTyped}
                className='border border-secondary'
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold fs-4">Phone</Form.Label>
              <Form.Control
                name="phone"
                type="text"
                onChange={RegTyped}
                className='border border-secondary'
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold fs-4">Gender</Form.Label>
              <Form.Select name="gender" onChange={RegTyped}>
                <option>Choose one gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold fs-4">Address</Form.Label>
              <Form.Control as="textarea" name='address' onChange={RegTyped} rows={3} className='border border-secondary' />
            </Form.Group>
            <Button variant="warning" className='text-light text-center fw-bold p-2 w-100 my-3' onClick={(e) => RegSubmitted.mutate(e)}>
              Register
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

function NavbarLog(props) {
  let LoggingOut = () => {
    redirect('/')
    props.dispatch({
      type: 'LOGOUT',
    });
  };

  const [form, setForm] = useState({
    image: '',
    name: '',
});

  let { data: profile } = useQuery('proCache', async () => {
    const response = await API.get('/useracc');
    return response.data.data;
});

// let currentid = tripsid

useEffect(() => {
    if (profile) {
        setForm({
            ...form,
            image: profile.image,
            name: profile.name,
        });
    }
    // eslint-disable-next-line
}, [profile]);

  return (
    <>
      <Button style={{ border: 'none', backgroundColor: 'transparent' }} href={!localStorage.getItem("adminstate") ? '/' : '/transactions'}>
        <img
          alt="icon"
          src={icon}
          width='20%'
          style={{ position: 'absolute', top: '2vw', left: '10vw' }}
        />
      </Button>

      {props.state.user.role === "admin" ?

        //menu admin
        <Dropdown className='position-absolute' style={{ top: '2vw', right: '10vw' }}>
          <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ backgroundColor: 'transparent', color: 'transparent', border: 'none' }}>
            <Image roundedCircle
              alt="admin"
              src={admin}
              width="75vw"
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/detail-trip">
              <Container>
                <Row>
                  <Col className='p-0'>
                    <img
                      alt="trip"
                      src={journey}
                      height="30vw"
                    />
                  </Col>
                  <Col className='p-0 fw-bold'>Trip</Col>
                </Row>
              </Container>
            </Dropdown.Item>
            <hr />
            <Dropdown.Item onClick={LoggingOut}>
              <Container>
                <Row>
                  <Col className='p-0'>
                    <img
                      href="#logout"
                      alt="logout"
                      src={logout}
                      height="30vw"
                    />
                  </Col>
                  <Col className='p-0 fw-bold'>Logout</Col>
                </Row>
              </Container>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>


        :

        //menu user
        <Dropdown className='position-absolute' style={{ top: '2vw', right: '10vw' }}>
          <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ backgroundColor: 'transparent', color: 'transparent', border: 'none' }}>
            <img
              alt="pp"
              src={form.image}
              width="90vw"
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/profile">
              <Container>
                <Row>
                  <Col className='p-0'>
                    <img
                      alt="user"
                      src={user}
                      height="30vw"
                    />
                  </Col>
                  <Col className='p-0 fw-bold'>Profile</Col>
                </Row>
              </Container>
            </Dropdown.Item>
            <Dropdown.Item href="/payment">
              <Container>
                <Row>
                  <Col className='p-0'>
                    <img
                      alt="bill"
                      src={bill}
                      height="30vw"
                    />
                  </Col>
                  <Col className='p-0 fw-bold'>Pay</Col>
                </Row>
              </Container>
            </Dropdown.Item>
            <hr />
            <Dropdown.Item onClick={LoggingOut}>
              <Container>
                <Row>
                  <Col className='p-0'>
                    <img
                      alt="logout"
                      src={logout}
                      height="30vw"
                    />
                  </Col>
                  <Col className='p-0 fw-bold'>Logout</Col>
                </Row>
              </Container>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      }
    </>
  )
}

function Navbarcr() {
  const [state, dispatch] = useContext(UserContext);

  return (
    <>
      {!state.isLogin ? <NavbarUnlog dispatch={dispatch} state={state} /> : <NavbarLog dispatch={dispatch} state={state} />}
    </>
  )
};

export default Navbarcr;
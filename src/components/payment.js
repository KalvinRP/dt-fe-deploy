import Navbarcr from "./navbar";
import Footer from "./footer";
import icon from "./asset/Iconblack.svg";
import proof from "./asset/ProofPayment.svg";
import { Button, Card, Row, Col, Table, Modal } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { API } from "../config/api";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const paystyle = {
    body:{
        width:'100%',
        top:'150px',
        position:'absolute',
        backgroundColor:'#F1F1F1',
    },
}

function Payment() {
  const [Pay, setPay] = useState(false);
  const closePay = () => setPay(false);
  const donePay = () => setPay(true);

  let { book } = useParams()
  let { data: transaction } = useQuery('transaCache', async () => {
    const response = await API.get('/transaction/' + book)
    return response.data.data;
  });

  const [booking, setBook] = useState({
    username: "",
    gender: "",
    phone: "",
    address: "",
    tripsid: 0,
    tripsname: "",
    accomodation: "",
    transport: "",
    datetrip: "",
    status: "",
    country: "",
    day: 0,
    night: 0,
    totalprc: 0,
    qty:0,
    bookdate: "",
  })

  useEffect(() => {
    if (transaction) {
        setBook({
        ...booking,
        username: transaction.name.name,
        gender: transaction.name.gender,
        phone: transaction.name.phone,
        address: transaction.name.address,
        tripsid: transaction.trips_id,
        tripsname: transaction.trips.name,
        accomodation: transaction.trips.accomodation,
        transport: transaction.trips.transport,
        datetrip: transaction.trips.datetrip,
        status: transaction.status,
        country: transaction.trips.country.name,
        day: transaction.trips.day,
        night: transaction.trips.night,
        totalprc: transaction.totalprc,
        bookdate: transaction.bookdate,
        qty: transaction.qty,
    });
    }
    // eslint-disable-next-line
    }, [transaction]);

  let dateofbook = new Date(booking.bookdate).toDateString()

  return (
    <>
    <Navbarcr />
    <div style={paystyle.body}>
    <Card border="secondary" style={{ margin:'auto', marginTop:'7rem', width: '85rem'}}>
    <Card.Body>
    <Row>
        <Col>
            <img
            alt="icon"
            src={icon}
            height="100rem"
            />
        </Col>
        <Col style={{marginRight:'1rem'}}>
            <Card.Title style={{fontSize:'50px', fontWeight:'700', textAlign:'right',}}>Booking</Card.Title>
            <Card.Title style={{fontSize:'30px', fontWeight:'300', textAlign:'right', color:'grey'}}>{dateofbook}</Card.Title>
        </Col>
      </Row>
       <Row style={{marginTop:'3rem'}}>
        <Col style={{marginLeft:'1rem'}}>
            <h3>{booking.tripsname}</h3>
            <h5 style={{color:'grey'}}>{booking.country}</h5>
            {booking.status === "pending" ?
            <p style={{backgroundColor:'pink', width:'8rem', marginTop:'2rem', textAlign:'center', fontSize:'15px', color:'red',}}>Waiting Payment</p> :
            <p style={{backgroundColor:'#FFFF8F', width:'8rem', marginTop:'2rem', textAlign:'center', fontSize:'15px', color:'orange',}}>Waiting Approval</p>
            }
        </Col>
        <Col>
            <Table>
                <tr>
                    <td>
                      <h4 style={{padding:'0px', margin:'0px'}}>Date Trip</h4>
                      <p style={{padding:'0px', margin:'0px', color:'grey', marginBottom:'2rem',}}>{booking.datetrip}</p>
                    </td>
                    <td>
                      <h4 style={{padding:'0px', margin:'0px'}}>Duration</h4>
                      <p style={{padding:'0px', margin:'0px', color:'grey', marginBottom:'2rem',}}>{booking.day} Day {booking.night} Night</p>
                    </td>
                </tr>
                <tr>
                    <td>
                      <h4 style={{padding:'0px', margin:'0px'}}>Accomodation</h4>
                      <p style={{padding:'0px', margin:'0px', color:'grey', marginBottom:'2rem',}}>{booking.accomodation}</p>
                    </td>
                    <td>
                      <h4 style={{padding:'0px', margin:'0px'}}>Transportation</h4>
                      <p style={{padding:'0px', margin:'0px', color:'grey', marginBottom:'2rem',}}>{booking.transport}</p>
                    </td>
                </tr>
            </Table>
        </Col>
        <Col style={{display:'flex', flexDirection:'column', alignItems:'center',}}>
          <img
              alt="proof"
              src={proof}
              width="120rem"
              style={{border:'5px solid black'}}
            />
          <button style={{backgroundColor:'transparent', border:'none'}}>
            <p style={{padding:'0px', margin:'0px', color:'grey', marginBottom:'2rem',}}>upload payment proof</p>
          </button>
        </Col>
      </Row>
      <Table light hover size="sm" style={{paddingLeft:'25px', fontSize:'20px'}}>
      <thead>
        <tr style={{height:'50px'}}>
          <th style={{width:'100px',}}>No</th>
          <th style={{width:'300px',}}>Full Name</th>
          <th style={{width:'300px',}}>Gender</th>
          <th style={{width:'300px',}}>Phone</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{height:'50px'}}>
          <td>1</td>
          <td>{booking.username}</td>
          <td>{booking.gender}</td>
          <td>{booking.phone}</td>
          <td style={{textAlign:'right'}}>Qty :</td>
          <td>{booking.qty}</td>
        </tr>
        <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td style={{textAlign:'right'}}>Total :</td>
        <td className="text-danger">IDR. {booking.totalprc}</td>
        </tr>
      </tbody>
    </Table>
        </Card.Body>
      </Card>
      <br />
      <div style={{position:'relative', width:'90%'}}>
        <Button variant="warning" onClick={donePay} className="btn btn-lg px-5 float-right position-absolute end-0">PAY</Button>
      </div>
    <Footer />
    </div>

    <Modal show={Pay} onHide={closePay} centered>    
    <Modal.Body>
      <p>Your payment will be confirmed within 1 x 24 hours</p>
      <p>To see orders click Here thank you</p>
    </Modal.Body>
    </Modal>
    </>
  );
}

export default Payment;
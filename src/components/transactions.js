import Navbarcr from "./navbar";
import Footer from "./footer";
import icon from "./asset/Iconblack.svg";
import proof from "./asset/ProofPayment.svg";
// import Search from "./asset/search.svg";
import { Table, Container, Modal, Card, Row, Col } from 'react-bootstrap';
import { useState } from "react";
import { useQuery } from "react-query";
import { API } from "../config/api";

const transtyle = {
    body:{
        width:'100%',
        top:'150px',
        position:'absolute',
        backgroundColor:'#F1F1F1',
    },
}

function Transactions() {
    const [show, setShow] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);

    function showApprove(breakpoint) {
      setFullscreen(breakpoint);
      setShow(true);
    }

    const hideApprove = () => setShow(false);

    let { data: records } = useQuery('bookedCache', async () => {
      const response = await API.get('/transaction');
      return response.data.data;
    });

    let no = 1;

    // const [show, setShow] = useState(false);
    // const [fullscreen, setFullscreen] = useState(true);

    // function showApprove(breakpoint) {
    //   setFullscreen(breakpoint);
    //   setShow(true);
    // }

    // const hideApprove = () => setShow(false);

    // let { data: records } = useQuery('bookedCache', async () => {
    //   const response = await API.get('/transaction');
    //   return response.data.data;
    // });

    // let no = 1;

    // const [activeKey, setKey] = useState(1);
    // const Keyset = useMutation((id) => {
    //   setKey(id)
    //   showApprove()
    // });

    // console.log(activeKey)

    // let record = records.find(element => element.id = activeKey);
    // console.log(record)

    return(
    <>
    <Navbarcr />
    <div style={transtyle.body}>
    <Container className="mt-5 w-75">
    <h1>Incoming Transactions</h1>
    <Table variant="light" className="mt-3" striped>
      <thead className="px-3">
        <tr>
          <th className="py-4 pe-5">No</th>
          <th className="py-4 pe-3">Users</th>
          <th className="py-4 pe-3">Trip</th>
          <th className="py-4 pe-3">Order Date</th>
          <th className="py-4 pe-3">Status Payment</th>
          {/* <th className="py-4 pe-3">Proof</th> */}
        </tr>
      </thead>
      <tbody>
      {records?.map((orders) => (
        <tr>
          <td className="py-4 pe-3">{no++}</td>
          <td className="py-4 pe-3">{orders.name.name}</td>
          <td className="py-4 pe-3">{orders.trips.name}</td>
          <td className="py-4 pe-3">{new Date(orders.bookdate).toDateString()}</td>
            {
            orders.status === "pending" ?
              <td className="py-4 pe-3 fw-bold text-warning">{orders.status}</td> :
            orders.status === "Approved" ?
              <td className="py-4 pe-3 fw-bold text-success">{orders.status}</td> :
              <td className="py-4 pe-3 fw-bold text-secondary">{orders.status}</td>
            }
          {/* <td className="py-4 pe-3"><button style={{border:'none'}} onClick={showApprove}><img alt="search" src={Search} /></button></td> */}
        </tr>
        ))}
      </tbody>
    </Table>
    </Container>
    <Modal show={show} onHide={hideApprove} fullscreen={fullscreen} style={{height:'80%'}}>
    <Modal.Header closeButton>
          <Modal.Title>Approve Payment?</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Row>
            <Col>
                <img
                alt="icon"
                src={icon}
                height="100rem"
                />
            </Col>
            <Col>
                <Card.Title style={{fontSize:'50px', fontWeight:'700', textAlign:'right',}}>Booking</Card.Title>
                <Card.Title style={{fontSize:'30px', fontWeight:'300', textAlign:'right', color:'grey'}}>Saturday, 22 Juy 2020</Card.Title>
            </Col>
        </Row>
        <Row style={{marginTop:'3rem'}}>
            <Col>
                <h3>6D/4N Fun Tassie Vacation</h3>
                <h5 style={{color:'grey'}}>Australia</h5>
                <p style={{backgroundColor:'#FFFF8F', width:'8rem', marginTop:'2rem', textAlign:'center', fontSize:'15px', color:'orange',}}>Waiting Approval</p>
            </Col>
            <Col>
                <Table>
                    <tr>
                        <td>
                        <h4 style={{padding:'0px', margin:'0px'}}>Date Trip</h4>
                        <p style={{padding:'0px', margin:'0px', color:'grey', marginBottom:'2rem',}}>26 August 2020</p>
                        </td>
                        <td>
                        <h4 style={{padding:'0px', margin:'0px'}}>Duration</h4>
                        <p style={{padding:'0px', margin:'0px', color:'grey', marginBottom:'2rem',}}>6 Day 4 Night</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <h4 style={{padding:'0px', margin:'0px'}}>Accomodation</h4>
                        <p style={{padding:'0px', margin:'0px', color:'grey', marginBottom:'2rem',}}>Hotel 4 Nights</p>
                        </td>
                        <td>
                        <h4 style={{padding:'0px', margin:'0px'}}>Transportation</h4>
                        <p style={{padding:'0px', margin:'0px', color:'grey', marginBottom:'2rem',}}>Qatar Airways</p>
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
            <td>Radif Ganteng</td>
            <td>Male</td>
            <td>083896833112</td>
            <td style={{textAlign:'right'}}>Qty :</td>
            <td>1</td>
            </tr>
            <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{textAlign:'right'}}>Total :</td>
            <td className="text-danger">IDR. 12,398,000</td>
            </tr>
        </tbody>
        </Table>
        <Container className="d-flex justify-content-center mt-2">
        {/* <Button className="bg-danger text-light">Cancel</Button>
        <Button className="bg-success text-light">Approve</Button> */}
        </Container>
    </Modal.Body>
    </Modal>
    </div>
    <Footer />
    </>
  );
}

export default Transactions;
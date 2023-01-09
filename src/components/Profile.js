import phone from './asset/local_phone.svg';
import mail from './asset/local_post_office.svg';
import place from './asset/place.svg';
import propic from './asset/name.svg';
import icon from "./asset/Iconblack.svg";
import qr from './asset/qr-code .svg';
import Navbarcr from './navbar';
import Footer from './footer';
import { Card, Row, Col, Form, Table } from 'react-bootstrap';
import { useQuery, useMutation } from 'react-query';
import { API } from '../config/api';
import { useEffect, useState, useRef } from 'react';

const prostyle = {
    body:{
        width:'100%',
        top:'150px',
        position:'absolute',
        backgroundColor:'#F1F1F1',
    },
}

function Profile() {
    let { data: history, refetch } = useQuery('hisCachery', async () => {
        const response = await API.get('/account')
        return response.data.data;
      });

    let [userData, setData] = useState({})

    useEffect(() => {
        if (history) {
            setData({
                name: history[0].name.name,
                email: history[0].name.email,
                phone: history[0].name.phone,
                address: history[0].name.gender,
                image: history[0].name.image,
            })
            // eslint-disable-next-line
        }}, [history])

    // const inputRef = useRef(null)

    // const uploadPhoto = () => {
    //     inputRef.current.click();
    // }

    const [file, setFile] = useState({});
    const inputFile = useRef(null);
    console.log(file)
   
    // const handleChange = e => {
    //   setFile([...file, e.target.files[0]]);
    //   console.log(file)
    // }

    let handleChange = useMutation(async (e) => {
        try {
          e.preventDefault()
          setFile({image: e.target.files[0]});
          console.log(file)

          const config = {
            headers:{
                'Content-type':'multipart/form-data',
            },
          };
          
          await API.patch('/user', file, config)
          refetch()
        } catch (error) {
          console.log(error)
        }
      });

        
    return(
        <>
        <Navbarcr />
            <div style={prostyle.body}>
                <Card border="light" className='mx-auto mt-5 w-50'>
                    <Card.Body>
                        <Row>
                            <Col lg={8}>
                                <Card.Title className='fs-1 ms-2 fw-bold'>Personal Info</Card.Title>
                                <Table className='table table-borderless mt-4'>
                                    <tbody>
                                        <tr>
                                            <td rowSpan={2} className='m-0 p-0' style={{width:'15%'}}>
                                            <img
                                                alt='propic'
                                                src={propic}
                                                width="50rem"
                                                className='m-0'
                                            />
                                            </td>
                                            <td className='m-0 p-0 fw-bold'>{userData.name}</td>
                                        </tr>
                                        <tr>
                                            <td className='m-0 p-0 text-secondary fw-light'>Full Name</td>
                                        </tr>
                                        <tr>
                                            <td rowSpan={2} className='m-0 p-0' style={{width:'15%'}}>
                                            <img
                                                alt='mail'
                                                src={mail}
                                                width="50rem"
                                                className='m-0'
                                            />
                                            </td>
                                            <td className='m-0 p-0 fw-bold'>{userData.email}</td>
                                        </tr>
                                        <tr>
                                            <td className='m-0 p-0 text-secondary fw-light'>Email</td>
                                        </tr>
                                        <tr>
                                            <td rowSpan={2} className='m-0 p-0' style={{width:'15%'}}>
                                            <img
                                                alt='phone'
                                                src={phone}
                                                width="50rem"
                                                className='m-0'
                                            />
                                            </td>
                                            <td className='m-0 p-0 fw-bold'>{userData.phone}</td>
                                        </tr>
                                        <tr>
                                            <td className='m-0 p-0 text-secondary fw-light'>Mobile Phone</td>
                                        </tr>
                                        <tr>
                                            <td rowSpan={2} className='m-0 p-0' style={{width:'15%'}}>
                                            <img
                                                alt='place'
                                                src={place}
                                                width="50rem"
                                                className='m-0'
                                            />
                                            </td>
                                            <td className='m-0 p-0 fw-bold'>{userData.address}</td>
                                        </tr>
                                        <tr>
                                            <td className='m-0 p-0 text-secondary fw-light'>Address</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                            <Col lg={4}>
                            <img
                                alt='Avatar'
                                src={userData.image}
                                height="85%"
                                width="100%"
                                className='mx-auto px-0'
                            />
                            <button
                                    onClick={() => inputFile.current.click()}>Tes</button>
                            
                                <input
                                    type="file"
                                    onChange={(e) => handleChange.mutate(e)}
                                    ref={inputFile}
                                    hidden />
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                {history?.map((record) => (
                <div className='w-75 m-auto mt-5' key={record.id}>
                    <h1>History Trip</h1>
                            <Card border="secondary" className="m-auto mt-5">
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
                                        <Card.Title style={{fontSize:'30px', fontWeight:'300', textAlign:'right', color:'grey'}}>Saturday, 22 Juy 2020</Card.Title>
                                    </Col>
                                </Row>
                                <Row style={{marginTop:'3rem'}}>
                                    <Col style={{marginLeft:'1rem'}}>
                                        <h3>{record.trips.name}</h3>
                                        <h5 style={{color:'grey'}}>{record.trips.country.name}</h5>
                                        <p style={{backgroundColor:'#AAFF00', width:'8rem', marginTop:'2rem', textAlign:'center', fontSize:'15px', color:'green',}}>{record.status}</p>
                                    </Col>
                                    <Col>
                                        <Table>
                                            <tr>
                                                <td>
                                                <h4 style={{padding:'0px', margin:'0px'}}>Date Trip</h4>
                                                <p style={{padding:'0px', margin:'0px', color:'grey', marginBottom:'2rem',}}>{record.trips.datetrip}</p>
                                                </td>
                                                <td>
                                                <h4 style={{padding:'0px', margin:'0px'}}>Duration</h4>
                                                <p style={{padding:'0px', margin:'0px', color:'grey', marginBottom:'2rem',}}>{record.trips.day} Day {record.trips.night} Night</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                <h4 style={{padding:'0px', margin:'0px'}}>Accomodation</h4>
                                                <p style={{padding:'0px', margin:'0px', color:'grey', marginBottom:'2rem',}}>{record.trips.accomodation}</p>
                                                </td>
                                                <td>
                                                <h4 style={{padding:'0px', margin:'0px'}}>Transportation</h4>
                                                <p style={{padding:'0px', margin:'0px', color:'grey', marginBottom:'2rem',}}>{record.trips.transport}</p>
                                                </td>
                                            </tr>
                                        </Table>
                                    </Col>
                                    <Col style={{display:'flex', flexDirection:'column', alignItems:'center',}}>
                                    <img
                                        alt="qr"
                                        src={qr}
                                        width="30%"
                                        style={{border:'5px solid black'}}
                                        />
                                    <button style={{backgroundColor:'transparent', border:'none'}}>
                                        <p style={{padding:'0px', margin:'0px', marginBottom:'2rem',}}>TCK0101</p>
                                    </button>
                                    </Col>
                                </Row>
                                <Table light="true" size="sm" style={{paddingLeft:'25px', fontSize:'20px'}}>
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
                                    <td>{record.name.name}</td>
                                    <td>{record.name.gender}</td>
                                    <td>{record.name.phone}</td>
                                    <td style={{textAlign:'right'}}>Qty :</td>
                                    <td>{record.qty}</td>
                                    </tr>
                                    <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td style={{textAlign:'right'}}>Total :</td>
                                    <td className="text-danger">IDR. {record.totalprc.toLocaleString()}</td>
                                    </tr>
                                </tbody>
                                </Table>
                                    </Card.Body>
                                </Card>
                </div>
                ))}
                <Footer />
            </div>
        </>
    )
}

export default Profile;
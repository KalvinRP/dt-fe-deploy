import Footer from "./footer";
import Navbarcr from "./navbar";
import pic2 from "./asset/Tour2.svg";
import pic3 from "./asset/Tour3.svg";
import pic4 from "./asset/Tour4.svg";
import calendar from "./asset/calendar 1.svg";
import meal from "./asset/meal 1.svg";
import plane from "./asset/plane 1.svg";
import time from "./asset/time 1.svg";
import hotel from "./asset/hotel 1.svg";
import plus from "./asset/Plus.svg";
import minus from "./asset/Minus.svg";
import { Container, Row, Col, Card, CardGroup, Button, } from "react-bootstrap";
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";

const detstyle = {
    body: {
        width: '100%',
        top: '150px',
        position: 'absolute',
        backgroundColor: '#F1F1F1',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        margin: 'auto',
        marginTop: '75px',
    },
    title: {
        margin: '0px',
        fontWeight: '900',
        fontSize: '50px'
    },
    subtitle: {
        marginTop: '10px',
        fontWeight: '700',
        fontSize: '30px',
    },
    toppic: {
        width: '100%',
        height: '70%',
        padding: '10px',
    },
    botpic: {
        width: '100%',
        height: '25%',
        display: 'flex',
    },
    infocont: {
        width: '85vw',
        display: 'flex',
        justifyContent: 'space-around',
        margin: 'auto',
    },
    textinfo: {
        color: 'grey',
        fontSize: '20px',
        margin: '5px',
        marginLeft: '0px',
    },
    flexed: {
        fontSize: '18px',
        margin: '5px',
        marginLeft: '20px',
        fontWeight: '700',
    },
    desc: {
        marginBottom: '20px',
        color: 'grey',
        textAlign: 'justify',
        fontSize: '20px',
    },
    button: {
        backgroundColor: 'gold',
        width: '15vw',
        height: '110%',
        fontSize: '20px',
        color: 'white',
        fontWeight: '800',
        borderRadius: '10px',
        borderColor: 'transparent',
        padding: '15px',
        paddingRight: '30px',
        paddingLeft: '30px',
        marginTop: '30px',
        marginLeft: '75vw',
    }
}

function Details() {
    let navigate = useNavigate()

    let [order, setOrder] = useState(1)
    let addOrder = () => {
        setOrder(order + 1)
    }

    function subOrder() {
        if (order > 1) {
            setOrder(order - 1);
        }
    }

    // eslint-disable-next-line
    const [state, dispatch] = useContext(UserContext);

    // const [token, setToken] = useState(null)

    const [form, setForm] = useState({
        id: '',
        image: '',
        name: '',
        desc: '',
        price: '',
        accomodation: '',
        datetrip: '',
        day: 0,
        night: 0,
        quota: 0,
        eat: '',
        transport: '',
        country_id: 0,
    });

    let { id } = useParams()
    let { data: trips } = useQuery('tripCache', async () => {
        const response = await API.get('/trips/' + id);
        return response.data.data;
    });

    // let currentid = tripsid

    useEffect(() => {
        if (trips) {
            setForm({
                ...form,
                id: trips.id,
                image: trips.image,
                name: trips.name,
                desc: trips.desc,
                price: trips.price,
                accomodation: trips.accomodation,
                datetrip: trips.datetrip,
                day: trips.day,
                night: trips.night,
                quota: trips.quota,
                eat: trips.eat,
                transport: trips.transport,
                country_id: trips.country_id,
                country: trips.country.name,
            });
        }
        // eslint-disable-next-line
    }, [trips]);

    let totalprc = (order * form.price)
    let retotal = totalprc.toLocaleString()
    
    let intid = parseInt(id, 10)
    let intotal = parseInt(totalprc, 10)

    let trans = {
        trips_id: intid,
        totalprc: intotal,
        qty: order,
        status: "pending",
    };

    useEffect(() => {
        //change this to the script source you want to load, for example this is snap.js sandbox env
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        //change this according to your client-key
        const myMidtransClientKey = "SB-Mid-client-ywlswT2baBw2sc_j";
    
        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        // optional if you want to set script attribute
        // for example snap.js have data-client-key attribute
        scriptTag.setAttribute("data-client-key", myMidtransClientKey);
    
        document.body.appendChild(scriptTag);
        return () => {
          document.body.removeChild(scriptTag);
        };
      }, []);
    
    let transstr = JSON.stringify(trans);

    let WriteOrder = useMutation(async (e) => {
        try {
            let midresponse = await API.post('/transaction', transstr)
            console.log(midresponse)
            let token = midresponse.data.data.token

            window.snap.pay(token, {
                onSuccess: function (result) {
                  console.log(result);
                  navigate("/profile");
                },
                onPending: function (result) {
                  console.log(result);
                  navigate("/profile");
                },
                onError: function (result) {
                  console.log(result);
                },
                onClose: function () {
                  alert("you closed the popup without finishing the payment");
                },
              });
        } catch (error) {
            console.log(error)
        }
    });


    return (
        <>
            <Navbarcr />
            <div style={detstyle.body}>
                <div style={detstyle.container}>
                    <div>
                        <p style={detstyle.title}>{form.name}</p>
                    </div>
                    <div>
                        <p style={{ ...detstyle.subtitle, color: 'grey' }}>{form.country}</p>
                    </div>
                </div>
                {/* <div style={detstyle.container}> */}
                <Container className="mt-3">
                    <Card className='w-75 m-auto'>
                        <Card.Img src={form.image} unselectable="on" />
                    </Card>
                    {/* <div style={detstyle.botpic}> */}

                    <CardGroup className='w-75 m-auto'>
                        <Card>
                            <Card.Img variant="top" src={pic2} />
                        </Card>
                        <Card>
                            <Card.Img variant="top" src={pic3} />
                        </Card>
                        <Card>
                            <Card.Img variant="top" src={pic4} style={{ opacity: '0.3' }} />
                            <Card.ImgOverlay className="my-5">
                                <Card.Title className="fw-bold text-center">View More</Card.Title>
                                <Card.Text className="fs-1 fw-bold m-auto text-center"> +5 </Card.Text>
                            </Card.ImgOverlay>
                        </Card>
                    </CardGroup>
                </Container>
                <div style={{ width: '80%', margin: 'auto' }}>
                    <p style={{ ...detstyle.subtitle, marginTop: '5vh', marginBottom: '20px' }}>Trip Information</p>
                    <div style={detstyle.infocont}>
                        <div style={{ width: '100%' }}>
                            <p style={detstyle.textinfo}>Accomodation</p>
                            <div style={{ display: 'flex', width: '100%' }}>
                                <img
                                    alt='Hotel'
                                    src={hotel}
                                    width="10%"
                                // objectFit="cover"
                                />
                                <p style={detstyle.flexed}>{form.accomodation}</p>
                            </div>
                        </div>

                        <div style={{ width: '100%' }}>
                            <p style={detstyle.textinfo}>Transportation</p>
                            <div style={{ display: 'flex', width: '100%' }}>
                                <img
                                    alt='Plane'
                                    src={plane}
                                    width="10%"
                                // objectFit="cover"
                                />
                                <p style={detstyle.flexed}>{form.transport}</p>
                            </div>
                        </div>

                        <div style={{ width: '100%' }}>
                            <p style={detstyle.textinfo}>Eat</p>
                            <div style={{ display: 'flex', width: '100%' }}>
                                <img
                                    alt='Meal'
                                    src={meal}
                                    width="10%"
                                // objectFit="cover"
                                />
                                <p style={detstyle.flexed}>{form.eat}</p>
                            </div>
                        </div>

                        <div style={{ width: '100%' }}>
                            <p style={detstyle.textinfo}>Duration</p>
                            <div style={{ display: 'flex', width: '100%' }}>
                                <img
                                    alt='Hour'
                                    src={time}
                                    width="10%"
                                // objectFit="cover"
                                />
                                <p style={detstyle.flexed}>{form.day} Days {form.night} Nights</p>
                            </div>
                        </div>

                        <div style={{ width: '100%' }}>
                            <p style={detstyle.textinfo}>Trip Date</p>
                            <div style={{ display: 'flex', width: '100%' }}>
                                <img
                                    alt='Calendar'
                                    src={calendar}
                                    width="10%"
                                // objectFit="cover"
                                />
                                <p style={detstyle.flexed}>{form.datetrip}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ width: '80%', margin: 'auto' }}>
                    <p style={{ ...detstyle.subtitle, marginTop: '5vh', marginBottom: '20px' }}>Description</p>
                    <p style={detstyle.desc}>
                        {form.desc}
                    </p>
                </div>
                <div>
                    <Container>
                        <Row>
                            <Col xs={2} className="me-0 px-0">
                                <p className="text-warning fs-3 fw-bold">IDR {form.price.toLocaleString()}</p>
                            </Col>
                            <Col xs={8} className="px-0">
                                <p className="text-secondary fs-5 mt-3">/ Person</p>
                            </Col>
                            <Col xs={1} className="me-0 px-0" style={{ width: '2rem' }}>
                                <button onClick={subOrder} style={{ border: 'none', }}>
                                    <img
                                        alt='Minus'
                                        src={minus}
                                        width="30px"
                                    />
                                </button>
                            </Col>
                            <Col xs={1} className="me-0 px-0">
                                <p className="fs-2 px-5 m-0 p-0">{order}</p>
                            </Col>
                            <Col xs={1} className="me-0 px-0" style={{ width: '2rem' }}>
                                <button onClick={addOrder} style={{ border: 'none', }}>
                                    <img
                                        alt='Plus'
                                        src={plus}
                                        width="30px"
                                    />
                                </button>
                            </Col>
                        </Row>
                        <Row>
                            <hr />
                            <Col xs={9}>
                                <p style={{ fontSize: '30px', fontWeight: '700', width: '80%' }}>Total:</p>
                            </Col>
                            <Col>
                                <p className="text-warning fs-3 ms-5 ps-3 fw-bold">IDR. {retotal}</p>
                            </Col>
                            <hr />
                        </Row>
                    </Container>
                </div>

                {
                    state.isLogin === true &&
                    <Button variant="warning" className="text-light text-center fw-bold p-2 w-25 my-3 position-absolute start-50 translate-middle-x" onClick={(e) => WriteOrder.mutate(e)}>
                        BOOK NOW
                    </Button>
                }

                <Footer />
            </div>
        </>
    );
}

export default Details;
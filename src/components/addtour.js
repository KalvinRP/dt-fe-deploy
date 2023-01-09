import Navbarcr from "./navbar";
import Footer from "./footer";
import Trash from "./asset/trash.png"
import { Container, Button, Form, Row, Col, Modal, Table } from 'react-bootstrap';
import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const formtour = {
    body:{
        width:'100%',
        top:'150px',
        position:'absolute',
        backgroundColor:'#F1F1F1',
    },
}

function Addtour() {
    let [showCountry, setshowCountry] = useState(false);
    let handleShowCountry = () => setshowCountry(true)
    let handleHideCountry = () => {
      setshowCountry(false)
      setEdit(false)
      setEntry({})
      setEditing(null)
    }

    let { data: country, refetch } = useQuery('countriesCache', async () => {
        const response = await API.get('/country');
        return response.data.data;
      });

      let [entry, setEntry] = useState({});
      let [edit, setEdit] = useState(false);
      let [editing, setEditing] = useState(null);
    
      let newCountry = (e) => {
        setEntry({
          name: e.target.value,
        })
      };

      let handleEdit = (e) => {
        if (e.key === "Enter") {
          e.preventDefault()
          EditCountry.mutate(e)
          setEdit(false)
          }
        if (e.key === "Escape") {
          e.preventDefault()  
          setEdit(false)
        }
      }
    
      let EditCountry = useMutation(async () => {
        try {
          await API.patch('/country/' + editing, entry);
          refetch();
        } catch (error) {
          console.log(error)
        }
      });

      let AddCountry = useMutation(async (e) => {
        try {
          e.preventDefault()
          await API.post('/country', entry);
          refetch();
        } catch (error) {
          console.log(error)
        }
      });

      const deleteById = useMutation(async (id) => {
        try {
          await API.delete('/country/' + id);
          refetch();
        } catch (error) {
          console.log(error);
        }
      });

      let [trip, setTrip] = useState(
        {
            name:"",
            desc:"",
            price:"",
            accomodation:"",
            transport:"",
            eat:"",
            datetrip:"",
            image:"",
            quota:0,
            day:0,
            night:0,
            country_id:0,
        }
      );
    
      let TripTyped = (e) => {
        setTrip({
          ...trip,
          [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        })
      };

      let redirect = useNavigate()

      let TripSubmitted = useMutation(async (e) => {
        try {
          e.preventDefault()

          const config = {
            headers:{
                'Content-type':'multipart/form-data',
            },
          };

          const formData = new FormData();
          formData.set('name', trip.name);
          formData.set('accomodation', trip.accomodation);
          formData.set('datetrip', trip.datetrip);
          formData.set('day', parseInt(trip.day, 10));
          formData.set('night', parseInt(trip.night, 10));
          formData.set('desc', trip.desc);
          formData.set('eat', trip.eat);
          formData.set('transport', trip.transport);
          formData.set('quota', trip.quota);
          formData.set('price', trip.price);
          formData.set('country_id', trip.country_id);
          formData.set('image', trip.image[0]);
          
          await API.post('/trips', formData, config)
          redirect('/detail-trip')
        } catch (error) {
          console.log(error)
        }
      });

    return(
        <>
        <Navbarcr />
        <div style={formtour.body}>
        <Container className="mt-5 w-75">
            <h1 className="mb-5">Add Trip</h1>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Title Trip</Form.Label>
                    <Form.Control name="name" onChange={TripTyped} type="text" style={{backgroundColor:'#C4C4C4'}} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Country</Form.Label>
                    <div style={{display:'flex'}}>
                    <Form.Select name="country_id" onChange={TripTyped} style={{backgroundColor:'#C4C4C4', width:'85%'}}>
                            <option>Choose country</option>
                        {country?.map((things) => (
                            <option key={things.id} value={things.id}>{things.name}</option>
                            ))}
                    </Form.Select>
                    {/* <Form.Control type="text" placeholder="or add new country" style={{backgroundColor:'#C4C4C4', width:'85%'}} /> */}
                    <Button variant="secondary" onClick={handleShowCountry} style={{width:'15%'}}>
                        Edit country
                    </Button>
                    </div>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Accomodation</Form.Label>
                    <Form.Control type="text" name="accomodation" onChange={TripTyped} style={{backgroundColor:'#C4C4C4'}} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Transportation</Form.Label>
                    <Form.Control type="text" name="transport" onChange={TripTyped} style={{backgroundColor:'#C4C4C4'}} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Eat</Form.Label>
                    <Form.Control type="text" name="eat" onChange={TripTyped} style={{backgroundColor:'#C4C4C4'}} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Duration</Form.Label>
                    <Container className="ps-0">
                        <Row>
                            <Col xs={2}>
                                <Form.Control name="day" onChange={TripTyped} type="number" style={{backgroundColor:'#C4C4C4'}} />
                            </Col>
                            <Col xs={1}>
                                <Form.Label className="fw-bold">Day</Form.Label>
                            </Col>
                            <Col xs={2}>
                                <Form.Control name="night" onChange={TripTyped} type="number" style={{backgroundColor:'#C4C4C4'}} />
                            </Col>
                            <Col xs={1}>
                                <Form.Label className="fw-bold">Night</Form.Label>
                            </Col>
                        </Row>
                    </Container>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Date Trip</Form.Label>
                    <Form.Control type="date" name="datetrip" onChange={TripTyped} style={{backgroundColor:'#C4C4C4'}} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Price</Form.Label>
                    <Form.Control type="text" name="price" onChange={TripTyped} style={{backgroundColor:'#C4C4C4'}} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Quota</Form.Label>
                    <Form.Control type="number" name="quota" onChange={TripTyped} style={{backgroundColor:'#C4C4C4'}} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Description</Form.Label>
                    <Form.Control
                     name="desc"
                     as="textarea"
                     onChange={TripTyped}
                     style={{ height:'100px', backgroundColor:'#C4C4C4' }}
                     />
                </Form.Group>

                <Form.Group className="mb-3 w-25">
                    <Form.Label className="fw-bold">Image</Form.Label>
                    <Form.Control type="file" name="image" onChange={TripTyped} style={{backgroundColor:'#C4C4C4'}} />
                </Form.Group>

                <Container className="mt-5">
                <Button variant="warning" type="submit" onClick={(e) => TripSubmitted.mutate(e)} className="d-flex justify-content-center m-auto w-25 fw-bold text-light">
                    Add Trip
                </Button>
                </Container>
    </Form>
        </Container>
            <Footer />

        
            <Modal show={showCountry} onHide={handleHideCountry}>
                <Modal.Body>
                <Modal.Title className='fw-bold mx-auto text-center fs-1 pb-2 mb-2'>Edit Country</Modal.Title>
                <Table>
                <thead>
                    <tr>
                    <th className="w-75 fs-4">Added Countries</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                {country?.map((things) => (
                    <tr key={things.id}>
                    { edit && editing === things.id ?
                    <td>
                        <Form.Control defaultValue={things.name} onChange={newCountry} autoFocus={true} onKeyDown={handleEdit} style={{backgroundColor:'#C4C4C4', width:'85%', height:'50%'}} />
                        <p style={{color:"red", fontSize:"12px", marginBottom:"0px"}}>Press Enter to keep changes or Esc to exit</p>
                    </td> :
                    <td onClick={() => {setEdit(true); setEditing(things.id)}}>{things.name}</td>}
                    <td className="p-0">
                    <Button onClick={() => deleteById.mutate((things.id))} className="p-0" style={{border: 'none', backgroundColor: 'transparent'}}>
                        <img
                        alt="trash"
                        src={Trash}
                        width='15%'
                        />
                    </Button>
                    </td>
                    </tr>
                ))}
                    <tr>
                    <td><Form.Control type="text" autoFocus placeholder="or add new country" onChange={newCountry} style={{backgroundColor:'#C4C4C4', width:'85%'}} disabled={edit ? true : false} /></td>
                    <td>
                    <Button variant="success" className='text-light text-center w-100' onClick={(e) => AddCountry.mutate(e)} disabled={edit ? true : false}>
                          Add
                    </Button>
                    </td>
                    </tr>
                    {/* <tr> */}
                    {/*<td>Jacob</td>
                    <td>Thornton</td>
                    </tr>
                    <tr>
                    <td>Larry the Bird</td>
                    <td>1 of 3</td>
                    </tr> */}
                </tbody>
                </Table>
                </Modal.Body>
            </Modal>
        </div>
        </>
    )
}

export default Addtour;
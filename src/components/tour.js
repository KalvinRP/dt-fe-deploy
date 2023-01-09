import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { useQuery } from 'react-query';
import { API } from '../config/api';

const styleTour = {
    title:{
        marginTop:'100px',
        marginBottom:'30px',
        fontSize:'50px',
        textAlign:'center',
    },
    container:{
        backgroundColor:'#F1F1F1',
        display:'flex',
        justifyContent:'space-around',
        flexWrap:'wrap',
        width:'100%',
        marginTop:'20px'
    },
    card:{
        width:'25vw',
        height:'50vh',
        backgroundColor:'white',
        borderRadius:'20px',
        position:'relative',
    },
    number:{
        position:'absolute',
        marginTop:'30px',
        backgroundColor:'white',
        padding:'10px',
        paddingRight:'30px',
        textAlign:'right',
        right:'5px',
        borderRadius:'10px',
        fontSize:'20px',
        fontWeight:'700',
    },
    img:{
        margin:'1vw',
        paddingTop:'10px',
    },
    texts:{
        margin:'1vw',
        marginTop:'0px',
        display:'flex',
        justifyContent:'space-between',
    },
    destination:{
        textAlign:'center',
        margin:'10px',
        fontSize:'25px',
    },
    price:{
        color:'gold',
        fontWeight:'700',
        margin:'0px',
        fontSize:'25px',
    },
    country:{
        color:'grey',
        fontweight:'700',
        margin:'0px',
        fontSize:'25px',
    }
}

// const stilldetails = [
//     {
//         stock: "12/15",
//         alt: {Tour1},
//         title: "6D/4N Fun Tassie Vacation ...",
//         price: "IDR. 12,398,000",
//         country: "Australia",
//     },
//     {
//         stock: "14/15",
//         alt: {Tour2},
//         title: "6D/4N Exciting Summer in ...",
//         price: "IDR. 10,288,000",
//         country: "South Korea",
//     },
// ]


function Tour(props) {
    // eslint-disable-next-line
    const [state, dispatch] = useContext(UserContext);
    
    let { data: trips } = useQuery('tripsCache', async () => {
        const response = await API.get('/trips');
        return response.data.data;
    });
    
    //   let priced = trips?.price.toLocaleString()
    //   console.log(trips)

    return(
        <>
        {state.user.role === 'admin' ?
            <div className='w-75 m-auto d-flex justify-content-between h-25'>
            <h1 className='mt-5' style={styleTour.title}>Income Trip</h1>
            <Button variant="warning" href='/add-trip' className="my-auto fw-bold text-light fs-5" style={{height:'50px'}} >
                    Add Trip
            </Button>
            </div> :
            <h1 style={styleTour.title}>Group Tour</h1>
        }

            <div className='d-flex flex-wrap-reverse bg-transparent justify-content-around align-items-center position-relative mt-3'>
                {trips?.map((tour) => (
                    <Link to={`/details/${tour.id}`} key={tour.id} className='text-decoration-none text-dark'>
                    <div className='bg-white rounded position-relative px-2 pt-1 my-4'>
                    <p className='position-absolute bg-white top-0 end-0 mt-5 me-4 px-2 py-1 rounded fs-5'>{tour.quota}/{tour.quota}</p>
                        <div style={styleTour.img}>
                            <img
                            alt="what"
                            src={tour.image}
                            height="200vh"
                            width="300vw"
                            position="relative"
                            />
                    </div>
                       <h1 className='text-center fs-3 mt-3'>{tour.name}</h1>
                        <div className='d-flex justify-content-between mx-3'>
                            <p style={styleTour.price}>IDR {tour.price.toLocaleString()}</p>
                            <p className='text-secondary fs-4'>{tour.country.name}</p>
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default Tour;
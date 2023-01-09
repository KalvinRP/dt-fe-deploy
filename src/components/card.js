import Guarantee from './asset/Guarantee.svg'
import Heart from './asset/Heart.svg'
import Agent from './asset/Agent.svg'
import Support from './asset/Support.svg'

const cardstyle = {
    container:{
        marginTop : "-60px",
        display:'flex',
        justifyContent:'space-evenly',
        flexWrap:'wrap',
        width:'100vw',
    },
    card:{
        width:'15vw',
        height:'50vh',
        backgroundColor:'white',
        top:'550px',
        left:'60px',
        borderRadius:'20px'
    },
    img:{
        width:'10vw',
        height:'10vw',
        margin:'auto',
        marginTop:'45px'
    },
    context:{
        width:'10vw',
        margin:'auto',
        marginTop:'25px'
    },
    title:{
        textAlign:'center',
        fontSize:'25px',
    },
    text:{
        marginTop:'30px',
        color:'grey',
        textAlign:'center',
    }
}

function Cards() {
    return(
        <>
        <div style={cardstyle.container}>
            <div style={cardstyle.card}>
                <div style={cardstyle.img}>
                    <img
                    alt='Guarantee'
                    src={Guarantee}
                    width="100%"
                    height="100%"
                    position="relative"
                    // objectFit="cover"
                    />
                </div>
                <div style={cardstyle.context}>
                <h1 style={cardstyle.title}>Best Price Guarantee</h1>
                <p style={cardstyle.text}>A small river named Duren flows by their place and supplies</p>
                </div>
            </div>
            <div style={cardstyle.card}>
                <div style={cardstyle.img}>
                    <img
                    alt='Heart'
                    src={Heart}
                    height="100%"
                    width="100%"
                    position="relative"
                    // objectFit="cover"
                    />
                </div>
                <div style={cardstyle.context}>
                <h1 style={cardstyle.title}>Travellers Loves Us</h1>
                <p style={cardstyle.text}>A small river named Duren flows by their place and supplies</p>
                </div>
            </div>
            <div style={cardstyle.card}>
                <div style={cardstyle.img}>
                    <img
                    alt='Agent'
                    src={Agent}
                    height="100%"
                    width="100%"
                    position="relative"
                    // objectFit="cover"
                    />
                </div>
                <div style={cardstyle.context}>
                <h1 style={cardstyle.title}>Best Travel Agent</h1>
                <p style={cardstyle.text}>A small river named Duren flows by their place and supplies</p>
                </div>
            </div>
            <div style={cardstyle.card}>
                <div style={cardstyle.img}>
                    <img
                    alt='Support'
                    src={Support}
                    height="100%"
                    width="100%"
                    position="relative"
                    // objectFit="cover"
                    />
                </div>
                <div style={cardstyle.context}>
                <h1 style={cardstyle.title}>Our Dedicated Support</h1>
                <p style={cardstyle.text}>A small river named Duren flows by their place and supplies</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Cards;
// import Leaf from './asset/LeafFooter.png'

const myfoot = {
    endbar:{
        backgroundColor:'gold',
        width:'100%',
        height:'8vh',
        marginTop:'100px',
    },
    copyright:{
        color:'white',
        textAlign:'center',
        margin:'0px',
        paddingTop:'15px',
        fontSize:'20px',
        fontWeight:'500'
    }
}

function Footer() {
    return(
        <>
        <div style={myfoot.endbar}>
            <p style={myfoot.copyright}>Copyright @ 2020 Dewe Tour - Your Name - NIS. All Rights reserved</p>
        </div>
        {/* <div style={{zIndex: '1', float:'right', position:'relative', top:'-170px',}}>
        <img
            alt='Leaf'
            src={Leaf}
            height="100%"
            width="100%"
            objectFit="cover"
            position="absolute"
            />
            </div> */}
        </>
    )
}

export default Footer;
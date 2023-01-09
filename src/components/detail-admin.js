import Navbarcr from "./navbar";
import Footer from "./footer";
import Tour from "./tour";

const detstyle = {
    body:{
        width:'100%',
        top:'150px',
        position:'absolute',
        backgroundColor:'#F1F1F1',
    },
}

export default function Detailadmin() {
    return(
        <>
            <Navbarcr />
            <div style={detstyle.body}>
                <Tour />
                <Footer />
            </div>
        </>
    )
}
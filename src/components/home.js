import Navbarcr from "./navbar";
import Header from "./header";
import Cards from "./card";
import Tour from "./tour";
import Footer from "./footer";
// import Profile from "./Profile"
// import Hibiscus from "./asset/Hibiscus1.svg";
// import Palm from "./asset/Palm1.svg";

function Component() { 
  return (
    <>
    <div style={{backgroundColor:'#F1F1F1'}}>
      <Navbarcr />
      <Header />
       {/* <img
        alt='Hibiscus'
        src={Hibiscus}
        width="10%"
        position="absolute"
        objectFit="cover"
        style={{zIndex:'-1'}}
        />
       <img
        alt='Palm'
        src={Palm}
        width="10%"
        position="absolute"
        objectFit="cover"
        style={{zIndex:'-1'}}
        /> */}
      <Cards />
      <Tour />
      <Footer />
    </div>
    </>
  );
}

// Create a new component here

export default Component;
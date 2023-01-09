const style = {
  mainmaintitle: {
    position:'absolute',
    top: '160px',
    left: '10vw',
  },
  maintitle: {
    fontWeight:'bold',
    fontSize:'60px',
    color:'white',
    marginBottom:'0',
  },
  title: {
    margin:'0',
    fontWeight:'10',
    fontSize:'60px',
    color:'white',
  },
  search: {
    position:'absolute',
    top: '380px',
    left: '10vw',
  },
  searchtitle: {
    color:'white',
    fontSize:'25px',
    marginBottom:'10px',
  },
  searchbar: {
    width:'68vw',
    height:'100%',
    fontSize:'20px',
    borderRadius:'10px 0px 0px 10px',
    borderColor:'transparent',
    paddingLeft: '10px',
  },
  searchbutt: {
    backgroundColor:'gold',
    width:'10vw',
    height:'100%',
    fontSize:'25px',
    color:'white',
    fontWeight:'800',
    borderRadius:'0px 10px 10px 0px',
    borderColor:'transparent',
  }
}

function Header() {
  return (
    <>
      <div style={style.mainmaintitle}>
          <p style={style.maintitle}>Explore</p>
          <p style={style.title}>your amazing city together</p>
      </div>
      <div style={style.search}>
          <p style={style.searchtitle}>Find great places for holiday!</p>
          <form style={{display:'flex', height:'3vw'}}>
          <input type='text' placeholder='Look for historical monuments, beaches, landmarks, and many more!' style={style.searchbar}></input>
          <button type='submit' style={style.searchbutt}>Search</button>
          </form>
      </div>
    </>
  );
}

export default Header;
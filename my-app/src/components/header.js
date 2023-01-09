import icon from './asset/Icon.png'
const style = {
  navbarbg: {
    backgroundColor:"white",
  },
  loginbutt: {
    backgroundColor:"transparent",
    borderColor:"white",
  },
  regisbutt: {
    backgroundColor:"yellow",
    borderColor:"yellow",
  }
}

function Header() {
  return (
    <>
      <Navbar style={style.navbarbg}>
        <Container>
            <img
              href="#home"
              alt="icon"
              src={icon}
              width="100"
              className="d-inline-block align-top"
            />{' '}
            <Button style={loginbutt} href='#login'>Login</Button>{' '}
            <Button style={regisbutt} href='#register'>Register</Button>{' '}
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom'

const NavbarC = () => {
  const navigate = useNavigate()
  const token = JSON.parse(sessionStorage.getItem('token'))
  const rol = JSON.parse(sessionStorage.getItem('rol'))

  const logoutUser = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('rol')
    sessionStorage.removeItem('idUsuario')

    setTimeout(() => {
      navigate('/')
    }, 500);
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <NavLink to={token && rol === 'admin' ? "/admin" : token && rol === 'usuario' ? '/user' : '/'} className={'nav-link fs-3'}>Logo</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to={token && rol === 'admin' ? "/admin" : token && rol === 'usuario' ? '/user' : '/'} className={'nav-link'}>Inicio</NavLink>
            {
              rol !== 'admin'
                ?
                rol === 'usuario'
                  ?
                  <>
                    <NavLink to="/about" className={'nav-link'}>Sobre Nosotros</NavLink>
                    <NavLink to="/contact" className={'nav-link'}>Contacto</NavLink>
                    <NavLink to="/user-fav" className={'nav-link'}>Favoritos</NavLink>
                    <NavLink to="/user-cart" className={'nav-link'}>Carrito</NavLink>
                  </>
                  :
                  <>
                    <NavLink to="/about" className={'nav-link'}>Sobre Nosotros</NavLink>
                    <NavLink to="/contact" className={'nav-link'}>Contacto</NavLink>
                  </>
                :
                <>
                  <NavLink to="/adminUsers" className={'nav-link'}>Panel Usuarios</NavLink>
                  <NavLink to="/adminProducts" className={'nav-link'}>Panel Productos</NavLink>
                </>
            }
          </Nav>
          {
            token ?
              <Nav className="ms-auto">
                <NavLink to="#" className={'nav-link'} onClick={logoutUser}>Cerrar Sesion</NavLink>
              </Nav>
              :
              <Nav className="ms-auto">
                <NavLink to="/login" className={'nav-link'}>Iniciar Sesion</NavLink>
                <NavLink to="/register" className={'nav-link'}>Registrarse</NavLink>
              </Nav>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarC


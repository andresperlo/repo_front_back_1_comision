import { useNavigate } from "react-router-dom"


const PrivateRoute = ({ children, rolRuta }) => {
  const navigate = useNavigate()
  const token = JSON.parse(sessionStorage.getItem('token')) || ''
  const rolUsuario = JSON.parse(sessionStorage.getItem('rol')) || ''

  if (!token) {
    setTimeout(() => {
      navigate('/')
    }, 500);
  } else {
    if (rolRuta === rolUsuario) {
      return children
    } else {
      setTimeout(() => {
        navigate('/user')
      }, 500);
    }
  }


}

export default PrivateRoute
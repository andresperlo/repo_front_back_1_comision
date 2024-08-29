import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import clienteAxios from '../helpers/axios';
import { useNavigate } from 'react-router-dom';

const FormC = ({ idPage }) => {
  const navigate = useNavigate()
  const [formRegister, setFormRegister] = useState({})
  const [formLogin, setFormLogin] = useState({})

  const handleChangeRegister = (ev) => {
    setFormRegister({ ...formRegister, [ev.target.name]: ev.target.value })
  }

  const handleChangeLogin = (ev) => {
    setFormLogin({ ...formLogin, [ev.target.name]: ev.target.value })
  }

  const handleClickRegister = async (ev) => {
    ev.preventDefault()
    const { usuario, email, contrasenia, rcontrasenia } = formRegister

    if (!usuario || !contrasenia || !rcontrasenia) {
      alert('Algun campo esta vacio')
    }

    if (contrasenia === rcontrasenia) {
      const result = await clienteAxios.post('/usuarios', {
        nombreUsuario: usuario,
        emailUsuario: email,
        contrasenia
      })
      if (result.status === 201) {
        alert(`${result.data.msg}`)
        setTimeout(() => {
          navigate('/login')
        }, 1000)
      }
    } else {
      alert('Las contraseñas no coinciden')
    }
  }

  const handleClickLogin = async (ev) => {
    ev.preventDefault()
    const { usuario, contrasenia } = formLogin

    if (!usuario || !contrasenia) {
      alert('Algun campo esta vacio')
    }

    const result = await clienteAxios.post('/usuarios/login', {
      nombreUsuario: usuario,
      contrasenia
    })

    if (result.status === 200) {
      console.log(result)
      alert(`${result.data.msg}`)
      sessionStorage.setItem('token', JSON.stringify(result.data.token))
      sessionStorage.setItem('rol', JSON.stringify(result.data.rol))
      sessionStorage.setItem('idUsuario', JSON.stringify(result.data.idUsuario))
      if(result.data.rol === 'usuario'){
        setTimeout(() => {
          navigate('/user')
        }, 1000)
      }else{
        setTimeout(() => {
          navigate('/admin')
        }, 1000)
      }
    }
  }

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Usuario</Form.Label>
        <Form.Control type="text" placeholder="Usuario" name='usuario' onChange={idPage === 'register' ? handleChangeRegister : handleChangeLogin} />
      </Form.Group>
      {
        idPage === 'register' &&
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name='email' onChange={handleChangeRegister} />
        </Form.Group>
      }

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" placeholder="Password" name='contrasenia' onChange={idPage === 'register' ? handleChangeRegister : handleChangeLogin} />
      </Form.Group>


      {
        idPage === 'register' &&
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Repetir Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Password" name='rcontrasenia' onChange={handleChangeRegister} />
        </Form.Group>
      }

      <Button variant="primary" type="submit" onClick={idPage === 'register' ? handleClickRegister : handleClickLogin}>
        {
          idPage === 'register' ? 'Enviar Datos' : 'Ingresar'
        }
      </Button>
    </Form>
  )
}

export default FormC
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import clienteAxios, { configHeaders, configHeadersImage } from '../helpers/axios';
import { useState } from 'react';

const TableC = ({ array, idPage, set, setIsLoading }) => {
  const [show, setShow] = useState(false);
  const [productInfo, setProductInfo] = useState(null)
  const [userInfo, setUserInfo] = useState(null)
  const [image, setImage] = useState(null)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const deleteProduct = async (idProduct) => {
    const confirmDeleteProduct = confirm('Estas seguro de que quieres eliminar a este producto?')

    if (confirmDeleteProduct) {
      const result = await clienteAxios.delete(`/productos/${idProduct}`, configHeaders)
      console.log(result)
      set(result.data.productos)
      setIsLoading(false)
    }
  }

  const enableProduct = async (idProduct) => {
    const confirmEnableProduct = confirm('Estas seguro de que quieres habilitar a este producto?')

    if (confirmEnableProduct) {
      const result = await clienteAxios.put(`/productos/habilitar/${idProduct}`, {}, configHeaders)
      console.log(result)
    }
  }


  const disabledProduct = async (idProduct) => {
    const confirmdisabledProduct = confirm('Estas seguro de que quieres deshabilitar a este producto?')

    if (confirmdisabledProduct) {
      const result = await clienteAxios.put(`/productos/deshabilitar/${idProduct}`, {}, configHeaders)
      console.log(result)
    }
  }

  const handleInfoProduct = (product) => {
    handleShow()
    setProductInfo(product)
  }

  const handleInfoUser = (user) => {
    console.log(user)
    handleShow()
    setUserInfo(user)
  }


  const handleChageProductInfo = (ev) => {
    setProductInfo({ ...productInfo, [ev.target.name]: ev.target.value })
  }

  const handleChageUserInfo = (ev) => {
    setUserInfo({ ...userInfo, [ev.target.name]: ev.target.value })
  }


  const handleClickProductInfo = async (ev) => {
    ev.preventDefault()
    const result = await clienteAxios.put(`/productos/${productInfo._id}`, productInfo, configHeaders)

    if (result.status === 200) {
      if (image) {
        const formData = new FormData()
        formData.append('imagen', image)
        const result = await clienteAxios.post(`/productos/agregarImagen/${productInfo._id}`, formData, configHeadersImage)
        if (result.status === 200) {
          alert(`${result.data.msg}`)
          handleClose()
        }
      } else {
        alert(`${result.data.msg}`)
        handleClose()
      }
    }
  }

  const deleteUser = async (idUser) => {
    const confirmDeleteUser = confirm('Estas seguro de que quieres eliminar a este usuario?')

    if (confirmDeleteUser) {
      const result = await clienteAxios.delete(`/usuarios/${idUser}`, configHeaders)
      console.log(result)
      set(result.data.usuarios)
      setIsLoading(false)
    }
  }

  const enableUser = async (idUser) => {
    const confirmEnableUser = confirm('Estas seguro de que quieres habilitar a este usuario?')

    if (confirmEnableUser) {
      const result = await clienteAxios.put(`/usuarios/habilitar/${idUser}`, {}, configHeaders)
      console.log(result)
    }
  }


  const disabledUser = async (idUser) => {
    const confirmdisabledProduct = confirm('Estas seguro de que quieres deshabilitar a este usuario?')

    if (confirmdisabledProduct) {
      const result = await clienteAxios.put(`/usuarios/deshabilitar/${idUser}`, {}, configHeaders)
      console.log(result)
    }
  }

  const handleClickUserInfo = async (ev) => {
    ev.preventDefault()

    if (userInfo.rol !== 'admin' && userInfo.rol !== 'usuario') {
      return alert('ERROR. Rol permitido: USUARIO o ADMIN')
    }

    const result = await clienteAxios.put(`/usuarios/${userInfo._id}`, userInfo, configHeaders)

    if (result.status === 200) {
      alert(`${result.data.msg}`)
      handleClose()
    }

  }

  const handleClicDelCart = async(idProduct) => {
    const confirmDelProductCart = confirm('Estas seguro de que quieres eliminar a este producto del Carrito?')

    if(confirmDelProductCart){
      const result = await clienteAxios.delete(`/productos/borrarProdCart/${idProduct}`, configHeaders)
      console.log(result)
    }
  }


  return (
    <Table striped bordered hover>
      <thead>
        {
          idPage === 'adminProducts' || idPage === 'userCart'
            ?
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Imagen</th>
              <th>Opciones</th>
            </tr>
            :
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Role</th>
              <th>Opciones</th>
            </tr>
        }
      </thead>
      <tbody>
        {
          idPage === 'adminProducts' || idPage === 'userCart'
            ?
            array.map((product) =>
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.nombre}</td>
                <td>{product.precio}</td>
                <td className='text-center'>
                  <img src={product.imagen} alt="" width={'50'} />
                </td>
                <td className='d-flex justify-content-evenly'>
                  {
                    idPage === 'adminProducts'
                      ?
                      <>
                        <Button variant="warning" onClick={() => handleInfoProduct(product)}>
                          Editar
                        </Button>

                        <Modal show={show} onHide={handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Form>
                              <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" name='nombre' value={productInfo?.nombre} onChange={(ev) => handleChageProductInfo(ev)} />
                              </Form.Group>

                              <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Precio</Form.Label>
                                <Form.Control type="number" name='precio' value={productInfo?.precio} onChange={(ev) => handleChageProductInfo(ev)} />
                              </Form.Group>

                              <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Imagen</Form.Label>
                                <Form.Control type="file" onChange={(ev) => setImage(ev.target.files[0])} />
                              </Form.Group>

                              <Button variant="primary" type="submit" onClick={handleClickProductInfo}>
                                Guardar Cambios
                              </Button>
                            </Form>

                          </Modal.Body>
                        </Modal>


                        <Button variant='danger' onClick={() => deleteProduct(product._id)}>Eliminar</Button>
                        <Button variant={product.bloqueado ? 'success' : 'info'} onClick={() => product.bloqueado ? enableProduct(product._id) : disabledProduct(product._id)}>{product.bloqueado ? 'Habilitar' : 'Bloquear'}</Button>
                      </>
                      :
                      <Button variant='danger' onClick={() => handleClicDelCart(product._id)}>Eliminar</Button>
                  }

                </td>
              </tr>
            )

            :

            array.map(
              (user) =>
                user._id !== JSON.parse(sessionStorage.getItem('idUsuario')) &&
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.nombreUsuario}</td>
                  <td>{user.rol}</td>
                  <td className='d-flex justify-content-evenly'>
                    <>
                      <Button variant="warning" onClick={() => handleInfoUser(user)}>
                        Editar
                      </Button>

                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                              <Form.Label>Nombre</Form.Label>
                              <Form.Control type="text" name='nombreUsuario' value={userInfo?.nombreUsuario} onChange={(ev) => handleChageUserInfo(ev)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                              <Form.Label>Rol</Form.Label>
                              <Form.Control type="text" name='rol' value={userInfo?.rol} onChange={(ev) => handleChageUserInfo(ev)} />
                            </Form.Group>

                            <Button variant="primary" type="submit" onClick={handleClickUserInfo}>
                              Guardar Cambios
                            </Button>
                          </Form>

                        </Modal.Body>
                      </Modal>
                    </>

                    <Button variant='danger' onClick={() => deleteUser(user._id)} disabled={user.rol === 'admin' && true}>Eliminar</Button>
                    <Button variant={user.bloqueado ? 'success' : 'info'} onClick={() => user.bloqueado ? enableUser(user._id) : disabledUser(user._id)}>{user.bloqueado ? 'Habilitar' : 'Bloquear'}
                    </Button>
                  </td>
                </tr>
            )
        }

      </tbody>
    </Table>
  )
}

export default TableC
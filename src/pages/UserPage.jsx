import  { useEffect, useState } from 'react'
import clienteAxios from '../helpers/axios'
import CarouselC from '../components/CarouselC'
import { Col, Container, Row } from 'react-bootstrap'
import CardC from '../components/CardC'

const UserPage = () => {
  /* Hook - USE - Metodo - Funcion */
  const [productos, setProductos] = useState([])

  const obtenerProducto = async () => {
    const productosApi = await clienteAxios.get('/productos')
    setProductos(productosApi.data.productos)
  }

  useEffect(() => {
    obtenerProducto()
  }, [])

  return (
    <>
      <CarouselC />
      <Container className="my-5">
        <Row>
          {
            productos.map((producto) =>
              <Col key={producto._id} sm='12' md='6' lg='3'>
                <CardC idProduct={producto._id} titulo={producto.nombre} descripcion={producto.descripcion} precio={producto.precio} imagen={producto.imagen} />
              </Col>
            )
          }
        </Row>
      </Container>
    </>
  )
}

export default UserPage
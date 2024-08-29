import { useEffect, useState } from "react"
import CardC from "../components/CardC"
import CarouselC from "../components/CarouselC"
import { Col, Container, Row } from "react-bootstrap"
import clienteAxios from "../helpers/axios"
import { tituloDePagina } from "../helpers/changeTitlePage"

const HomePage = () => {
  /* Hook - USE - Metodo - Funcion */
  const [productos, setProductos] = useState([])

  const obtenerProducto = async () => {
    tituloDePagina('homePage')
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
                <CardC idProduct={producto._id} titulo={producto.nombre} descripcion={producto.descripcion} precio={producto.precio} imagen={producto.imagen}/>
              </Col>
            )
          }
        </Row>
      </Container>
    </>
  )
}

export default HomePage
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'
import clienteAxios, { configHeaders } from '../helpers/axios';

const CardC = ({ idProduct, titulo, descripcion, precio, imagen, idPage }) => {
 
  const handleClicDelFavs = async() => {
    const confirmDelProductFav = confirm('Estas seguro de que quieres eliminar a este producto de Favoritos?')

    if(confirmDelProductFav){
      const result = await clienteAxios.delete(`/productos/borrarProdFav/${idProduct}`, configHeaders)
      console.log(result)
    }
  }

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imagen} />
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <Card.Text>
          {descripcion}
        </Card.Text>
        <Card.Text>
          {precio}
        </Card.Text>
        <div className='d-flex justify-content-between'>
          <Link to={`/product/${idProduct}`} className='btn btn-primary'>Ver Mas</Link>
          {
            idPage === 'favs' &&
            <Link to={`#`} className='btn btn-danger' onClick={handleClicDelFavs}>Eliminar</Link>
          }
        </div>
      </Card.Body>
    </Card>
  )
}

export default CardC
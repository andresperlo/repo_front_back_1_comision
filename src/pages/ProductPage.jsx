import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import clienteAxios, { configHeaders } from "../helpers/axios"
import { Button } from "react-bootstrap"


const ProductPage = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [product, setProducts] = useState({})

  const obtenerProducto = async () => {
    const result = await clienteAxios.get(`/productos/${params.idProduct}`)
    console.log(result)
    setProducts(result.data.producto)
  }

  const handleAddProdCart = async () => {
    const token = JSON.parse(sessionStorage.getItem('token')) || ''

    if(!token){
      alert('Tenes que iniciar sesion para agregar este producto a tu carrito')
      setTimeout(() => {
        navigate('/login')
      }, 500);
      return
    }

    const res = await clienteAxios.post(`/productos/agregarProdCart/${product._id}`, {}, configHeaders)

    console.log(res)
  }

  const handleAddProdFav = async () => {
    const token = JSON.parse(sessionStorage.getItem('token')) || ''
    
    if(!token){
      alert('Tenes que iniciar sesion para agregar este producto a Favoritos')
      setTimeout(() => {
        navigate('/login')
      }, 500);
      return
    }

    const res = await clienteAxios.post(`/productos/agregarProdFav/${product._id}`, {}, configHeaders)

    console.log(res)
  }

  useEffect(() => {
    obtenerProducto()
  }, [])
  return (
    <>
      <div className='d-flex my-5 justify-content-center align-items-center text-center'>
      <div className="mx-3">
        <img src={`${product?.imagen}`} alt="" />
      </div>
      <div>
        <p>{product.nombre}</p>
        <p>{product.descripcion}</p>
        <p>${product.precio}</p>
        <Button variant="primary" onClick={handleAddProdFav}>Añadir a Favoritos</Button>
        <Button variant="secondary" onClick={handleAddProdCart}>Añadir al Carrito</Button>
      </div>
      </div>
    </>
  )
}

export default ProductPage
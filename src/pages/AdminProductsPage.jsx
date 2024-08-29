import { Container } from "react-bootstrap"
import TableC from "../components/TableC"
import { useEffect, useState } from "react"
import clienteAxios from "../helpers/axios"


const AdminProductsPage = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const obtenerProductosApi = async() => {
    const result =  await clienteAxios.get('/productos')
    setProducts(result.data.productos)
    setIsLoading(true)
  }

  useEffect(() => {
    if(!isLoading){
      obtenerProductosApi()
    }
  },[products])

  return (
   <>
    <Container className="my-5">
      <TableC array={products} idPage={'adminProducts'} set={products} setIsLoading={setIsLoading}/>
    </Container>
   </>
  )
}

export default AdminProductsPage
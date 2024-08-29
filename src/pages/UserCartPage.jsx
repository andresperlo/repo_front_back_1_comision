import { useEffect, useState } from "react"
import clienteAxios, { configHeaders } from "../helpers/axios"
import TableC from "../components/TableC"
import { Button, Container } from "react-bootstrap"
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'


const UserCartPage = () => {
  const [cart, setCart] = useState([])
  const [idPrefence, setIdPrefence] = useState(null)

  const getAllProductCart = async () => {
    const result = await clienteAxios.get('/productos/obtenerProdCart', configHeaders)
    setCart(result.data.productos)
  }

  const handlePayMP = async() => {
    initMercadoPago(`${import.meta.env.VITE_MP_PUBLIC_KEY}`);
    const result = await clienteAxios.post('/productos/payMp', {}, configHeaders)
    setIdPrefence(result.data.urlMP)
  }

  useEffect(() => {
    getAllProductCart()
  }, [])

  return (
    <>
      <Container className="my-5">
        <TableC array={cart} idPage={'userCart'} />
      </Container>
        <Button className="mx-5 my-5" onClick={handlePayMP}>Pagar</Button>
        <Wallet initialization={{ preferenceId: idPrefence, redirectMode:'modal' }}/>
    </>
  )
}

export default UserCartPage
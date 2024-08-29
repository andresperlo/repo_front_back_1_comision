import { Container } from 'react-bootstrap'
import TableC from '../components/TableC'
import { useEffect, useState } from 'react'
import clienteAxios, { configHeaders } from '../helpers/axios'

const AdminUsersPage = () => {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const obtenerUsuarios = async() => {
    const result = await clienteAxios.get('/usuarios', configHeaders)
    setUsers(result.data.usuarios)
    setIsLoading(true)
  }

  useEffect(() => {
   if(!isLoading){
    obtenerUsuarios()
   }
  },[users])

  return (
    <>
      <Container className="my-5">
        <TableC array={users} idPage={'adminUsers'} set={setUsers} setIsLoading={setIsLoading}/>
      </Container>
    </>
  )
}

export default AdminUsersPage
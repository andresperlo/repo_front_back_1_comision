import { Container } from "react-bootstrap"
import FormC from "../components/FormC"
import { tituloDePagina } from "../helpers/changeTitlePage"

const RegisterPage = () => {
  tituloDePagina('registerPage')
  return (
    <>
     <Container className="d-flex justify-content-center my-5">
     <FormC  idPage='register'/>
     </Container>
    </>
  )
}

export default RegisterPage
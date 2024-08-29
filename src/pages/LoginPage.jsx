import { Container } from "react-bootstrap"
import FormC from "../components/FormC"
import { tituloDePagina } from "../helpers/changeTitlePage"

const LoginPage = () => {
  tituloDePagina('loginPage')
  return (
    <Container className="d-flex justify-content-center my-5">
    <FormC/>
    </Container>
  )
}

export default LoginPage
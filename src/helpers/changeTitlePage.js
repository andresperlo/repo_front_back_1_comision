export const tituloDePagina = (idPage) => {
  switch (idPage) {
    case 'homePage':
       document.title = 'Pagina Principal'
      break;
    case 'registerPage':
      document.title = 'Registro'
    break
    case 'loginPage':
      document.title = 'Iniciar Sesion'
    break

  
    default:
      break;
  }
}

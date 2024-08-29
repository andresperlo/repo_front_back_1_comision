import { useEffect } from "react"


const AboutPage = () => {

  useEffect(() =>{ 
    document.title='Sobre Nosotros'
  }, [])
  return (
    <div>AboutPage</div>
  )
}

export default AboutPage
import React, {useState, useEffect} from 'react';
import styled from "@emotion/styled";
import Formulario from "./componentes/Formulario";
import ImagenCripto from "./img/imagen-criptos.png";
import Resultado from './componentes/Resultado';
import Spinner from './componentes/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  
   
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2,1fr);
    column-gap: 2rem;
  }
`;

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: white;
  text-align:center;
  font-weight:700;
  margin-top: 60px;
  margin-bottom:50px;
  font-size:28px;

  &::after{
     content: '';
     width: 90%;
     height: 3px;
     background-color: blue;
     border-radius: 30px;
     display: block;
     margin: 10px auto 0 auto;
 }
`;

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 60px auto 0 auto;
  display: block;
   
  border-radius: 10px;
  box-shadow: 10px 10px 40px white;
`;


 
function App() {

  const [monedas, setMonedas] = useState({});
  const [resultado, setResultado] = useState({});
  const [cargango, setCargango] = useState(false)

  



 useEffect(() => {
   if(Object.keys(monedas).length > 0){

     const cotizarCripto = async () =>{
       setCargango(true)
       setResultado({})


       
       
       
       const {moneda, criptomoneda} = monedas;
       const urlPrecios =`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
       
       const respuesta = await fetch(urlPrecios)
       const resultado = await respuesta.json()
       setTimeout(() => {
         setResultado(resultado.DISPLAY [criptomoneda][moneda])
         setCargango(false)
         
         
        }, 3000);
     }

     
     cotizarCripto()
   }
 }, [monedas])
 

  
console.log(resultado);

   
  return (

    
    <Contenedor>
      <Imagen src="https://png.pngtree.com/element_our/md/20180712/md_5b4700ab483ff.jpg" alt="imagen"/>
      <div>
      <Heading>Cotiza Criptomonedas al instante</Heading>
      <Formulario 
      monedas={monedas}
      setMonedas={setMonedas} 
        
      />
       

      {cargango && <Spinner />}
      
      { resultado.PRICE && <Resultado  resultado={resultado}/>}
        
        
      </div>

      
      
    </Contenedor>

  );
}

export default App;

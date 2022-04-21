import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useSelectMonedas from "./Hooks/useSelectMonedas";
import { monedas } from "./Data/Monedas";
import Error from "./Error";

const InputSubmit = styled.input`
  background-color: rgb(44, 44, 190);
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700; //letra gruesa
  text-transform: uppercase;
  font-size: 14px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7a7dfe;
    color: black;
    cursor: pointer; //manito
  }
`;
const Formulario = ({ setMonedas }) => {
  const [criptos, setCriptos] = useState([]);
  const [criptomoneda, SelectCriptoMonedas] = useSelectMonedas(
    "Elige tu criptomoneda",
    criptos
  );
  const [moneda, SelectMonedas] = useSelectMonedas("Elige tu Moneda", monedas);
  const [error, setError] = useState(false);

  useEffect(() => {
    const consultarApi = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
      //  nos devuelve un JSON
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      // console.log(resultado.Data);

      //Construir array apartir de un API
      const arrayCripto = resultado.Data.map((cripto) => {
        const objetoAPI = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName,
        };
        return objetoAPI;
      });

      setCriptos(arrayCripto); //Llenar el array
      //  console.log(arrayCripto);
    };
    consultarApi();
  }, []); //Consultar al inicio una sola vez

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([moneda, criptomoneda].includes("")) {
      setError(true);
      return;
    }

    setError(false);
    setMonedas({
      moneda,
      criptomoneda,
    });
  };

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}

      <form onSubmit={handleSubmit}>
        <SelectMonedas />
        <SelectCriptoMonedas />

        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  );
};

export default Formulario;

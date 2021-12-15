import {FiSearch} from 'react-icons/fi'

import InputMask from "react-input-mask";
import './style.css'
import api from './services/api'
import { useState } from 'react'

function App() {
  const [ input, setInput ] = useState('');
  const [ cep, setCep ] = useState({});

  async function handleSearch() {

    if(input === '') {
      alert('Informe um CEP')
      return;
    }

    try{
      const res = await api.get(`${input}/json`);
      setCep(res.data);
      setInput("")

    }catch{
      alert('CEP não encontrado!')
      setInput("")
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscar CEP</h1>

      <div className="containerInput">
        <InputMask 
          mask="99999-999" 
          type="text"
          placeholder="Digite um CEP válido"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" /> 
        </button>
      </div>

      <div className='main'>
        <h2>{cep.cep}</h2>
        <span>{cep.logradouro}</span>
        <span>{cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
      </div>
    </div>
  );
}

export default App;

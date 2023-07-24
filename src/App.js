import { useState } from 'react';
import logo from './logo-travelly.png';
import Modal from './Modal';
import './App.css';

function App() {
  const [aeroportoIda , setAeroportoIda] = useState('');
  const [aeroportoVolta, setAeroportoVolta] = useState ('');
  const [dataPartida, setDataPartida] = useState('');
  const [dataVolta, setDataVolta] = useState('');

  const teste = async () => {
    const data = await fetch(`https://test.api.amadeus.com/v1/travel/predictions/trip-purpose?originLocationCode=${setAeroportoIda}&destinationLocationCode=${setAeroportoVolta}&departureDate=${dataPartida}&returnDate=${dataVolta}`);

    if (setAeroportoIda === '' || setAeroportoVolta === '' || setDataPartida === '' || setDataVolta === '') {
      return alert('Preencha todos os campos!');
    }
  }

  return (
    <div className='page'>
      
      <div className='form-container'>

        <h1><img id='logo-travelly' src={logo} alt='logo Travelly'/></h1>

        <h2>Descubra o motivo de viagens por período</h2>

        <label className="text-input" htmlFor="origin">Aeroporto de Partida (Código do Aeroporto):</label>
        <input type="text" id="origin" onChange={event => setAeroportoIda(event.target.value)} value={aeroportoIda} placeholder="Código do Aeroporto de Destino" required></input>

        <label className="text-input" htmlFor="destination">Aeroporto de Destino (Código do Aeroporto):</label>
        <input type="text" id="destination" onChange={event => setAeroportoVolta(event.target.value)} value={aeroportoVolta} placeholder="Código do Aeroporto de Destino" required></input>
        
        <label className="text-input" htmlFor="departure-date">Data de Partida:</label>
        <input type="date" value={dataPartida} onChange={event => setDataPartida(event.target.value)} id="departure-date" required></input>

        <label className="text-input" htmlFor="return-date">Data de Retorno:</label>
        <input type="date" value={dataVolta} onChange={event => setDataVolta(event.target.value)} id="return-date" required></input>
        
        <button id="search-btn" onClick={teste}>Pesquisar</button>
          
        <Modal />

      </div>
    </div>
  );
}

export default App;

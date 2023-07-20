import logo from './logo-travelly.png';
import './App.css';

function App() {
  return (
    <div className='page'>

      <div className='form-container'>

        <h1><img id='logo-travelly' src={logo} alt='logo'/></h1>

        <h2>Descubra o motivo de viagens por período</h2>

        <label className="text-input" htmlFor="origin">Aeroporto de Partida (Código do Aeroporto):</label>
        <input type="text" id="origin" placeholder="Código do Aeroporto de Destino" required></input>

        <label className="text-input" htmlFor="destination">Aeroporto de Destino (Código do Aeroporto):</label>
        <input type="text" id="destination" placeholder="Código do Aeroporto de Destino" required></input>
        
        <label className="text-input" htmlFor="departure-date">Data de Partida:</label>
        <input type="date" id="departure-date" required></input>

        <label className="text-input" htmlFor="return-date">Data de Retorno:</label>
        <input type="date" id="return-date" required></input>
        
        <button id="search-btn" onClick={1 + 1}>Pesquisar</button>

      </div>
    </div>
  );
}

export default App;

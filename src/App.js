import { useState } from 'react';
import logo from './logo-travelly.png';
import Modal from './Modal';
import './App.css';

function App() {
  const [aeroportoIda , setAeroportoIda] = useState('REC');
  const [aeroportoVolta, setAeroportoVolta] = useState ('GIG');
  const [dataPartida, setDataPartida] = useState('');
  const [dataVolta, setDataVolta] = useState('');
  const [resultado, setResultado] = useState('')
  const [showModal, setShowModal] = useState(false); // Estado para controlar a exibição do modal
  
  //Função Para brir o Modal
  function openModal() {
    setShowModal(true);
  }
  
  // Função para fechar o modal
  function closeModal() {
    setShowModal(false);
  }

  async function getToken() {
    const tokenUrl = 'https://test.api.amadeus.com/v1/security/oauth2/token';
    const clientId = '3Pp4q6AkjSbxDC2QUlwrACi6LAdLhbGO';
    const clientSecret = 'SGjlYFHaPXCDn8Id';
  
    // Cria um objeto URLSearchParams para enviar os parâmetros na requisição
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
  
    try {
      // Faz a requisição para obter o token usando o operador await
      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
      });
  
      const data = await response.json();
      console.log(`Seu Token é: ${data.access_token}`)
      return data.access_token; // Retorna o token obtido da resposta da requisição

    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  getToken()

  async function getResult() {
    if (aeroportoIda === '' || aeroportoVolta === '' || dataPartida === '' || dataVolta === '') {
      return alert('Preencha todos os campos!');
    }

    console.log(aeroportoIda)
    console.log(aeroportoVolta)
    console.log(dataPartida)
    console.log(dataVolta)
    console.log(aeroportoIda)
  
    // Chama a função getToken() para obter o token necessário para a requisição
getToken()
.then(token => {
  const url = `https://test.api.amadeus.com/v1/travel/predictions/trip-purpose?originLocationCode=${aeroportoIda}&destinationLocationCode=${aeroportoVolta}&departureDate=${dataPartida}&returnDate=${dataVolta}`;

  console.log(url)
  
  // Faz a requisição para a API Amadeus usando o token obtido
  fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}` // Usa o token no cabeçalho da requisição
    },
  })
    .then(response => response.json())
    .then(data => {
      const { result } = data.data;
      setResultado(result)
      openModal(); // Chama a função para abrir o modal quando o resultado estiver disponível
      console.log(result);
      alert(resultado)

    })
    .catch(error => {
      console.log(error);
    });
})
.catch(error => {
  // Em caso de erro ao obter o token, exibe mensagem de erro
  console.log(error);
});
    }
  
     //Lição de casa: Validar o campo para não permitir que selecione a data atuual nem anterior, o códfigo está praticamente pronto.
     
    // async function validarDatas() {
    //   let dataPartidaDate = new Date(dataPartida);
    //   let dataVoltaDate = new Date(dataVolta);
    //   let dataAtual = new Date();
    //   if (dataPartidaDate <= dataAtual) {
    //     return alert('A data de partida não pode ser anterior ou igual à data atual.');
    //   } else if (dataVoltaDate < dataPartidaDate) {
    //     return alert('A data de volta não pode ser anterior à data de partida.');
    //   } else {
    //     try {
    //       await getResult(); // Aguarda a conclusão da função getResult() antes de abrir o modal
    //       openModal(); // Chama a função para abrir o modal quando o resultado estiver disponível
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    // }


  async function buscarPrev(){
    await getResult()
    openModal()
  }

  return (
    <div className='page'>
         {/* Renderiza o modal apenas quando showModal for verdadeiro */}
         {showModal && (
        <Modal data={resultado} onClose={closeModal} />
      )}
           
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
        
        <button id="search-btn" onClick={buscarPrev}>Pesquisar</button>
       

      </div>
    </div>
  );
}

export default App;

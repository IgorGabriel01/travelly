import { useState } from 'react';
import './Modal.css';

function Modal({ data, onClose }) {
  const [resultadoFinal, setResultadoFinal] = useState(data);

  // Função para fechar o modal
  function handleCloseModal() {
    setResultadoFinal(data); // Redefine o estado para o valor inicial
    onClose(); // Chama a função onClose passada como prop para fechar o modal
  }

  return (
    <div id="modal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleCloseModal}>&times;</span>
        <div className="showDisplay">
          <p>
            Geralmente as pessoas viajam nessa data a {resultadoFinal}
          </p>
        </div>
        <button id="close-modal-btn" onClick={handleCloseModal}>Fechar</button>
      </div>
    </div>
  );
}

export default Modal;

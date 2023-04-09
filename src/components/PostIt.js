import { useState } from "react";
import "../css/post-it.css";
import { AiFillCloseCircle } from "react-icons/ai";

function PostIt({ titulo, texto, idPostIt }) {
  const [modalAbierta, setModalAbierta] = useState(false);

  const abrirPostIt = (e) => {
    setModalAbierta(true);
  };

  const cerrarPostIt = () => {
    setModalAbierta(false);
  };

  const modalClass = modalAbierta ? "modal-postit open" : "modal-postit";

  return (
    <li className="post-li">
      <button className="post-link" onClick={abrirPostIt}>
        <h2 className="post-titulo" id={idPostIt}>
          {titulo}
        </h2>
      </button>
      <div className={modalClass} id={idPostIt}>
        <button className="modal-cerrar" onClick={cerrarPostIt}>
          <AiFillCloseCircle />
        </button>
        <p className="post-texto">{texto}</p>
      </div>
    </li>
  );
}

export default PostIt;

import "../css/post-it.css";
import { AiFillCloseCircle } from "react-icons/ai";

function PostIt({ titulo, texto, idPostIt }) {

  const abrirPostIt = (e) => {  
    const modales = document.querySelectorAll(".modal-postit");
    modales.forEach(modal => {
      if(modal.id === e.target.id){
        modal.style.transform = "scale(1)";
      }
    })
    
  };

  const cerrarPostIt = (e) => {
    const modales = document.querySelectorAll(".modal-postit");
    modales.forEach(modal => {
      modal.style.transform = "scale(0)";      
    })
  };

  return (
      <li className="post-li">
        <a href="#!" className="post-link" onClick={abrirPostIt}>
          <h2 className="post-titulo" id={idPostIt}>{titulo}</h2>
        </a>
        <div className="modal-postit" id={idPostIt}>
          <button className="modalCerrar" onClick={cerrarPostIt}>
            <AiFillCloseCircle />
          </button>
          <p className="post-texto">{texto}</p>
        </div>
      </li>
  );
}

export default PostIt;

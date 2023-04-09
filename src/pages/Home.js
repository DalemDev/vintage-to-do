import { useAuth } from "../context/authContext";
import "../css/home.css";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { BiLogOut } from "react-icons/bi";
import PostIt from "../components/PostIt";
import { v4 as uuidv4 } from "uuid";
import app from "../config/Coneccion";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Home() {
  const {
    loading,
    cerrarSesion,
    guardarPostItFireStore,
    obtenerPostItFireStore,
  } = useAuth();
  const [postit, setPostIt] = useState({ titulo: "", nota: "", autor: "" });
  const [allPostIts, setAllPostIts] = useState([]);
  const auth = getAuth(app);
  const navigate = useNavigate();

  const allPostItsFirestore = async () => {
    const querySnapshot = await obtenerPostItFireStore();    
    const postits = [];  
    querySnapshot.forEach((item) => {
      const data = {
        titulo: item._document.data.value.mapValue.fields.titulo,
        nota: item._document.data.value.mapValue.fields.nota,
        idNota: item.id,
      }
      postits.push(data)
    });
    setAllPostIts(postits);
  };

  useEffect(() => {
    allPostItsFirestore();
  }, []);

  const handleCerrarSesion = async () => {
    await cerrarSesion();
    navigate('/');
  };

  const mostrarNotificacion = (notificacion, color) => {
    const contenedorNoti = document.querySelector(".notificacion");
    contenedorNoti.textContent = notificacion;
    contenedorNoti.style.transform = "scale(1)";
    contenedorNoti.style.color = color;
    setTimeout(() => {
      contenedorNoti.style.transform = "scale(0)";
    }, 3000);
  };

  const guardarPostIt = async (e) => {
    e.preventDefault();
    const validar = await guardarPostItFireStore(postit);
    if (validar) {
      mostrarNotificacion(
        "PostIt Guardado Correctamente ✅",
        "rgb(35, 217, 35)"
      );
    } else {
      mostrarNotificacion("Error Al Guardar PostIt ❌", "rgb(221, 41, 41)");
    }
    setPostIt({ titulo: "", nota: "", autor: "" });
    allPostItsFirestore();
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="home">
      <header className="header-home">
        <img className="img-user" src={auth.currentUser.photoURL} alt="Foto" />
        <h1 className="titulo-user">
          Hola {auth.currentUser.displayName || auth.currentUser.email.substring(0,4)  || "Bienvenido"}
        </h1>
        <button className="cta-cerrar" onClick={handleCerrarSesion}>
          <BiLogOut />
        </button>
      </header>
      <div className="agregar-home">
        <h2>Mis notas</h2>
        <form className="form-home" onSubmit={guardarPostIt}>
          <input
            className="titulo-home"
            type="text"
            placeholder="Titulo"
            value={postit.titulo}
            onChange={({ target: { value } }) => {
              setPostIt({ ...postit, titulo: value, autor: auth.currentUser.email });
            }}
          />
          <textarea
            className="nota-home"
            type="text"
            placeholder="Ingrese aquello que no desea olvidar"
            value={postit.nota}
            onChange={({ target: { value } }) => {
              setPostIt({ ...postit, nota: value, autor: auth.currentUser.email });
            }}
          />
          <input className="submit-home" type="submit" value="Guardar" />
        </form>
      </div>
      <div className="notificacion"></div>
      <ul className="post-ul">
        {allPostIts.map((item) => {
          return (
            <PostIt
              key={uuidv4()}
              titulo={item.titulo.stringValue}
              texto={item.nota.stringValue}
              idPostIt={item.idNota}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default Home;

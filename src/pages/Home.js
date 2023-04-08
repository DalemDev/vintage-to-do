import { useAuth } from "../context/authContext";
import "../css/home.css";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { BiLogOut } from "react-icons/bi";
import PostIt from "../components/PostIt";
import { v4 as uuidv4 } from "uuid";

function Home() {
  const {
    user,
    loading,
    cerrarSesion,
    guardarPostItFireStore,
    obtenerPostItFireStore,
  } = useAuth();
  const [postit, setPostIt] = useState({ titulo: "", nota: "", autor: "" });
  const [allPostIts, setAllPostIts] = useState([]);

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
  };

  
  const obtenerNombreEmail = (email) => {
    let nombreFinal = "";
    email.split("").forEach((e) => {
      if (e === "@") {
        return nombreFinal;
      }
      nombreFinal += e;
    });
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
        <img className="img-user" src={user.photoURL} alt="Foto" />
        <h1 className="titulo-user">
          Hola {user.displayname || obtenerNombreEmail(user.email)}
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
              setPostIt({ ...postit, titulo: value, autor: user.email });
            }}
          />
          <textarea
            className="nota-home"
            type="text"
            placeholder="Ingrese aquello que no desea olvidar"
            value={postit.nota}
            onChange={({ target: { value } }) => {
              setPostIt({ ...postit, nota: value, autor: user.email });
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

import { useAuth } from "../context/authContext";
import "../css/home.css";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { BiLogOut } from 'react-icons/bi'
import PostIt from "../components/PostIt";
import { v4 as uuidv4 } from 'uuid';


function Home() {
  const { user, loading, cerrarSesion, guardarPostItFireStore, obtenerPostItFireStore } = useAuth();
  const [postit, setPostIt] = useState({titulo: "", nota: ""});
  const [allPostIts, setAllPostIts] = useState([])
  
  useEffect(() => {
    const cargarPostIts = async () => {
      const allPostItsFireStore = await obtenerPostItFireStore()
  
      allPostItsFireStore.forEach((item) => {
        setAllPostIts([{...allPostIts, titulo: item._document.data.value.mapValue.fields.titulo, nota: item._document.data.value.mapValue.fields.nota, idNota: item.id}]) 
      })
    }   
    cargarPostIts()
  }, [])

  const handleCerrarSesion = async () => {
    await cerrarSesion();
  };

  if (loading) {
    return <Loader />;
  }

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
    const contenedorNoti = document.querySelector('.notificacion')
    contenedorNoti.textContent = notificacion
    contenedorNoti.style.transform = "scale(1)"
    contenedorNoti.style.color = color
    setTimeout(() => {
      contenedorNoti.style.transform = "scale(0)"
    }, 3000);
  }

  const guardarPostIt = async (e) => {
    e.preventDefault()   
    const validar = await guardarPostItFireStore(postit)
    if(validar){
      mostrarNotificacion("PostIt Guardado Correctamente ✅", "rgb(35, 217, 35)")  
    }else{
      mostrarNotificacion("Error Al Guardar PostIt ❌", "rgb(221, 41, 41)")
    }
  }

  
    
  return (
    <div className="home">
      <div className="notificacion"></div>
      <header className="header-home">
        <img className="img-user" src={user.photoURL} alt="Foto" />
        <h1 className="titulo-user">Hola {user.displayName || obtenerNombreEmail(user.email)} </h1>
        <button className="cta-cerrar" onClick={handleCerrarSesion}><BiLogOut /></button>
      </header>              
      <div className="agregar-home">
        <h2>Mis notas</h2>
        <form className="form-home" onSubmit={guardarPostIt}>
        <input className="titulo-home" type="text" placeholder="Titulo" value={postit.titulo} onChange={({target: {value}}) => {
          setPostIt({...postit, titulo: value})
        }} />
        <textarea className="nota-home" type="text" placeholder="Ingrese aquello que no desea olvidar" value={postit.nota} onChange={({target: {value}}) => {
           setPostIt({...postit, nota: value})
        }} />
        <input className="submit-home" type="submit" value="Guardar" />
        </form>
      </div>
      <ul className="post-ul">
        {
          allPostIts.map(item => {
            return <PostIt key={uuidv4()} titulo={item.titulo.stringValue} texto={item.nota.stringValue} idPostIt={item.idNota} />
          })
        }
      </ul>
    </div>
  );
}

export default Home;

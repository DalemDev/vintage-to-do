import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import "../css/login.css";

function App() {
  function animacionRegistrar() {
    const validarRegistrar = document.querySelector(".registrarse");
    const validarLogin = document.querySelector(".login");
    validarLogin.style.transform = "translateX(2000px)";
    validarRegistrar.style.transform = "translateX(0px)";
  }

  function animacionLogin() {
    const validarRegistrar = document.querySelector(".registrarse");
    const validarLogin = document.querySelector(".login");
    validarLogin.style.transform = "translateX(0px)";
    validarRegistrar.style.transform = "translateX(-2000px)";
  }

  function animacionRecuperarPassword() {
    const validarRecuperar = document.querySelector(".modal");
    validarRecuperar.style.transform = "translateY(0px)";
  }

  function cerrarModal() {
    const validarRecuperar = document.querySelector(".modal");
    validarRecuperar.style.transform = "translateY(-2000px)";
  }

  function validarEmail(email) {
    return /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(
      email
    );
  }

  function validarPassword(password) {
    return password.length >= 6;
  }

  function mostrarError(error) {
    const content = document.querySelector(".error");
    content.style.transform = "scale(1)";
    content.innerHTML = `<span class='icon-error'>
    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></svg></span> ${error}`;
    setTimeout(() => {
      content.style.transform = "scale(0)";
    }, 3000);
  }

  const { iniciarSesion, registrarse, iniciarSesionGoogle, restaurarPassword } =
    useAuth();
  const navigate = useNavigate();

  async function handleSubmitLogin(event) {
    event.preventDefault();
    const email = document.querySelector(".email").value;
    const password = document.querySelector(".pass").value;

    if (!(email === "" || password === "")) {
      if (validarEmail(email)) {
        if (validarPassword(password)) {
          try {
            await iniciarSesion(email, password);
            console.log('llego aqui');
            navigate("/home");
          } catch (error) {
            mostrarError(error.message);
          }
        } else {
          mostrarError(" La contraseña debe tener al menos 6 caracteres");
        }
      } else {
        mostrarError(" El correo ingresado es incorrecto");
      }
    } else {
      mostrarError(" Debe llenar todos los campos");
    }
  }

  async function handleSubmitRegistro(event) {
    event.preventDefault();
    const content = document.querySelector(".errorRegistrarse");
    const email = document.querySelector(".emailRegistro").value;
    const password = document.querySelector(".passRegistro").value;

    if (email !== "" || password !== "") {
      if (validarEmail(email)) {
        if (validarPassword(password)) {
          try {
            await registrarse(email, password);
            navigate("/");
          } catch (error) {
            mostrarError(error.message);
          }
        } else {
          content.style.transform = "scale(1)";
          content.innerHTML = `<span class='icon-error'>
    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></svg></span> ${"La contraseña debe tener al menos 8 caracteres"}`;
          setTimeout(() => {
            content.style.transform = "scale(0)";
          }, 3000);
        }
      } else {
        content.style.transform = "scale(1)";
          content.innerHTML = `<span class='icon-error'>
    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></svg></span> ${"Ingrese un correo válido"}`;
          setTimeout(() => {
            content.style.transform = "scale(0)";
          }, 3000);
      }
    } else {
      content.style.transform = "scale(1)";
          content.innerHTML = `<span class='icon-error'>
    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></svg></span> ${"Debe llenar todos los campos"}`;
          setTimeout(() => {
            content.style.transform = "scale(0)";
          }, 3000);
    }
  }

  async function handleInicioSesionGoogle() {
    try {
      await iniciarSesionGoogle();
      navigate("/");
    } catch (error) {
      mostrarError(error.message);
    }
  }

  async function handleRestaurarPassword(event) {
    event.preventDefault();
    const error = document.querySelector(".errorRecuperar");
    const email = document.querySelector(".modalEmail").value;
    if (!email) {
      error.textContent = "Debe ingresar un correo";
    } else {
      if (validarEmail(email)) {
        try {
          await restaurarPassword(email);
        } catch (error) {
          mostrarError(error.message);
        }
      } else {
        error.textContent = "El correo ingresado no es válido";
      }
    }
  }

  return (
    <div className="contenedor">
      <div className="login">
        <div className="error">
          <span className="icon-error">
            <MdErrorOutline />
          </span>
        </div>
        <div className="logo">
          <h1>Vintage To-do</h1>
        </div>
        <div className="formulario">
          <p>¿Aún no estas registrado?</p>
          <button onClick={animacionRegistrar}>Hazlo Aquí</button>
          <form onSubmit={handleSubmitLogin}>
            <input
              className="email"
              type="email"
              placeholder="Ingrese su correo"
            />
            <input
              className="pass"
              type="password"
              placeholder="Ingrese su contraseña"
            />
            <input className="cta" type="submit" value="Ingresar" />
          </form>
          <div className="acciones">
            <button
              className="ctaRestaurar"
              onClick={animacionRecuperarPassword}
            >
              Restaurar Contraseña
            </button>
            <button className="ctaGoogle" onClick={handleInicioSesionGoogle}>
              <FcGoogle />
              Iniciar Sesión con Google
            </button>
          </div>
        </div>
      </div>
      <div className="modal">
        <div className="errorRecuperar"></div>
        <h3>
          Enviaremos un correo a la siguiente dirección de correo electrónico
        </h3>
        <button className="modalCerrar" onClick={cerrarModal}>
          <AiFillCloseCircle />
        </button>
        <form onSubmit={handleRestaurarPassword} className="formRestaurar">
          <input
            type="email"
            className="modalEmail"
            placeholder="Ingrese el correo electrónico"
          />
          <input type="submit" className="enviarCorreo" value="Enviar correo" />
        </form>
      </div>
      <div className="registrarse">
        <div className="error errorRegistrarse">
          <span className="icon-error">
            <MdErrorOutline />
          </span>
        </div>
        <div className="logo">
          <h1>Vintage To-Do</h1>
        </div>
        <div className="formulario">
          <p>¿Ya te encuentras registrado?</p>
          <button onClick={animacionLogin}>Ingresa Aquí</button>
          <form onSubmit={handleSubmitRegistro}>
            <input
              className="email emailRegistro"
              type="email"
              placeholder="Ingrese un correo"
            />
            <input
              className="pass passRegistro"
              type="password"
              placeholder="Ingrese una contraseña"
            />
            <input
              className="cta ctaRegistro"
              type="submit"
              value="Registrarse"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

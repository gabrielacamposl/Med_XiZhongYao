import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import AppConfig from '@/layout/AppConfig';
//--> Componentes de primeReact
import axios from 'axios';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Message } from 'primereact/message';
import { Password } from 'primereact/password';
import { InputText } from "primereact/inputtext";
import { useRouter } from 'next/router';
//--> Componentes propios
import { temporizador } from '@/helpers/funciones';
import { campoVacio, longiudTokenInvalida, tokenExpirado, exitoToken, exitoResetPassword, passwordsInValidas, passwordInvalido } from '@/components/mensajesNotificaciones/mensajes';
import { cambiarPassword, tokenResetearPassword } from '@/components/mensajesNotificaciones/links';

const TokenResetear = () => {
  //--> Variable de redireccinamiento
  const router = useRouter();

  //-----------------------| Lista de variables |-----------------------
  //--> Temporizador
  const [tiempo, setTiempo] = useState(300)
  const [verTiempo, setVerTiempo] = useState('')
  //--> Token
  const [token, setToken] = useState('')
  const [estiloToken, setEstiloToken] = useState('')
  //--> Passwords
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  //--> Estilos de passwords
  const [estiloPassword, setEstiloPassword] = useState('')
  const [estiloConfirmPass, setEstiloConfirmPass] = useState('')
  //--> Dialogo
  const [mostrarDialogo, setMostrarDialogo] = useState(false)
  //--> Respuesta del back-end
  const [mensajeRespuesta, setMensajeRespuesta] = useState('')
  const [estiloMensajeRespuesta, setEstiloMensajeRespuesta] = useState('')

  //-----------------------| Cuenta regresiva |-----------------------
  useEffect(() => {
    const cuentaRegresiva = setInterval(() => {
      if (tiempo !== 0) {
        let tiempoRestante = tiempo - 1
        setTiempo(tiempoRestante)
        setVerTiempo(temporizador(tiempoRestante))
      }
    }, 1000);
    return () => clearInterval(cuentaRegresiva);
  }, [tiempo]);

  //-----------------------| Funciones principales |-----------------------
  const confirmarUsuario = async () => {
    //--> Validar token vacio
    if (!token) {
      setEstiloToken('p-invalid')
      setMensajeRespuesta(campoVacio)
      setEstiloMensajeRespuesta("error")

      setTimeout(() => { setMensajeRespuesta('') }, 3000);
      return
    } else { setEstiloToken('') }

    //--> Validar longitud de token
    if (token.length < 5) {
      setEstiloToken('p-invalid')
      setMensajeRespuesta(longiudTokenInvalida)
      setEstiloMensajeRespuesta("error")

      setTimeout(() => { setMensajeRespuesta('') }, 3000)
      return
    } else { setEstiloToken('') }

    //--> Validar envio en back-end
    try {
      const respuesta = await axios.get(`${tokenResetearPassword}${token}`)
      //--> Limpiar campo y estilo
      setEstiloToken('')
      if (respuesta.status === 200) {
        //--> Avisar estado
        // setMensajeRespuesta(exitoToken)
        // setEstiloMensajeRespuesta('success')

        //--> Mostrar dialogo
        setMostrarDialogo(true)
        //--> Detener temporizador
        setTiempo(0)
      }
    } catch (error) {
      if (error.response.status === 403) {
        setEstiloToken('p-invalid')
        setEstiloMensajeRespuesta('error')
        setMensajeRespuesta(error.response.data.msg)
        setTimeout(() => { setMensajeRespuesta('') }, 3000)
      }
      else {
        setEstiloToken('p-invalid')
        setMensajeRespuesta(tokenExpirado)
        setEstiloMensajeRespuesta("error")
        setTimeout(() => { setMensajeRespuesta('') }, 3000)
      }
    }
  }

  const nuevoPassword = async () => {
    if (!password) {
      setEstiloPassword('p-invalid')
      setEstiloMensajeRespuesta('error')
      setMensajeRespuesta(campoVacio)
      setTimeout(() => { setMensajeRespuesta('') }, 3000);
      return
    } else { setEstiloPassword('') }

    //--> Validar password
    if (password.length < 6) {
      setEstiloPassword('p-invalid')
      setEstiloMensajeRespuesta('error')
      setMensajeRespuesta(passwordInvalido)
      setTimeout(() => { setMensajeRespuesta('') }, 3000);
      return
    } else { setEstiloPassword('') }

    //--> Comprobar passwords iguales
    if (password !== confirmPass) {
      setEstiloPassword('p-invalid')
      setEstiloConfirmPass('p-invalid')
      setEstiloMensajeRespuesta('error')
      setMensajeRespuesta(passwordsInValidas)
      setTimeout(() => { setMensajeRespuesta('') }, 3000);
      return
    } else {
      setEstiloPassword('')
      setEstiloConfirmPass('')
    }
    try {
      console.log(`${tokenResetearPassword}${token}`)
      console.log(token)
      const respuesta = await axios.post(`${tokenResetearPassword}${token}`, { passwordAdmin: password })
      if (respuesta.status === 200) {
        setMensajeRespuesta(exitoResetPassword)
        setEstiloMensajeRespuesta('success')
        setMostrarDialogo(false)
        setTimeout(() => { router.push('/') }, 1000)
      }
    } catch (error) {
      console.log(error)
      console.log("Cambiar password")
      setEstiloMensajeRespuesta('error')
      setMensajeRespuesta("Las contraseñas no coinciden.")
      setTimeout(() => { setMensajeRespuesta('') }, 3000)
    }
  }

  const Topbar = () => {
    return (
      <div className="topbar">
        <div className='surface-overlay py-3 px-6 shadow-2 flex align-items-center justify-content-between relative lg:static'>
          <img src={`/XZY.svg`} width="47.22px" height={'35px'} widt={'true'} alt="logo" />
          <h5> AdminXiZhongYao</h5>
          <a className='p-ripple cursor-pointer block lg:hidden text-700'>
            <i className='pi pi-bars text-4x1'>
            </i>
          </a>
          <div className='align-items-center flex-grown-1 hidden lg:flex absolute lg:static w-full surface-overlay left-0 top-100 px-6 lg:px-0 z-2 shadow-2 lg:shadow-none'>
            <ul className='list-none p-0 m-0 flex lg:align-items-center text-900 select-none flex-column lg:flex-row cursor-pointer lg:w-4'></ul>
          </div>
          <div className='flex justify-content-end lg:text-right lg:block border-top-1 lg:border-top-none surface-border py-3 lg:py-0 mt-3 lg:mt-0 lg:w-4'>
            <Button className=' p-button p-component font-bold p-button-outolined p-button-rounded  'onClick={() => { router.push('/') }}> Iniciar Sesión</Button>
           {/**  <Button className='p-button p-component font-bold ml-3 p-button-rounded'>¿Eres Doctor?</Button>*/}
          </div>

        </div>

      </div>
    );
  }
  const Footer = () => {
    return (
      <div className="footer">
        <div className='grid grid-nogutter surface-section px-4 py-4 md:px-6 lg:px-8 border-top-1 surface-border'>
          <div className='col-12 lg:col-6 lg:border-right-1 surface-border'>
          <img src={`/XZY.svg`} width="47.22px" height={'35px'} widt={'true'} alt="logo" />
          <span className='text-900 block mt-4 mr-3'>Una empresa dedicada al cuidado se su salud, con la mejor tecnología y los mejores profesionistas.</span>
          <span className='text-500 block mt-4'> © 2023 XiZhongYao, S.A. Todos los derechos reservados.</span>
          </div>
          <div className='col-12 md:col-6 lg:col-3 mt-4 lg:mt-0 lg:pl-4 flex flex-column'>
            <span className='text-900 text-xl font-medium block'>Compañía</span>
            <ul className='list-none p-0'>
              <li>
                <a tabIndex={0} className='text-600 hover:text-900 transition-duration-150 cursor-pointer mt-3 block'>Sobre XiZhongYao</a>
              </li>
              <li>
                <a tabIndex={0} className='text-600 hover:text-900 transition-duration-150 cursor-pointer mt-3 block'>¿Quiénes somos?</a>
              </li>   
            </ul>
          </div>
          <div className='col-12 md:col-6 lg:col-3 mt-4 lg:mt-0 lg:pl-4 flex flex-column'>
            <span className='text-900 text-xl font-medium block'>Para Pacientes</span>
            <ul className='list-none p-0'>
              <li>
                <a tabIndex={0} className='text-600 hover:text-900 transition-duration-150 cursor-pointer mt-3 block'>Especialistas</a>
              </li>
              <li>
                <a tabIndex={0} className='text-600 hover:text-900 transition-duration-150 cursor-pointer mt-3 block'>Diagnóstico por Interpretaciones</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="surface-900 py-6 lg:py-4 md:px-6 lg:px-8 flex flex-column lg:flex-row justify-content-between align-items-center">
          <ul class="list-none p-0 mb-0 flex flex-column md:flex-row flex-order-1 lg:flex-order-0 mt-4 lg:mt-0">
              <li class="mr-4 mt-3 lg:mt-0">
                <a tabindex="0" class="cursor-pointer text-0">Datos de Privacidad</a>
                </li>
                <li class="mr-4 mt-3 lg:mt-0">
                  <a tabindex="0" class="cursor-pointer text-0">Términos y Condiciones</a>
                  </li>
                  <li class="mr-4 mt-3 lg:mt-0">
                    <a tabindex="0" class="cursor-pointer text-0">Información Legal</a>
                    </li>
                    </ul>
                    <div class="flex align-items-center flex-order-0 lg:flex-order-1">
                      <a tabindex="0" class="cursor-pointer mr-3 lg:mt-0 block"> 
                      <i class="pi pi-facebook surface-section p-1 text-sm border-circle text-900">
                      </i>
                      </a>
                      <a tabindex="0" class="cursor-pointer mr-3 lg:mt-0 block">
                        <i class="pi pi-twitter surface-section p-1 text-sm border-circle text-900"></i>
                      </a>
                        <a tabindex="0" class="cursor-pointer mr-3 lg:mt-0 block">
                          <i class="pi pi-youtube surface-section p-1 text-sm border-circle text-900"></i>
                        </a>
                      </div>
          </div>
        
      </div>
    );
  }

  const estiloDelFondo = {
    backgroundImage: 'url("https://i.pinimg.com/564x/82/74/6f/82746f4cb6ad9d0b9ea72ba36425379b.jpg")', // Cambia la ruta por la de tu imagen
    backgroundSize: 'cover', // Puedes ajustar esto según tus preferencias
    backgroundPosition: 'center', // Puedes ajustar esto según tus preferencias
    // Otros estilos que desees agregar
  };

  const color = {
    backgroundColor: 'rgb(255,255,255, 0.7)',
  };

  const colorDos = {
    backgroundColor: 'rgb(255,255,255, 0.4)',
  };

  const estilo = {
    height: '38px',
    width: '38px',
    backgroundColor: '#800080', // Puedes cambiar esto según tus necesidades
    borderRadius: '10px', // Agregamos el radio de borde
    // Otros estilos que desees agregar
  };

  //---------------------------| Valor que regresara |---------------------------
  return (
    <>
      <Head>
        <title>XiZhongYao Restablecer contraseña</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="El usuario resetea su password" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta property="og:type" content="website"></meta>
        <meta property="og:title" content="Sakai by PrimeReact | Free Admin Template for NextJS"></meta>
        <meta property="og:url" content="https://www.primefaces.org/sakai-react"></meta>
        <meta property="og:description" content="The ultimate collection of design-agnostic, flexible and accessible React UI Components." />
        <meta property="og:image" content="https://www.primefaces.org/static/social/sakai-nextjs.png"></meta>
        <meta property="og:ttl" content="604800"></meta>
        <link rel="icon" href={`/XZY.ico`} type="image/x-icon"></link>
      </Head>

      <Topbar />

      <div>
        <div className='px-4 py-8 md:px-6 lg:px-8' style={estiloDelFondo}>
          <div className='flex flex-wrap'>

            <div className='w-full lg:w-6 p-4 lg:p7 surface-card' style={color}>

              <h1 className={`font-bold text-center`}>Restablecer contraseña</h1>
              <div className="card ">

                <p className='text-xl text-center'>Ingrese el token para restablecer su contraseña.</p>
                <p className='text-center'>
                  Para finalizar el proceso ingrese el token que recibió en su correo.
                </p>

                <div className='flex justify-content-center mt-6'>
                  <div className="p-inputgroup" style={{ width: "380px" }}>
                    <InputText placeholder={`Código de confirmación. Tiempo: ${verTiempo}`} className={`${estiloToken}`}
                      value={token} onChange={(e) => setToken(e.target.value)} disabled={tiempo === 0} />
                    <Button label='Confirmar' onClick={confirmarUsuario} disabled={tiempo === 0} />
                  </div>
                </div>

                {mensajeRespuesta && !mostrarDialogo && (
                  <div className='mx-auto mt-2' style={{ width: "500px", textAlign: "center" }}>
                    <Message severity={estiloMensajeRespuesta} text={mensajeRespuesta} />
                  </div>
                )}

                <p className='text-justify mt-5'>
                  Si no puede encontrar el mensaje indicado puede utilizar la opción que se muestran a continuación.
                </p>

                <div className='flex justify-content-start mt-4'>
                  <div className='flex flex-column'>
                    {/* <Button label='Enviar nuevo código' severity="danger" className='font-bold mb-2' text onClick={reenviarToken} /> */}
                    <Button
                      label='Cancelar' severity="danger" className='font-bold' text
                      onClick={() => router.push('/')} />
                  </div>
                </div>

              </div>

            </div>

            <div className='w-full lg:w-5 p-3 lg:p3' style={colorDos}>
            <img src={"/pass.png"} alt='Image' height='400' className="mx-auto d-block mb-6" />
             
             
            </div>
          </div>
        </div>
      </div>

      {/**  
      <div className='flex h-screen'>
        <div className="xl:col-6 md:col-7 sm:col-offset-6 m-auto">
          <div className="card ">

            <p className='text-center text-6xl font-bold'>Restablecer contraseña</p>
            <p className='text-xl text-center'>Ingrese el token para restablecer su contraseña.</p>
            <p className='text-center'>
              Para finalizar el proceso ingrese el token que recibió en su correo.
            </p>

            <div className='flex justify-content-center mt-6'>
              <div className="p-inputgroup" style={{ width: "380px" }}>
                <InputText placeholder={`Código de confirmación. Tiempo: ${verTiempo}`} className={`${estiloToken}`}
                  value={token} onChange={(e) => setToken(e.target.value)} disabled={tiempo === 0} />
                <Button label='Confirmar' onClick={confirmarUsuario} disabled={tiempo === 0} />
              </div>
            </div>

            {mensajeRespuesta && !mostrarDialogo && (
              <div className='mx-auto mt-2' style={{ width: "500px", textAlign: "center" }}>
                <Message severity={estiloMensajeRespuesta} text={mensajeRespuesta} />
              </div>
            )}

            <p className='text-justify mt-5'>
              Si no puede encontrar el mensaje indicado puede utilizar la opción que se muestran a continuación.
            </p>

            <div className='flex justify-content-start mt-4'>
              <div className='flex flex-column'>
                 <Button label='Enviar nuevo código' severity="danger" className='font-bold mb-2' text onClick={reenviarToken} /> 
                <Button
                  label='Cancelar' severity="danger" className='font-bold' text
                  onClick={() => router.push('/')} />
              </div>
            </div>

          </div>
        </div>
       <AppConfig />
      </div> */}

     
      <Dialog header="Restablecer contraseña. " visible={mostrarDialogo} style={{ width: '50vw' }} onHide={() => setMostrarDialogo(false)}>
        <p>Ingrese su nueva contraseña, este debe contener mínimo 6 caracteres de longitud.</p>
        <div className='flex justify-content-center my-2'>
          <br />
          <Password
            id="cpassword" placeholder='Mínimo 6 caracteres'
            inputClassName={`w-full p-3 md:w-25rem`} className={`${estiloPassword} `}
            value={password} onChange={(e) => setPassword(e.target.value)} feedback={false}
          />
        </div>
        <div className='flex justify-content-center my-2'>
          <Password
            id="cpassword" placeholder='Repita su contraseña'
            inputClassName={`w-full p-3 md:w-25rem`} className={`${estiloConfirmPass} `}
            value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} feedback={false}
          />
        </div>
        {mensajeRespuesta && (
          <div className='mx-auto mt-2' style={{ width: "500px", textAlign: "center" }}>
            <Message severity={estiloMensajeRespuesta} text={mensajeRespuesta} />
          </div>
        )}
        <div className='flex justify-content-center mt-4'>
          <Button
            label='Aceptar' severity="danger" className='font-bold'
            onClick={nuevoPassword}
          />

        </div>
      </Dialog>

      <Footer />
    </>
  )
}

export default TokenResetear

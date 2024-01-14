import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import AppConfig from '@/layout/AppConfig';;
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import React, { forwardRef, useContext, useImperativeHandle, useRef, useState } from 'react';


import axios from 'axios';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';

import * as components from './components';
import Image from 'next/image';
import myImage from '../imagenes/login/green2.png';
import myImage1 from '../imagenes/login/green.png';
import myImage2 from '../imagenes/login/LogoLogin.png';
import myImage3 from '../imagenes/login/sourceResetPass.png';
import loto from '../imagenes/login/XZY.png';
import styles from '../styles/styles.module.css';
import { loginDoc, resetearPassword } from '@/components/mensajesNotificaciones/links';
import {
  campoVacio, camposVacios, emailInvalido, passwordInvalido, resetearExitoso
} from '@/components/mensajesNotificaciones/mensajes';
{/*import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';*/}




export default function Login() {


 
  //----------------| Lista de variables |----------------
  const [signIn, toggle] = useState(true);
  // --> Campos de entrada
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [emailrecuperar, setEmailrecuperar] = useState('')
  //--> Estilos
  const [estiloEmail, setEstiloEmail] = useState('')
  const [estiloPassword, setEstiloPassword] = useState('')
  const [estiloEmailRec, setEstiloEmailRec] = useState('')
  const [estiloRespuesta, setEstiloRespuesta] = useState('')
  //--> Mensaje de respuesta
  const [mensajeRespuesta, setMensajeRespuesta] = useState('')

  const router = useRouter();

  const validarEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

  //--> Envio de datos
  const validarEnvio = async () => {
    if ([email, password].includes('')) {
      setEstiloEmail('p-invalid')
      setEstiloPassword('p-invalid')
      setEstiloRespuesta('error')
      setMensajeRespuesta(camposVacios)
      setTimeout(() => { setMensajeRespuesta('') }, 3000)
      return
    } else {
      setEstiloEmail('')
      setEstiloPassword('')
    }
    if (!validarEmail.test(email)) {
      setEstiloEmail('p-invalid')
      setMensajeRespuesta(emailInvalido)
      setEstiloRespuesta('error')
      setTimeout(() => { setMensajeRespuesta('') }, 3000)
      return
    } else { setEstiloEmail('') }
    if (password.length < 6) {
      setEstiloPassword('p-invalid')
      setMensajeRespuesta(passwordInvalido)
      setEstiloRespuesta('error')
      setTimeout(() => { setMensajeRespuesta('') }, 3000)
      return
    } else { setEstiloPassword('') }
    setMensajeRespuesta('')
    //--> Validar envio a back-end
    console.log(loginDoc)
    try {
      const respuesta = await axios.post(loginDoc, { emailDoctor: email, passwordDoctor: password })
      if (respuesta.status === 200) {

        localStorage.setItem('token', respuesta.data.token)
        setTimeout(() => { router.push('/pages/Citas/gestionCitas') }, 1000)
      }
    } catch (error) {
   //   setMensajeRespuesta(error.response.data.msg)
      setEstiloRespuesta('error')
      setEstiloEmail('p-invalid')
      setEstiloPassword('p-invalid')
      setTimeout(() => { setMensajeRespuesta('') }, 3000);
    }
  }

  const recuperarPassword = async () => {
    console.log("recuperar password")
    if ([emailrecuperar].includes('')) {
      setEstiloEmailRec('p-invalid')
      setMensajeRespuesta(campoVacio)
      setEstiloRespuesta('error')
      setTimeout(() => { setMensajeRespuesta('') }, 3000)
      return
    } else { setEstiloEmailRec('') }

    if (!validarEmail.test(emailrecuperar)) {
      setEstiloEmailRec('p-invalid')
      setMensajeRespuesta(emailInvalido)
      setTimeout(() => { setMensajeRespuesta('') }, 3000)
      return
    } else { setEstiloEmailRec('') }

    try {
      const respuesta = await axios.post(resetearPassword, { emailDoctor: emailrecuperar })
      if (respuesta.status === 200) {
        // --> Limpiar variables
        setEmailrecuperar('')

        //--> Mostrar estado de la peticion
        setEstiloRespuesta('success')
        setMensajeRespuesta(resetearExitoso)

        //--> Redireccionar
        setTimeout(() => { router.push('/pages/pantallainicio/tokenresetear') }, 1000)
      }
    } catch (error) {
      setEstiloEmailRec('p-invalid')
      setMensajeRespuesta(error.response.data.msg)
      setEstiloRespuesta('error')

      setTimeout(() => { setMensajeRespuesta('') }, 3000)
    }
  }

  
  const Topbar = () => {
    return (
      <div className="topbar">
        <div className='surface-overlay py-3 px-6 shadow-2 flex align-items-center justify-content-between relative lg:static'>
          <img src={`/XZY.svg`} width="47.22px" height={'35px'} widt={'true'} alt="logo" />
        <span>MedXiZhongYao</span>
        <a className='p-ripple cursor-pointer block lg:hidden text-700'>
          <i className='pi pi-bars text-4x1'> 
          </i>
        </a>
        <div className='align-items-center flex-grown-1 hidden lg:flex absolute lg:static w-full surface-overlay left-0 top-100 px-6 lg:px-0 z-2 shadow-2 lg:shadow-none'>
          <ul className='list-none p-0 m-0 flex lg:align-items-center text-900 select-none flex-column lg:flex-row cursor-pointer lg:w-4'></ul>
        </div>
        <div className='flex justify-content-end lg:text-right lg:block border-top-1 lg:border-top-none surface-border py-3 lg:py-0 mt-3 lg:mt-0 lg:w-4'>
          <Button className=' p-button p-component font-bold p-button-outolined p-button-rounded  '  onClick={() => { router.push('/login') }}> Iniciar Sesión</Button>
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
    backgroundImage: 'url("https://i.pinimg.com/736x/d8/5e/51/d85e51f6ecd887757843ad99d8a41bf9.jpg")', // Cambia la ruta por la de tu imagen
    backgroundSize: 'cover', // Puedes ajustar esto según tus preferencias
    backgroundPosition: 'center', // Puedes ajustar esto según tus preferencias
    // Otros estilos que desees agregar
  };

  //---------------------------| Valor que regresara |---------------------------
  return (
    <>
      <Head>
        <title>{`Médicos - Iniciar Sesión`}</title>
        <meta charSet="UTF-8" />
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
      <div className='px-4 py-8 md:px-6 lg:px-8' style={estiloDelFondo}>
      <components.Container className={`card m-auto mt-8 ${styles.card}`} >
        <components.SignUpContainer className={`card ${styles.card}`} signinIn={signIn}>
          <components.Form  >

            <h1 className={`font-bold text-center`}>Recuperar contraseña</h1>
            <components.Parrafo>Ingresa el correo asociado a tu cuenta</components.Parrafo>
            <label htmlFor="email1" className="block text-900 ">Email</label>
            <InputText
              inputid="email1" value={emailrecuperar} onChange={(e) => setEmailrecuperar(e.target.value)}
              type="text" placeholder="Email address" className={`block text-900  mb-2 w-full p-3  ${estiloEmailRec}`}
            />
            {mensajeRespuesta &&
              (
                <div className='my-2'>
                  <Message severity={estiloRespuesta} text={mensajeRespuesta} />
                </div>
              )}

            <Button label="Enviar" className="w-full p-3 text-xl cursor-pointer" title="enviar" onClick={recuperarPassword} />
            <components.Anchor onClick={() => toggle(true)}  >Iniciar Sesión</components.Anchor>


          </components.Form  >
        </components.SignUpContainer>


        <components.SignInContainer className={`card ${styles.card}`} signinIn={signIn}>
          

          <components.Form >
            <Image src={loto} className={styles['logo']} alt="Mi imagen" priority={true} style={{ width: '50px', height: '50px' }} />
            <h1 className={`font-bold text-center cursor-pointer`}>Iniciar Sesión</h1>

            <label htmlFor="email1" className="block text-900 ">Correo</label>
            <InputText
              inputid="email1" value={email} onChange={(e) => setEmail(e.target.value)}
              type="text" placeholder="Correo electrónico" className={`block text-900  mb-2 w-full p-3  ${estiloEmail}`}
            />

            <label htmlFor="password1" className="block text-900 ">Contraseña</label>
            <Password
              inputid="password1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña"
              feedback={false} className="w-full " inputClassName={`w-full p-3 md:w-30rem  ${estiloPassword}`} />

            <components.Parrafo onClick={() => toggle(false)} className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>¿Olvidaste tu contraseña?</components.Parrafo>
            <Button label="Iniciar Sesión" className="w-full p-3 mb-3 text-xl" onClick={validarEnvio} />

            {mensajeRespuesta &&
              (<Message severity={estiloRespuesta} text={mensajeRespuesta} />)
            }

            <components.Parrafo>¿Eres Nuevo?</components.Parrafo>
            <div className="flex align-items-center">
              <Link
                href="/pages/pantallainicio/nuevoMedico"
                className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}
              >Crear cuenta</Link>
            </div>

          </components.Form>
        </components.SignInContainer>
        <components.OverlayContainer signinIn={signIn}>
          <components.Overlay signinIn={signIn}>

            <components.leftOverLayPanel signinIn={signIn}>
              <components.GhostButton onClick={() => toggle(true)}>Iniciar Sesión</components.GhostButton>
            </components.leftOverLayPanel>

            <components.RightOverLayPanel signinIn={signIn}>
            <Image src={myImage2} className={styles['my-image']}  alt="Mi imagen"
            priority={true}  style={{  height: '70px', width: '70px' ,
            marginTop: '120px',  }}
            />
            <Divider/>
            
            <components.Title>XIZHONGYAO</components.Title>
            <Divider layout="horizontal" style={{ borderColor: '#7F6000', borderWidth: '2px', 
            borderStyle: 'solid' ,
            marginTop: '1px', 
            marginLeft: '20px',
            }}></Divider>
            <Divider/>
            <br/>
              <components.Title2>Cuidando tu salud a distancia</components.Title2>
    
            </components.RightOverLayPanel >
            <Image src={myImage3} className={styles['my-image']} alt="Mi imagen" priority={true}  />
            <Image src={myImage} className={styles['my-image']} alt="Mi imagen" priority={true} />
          </components.Overlay>
        </components.OverlayContainer>
      </components.Container>
      <AppConfig />
      <br style={{ margin: '5pt' }} />
      <br style={{ margin: '5pt' }} />
      <br style={{ margin: '5pt' }} />

      </div>
      <Footer />
        

      
    </>
  )
}


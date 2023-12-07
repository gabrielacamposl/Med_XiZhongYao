import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import AppConfig from '@/layout/AppConfig';

import axios from 'axios';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';

import * as components from './components';
import Image from 'next/image';
import myImage from '../imagenes/login/loto.jpg';
import myImage1 from '../imagenes/login/flower1.jpeg';
import loto from '../imagenes/login/principal1.png';
import styles from '../styles/styles.module.css';
import { iniciarSesion, resetearPassword } from '@/helpers/constantes/links';
import {
  campoVacio, camposVacios, emailInvalido, passwordInvalido, resetearExitoso
} from '@/helpers/constantes/mensajes';



export default function Home() {
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
    try {
      const respuesta = await axios.post(iniciarSesion, { emailAdministrador: email, passwordAdministrador: password })
      if (respuesta.status === 200) {
        localStorage.setItem('token', respuesta.data.token);
        // console.log(respuesta.data.token)
        setTimeout(() => { router.push('/pages/dashboard') }, 1000)
      }
    } catch (error) {
      setMensajeRespuesta(error.response.data.msg)
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

    // router.push('/pages/pantallainicio/tokenresetear')

    try {
      const respuesta = await axios.post(resetearPassword, { emailAdministrador: emailrecuperar })
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


  //---------------------------| Valor que regresara |---------------------------
  return (
    <>
      <Head>
        <title>Inicio de Sesión</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="Interfaz para administrar la pagina jardin del eden" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta property="og:type" content="website"></meta>
        <meta property="og:title" content="Sakai by PrimeReact | Free Admin Template for NextJS"></meta>
        <meta property="og:url" content="https://www.primefaces.org/sakai-react"></meta>
        <meta property="og:description" content="The ultimate collection of design-agnostic, flexible and accessible React UI Components." />
        <meta property="og:image" content="https://www.primefaces.org/static/social/sakai-nextjs.png"></meta>
        <meta property="og:ttl" content="604800"></meta>
        <link rel="icon" href={`/favicon.ico`} type="image/x-icon"></link>
      </Head>


      <components.Container className={`card m-auto mt-8 ${styles.card}`} >
        <components.SignUpContainer className={`card ${styles.card}`} signinIn={signIn}>
          <components.Form  >


            <h1 className={`font-bold text-center`}>Recuperar contraseña</h1>
            <components.Parrafo>Ingrese el correo asociado a su cuenta</components.Parrafo>
            <label htmlFor="email1" className="block text-900 ">E-mail</label>
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

            <Button label="Enviar" className="w-full p-3 text-xl" title="enviar" onClick={recuperarPassword} />
            <components.Anchor onClick={() => toggle(true)}  >Iniciar Sesión</components.Anchor>


          </components.Form  >
        </components.SignUpContainer>


        <components.SignInContainer className={`card ${styles.card}`} signinIn={signIn}>

          <components.Form >
            <Image src={loto} className={styles['logo']} alt="Mi imagen" priority={true} />
            <h1 className={`font-bold text-center`}>Iniciar Sesión</h1>

            <label htmlFor="email1" className="block text-900 ">Correo electrónico</label>
            <InputText
              inputid="email1" value={email} onChange={(e) => setEmail(e.target.value)}
              type="text" placeholder="Correo electrónico" className={`block text-900  mb-2 w-full p-3  ${estiloEmail}`}
            />

            <label htmlFor="password1" className="block text-900 ">Contraseña</label>
            <Password
              inputid="password1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña"
              feedback={false} className="w-full " inputClassName={`w-full p-3 md:w-30rem  ${estiloPassword}`} />

            <components.Parrafo onClick={() => toggle(false)} className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>¿Olvidaste tu contraseña?</components.Parrafo>
            <Button label="Iniciar Sesion" className="w-full p-3 mb-3 text-xl" onClick={validarEnvio} />

            {mensajeRespuesta &&
              (<Message severity={estiloRespuesta} text={mensajeRespuesta} />)
            }

            <components.Parrafo>¿Eres Nuevo?</components.Parrafo>
            <div className="flex align-items-center">
              <Link
                href="/pages/pantallainicio/crearcuenta"
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
              <components.Title>Bienvenido, Administrador!</components.Title>
              <components.Title2>Jardín del Edén</components.Title2>

            </components.RightOverLayPanel >
            <Image src={myImage1} className={styles['my-image']} alt="Mi imagen" priority={true} />
            <Image src={myImage} className={styles['my-image']} alt="Mi imagen" priority={true} />
          </components.Overlay>
        </components.OverlayContainer>
      </components.Container>
      <AppConfig />
    </>
  )
}


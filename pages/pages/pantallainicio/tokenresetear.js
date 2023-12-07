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
import {
  campoVacio, longiudTokenInvalida, tokenExpirado, exitoToken, exitoResetPassword, passwordsInValidas, passwordInvalido
} from '@/helpers/constantes/mensajes';

import { cambiarPassword, tokenResetearPassword } from '@/helpers/constantes/links';

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
      const respuesta = await axios.post(`${tokenResetearPassword}${token}`, { nuevaPassword: password })
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
      setMensajeRespuesta(error.response.data.msg)
      setTimeout(() => { setMensajeRespuesta('') }, 3000)
    }
  }

  //---------------------------| Valor que regresara |---------------------------
  return (
    <>
      <Head>
        <title>Restablecer contraseña</title>
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
        <link rel="icon" href={`/favicon.ico`} type="image/x-icon"></link>
      </Head>

      <div className='flex h-screen'>
        <div className="xl:col-6 md:col-7 sm:col-offset-6 m-auto">
          <div className="card ">

            <p className='text-center text-6xl font-bold'>Restablecer contraseña</p>
            <p className='text-xl text-center'>Ingrese su token para resetear su contraseña</p> <br />
            <p className='text-center'>
              Para finalizar el proceso ingrese el token que recibió en su correo.
            </p>

            <div className='flex justify-content-center mt-6'>
              <div className="p-inputgroup" style={{ width: "380px" }}>
                <InputText placeholder={`Código de confirmación. Tiempo: ${verTiempo}`} className={`${estiloToken}`}
                  value={token} onChange={(e) => setToken(e.target.value)} disabled={tiempo === 0} />
                <Button label='Confirmar' severity='success' onClick={confirmarUsuario} disabled={tiempo === 0} />
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
        <AppConfig />
      </div>

      <Dialog
        header="Crea una nueva contraseña"
        visible={mostrarDialogo} style={{ width: '50vw' }} onHide={() => setMostrarDialogo(false)}
      >
        <h5>La contraseña debe tener una longitud mínima de 6 caracteres.</h5>
        <div className='flex justify-content-center my-2'>
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
            label='Aceptar' severity="success" className='font-bold'
            onClick={nuevoPassword}
          />

        </div>
      </Dialog>
    </>
  )
}

export default TokenResetear

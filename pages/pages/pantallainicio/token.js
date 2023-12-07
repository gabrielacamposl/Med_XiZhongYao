import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import AppConfig from '@/layout/AppConfig';
//--> Componentes de primeReact
import axios from 'axios';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { InputText } from "primereact/inputtext";
import { useRouter } from 'next/router';
//--> Componentes propios
import { temporizador } from '@/helpers/funciones';
import { campoVacio, longiudTokenInvalida, tokenExpirado, exitoToken } from '@/helpers/constantes/mensajes';
import { validarToken } from '@/helpers/constantes/links';

const Token = () => {
  //--> Variable de redireccinamiento
  const router = useRouter();

  //-----------------------| Lista de variables |-----------------------
  //--> Temporizador
  const [tiempo, setTiempo] = useState(300)
  const [verTiempo, setVerTiempo] = useState('')
  //--> Token
  const [token, setToken] = useState('')
  const [estiloToken, setEstiloToken] = useState('')
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
      const respuesta = await axios.get(`${validarToken}${token}`)
      //--> Limpiar campo y estilo
      setToken('')
      setEstiloToken('')
      if (respuesta.status === 200) {
        //--> Avisar estado
        setMensajeRespuesta(exitoToken)
        setEstiloMensajeRespuesta('success')

        //--> Redireccionar al login
        setTimeout(() => { router.push('/') }, 1200)

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

  //---------------------------| Valor que regresara |---------------------------
  return (
    <>
      <Head>
        <title>Restablecer contraseña</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="El usuario confirmara su cuenta creada" />
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

            <p className='text-center text-6xl font-bold'>Confirme su cuenta</p>
            <p className='text-xl text-center'>¡Gracias por elegir Jardín de Edén!</p>
            <p className='text-justify'>
              Verifique en su correo electrónico el e-mail con el asunto <span className='text-cyan-500 font-semibold'>"Correo verificación de cuenta" </span> que contiene el código de confirmación, es posible que el mensaje haya sido enviado a la carpeta SPAM o similar.
            </p>

            <div className='flex justify-content-center mt-6'>
              <div className="p-inputgroup" style={{ width: "380px" }}>
                <InputText placeholder={`Código de confirmación. Tiempo: ${verTiempo}`} className={`${estiloToken}`}
                  value={token} onChange={(e) => setToken(e.target.value)} disabled={tiempo === 0} />
                <Button label='Confirmar' onClick={confirmarUsuario} disabled={tiempo === 0} />
              </div>
            </div>

            {mensajeRespuesta && (
              <div className='mx-auto mt-2' style={{ width: "500px", textAlign: "center" }}>
                <Message severity={estiloMensajeRespuesta} text={mensajeRespuesta} />
              </div>
            )}

            <p className='text-justify mt-5'>
              Si no puede encontrar el mensaje indicado puede utilizar alguna de las opciones que se muestran a continuación.
            </p>

            <div className='flex justify-content-start mt-4'>
              <div className='flex flex-column'>
                {/* <Button label='Enviar nuevo código' severity="danger" className='font-bold mb-2' text onClick={reenviarToken} /> */}
                <Button
                  label='Cancelar' severity="danger" className='font-bold' text
                  onClick={() => router.push('/pages/pantallainicio/crearcuenta')} />
              </div>
            </div>

          </div>
        </div>
        <AppConfig />
      </div>
    </>
  )
}

export default Token

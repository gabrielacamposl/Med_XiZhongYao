import React, { useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import AppConfig from '@/layout/AppConfig';
//--> Componentes de primeReact
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { InputText } from "primereact/inputtext";
//--> Componentes propios
import { campoVacio, emailInvalido } from '@/helpers/constantes/mensajes';
import { restablecerPass } from '@/helpers/constantes/notificaciones';

const RestablecerPassword = () => {
  //--> Mensajes y notificaciones
  const toast = useRef(null);
  const msgs = useRef(null);

  //-----------------------| Lista de variables |-----------------------
  const [email, setEmail] = useState('')
  const [estiloEmail, setEstiloEmail] = useState('')

  //-----------------------| Expresion regular |-----------------------
  const validarEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

  //-----------------------| Mensajes de advertencia |-----------------------
  const mostrarMensaje = (mensaje) => { msgs.current.show({ severity: 'error', detail: `${mensaje}`, sticky: true, closable: false }) };
  const limpiarMensaje = () => { msgs.current.clear() }

  //-----------------------| Funcion de envio |-----------------------
  const restablecerPassword = () => {
    //--> Campo vacio
    if (!email) {
      setEstiloEmail('p-invalid')
      mostrarMensaje(campoVacio)
      setTimeout(() => { limpiarMensaje() }, 3000)
      return
    } else { setEstiloEmail('') }
    //--> Email invalido
    if (!validarEmail.test(email)) {
      setEstiloEmail('p-invalid')
      mostrarMensaje(emailInvalido)
      setTimeout(() => { limpiarMensaje() }, 3000)
      return
    } else { setEstiloEmail('') }

    //--> Revisar que exista el correo

    //--> Envio al back-end
    setEmail('')
    // console.log("Datos enviados")
    toast.current.show({ severity: 'success', summary: `${restablecerPass.titulo}`, detail: `${restablecerPass.contenido}`, life: 3000 });
  }

  //-----------------------| Lo que se muestra en pantalla |-----------------------
  return (
    <>
      <Head>
        <title>Restablecer contraseña</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="El usuario restablecera su password mediante su correo" />
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
        <Toast ref={toast} />
        <div className="xl:col-6 md:col-7 sm:col-offset-6 m-auto">
          <div className="card ">
            <p className='text-center text-4xl font-bold underline'>Restablecer contraseña</p>

            <div className="card-container mx-auto text-center">
              <div className="field">
                <label htmlFor="correo" className="block text-900 text-xl font-medium mb-2">Ingrese su correo</label>
                <span className="p-input-icon-left">
                  <i className="pi pi-user" />
                  <InputText
                    id="correo" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)}
                    className={`${estiloEmail} p-inputtext-lg`} />
                </span>
              </div>

              <div className='mx-auto' style={{ width: "220px", textAlign: "center" }}>
                <Messages ref={msgs} />
              </div>

              <div className='flex justify-content-center my-4'>
                <Button label="Restablecer contraseña" severity="success" size="large" onClick={restablecerPassword} />
              </div>
              <Link
                href="/" className="font-bold no-underline ml-2 cursor-pointer" style={{ color: 'var(--primary-color)' }}
              >
                <span>
                  <i className="pi pi-angle-left" />
                  Regresar
                </span>
              </Link>
            </div>


          </div>
        </div>
        <AppConfig />
      </div>
    </>
  )
}

export default RestablecerPassword

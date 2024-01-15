import React, { useEffect, useState, useRef} from "react";
import Layout from "@/layout/layout";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Image } from 'cloudinary-react';
import { modificarDatos } from '@/components/mensajesNotificaciones/links';
import { Toast } from 'primereact/toast';
import axios from 'axios';



const perfilDoctor = () => {
    //--> Variable de redireccinamiento
  //  const router = useRouter();

    //--> Mensajes y notificaciones
    const toast = useRef(null);

  //----------------| Lista de variables |----------------

  const [nombre, setNombre] = useState('')
  const [apellidos, setApellido] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneL, setPhoneLadas] = useState(null);
  const [descripcion, setDescripcion] = useState('');
  const [correo, setCorreo] = useState('');
  const [direccion, setDireccion] = useState('');
  const [imagen, setImagen] = useState(null);
  const [url, setUrl] = useState('');
  const [especialidad, setEspecialidad] = useState('')
  const [cedula, setCedula] = useState('')


  //--> Validar envio
  const [estiloNombre, setEstiloNombre] = useState('')
  const [estiloApellido, setEstiloApellido] = useState('')
  const [estiloPhone, setEstiloPhone] = useState('')
  const [estiloDescripcion, setEstiloDescripcion] = useState('')
  const [estiloCorreo, setEstiloCorreo] = useState('')
  const [estiloUrl, setEstiloUrl] = useState('')
  const [estiloEspecialidad, setEstiloEspecialidad] = useState('')
  const [estiloCedula, setEstiloCedula] = useState('')

  /*useEffect(() => {
    const nombreCompleto = localStorage.getItem('nombre')
    setNombre(nombreCompleto.split(' ')[0])
    setApellido(nombreCompleto.split(' ')[1])
  }, []) */

  
  // --> Leer localstorage
  const handleImagenSeleccionada = (event) => {
    const file = event.target.files[0];

    // Validar si se seleccionó una imagen
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagen(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  //-----------------------| Envio Nombre |-----------------------
  const cambiarInfo = async () => {
    //--> Validar campos vacios
    if ([nombre, apellidos].includes('')) {
      if (!nombre) setEstiloNombre('p-invalid')
      if (!apellidos) setEstiloApellido('p-invalid')
      mostrarMensaje(camposVacios)
      setTimeout(() => { limpiarMensaje() }, 3000)
      return
    } else {
      setEstiloNombre('')
      setEstiloApellido('')
    }
    //--> Validar formato
    if (/^\d*$/.test(nombre, apellidos)) {
      setEstiloNombre('p-invalid')
      setEstiloApellido('p-invalid')
      mostrarMensaje(formatoNombre)
      setTimeout(() => { limpiarMensaje() }, 3000)
      return
    } else {
      setEstiloNombre('')
      setEstiloApellido('')
    }
      //--> Validar phone
      if (phone.length !== 10) {
        setEstiloPhone('p-invalid')
        mostrarMensaje(contactoInvalido)
        setTimeout(() => { limpiarMensaje() }, 3000)
        return
      } else {
        setEstiloPhone('')
      }
  
      if (/[a-zA-Z]/.test(phone)) {
        setEstiloPhone('p-invalid')
        mostrarMensaje(contactoInvalido)
        setTimeout(() => { limpiarMensaje() }, 3000)
        return
      } else {
        setEstiloPhone('')
      }

    //--> Preparar objeto para enviar
    const token = localStorage.getItem('token')
    const cabecera = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const objetoEnviar = {
      in_nombreDoctor: nombre,
      in_surnameDoctor: apellidos,
      in_telefonoDoctor: phone,
      in_especialidad: especialidad, 
      in_descripcionDoctor :descripcion,
      in_imagenDoctor: imagen,
      pathCedula: cedula,
      in_direccion:direccion,
      in_direccion_maps: url
      
    }
    //--> Enviar peticion
    try {
      const respuesta = await axios.put(modificarDatos, objetoEnviar, cabecera)
      // console.log(respuesta)
      // console.log(`${nombre} ${apellidos}`)
      if (respuesta.status === 200) {
        localStorage.setItem(nombre || apellidos || especialidad || descripcion || imagen || cedula || direccion || url)
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Información modificada', life: 3000 });
        setTimeout(() => {
          //--> Redireccionar
          router.push('/pages/usuario/miCuenta')
        }, 3000);
      }
      
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo modificar la información.', life: 3000 });
    }
    //--> Limpiar campos
 
  }


  

  //----------------| Valor que regresará |----------------
  return (
    <Layout title="Modificar Perfil" description="Modificar perfil del usuario">
      <div className="grid">
        <div className="col-12">
        <Toast ref={toast} />
          <div className="card">
            <div className="surface-card p-5 shadow-2 border-round flex-auto">
              {/* <div className="flex flex-column align-items-center flex-or">
            <span className="font-medium text-900 mb-2">Foto de Perfil</span>
            
            <Button
              icon="pi pi-pencil" // Agrega el icono de lápiz
              className=' p-button-rounded -mt-4 '
            />
          </div>
           */}
              
              <div className="text-900 font-semibold text-lg mt-3">Mi Perfil</div>
              <div className="p-divider p-component p-divider-horizontal p-divider-solid p-divider-left" role="separator">
                <div className="p-divider-content"> </div>
              </div>
              <div className="flex gap-5 flex-column md:flex-row">
                <div className="flex-auto p-fluid">
                  <div className="mb-4">

                    <div className="field mb-4 col-12 md:col-6">
                      <label htmlFor="nombreCompleto" className="block text-900 text-xl font-medium mb-2">Nombre</label>
                      <InputText
                        id="nombreCompleto" type="text" placeholder="Nombre"
                        className={`${estiloNombre} p-inputtext p-component`}
                        value={nombre} onChange={(e) => { setNombre(e.target.value) }} />
                    </div>

                    <div className="field mb-4 col-12 md:col-6">
                      <label htmlFor="apellidos" className="block text-900 text-xl font-medium mb-2">Apellidos</label>
                      <InputText
                        id="apellidos" placeholder="Apellido(s)" type="text"
                        className={`${estiloApellido} p-inputtext p-component`}
                        value={apellidos} onChange={(e) => { setApellido(e.target.value) }} />
                    </div>
                    <div className="field mb-4 col-12 md:col-6">
                      <label className="block text-900 text-xl font-medium mb-2" type="text">Teléfono:</label>
                      <InputText placeholder='Teléfono' className={`${estiloPhone} p-inputtext p-component`}
                        value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className="field mb-4 col-12 md:col-6">
                      <label className="block text-900 text-xl font-medium mb-2" type="text">Especialidad:</label>
                      <InputText placeholder='Especialidad' className={`${estiloEspecialidad} p-inputtext p-component`}
                        value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} />
                    </div>
                    <div className="field mb-4 col-12 md:col-6">
                      <label className="block text-900 text-xl font-medium mb-2" type="text">Cédula Profesional:</label>
                      <InputText placeholder='Cédula Profesional' className={`${estiloCedula} p-inputtext p-component`}
                        value={cedula} onChange={(e) => setCedula(e.target.value)} />
                    </div>
                    <div className="field mb-4 col-12 md:col-6">
                      <label className="block text-900 text-xl font-medium mb-2" type="text">Correo Electrónico:</label>
                      <InputText placeholder='Correo Electrónico' className={`${estiloCorreo} p-inputtext p-component`}
                        value={correo} onChange={(e) => setCorreo(e.target.value)} />
                    </div>
                    <div className="field mb-4 col-12 md:col-6">
                      <label className="block text-900 text-xl font-medium mb-2" type="text">Dirección:</label>
                      <InputText placeholder='Dirección' className={`${estiloDescripcion} p-inputtext p-component`}
                        value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                    </div>
                    <div className="field mb-4 col-12 md:col-6">
                      <label className="block text-900 text-xl font-medium mb-2" type="text">Abrir en google maps:</label>
                      <InputText placeholder='Dirección en google maps' className={`${estiloUrl} p-inputtext p-component`}
                        value={url} onChange={(e) => setUrl(e.target.value)} />
                    </div>
                  </div>

                </div>

              </div>
              <div className="flex flex-column align-items-center">
                <Button aria-label="Update Profile" className="p-button p-component p-ripple w-auto" onClick={cambiarInfo} severity="success">Guardar Cambios</Button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </Layout>
  );
}

export default perfilDoctor;

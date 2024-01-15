import React, { useEffect, useState, useRef } from "react";
import Layout from "@/layout/layout";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Image } from 'cloudinary-react';
import { modificarDatos } from '@/components/mensajesNotificaciones/links';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import { useRouter } from 'next/router';




const perfilDoctor = () => {
  //--> Variable de redireccinamiento
  const [imagen, setImagen] = useState(null);
  const router = useRouter();

  //--> Mensajes y notificaciones
  const toast = useRef(null);

      // Ref para el componente Toast


         // Función para mostrar el mensaje de éxito y redirigir
    const mostrarMensajeExito = (mensaje) => {
        toast.current.show({
            severity: 'success',
            summary: 'Cambios Guardados',
            detail: mensaje,
            life: 3000,
        });
    
          // Redirige al usuario después de 5 segundos
          setTimeout(() => {
            // Cambia la ruta de la redirección según tu estructura de carpetas y archivos
            window.location.href = '/pages/usuario/PerfilDoc/editarPerfil_';
        }, 2000);

       
    };

    // Función para cambiar la información y mostrar el mensaje de éxito
    const cambiarInfo = async () => {
        // ... Lógica para cambiar la información

        // Mostrar mensaje de éxito y redirigir
        mostrarMensajeExito('Los cambios han sido guardados exitosamente');
    };


    const handleImagenSeleccionada = (event) => {
        const file = event.target.files[0];
    
        if (file) {
          const reader = new FileReader();
    
          reader.onloadend = () => {
            setImagen(reader.result);
          };
    
          reader.readAsDataURL(file);
        }
      };



  //----------------| Valor que regresará |----------------
  return (
    <Layout title="Modificar Perfil" description="Modificar perfil del usuario">
      <div className="grid">
        <div className="col-12">
          <Toast ref={toast} />
          <div className="card">
            <div className="surface-card p-5 shadow-2 border-round flex-auto">
              <div className="flex flex-column align-items-center flex-or">
                <span className="font-medium text-900 mb-2">Foto de Perfil </span>
                <label htmlFor="inputImagen" className="font-medium text-900 mb-2">
                  {imagen ? (
                    <img src={imagen} alt="Foto de Perfil" style={{ width: '120px', height: '120px', objectFit: 'cover' }} />
                  ) : (
                    ''
                  )}
                </label>
                <input
                  id="inputImagen"
                  type="file"
                  accept="image/*"
                  onChange={handleImagenSeleccionada}
                  style={{ display: 'none' }}
                />
                <br/>
                <Button
                  icon="pi pi-upload"
                  className="p-button-rounded -mt-4"
                  onClick={() => document.getElementById('inputImagen').click()}
                /> 
              </div>
              <div className="text-900 font-semibold text-lg mt-3">Mi Perfil</div>
              <div className="p-divider p-component p-divider-horizontal p-divider-solid p-divider-left" role="separator">
                <div className="p-divider-content">
                
                </div>
              </div>

              <div className="flex gap-5 flex-column md:flex-row">
                <div className="flex-auto p-fluid">
                  <div className="mb-4">


                    <div className="field mb-4 col-12 md:col-6">
                      <label htmlFor="nombreCompleto" className="block text-900 text-xl font-medium mb-2">Nombre</label>
                      <InputText
                        id="nombreCompleto" type="text" placeholder="Marco Antonio"
                         />
                    </div>

                    <div className="field mb-4 col-12 md:col-6">
                      <label htmlFor="apellidos" className="block text-900 text-xl font-medium mb-2">Apellidos</label>
                      <InputText
                        id="apellidos" placeholder="García Olvera" type="text"
                         />
                    </div>
                    <div className="field mb-4 col-12 md:col-6">
                      <label className="block text-900 text-xl font-medium mb-2" type="text">Teléfono:</label>
                      <InputText placeholder='Teléfono' />
                    </div>
                    <div className="field mb-4 col-12 md:col-6">
                      <label className="block text-900 text-xl font-medium mb-2" type="text">Especialidad:</label>
                      <InputText placeholder='Nefrólogo' />
                    </div>
                    <div className="field mb-4 col-12 md:col-6">
                      <label className="block text-900 text-xl font-medium mb-2" type="text">Cédula Profesional:</label>
                      <InputText placeholder='Cédula Profesional' />
                    </div>
                    <div className="field mb-4 col-12 md:col-6">
                      <label className="block text-900 text-xl font-medium mb-2" type="text">Correo Electrónico:</label>
                      <InputText placeholder='Correo Electrónico' />
                    </div>
                    <div className="field mb-4 col-12 md:col-6">
                      <label className="block text-900 text-xl font-medium mb-2" type="text">Dirección:</label>
                      <InputText placeholder='Dirección' />
                    </div>
                    <div className="field mb-4 col-12 md:col-6">
                      <label className="block text-900 text-xl font-medium mb-2" type="text">Abrir en google maps:</label>
                      <InputText placeholder='Dirección en google maps'  />
                    </div>
                    <div className="field mb-4 col-12 md:col-6">
                      <label className="block text-900 text-xl font-medium mb-2" type="text">Descripción:</label>
                      <InputText placeholder='Descripción sobre usted...'  style={{ width: '100%', height: '150px' }} />
                    </div>
                  </div>
                  

                </div>

              </div>
              <div className="flex flex-column align-items-center">
                <Button aria-label="Update Profile" className="p-button p-component p-ripple w-auto"  onClick={cambiarInfo}  severity="success">Guardar Cambios</Button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </Layout>
  );
}

export default perfilDoctor;

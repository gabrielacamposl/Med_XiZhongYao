import React, { useEffect, useState, useRef } from "react";
import Layout from "@/layout/layout";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Image } from 'cloudinary-react';
import { modificarDatos } from '@/components/mensajesNotificaciones/links';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import { useRouter } from 'next/router';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';




const perfilDoctor = () => {


    const [doctores, setDoctores] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [docInfo, setDocInfo] = useState({});
    const [mostrarDialog, setMostrarDialog] = useState(false);
    const [buscador, setBuscador] = useState('');
    const router = useRouter();

  const datosDoctores = [
    {
        nombre: "Marco Antonio García Olvera",
        telefono: "",
        especialidad: "Nefrólogo",
        status: "",
        imagen: "https://cdhcolima.org.mx/wp-content/uploads/2016/11/user.png",
        dirección: "",
        maps: "",
        email: "docmarcoantoniogar@gmail.com",
        descripcion: ""
    },
];

  //-----------------------| Envio Nombre |-----------------------


  //----------------| Valor que regresará |----------------
  return (
    <Layout title="Modificar Perfil" description="Modificar perfil del usuario">
    <div className="grid">
        <div className="col-12">
            <div className="card">
                {/* Resto del código */}
                <div className="surface-card p-5 shadow-2 border-round flex-auto">
                    {/* ... Otros elementos del perfil */}
                    <div className="text-900 font-semibold text-lg mt-3">Mi Perfil</div>
                    <div className="p-divider p-component p-divider-horizontal p-divider-solid p-divider-left" role="separator">
                        <div className="p-divider-content"> </div>
                    </div>

                    {/* Mostrar información del doctor */}
                    {datosDoctores.map((doctor, index) => (
                        <div key={index} className="flex flex-column ">
                            <div className="flex flex-column  align-items-center">
                            <img style={{ borderRadius: '50%' }} src={doctor.imagen} alt={doctor.nombre} className="h-15rem w-15rem border-rounded" />
                            </div>
                            {/* <Image src={doctor.imagen} alt={doctor.nombre} className="profile-image" /> */}
                            <br/>
                             <div className="flex flex-column  align-items-left">
                             <InputText readOnly value={doctor.nombre} className ="p-inputtext p-component field mb-4 col-12 md:col-6 align-items-left"  />
                             <InputText readOnly value={doctor.telefono} className ="p-inputtext p-component field mb-4 col-12 md:col-6 align-items-left"  />
                             <InputText  className ="p-inputtext p-component field mb-4 col-12 md:col-6 align-items-left" readOnly value={doctor.especialidad}  />
                                <InputText  className ="p-inputtext p-component field mb-4 col-12 md:col-6 align-items-left" readOnly value={doctor.status}  />
                                <InputText readOnly value={doctor.email}className ="p-inputtext p-component field mb-4 col-12 md:col-6 align-items-left" />
                                <InputText readOnly value={doctor.dirección} className ="p-inputtext p-component field mb-4 col-12 md:col-6 align-items-left"/>
                                <InputText readOnly value={doctor.maps} className ="p-inputtext p-component field mb-4 col-12 md:col-6 align-items-left" />
                                <InputText readOnly value={doctor.descripcion} className ="p-inputtext p-component field mb-4 col-12 md:col-6 align-items-left" style={{ width: '100%', height: '150px' }}  />
                                </div>
                          

                           
                        </div>
                    ))}

                    {/* Botón de editar perfil */}
                    <div className="flex flex-column align-items-center">
                        <Button aria-label="Update Profile" className="p-button p-component p-ripple w-auto"  severity="success"  onClick={()=>  router.push('/pages/usuario/PerfilDoc/modificarPerfil')}>Editar Perfil</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</Layout>
  );
}

export default perfilDoctor;

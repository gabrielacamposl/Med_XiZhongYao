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
        telefono: "55 14 75 22 30",
        especialidad: "Nefrólogo",
        status: "50967720",
        imagen: "https://i.pinimg.com/564x/94/f8/14/94f81441022f70fca9c61aa1ee7b7da8.jpg",
        dirección: "Centro Médico Serenidad, Calle Esperanza, Nº 123,  Colonia Tranquilidad, Edo. Méx.",
        maps: "https://maps.app.goo.gl/3RmhCoA4Mpi4XcVw8",
        email: "docmarcoantoniogar@gmail.com",
        descripcion: "Soy un nefrólogo reconocido con una trayectoria dedicada al estudio y tratamiento de enfermedades renales. Mi compromiso con la excelencia clínica y la investigación ha contribuido al avance del campo. He colaborado en estudios clínicos, compartido conocimientos con colegas y estudiantes, y mantenido un enfoque centrado en el paciente. Mi objetivo continuo es mejorar la salud renal y la calidad de vida de mis pacientes, siempre buscando innovar en la atención médica."
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
                                <InputText readOnly value={doctor.descripcion} className ="p-inputtext p-component field mb-4 col-12 md:col-6 align-items-left"  />
                                </div>
                          

                           
                        </div>
                    ))}

                    {/* Botón de editar perfil */}
                    <div className="flex flex-column align-items-center">
                        <Button aria-label="Update Profile" className="p-button p-component p-ripple w-auto"  severity="success">Editar Perfil</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</Layout>
  );
}

export default perfilDoctor;

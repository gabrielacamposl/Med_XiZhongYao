import React, { useEffect, useState, useRef } from "react";
import Layout from "@/layout/layout";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Tag } from 'primereact/tag';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { InputText } from 'primereact/inputtext';
import { useRouter } from 'next/router';
import { Toast } from 'primereact/toast';

const Citas = () => {
  const [citas, setCitas] = useState([]);
  const [layout, setLayout] = useState('grid');
  const [citaInfo, setCitaInfo] = useState({});
  const [mostrarDialog, setMostrarDialog] = useState(false);
  const [buscador, setBuscador] = useState('');

  const router = useRouter();
  const toast = useRef(null);

  const datosCitas = [
    {
      nombrePaciente: "Gabriela Campos Lechuga",
      diaCita: "26/12/2023 ",
      horaCita: "10:00 AM",
    },
    {
      nombrePaciente: "Berenica Franco Cabello",
      diaCita: "28/12/2023 ",
      horaCita: "12:00 PM",
    },
    {
      nombrePaciente: "Andrés Carreón",
      diaCita: "09/01/2024  ",
      horaCita: "5:00 PM",
    },
  ];

  useEffect(() => {
    setCitas(datosCitas);
  }, []);

  const limpiarBusqueda = () => {
    setBuscador("");
    setCitas(datosCitas);
  };

  const buscarEnTiempoReal = (input) => {
    const busqueda = input.toLowerCase();
    const citasFiltradas = datosCitas.filter(
      (cita) =>
        cita.nombrePaciente.toLowerCase().includes(busqueda) ||
        cita.diaCita.toLowerCase().includes(busqueda) ||
        cita.horaCita.toLowerCase().includes(busqueda)
    );
    setCitas(citasFiltradas);
  };

  const header = () => {
    return (
      <div className="flex justify-content-between">
        <div className="p-inputgroup w-4">
          <Button icon="pi pi-search" />
          <InputText
            placeholder="Buscar por nombre o especialidad"
            value={buscador}
            onChange={(e) => {
              setBuscador(e.target.value);
              buscarEnTiempoReal(e.target.value);
            }}
          />
          <Button icon="pi pi-times" onClick={limpiarBusqueda} disabled={!buscador} />
        </div>
        <div className="flex">
          <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
        </div>
      </div>
    );
  };

  const listItem = (cita) => {
    return (
      <div className="col-12">
        <div className="col-12 md:col-8 xl:col-10 p-3 justify-content-center">
          <div className="surface-card shadow-2 border-round p-3">
            <div className="text-center">
              <span className="text-xl text-900 font-medium mb-2">{cita.nombrePaciente}</span> <br />
            </div>
            <div>
              <br />
              <br />
              <i className="pi pi-calendar"></i>
              <label className="font-medium mb-2"> Día de tu cita: </label>
              <label>{cita.diaCita}</label>
              <br />
              <br />
              <i className="pi pi-clock"></i>
              <label className="font-medium mb-2"> Hora de tu cita: </label>
              <label>{cita.horaCita}</label>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const gridItem = (cita) => {
    return (
      <div className="col-12 md:col-8 xl:col-6 p-3">
        <div className="surface-card shadow-2 border-round p-3">
          <div className="text-center">
            <span className="text-xl text-900 font-medium mb-2">{cita.nombrePaciente}</span> <br />
          </div>
          <div>
            <br />
            <br />
            <i className="pi pi-calendar"></i>
            <label className="font-medium mb-2"> Día de tu cita: </label>
            <label>{cita.diaCita}</label>
            <br />
            <br />
            <i className="pi pi-clock"></i>
            <label className="font-medium mb-2"> Hora de tu cita: </label>
            <label>{cita.horaCita}</label>
          </div>
        </div>
      </div>
    );
  };

  const itemTemplate = (cita, layout) => {
    if (!cita) return null;
    return (
      <>
        {layout === 'list' ? listItem(cita) : gridItem(cita)}
      </>
    );
  };

  const handleCancelarCita = (cita) => {
    setCitaInfo(cita);
    setMostrarDialog(true);
  };

  const confirmarCancelarCita = () => {
    const nuevasCitas = citas.filter((c) => c !== citaInfo);
    setCitas(nuevasCitas);

    toast.current.show({
      severity: 'success',
      summary: 'Cita Cancelada',
      detail: 'La cita se ha cancelado con éxito.',
      life: 3000,
    });

    setMostrarDialog(false);
  };

  const handleConfirmCita = (cita) => {
    setCitaInfo(cita);
    setDialogAceptar(true);
  };


  const cancelarCitaFooter = (
    <>
      <Button label="Aceptar" icon="pi pi-check" onClick={confirmarCancelarCita} autoFocus severity="success" />
      <Button label="Cancelar" icon="pi pi-times" onClick={() => setMostrarDialog(false)} severity="dangerous" />
    </>
  );


  return (
    <Layout title="Mis Citas" description="Mis citas">
      <div className="grid">
        <div className="col-12">
          <div className="card">
            <h2>Citas Programadas</h2>
            <DataView value={citas} itemTemplate={itemTemplate} layout={layout} header={header()} />
            <Dialog
              header={`Confirmar cancelación de cita de ${citaInfo.nombrePaciente}`}
              visible={mostrarDialog}
              onHide={() => setMostrarDialog(false)}
              footer={cancelarCitaFooter}
              style={{ width: '35vw' }}
            />
            <Toast ref={toast} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Citas;

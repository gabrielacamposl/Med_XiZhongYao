import React, { useState, useEffect } from 'react';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import Head from 'next/head';
import Layout from '@/layout/layout';

const CitasManager = () => {
  const [citas, setCitas] = useState([]);
  const [selectedCita, setSelectedCita] = useState(null);
  const [date, setDate] = useState(null);
  const [hour, setHour] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showEditarDialog, setShowEditarDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showEliminarDialog, setShowEliminarDialog] = useState(false);


  useEffect(() => {
    // Puedes cargar las citas desde tu API aquí
    // Ejemplo: axios.get('tu-api/citas').then(response => setCitas(response.data));
  }, []);

  const addCita = () => {
    if (!date || !hour) {
      // Realiza alguna lógica para manejar la validación
      setErrorMessage('Por favor, completa la fecha y la hora.');
      return;
    }

    // Limpia el mensaje de error si no hay errores
    setErrorMessage('');

    // Verifica si la fecha seleccionada es posterior a la fecha actual solo al intentar guardar
    const selectedDate = new Date(date);
    const today = new Date();

    if (selectedDate < today) {
      // Muestra un mensaje de error solo si se intenta guardar
      setErrorMessage('No se pueden agendar citas en días anteriores a la fecha actual.');
      return;
    }

    // Verifica si la hora seleccionada ya está ocupada
    const horaOcupada = citas.some(cita => cita.date.getTime() === selectedDate.getTime() && cita.hour === hour);

    if (horaOcupada) {
      // Muestra un mensaje de error solo si se intenta guardar
      setErrorMessage('La hora seleccionada ya está ocupada. Por favor, elige otra hora.');
      return;
    }

    const nuevaCita = {
      date: selectedDate,
      hour,
    };

    // Agrega la nueva cita al estado
    setCitas([...citas, nuevaCita]);

    // Cierra el diálogo
    setShowDialog(false);

    // Puedes enviar la cita al backend aquí para almacenarla en la base de datos
    // Ejemplo: axios.post('tu-api/citas', nuevaCita);
  };

  
  const eliminarCita = () => {
    // Abre el diálogo de confirmación de eliminación
    setShowEliminarDialog(true);
  };

  const confirmarEliminarCita = () => {
    // Realiza la lógica para eliminar la cita
    if (selectedCita) {
      const nuevasCitas = citas.filter(cita => cita !== selectedCita);

      // Actualiza el estado con las citas eliminadas
      setCitas(nuevasCitas);

      // Cierra el diálogo de confirmación de eliminación
      setShowEliminarDialog(false);
    }
  };

  const editarCita = () => {
    // Abre el diálogo de edición
    setShowEditarDialog(true);
  };

  const confirmarEdicionCita = () => {
    // Realiza la lógica para editar la fecha y hora de la cita
    if (selectedCita) {
      const editedCitas = citas.map(cita =>
        cita === selectedCita ? { ...cita, date, hour } : cita
      );

      // Actualiza el estado con las citas editadas
      setCitas(editedCitas);

      // Cierra el diálogo de edición
      setShowEditarDialog(false);
    }
  };

  const renderFooter = () => {
    return (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={addCita} />
        <Button label="Cancelar" icon="pi pi-times" onClick={() => setShowDialog(false)} />
      </div>
    );
  };

  const renderEliminarDialogFooter = () => {
    return (
      <div>
        <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={confirmarEliminarCita} />
        <Button label="Cancelar" icon="pi pi-times" onClick={() => setShowEliminarDialog(false)} />
      </div>
    );
  };

  const renderEditarDialogFooter = () => {
    return (
      <div>
        <Button label="Guardar Cambios" icon="pi pi-check" onClick={confirmarEdicionCita} />
        <Button label="Cancelar" icon="pi pi-times" onClick={() => setShowEditarDialog(false)} />
      </div>
    );
  };

  return (
    <Layout>
    <Head>
        <title>XiZhongYao - Gestión de Citas</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="El usuario podra darse de alta en el sistema" />
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
      <div className="grid">
        <div className="col-12">
          <div className="card">
            <div>
              <Button label="Agregar Cita" icon="pi pi-calendar" onClick={() => setShowDialog(true)} />
              <Dialog header="Agregar Cita" visible={showDialog} style={{ width: '30vw' }} footer={renderFooter()} onHide={() => setShowDialog(false)}>
                <div className="p-field">
                  <label htmlFor="date">Fecha:</label>
                  <Calendar id="date" value={date} onChange={(e) => setDate(e.value)} showButtonBar />
                </div>
                <div className="p-field">
                  <label htmlFor="hour">Hora:</label>
                  <input type="time" id="hour" value={hour} onChange={(e) => setHour(e.target.value)} />
                </div>
                {errorMessage && (
                  <div className="mt-4">
                    <Message severity="error" text={errorMessage} />
                  </div>
                )}
              </Dialog>

              <DataTable value={citas} selectionMode="single" selection={selectedCita} onSelectionChange={(e) => setSelectedCita(e.value)}>
                <Column field="date" header="Fecha" body={(rowData) => rowData.date.toLocaleDateString()} />
                <Column field="hour" header="Hora" />
                <Column
                  body={(rowData) => (
                    <div>
                      <Button label="Editar" icon="pi pi-pencil" className="p-button-warning" onClick={() => { setSelectedCita(rowData); editarCita(); }} />
                   
                      <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={() => { setSelectedCita(rowData); eliminarCita(); }} />
                    </div>
                  )}
                />
              </DataTable>

              <Dialog header="Confirmar Eliminación" visible={showEliminarDialog} style={{ width: '30vw' }} footer={renderEliminarDialogFooter()} onHide={() => setShowEliminarDialog(false)}>
                {selectedCita && (
                  <div>
                    <p>¿Estás seguro que deseas eliminar esta cita?</p>
                    <p><strong>Fecha:</strong> {selectedCita.date.toLocaleDateString()}</p>
                    <p><strong>Hora:</strong> {selectedCita.hour}</p>
                  </div>
                )}
              </Dialog>

              <Dialog header="Editar Cita" visible={showEditarDialog} style={{ width: '30vw' }} footer={renderEditarDialogFooter()} onHide={() => setShowEditarDialog(false)}>
                <div className="p-field">
                  <label htmlFor="editedDate">Nueva Fecha:</label>
                  <Calendar id="editedDate" value={date} onChange={(e) => setDate(e.value)} showButtonBar />
                </div>
                <div className="p-field">
                  <label htmlFor="editedHour">Nueva Hora:</label>
                  <input type="time" id="editedHour" value={hour} onChange={(e) => setHour(e.target.value)} />
                </div>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CitasManager;

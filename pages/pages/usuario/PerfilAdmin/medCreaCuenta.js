import React, { useState } from "react";
import Layout from "@/layout/layout";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';

const ValidarMedico = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [tituloDocumento, setTituloDocumento] = useState(null);
  const [cedulaDocumento, setCedulaDocumento] = useState(null);

  const handleSubmit = () => {
    // Realizar validaciones antes de enviar la información
    if (!nombre || !correo || !especialidad || !tituloDocumento || !cedulaDocumento) {
      alert("Por favor completa todos los campos");
      return;
    }

    // Aquí puedes enviar la información al servidor
    // Por ejemplo, podrías usar axios para hacer una solicitud POST al servidor
    // axios.post('/api/validarMedico', { nombre, correo, especialidad, tituloDocumento, cedulaDocumento })
    //   .then(response => {
    //     // Manejar la respuesta del servidor
    //   })
    //   .catch(error => {
    //     // Manejar errores
    //   });
  };

  return (
    <Layout title="Validar Médico" description="Validar a un médico">
      <div className="grid">
        <div className="col-12">
          <div className="card">
            <h2>Validar Médico</h2>
            <div className="p-field">
              <label htmlFor="nombre">Nombre del Médico</label>
              <InputText id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div className="p-field">
              <label htmlFor="correo">Correo Electrónico</label>
              <InputText id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
            </div>
            <div className="p-field">
              <label htmlFor="especialidad">Especialidad</label>
              <InputText id="especialidad" value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} />
            </div>
            <div className="p-field">
              <label>Documento de Título (.pdf)</label>
              <FileUpload
                mode="basic"
                accept="application/pdf"
                chooseLabel="Seleccionar"
                uploadLabel="Subir"
                cancelLabel="Cancelar"
                customUpload
                uploadHandler={(event) => setTituloDocumento(event.files[0])}
              />
            </div>
            <div className="p-field">
              <label>Documento de Cédula (.pdf)</label>
              <FileUpload
                mode="basic"
                accept="application/pdf"
                chooseLabel="Seleccionar"
                uploadLabel="Subir"
                cancelLabel="Cancelar"
                customUpload
                uploadHandler={(event) => setCedulaDocumento(event.files[0])}
              />
            </div>
            <Button label="Validar Médico" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ValidarMedico;

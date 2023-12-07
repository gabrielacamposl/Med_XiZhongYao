import React, { useEffect, useState, useRef } from "react";
import Layout from "@/layout/layout"
//--> Componentes primeReact
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';
import { Message } from 'primereact/message';
//--> Funciones propias
import { objetoVacio } from "@/components/catalogos/objetovacio";
import axios from "axios";
import { consultarPedidosCancelados } from "@/helpers/constantes/links";
import { formatearFecha } from "@/helpers/funciones";


const Cancelaciones = () => {
  //--> Estructura de objeto vacio
  let ordenVacia = objetoVacio

  //----------------| Lista de variables |----------------
  //--> Registros
  const [order, setOrder] = useState(ordenVacia);
  const [orders, setOrders] = useState(null);
  //--> Dialogos
  const [deleteOrderDialog, setDeleteOrderDialog] = useState(false);
  const [deleteOrdersDialog, setDeleteOrdersDialog] = useState(false);
  //--> Otros
  const [selectedOrders, setSelectedOrders] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  //--> Mensajes
  const [mensajeRespuesta, setMensajeRespuesta] = useState('')
  //--> Especiales
  const toast = useRef(null);
  const dt = useRef(null);

  const verPedidosCancelados = async () => {
    console.log('Ver pedidos cancelados')
    //--> Preparar objeto para mandar al back-end
    const token = localStorage.getItem('token')
    const cabecera = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const respuesta = await axios.get(consultarPedidosCancelados, cabecera)
      console.log(respuesta.data.cancelados)
      setOrders(respuesta.data.cancelados)
    } catch (error) { console.log(error) }
  }

  useEffect(() => { verPedidosCancelados() }, [])

  //--> Cargar cuando se renderiza
  // useEffect(() => {
  //   const datos = [
  //     { id: 115, idCliente: 15, nomCliente: 'Omar Yu', fechaDev: 25 },
  //     { id: 119, idCliente: 49, nomCliente: 'Lisa Mora', fechaDev: 293 },
  //     { id: 205, idCliente: 13, nomCliente: 'Alhatam L.', fechaDev: 27 },
  //     { id: 163, idCliente: 65, nomCliente: 'Mario Quintos', fechaDev: 153 },
  //   ]
  //   setOrders(datos)
  // }, []);


  //----------------| Interaccion con dialogos |----------------

  const cerrarDialogoEliminarRegistro = () => { setDeleteOrderDialog(false) };

  const cerrarDialogoEliminarRegistros = () => { setDeleteOrdersDialog(false) }

  //----------------| Funciones Back-end |----------------

  //--> Editar registro


  const confirmarEliminarRegistro = (order) => {
    setOrder(order);
    setDeleteOrderDialog(true);
  };

  const eliminarRegistro = () => {
    //--> Registros que no sean los seleccionados
    let _orders = orders.filter((val) => val.id !== order.id);

    setOrders(_orders);
    setDeleteOrderDialog(false);
    setOrder(ordenVacia);
    toast.current.show({
      severity: 'success', summary: 'Registro(s) de cancelación eliminado', detail: 'Se ha eliminado correctamente el registro seleccionado', life: 3000
    });
  };


  const confirmDeleteSelected = () => { setDeleteOrdersDialog(true) }

  const deleteSelectedOrders = () => {
    //--> Registros que no son seleccionados
    let _orders = orders.filter((val) => !selectedOrders.includes(val));

    setOrders(_orders);
    setDeleteOrdersDialog(false);
    setSelectedOrders(null);
    toast.current.show({
      severity: 'success', summary: 'Registro(s) de cancelación eliminado', detail: 'Se ha eliminado correctamente el registro seleccionado', life: 3000
    });
  };


  //----------------| Botones de dialogos |----------------
  const cabezal = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Registro de Cancelaciones</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
      </span>
    </div>
  );

  const deleteButton = () => {
    return (
      <div className="flex flex-wrap gap-2">

        <Button label="Eliminar" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedOrders || !selectedOrders.length} />
      </div>
    );
  };


  const botonesAccion = (rowData) => {
    return (
      <>
        <Button icon="pi pi-trash" rounded severity="danger" onClick={() => confirmarEliminarRegistro(rowData)} />
      </>
    );
  };


  const botonesEliminarRegistro = (
    <>
      <Button severity="success" label="Aceptar" icon="pi pi-check" onClick={eliminarRegistro} />
      <Button severity="danger" label="Cancelar" icon="pi pi-times" onClick={cerrarDialogoEliminarRegistro} />

    </>
  );

  const botonesEliminarRegistros = (
    <>
      <Button label="Aceptar" icon="pi pi-check" severity="success" onClick={deleteSelectedOrders} />
      <Button label="Cancelar" severity="danger" icon="pi pi-times" onClick={cerrarDialogoEliminarRegistros} />

    </>
  );

  const plantillaFechaCompra = (rowData) => { return formatearFecha(rowData.fechaCompra) }
  const plantillaFechaEntrega = (rowData) => { return formatearFecha(rowData.fechaEntrega) }
  const plantillaFechaDev = (rowData) => { return formatearFecha(rowData.fechaLimiteDev) }
  const plantillaFechaCancelacion = (rowData) => { return formatearFecha(rowData.fechaCancelacion) }
  //----------------| Valor que regresara |----------------
  return (
    <Layout
      title="Cancelaciones"
      description="Acceso al registro de cancelaciones"
    >
      <div className="grid">
        <Toast ref={toast} />
        <div className="col-12">
          <div className="card">
            <Toolbar className="mb-4" right={deleteButton} />

            <DataTable
              ref={dt} value={orders} selection={selectedOrders} onSelectionChange={(e) => setSelectedOrders(e.value)}
              paginator rows={15} rowsPerPageOptions={[5, 10, 15]} showGridlines
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Mostrando {first} - {last} de {totalRecords} registros"
              globalFilter={globalFilter} header={cabezal}
            >
              <Column selectionMode="multiple" exportable={false} />
              <Column field="nombrePedido" header="ID pedido" sortable style={{ minWidth: '12rem', textAlign: "center" }} />
              <Column
                field="fechaCompra" header="Fecha de compra" sortable style={{ minWidth: '12rem', textAlign: "center" }}
                body={plantillaFechaCompra}
              />
              <Column
                field="fechaEntrega" header="Fecha de entrega" sortable style={{ minWidth: '16rem', textAlign: "center" }}
                body={plantillaFechaEntrega}
              />
              <Column
                field="fechaLimiteDev" header="Fecha de devolucion" sortable style={{ minWidth: '16rem', textAlign: "center" }}
                body={plantillaFechaDev}
              />
              <Column
                field="fechaCancelacion" header="Fecha de cancelación" sortable style={{ minWidth: '16rem', textAlign: "center" }}
                body={plantillaFechaCancelacion}
              />

              <Column header="Eliminar registro" body={botonesAccion} exportable={false} style={{ minWidth: '5rem', textAlign: "center" }} />
            </DataTable>



            <Dialog
              visible={deleteOrderDialog} style={{ width: '32rem' }}
              breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Eliminar Registro" modal footer={botonesEliminarRegistro}
              onHide={cerrarDialogoEliminarRegistro}
            >
              <div className="confirmation-content">
                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                {order && (
                  <span>
                    ¿Está seguro de eliminar el registro?
                  </span>
                )}
              </div>
            </Dialog>

            <Dialog visible={deleteOrdersDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Eliminar Resgitros" modal footer={botonesEliminarRegistros} onHide={cerrarDialogoEliminarRegistros}>
              <div className="confirmation-content">
                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                {order && <span>¿Está seguro de eliminar los registros?</span>}
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Cancelaciones
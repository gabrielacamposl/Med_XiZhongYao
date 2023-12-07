import React, { useEffect, useState, useRef } from "react";
import Layout from "@/layout/layout"
//--> Componentes primeReact
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { RadioButton } from 'primereact/radiobutton';

import { Chip } from 'primereact/chip';
//--> Funciones propias
import { objetoVacio } from "@/components/catalogos/objetovacio";
import { formatearFecha, formatoPrecio } from "@/helpers/funciones";
import { FormatoFecha } from "@/helpers/funciones";
import axios from "axios";
import { consultarPedidos } from "@/helpers/constantes/links";


const Ordenes = () => {
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


  //-> Estatus Pedido
  //---------- | Modificar Status | ------------
  const [displayDialog, setDisplayDialog] = useState(false);
  const [pedidoStatus, setPedidoStatus] = useState('');
  const [estatusOptions, setEstatusOptions] = useState([
    { label: 'En preparación', value: 'En preparación' },
    { label: 'En camino', value: 'En camino' },
    { label: 'Entregado', value: 'Entregado' }
  ]);

  const [mensajeRespuesta, setMensajeRespuesta] = useState('')
  //--> Especiales
  const toast = useRef(null);
  const dt = useRef(null);


  const consultarOrdenes = async () => {
    console.log('Consultando ordenes')
    //--> Preparar objeto para mandar al back-end
    const token = localStorage.getItem('token')
    const cabecera = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const respuesta = await axios.get(consultarPedidos, cabecera)
      // const ordenes = await respuesta.json()
      console.log(respuesta.data.pedidos)
      setOrders(respuesta.data.pedidos)
    } catch (error) {

    }
  }
  //--------- |Cargar cuando se renderiza |----------
  useEffect(() => { consultarOrdenes() }, [])

  const getSeverity = (order) => {
    switch (order.estadoOrden) {
      case 'Entregado': return 'success';
      case 'En camino': return 'warning';
      case 'En preparación': return 'danger';
      default: return null;
    }
  };

  // --------- |Mostrar productos |----------
  // const plantillaProductos = (rowData) => {
  //   return (
  //     <div>
  //       {rowData.productos.map((producto, index) => (
  //         <Chip
  //           key={index}
  //           label={`Producto: ${producto.nombre} Cantidad: (${producto.cantidad})`}
  //           className="p-mr-2"
  //         />
  //       ))}
  //     </div>
  //   );
  // }

  //------------- | Dialogo Estatus |-------- 

  const handleButtonClick = () => {
    setDisplayDialog(true);
  };

  const handleDialogHide = () => {
    setDisplayDialog(false);
  };

  const handleStatusChange = (e) => {

    let _orden = { ...order };

    _orden['estadoOrden'] = e.value;
    setPedidoStatus(_orden);

    toast.current.show({
      severity: 'success', summary: 'Estatus Guardado', detail: 'Se ha actualizado correctamente el estatus del pedido', life: 3000
    });


    setDisplayDialog(false);
  };


  // --------- |Plantillas| -------------

  // const plantillaEstatus = (rowData) => {
  //   return <Tag value={rowData.estadoOrden} severity={getSeverity(rowData)}></Tag>;
  // };
  // const plantillaPrecio = (rowData) => { return formatoPrecio(rowData.Total) }
  // const fecha = (rowData) => { return FormatoFecha(rowData.fechaRecepcion) }
  const plantillaFechaEntrega = (rowData) => { return formatearFecha(rowData.fechaEntrega) }
  const plantillaFechaDevolucion = (rowData) => { return formatearFecha(rowData.fechaLimiteDev) }

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
      severity: 'success', summary: 'Registro(s) de ordenes eliminado', detail: 'Se ha eliminado correctamente el registro seleccionado', life: 3000
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
      severity: 'success', summary: 'Registro(s) de ordenes eliminado', detail: 'Se ha eliminado correctamente el registro seleccionado', life: 3000
    });
  };


  //----------------| Botones de dialogos |----------------
  const cabezal = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Registro de Órdenes</h4>
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
        <Button label="Estatus"
          icon='pi pi-pencil'
          severity="success"
          onClick={handleButtonClick}
        />
        <Button icon="pi pi-trash" label="Eliminar" severity="danger" onClick={() => confirmarEliminarRegistro(rowData)} />
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

  //----------------| Valor que regresara |----------------
  return (
    <Layout
      title="órdenes"
      description="Acceso al registro de Ordenes"
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
              <Column field="nombrePedido" header="ID Orden" sortable style={{ minWidth: '12rem', textAlign: "center" }} />
              <Column
                field="fechaEntrega" header="Fecha de realización de pedido" sortable body={plantillaFechaEntrega}
                style={{ minWidth: '16rem', textAlign: "center" }} ></Column>
              {/* <Column
                field="fechaLimiteDev" header="Fecha de devolución" sortable body={plantillaFechaDevolucion}
                style={{ minWidth: '16rem', textAlign: "center" }} ></Column> */}
              <Column
                field="totalArticulos" header="Productos" sortable
                style={{ minWidth: '12rem', textAlign: "center" }}
              />
              <Column
                field="costoArticulos" header="Costo de artículos" sortable style={{ minWidth: '16rem', textAlign: "center" }} />
              <Column field="costoEnvio" header="Costo de envio" sortable style={{ minWidth: '12rem', textAlign: "center" }} />
              <Column field="costoTotal" header="Costo total" sortable style={{ minWidth: '12rem', textAlign: "center" }} />
              <Column header="Modificar Estatus / Eliminar registro" body={botonesAccion} exportable={false} style={{ minWidth: '20rem', textAlign: "center" }} />
            </DataTable>
            <Dialog
              visible={displayDialog}
              onHide={handleDialogHide}
              header="Modificar estado del pedido"
              footer={
                <div>
                  <Button label="Guardar" severity="success" onClick={handleStatusChange} autoFocus />
                  <Button label="Cancelar" severity="danger" onClick={handleDialogHide} className="p-button-text" />

                </div>
              }
            >
              <div>
                <h5>Nuevo estado del pedido:</h5> <br />
                {estatusOptions.map((option) => (
                  <div key={option.value}>
                    <RadioButton
                      inputId={option.value}
                      name="pedidoStatus"
                      value={option.value}
                      onChange={(e) => setPedidoStatus(e.value)}
                      checked={pedidoStatus === option.value}
                    />
                    <label htmlFor={option.value}>{option.label}</label>
                  </div>
                ))}
              </div>
            </Dialog>

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

            <Dialog visible={deleteOrdersDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Eliminar Registros" modal footer={botonesEliminarRegistros} onHide={cerrarDialogoEliminarRegistros}>
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

export default Ordenes
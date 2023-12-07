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

import { formatoPrecio } from "@/helpers/funciones";
import { camposVacios, descripcionInvalida, descuendoInvalido, nombreInvalido } from "@/helpers/constantes/mensajes";

import { FormatoFecha } from "@/helpers/funciones";


const Devoluciones = () => {
  //--> Estructura de objeto vacio
  let ordenVacia = objetoVacio

  //----------------| Lista de variables |----------------
  //--> Registros
  const [order, setOrder] = useState(ordenVacia);
  const [orders, setOrders] = useState(null);
  //--> Dialogos
  const [deleteOrderDialog, setDeleteOrderDialog] = useState(false);
  const [deleteOrdersDialog, setDeleteOrdersDialog] = useState(false);
  const [orderDialog, setOrderDialog] = useState(false);
  //--> Otros
  const [selectedOrders, setSelectedOrders] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  //--> Mensajes
  const [mensajeRespuesta, setMensajeRespuesta] = useState('')
    //-> Estatus Pedido
   //---------- | Modificar Status | ------------
   const [displayDialog, setDisplayDialog] = useState(false);
   const [pedidoStatus, setPedidoStatus] = useState('');
   const [estatusOptions, setEstatusOptions] = useState([
     { label: 'Pendiente', value: 'Pendiente' },
     { label: 'Procesada', value: 'Procesada' },
     { label: 'Rechazada', value: 'Rechazada' }
   ]);


  //--> Especiales
  const toast = useRef(null);
  const dt = useRef(null);

  //--> Cargar cuando se renderiza
  useEffect(() => {
    const datos = [
      { idDev: 1, idProducto: 565, nomProducto: "Peluche Chimmy", estadoDev: "Pendiente", fechaDev : '20-06-2023', motivo: "Está roto", precioDev: 398.00,  idCliente: 15, nomCliente:'Omar Yu' , notas: "Lo quiero devolver porque ya no lo quiero."},
      { idDev: 2, idProducto: 465, nomProducto: "Peluche Cooky Bebé",  estadoDev: "Pendiente",  fechaDev : '15-05-2023', motivo: "Está deforme", precioDev: 599.00,  idCliente: 18, nomCliente:'Lisa Mora' , notas: "No me gustó para regalar."},
      { idDev: 3, idProducto: 12, nomProducto: "Rosetas primaverales", estadoDev: "Rechazada",  fechaDev : '03-06-2023',  motivo: "Llegarón maltratadas.", precioDev: 278.50,  idCliente: 136, nomCliente:'Lorena García' , notas: "..."},
      { idDev: 4, idProducto: 68, nomProducto: "Jirafa jumbo",  estadoDev: "Procesada", fechaDev : '30-05-2023',  motivo: "Está descocido", precioDev: 800.99,  idCliente: 15, nomCliente:'Paola Campos' , notas: "..."},
      { idDev: 5, idProducto: 645, nomProducto: "Delfín amistoso", estadoDev: "Pendiente", fechaDev : '01-04-2023',  motivo: "Color equivocado", precioDev: 215.00,  idCliente: 64, nomCliente:'Enrique Hernández' , notas: "..."},
      { idDev: 6, idProducto: 31, nomProducto: "Tulipán", estadoDev: "Rechazada", fechaDev : '09-05-2023',  motivo: "Hojas secas", precioDev: 150.00,  idCliente: 353, nomCliente:'Juan Montes' , notas: "..."},
     
     
    ]
    setOrders(datos)
  }, []);


  const getSeverity = (order) => {
    switch (order.estadoDev) {
      case 'Procesada': return 'success';
      case 'Pendiente': return 'warning';
      case 'Rechazada': return 'danger';
      default: return null;
    }
  };

  
  const plantillaEstatus = (rowData) => {
    return <Tag value={rowData.estadoDev} severity={getSeverity(rowData)}></Tag>;
  };
  //----------------| Interaccion con dialogos |----------------
 
  const cerrarDialogoEliminarRegistro = () => { setDeleteOrderDialog(false) };
const cerrarDialogoEliminarRegistros = () => { setDeleteOrdersDialog(false) }

//------------- | Dialogo Estatus |-------- 

const handleButtonClick = () => {
    setDisplayDialog(true);
  };

  const handleDialogHide = () => {
    setDisplayDialog(false);
  };

  const handleStatusChange = (order) => {
   
    setOrder({ ...order });
    setOrderDialog(true);

    toast.current.show({
      severity: 'success', summary: 'Estatus Guardado', detail: 'Se ha actualizado correctamente el estatus del pedido', life: 3000
    });
    
       
    setDisplayDialog(false);
  };
  //----------------| Funciones Back-end |----------------
 
    //--> Editar registro
   
    const botonesCrearModificar = (
        <>
          <Button security="success" label="Guardar" severity="success" icon="pi pi-check"  />
          <Button security="danger" label="Cancelar"  severity="danger" icon="pi pi-times"x />
        </>
      );
      const cambiarEstatus = (e) => {
        let _order = { ...order };
    
        _order ['estadoDev'] = e.value;
        setOrder(_order);
      };

  const confirmarEliminarRegistro = (order) => {
    setOrder(order);
    setDeleteOrderDialog(true);
  };

  const abrirDialogoCM = () => {
    setOrder(ordenVacia);
    setSubmitted(false);
    setOrderDialog(true);
  };
  const cerrarDialogoCM = () => {
    setSubmitted(false);
    setOrderDialog(false);
  };
  
//   const editarRegistro = (order) => {
//     setOrder({ ...order });
//     setOrderDialog(true);
//   };

  const eliminarRegistro = () => {
    //--> Registros que no sean los seleccionados
    let _orders = orders.filter((val) => val.id !== order.idDev);

    setOrders(_orders);
    setDeleteOrderDialog(false);
    setOrder(ordenVacia);
    toast.current.show({
      severity: 'success', summary: 'Registro(s)  de cancelación eliminado(s)', detail: 'Se ha eliminado correctamente el registro seleccionado.', life: 3000
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
      severity: 'success', summary: 'Registro(s) de cancelación eliminado(s)', detail: 'Se ha eliminado correctamente el registro seleccionado', life: 3000
    });
  };

  const plantillaPrecio = (rowData) => { return formatoPrecio(rowData.precioDev) }
  const fecha = (rowData) => {return FormatoFecha(rowData.fechaDev) }
  
  //----------------| Botones de dialogos |----------------
  const cabezal = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Registro de Devoluciones</h4>
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
        <Button icon="pi pi-check-square"  severity="success" label="Validar" onClick={handleButtonClick}    /> 
        
        {/* onClick={() => {() => editarRegistro(rowData)}} */}
        <Button icon="pi pi-trash" severity="danger" onClick={() => confirmarEliminarRegistro(rowData)} label="Eliminar" />
      </>
    );
  };


  const botonesEliminarRegistro = (
    <>
      <Button severity="success" label="Aceptar" icon="pi pi-check"  onClick={eliminarRegistro} />
      <Button severity="danger" label="Cancelar" icon="pi pi-times"  onClick={cerrarDialogoEliminarRegistro} />
      
    </>
  );

  const botonesEliminarRegistros = (
    <>
    <Button label="Aceptar" icon="pi pi-check" severity="success" onClick={deleteSelectedOrders} />
      <Button label="Cancelar"  severity="danger" icon="pi pi-times"   onClick={cerrarDialogoEliminarRegistros} />
      
    </>
  );

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
              <Column field="idDev" header="ID Devolución" sortable style={{ minWidth: '12rem', textAlign: "center" }} />
              <Column field="idProducto" header="ID Producto" sortable style={{ minWidth: '10rem', textAlign: "center" }} />
              <Column field="nomProducto" header="Nombre del Producto" sortable style={{ minWidth: '16rem', textAlign: "center" }} />
              <Column field="fechaDev" header="Fecha de Devolución"  sortable style={{ minWidth: '16rem', textAlign: "center" }}> <FormatoFecha fechaDev={fecha} /> </Column>
              <Column field="motivo" header="Motivo" sortable style={{ minWidth: '16rem', textAlign: "center" }} />
              <Column field="precioDEV" header="Cantidad a Devolver" body={plantillaPrecio}  sortable style={{ minWidth: '16rem', textAlign: "center" }} />
              <Column field="estadoDev" header="Estado de la Devolución"   body={plantillaEstatus} sortable style={{ minWidth: '16rem', textAlign: "center" }} />
              <Column field="idCliente" header="ID Cliente" sortable style={{ minWidth: '10rem', textAlign: "center" }} />
              <Column field="nomCliente" header="Nombre Cliente" sortable style={{ minWidth: '16rem', textAlign: "center" }} />
              
              <Column header="Validar / Eliminar registro" body={botonesAccion} exportable={false} style={{ minWidth: '20rem' , textAlign: "center"}} />
            </DataTable>

            <Dialog
        visible={displayDialog}
        style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        modal className="p-fluid" 
        onHide={handleDialogHide}
        header="Modificar estado del pedido"
        footer={
          <div>
            <Button label="Guardar" severity="success" onClick={handleStatusChange} autoFocus />
            <Button label="Cancelar" severity="danger" onClick={handleDialogHide}  />
            
          </div>
        }
      >
        <div>
       
        <div className="field">
                <label htmlFor="nombre" className="font-bold">Nombre del Cliente:  {order.nomCliente} </label> <br/> <br/>
                 <label htmlFor="nombre" className="font-bold">Producto a Devolver: </label>
                <label> {order.idProducto} </label> <br/> <br/>
                 <label htmlFor="idCliente" className="font-bold">Motivo: </label>
                 <label> {order.motivo} </label> <br/> <br/>
                 <label htmlFor="nombre" className="font-bold">Cantidad a Devolver:  </label>
                <label body={plantillaPrecio}> ${order.precioDev} MXN  </label> <br/> <br/>
                 <label htmlFor="idCliente" className="font-bold">Notas: </label>
                 <label> {order.notas} </label> <br/>
                
               
              </div>

          <h5>Nuevo estado del pedido:</h5> <br/>
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
              breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={botonesEliminarRegistro}
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

export default Devoluciones
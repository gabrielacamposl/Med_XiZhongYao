import React, { useState } from "react";
import Layout from "@/layout/layout"
import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Paginator } from 'primereact/paginator';
// import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';

const Dashboard = () => {

 //------------------------------|Para mostrar peluches en novedades| |SOLO VISUALIZACIÓN BETA|----------------

 

 //-----------------|IMAGENES CARRUSEL NOVEDADES|----------------

  const [products, setProducts] = useState([]);

  const responsiveOptions = [
    { breakpoint: '1190px', numVisible: 1, numScroll: 1 },
    { breakpoint: '990px', numVisible: 2, numScroll: 2 },
    { breakpoint: '950px', numVisible: 3, numScroll: 3},
  ];

  const temporadas = [
    { temporada: "Invierno", duracion: "10 dias" , image: "https://i.pinimg.com/originals/7b/4a/09/7b4a091e790978ebca8bebed22d838c6.png"},
    { temporada: "Primavera", duracion: "12 dias" , image: "https://i.pinimg.com/originals/6f/d4/13/6fd413398bdd8e81fccddef9f1e247a8.png"},
    { temporada: "Invierno", duracion: "10 dias" , image: "https://i.pinimg.com/originals/30/f7/17/30f717dcc907771af93fa4a7c8dd7795.png"},
    { temporada: "Primavera", duracion: "12 dias" , image: "https://i.pinimg.com/originals/6f/d4/13/6fd413398bdd8e81fccddef9f1e247a8.png"},
    { temporada: "Invierno", duracion: "10 dias" , image: "https://i.pinimg.com/originals/30/f7/17/30f717dcc907771af93fa4a7c8dd7795.png"},
  ]


  const plantillaTemporada = (temporadas) => {
    return (
      <div className="flex align-items-center ">
     
        <img  className="align-items-center "  src={`${temporadas.image}`}  style={{ width: '950px', height: '330px' }} />
          {/* <img src={`https://primefaces.org/cdn/primereact/images/product/${temporadas.image}`}
           className="w-6 shadow-2" /> */}

        {/* <div>
          <h4 className="mb-1">{temporadas.temporada}</h4>
          <h6 className="mt-0 mb-3">{temporadas.duracion}</h6>
          <Tag value={temporada.inventoryStatus} severity={getSeverity(temporada)}></Tag>
          <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
            <Button icon="pi pi-search" className="p-button p-button-rounded" />
            <Button icon="pi pi-star-fill" className="p-button-success p-button-rounded" />
          </div> */}
        {/* </div> */}
      </div>
    );
  };


  return (
    <Layout
      title="Inicio"
      description="Página principal de Jardín del Edén"
    >
      <div className="grid">
        <div className="col-12">
          <div className="card">
            <h2 className="text-center">NOVEDADES</h2>
            <Carousel value={temporadas} numVisible={1} numScroll={3}
              className="custom-carousel" circular responsiveOptions={responsiveOptions}
              autoplayInterval={3000} itemTemplate={plantillaTemporada} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard

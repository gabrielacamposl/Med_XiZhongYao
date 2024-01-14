import React from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';

const AppMenu = () => {

  const model = [
  
    {
      label: 'Disponibilidad de Citas',
      items: [
        { label: 'Gestión de citas', icon: 'pi pi-calendar-plus', to: '/pages/Citas/gestionCitas' },

      ]
    },
    {
      label: 'Visualización de Citas',
      items: [
        { label: 'Citas', icon: 'pi pi-book', to: '/pages/usuario/PerfilDoc/citasProgra' },
      ]
    },
   
  ];

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
        })}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;

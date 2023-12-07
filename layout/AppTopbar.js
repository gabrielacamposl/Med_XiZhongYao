import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { classNames } from 'primereact/utils';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import React, { forwardRef, useContext, useImperativeHandle, useRef, useState } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppTopbar = forwardRef((props, ref) => {
  const router = useRouter();
  const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
  const menubuttonRef = useRef(null);
  const topbarmenuRef = useRef(null);
  const topbarmenubuttonRef = useRef(null);

  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
    topbarmenu: topbarmenuRef.current,
    topbarmenubutton: topbarmenubuttonRef.current
  }));

  //----------------------| Modal confirmacion antes de salir |----------------------
  const aceptarDesicion = () => {
    localStorage.removeItem('token');
    console.log("Acepto")
    router.push('/')
  }

  const rechazarDesicion = () => {
    console.log("Nego")
  }

  const confirmarDesicion = () => {
    confirmDialog({
      message: '¿Estás seguro de cerrar la sesión?',
      header: 'Terminar sesión.',
      icon: 'pi pi-info-circle',
      position: 'top',
      accept: aceptarDesicion,
      reject: rechazarDesicion
    });
  };

  return (
    <div className="layout-topbar">
      <ConfirmDialog />
      <Link href="/pages/dashboard" className="layout-topbar-logo">
        <img src={`/layout/images/logo-${layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'}.svg`} width="47.22px" height={'35px'} widt={'true'} alt="logo" />
        <span>Administrador</span>
      </Link>

      <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
        <i className="pi pi-bars" />
      </button>

      <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
        <i className="pi pi-ellipsis-v" />
      </button>

      <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
        {/* <button type="button" className="p-link layout-topbar-button" onClick={() => router.push('/pages/usuario/carrito')}>
          <i className="pi pi-shopping-cart"></i>
          <span>Calendar</span>
        </button> */}
        <button type="button" className="p-link layout-topbar-button" onClick={() => { router.push('/pages/usuario/perfil') }}>
          <i className="pi pi-user"></i>
          <span>Perfil</span>
        </button>
        {/* <Link href="/documentation"> */}
        <button type="button" className="p-link layout-topbar-button" onClick={confirmarDesicion}>
          <i className="pi pi-sign-out"></i>
          <span>Salir</span>
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
});

export default AppTopbar;

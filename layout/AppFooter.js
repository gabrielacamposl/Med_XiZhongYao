import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppFooter = () => {
  const { layoutConfig } = useContext(LayoutContext);

  const Footer = () => {
    return (
      <div className="footer">
        <div className='grid grid-nogutter surface-section px-4 py-4 md:px-6 lg:px-8 border-top-1 surface-border'>
          <div className='col-12 lg:col-6 lg:border-right-1 surface-border'>
          <img src={`/XZY.svg`} width="47.22px" height={'35px'} widt={'true'} alt="logo" />
          <span className='text-900 block mt-4 mr-3'>Una empresa dedicada al cuidado se su salud, con la mejor tecnología y los mejores profesionistas.</span>
          <span className='text-500 block mt-4'> © 2023 XiZhongYao, S.A. Todos los derechos reservados.</span>
          </div>
          <div className='col-12 md:col-6 lg:col-3 mt-4 lg:mt-0 lg:pl-4 flex flex-column'>
            <span className='text-900 text-xl font-medium block'>Compañía</span>
            <ul className='list-none p-0'>
              <li>
                <a tabIndex={0} className='text-600 hover:text-900 transition-duration-150 cursor-pointer mt-3 block'>Sobre XiZhongYao</a>
              </li>
              <li>
                <a tabIndex={0} className='text-600 hover:text-900 transition-duration-150 cursor-pointer mt-3 block'>¿Quiénes somos?</a>
              </li>   
            </ul>
          </div>
          <div className='col-12 md:col-6 lg:col-3 mt-4 lg:mt-0 lg:pl-4 flex flex-column'>
            <span className='text-900 text-xl font-medium block'>Para Pacientes</span>
            <ul className='list-none p-0'>
              <li>
                <a tabIndex={0} className='text-600 hover:text-900 transition-duration-150 cursor-pointer mt-3 block'>Especialistas</a>
              </li>
              <li>
                <a tabIndex={0} className='text-600 hover:text-900 transition-duration-150 cursor-pointer mt-3 block'>Diagnóstico por Interpretaciones</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="surface-900 py-6 lg:py-4 md:px-6 lg:px-8 flex flex-column lg:flex-row justify-content-between align-items-center">
          <ul class="list-none p-0 mb-0 flex flex-column md:flex-row flex-order-1 lg:flex-order-0 mt-4 lg:mt-0">
              <li class="mr-4 mt-3 lg:mt-0">
                <a tabindex="0" class="cursor-pointer text-0">Datos de Privacidad</a>
                </li>
                <li class="mr-4 mt-3 lg:mt-0">
                  <a tabindex="0" class="cursor-pointer text-0">Términos y Condiciones</a>
                  </li>
                  <li class="mr-4 mt-3 lg:mt-0">
                    <a tabindex="0" class="cursor-pointer text-0">Información Legal</a>
                    </li>
                    </ul>
                    <div class="flex align-items-center flex-order-0 lg:flex-order-1">
                      <a tabindex="0" class="cursor-pointer mr-3 lg:mt-0 block"> 
                      <i class="pi pi-facebook surface-section p-1 text-sm border-circle text-900">
                      </i>
                      </a>
                      <a tabindex="0" class="cursor-pointer mr-3 lg:mt-0 block">
                        <i class="pi pi-twitter surface-section p-1 text-sm border-circle text-900"></i>
                      </a>
                        <a tabindex="0" class="cursor-pointer mr-3 lg:mt-0 block">
                          <i class="pi pi-youtube surface-section p-1 text-sm border-circle text-900"></i>
                        </a>
                      </div>
          </div>
        
      </div>
    );
  }

  return (
    <Footer/>
  );
};

export default AppFooter;

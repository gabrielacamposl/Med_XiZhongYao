import PrimeReact from 'primereact/api';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import { RadioButton } from 'primereact/radiobutton';
import { Sidebar } from 'primereact/sidebar';
import { classNames } from 'primereact/utils';
import React, { useContext, useEffect, useState } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppConfig = (props) => {
  const [scales] = useState([12, 13, 14, 15, 16]);
  const { layoutConfig, setLayoutConfig, layoutState, setLayoutState } = useContext(LayoutContext);

  const onConfigButtonClick = () => {
    setLayoutState((prevState) => ({ ...prevState, configSidebarVisible: true }));
  };

  const onConfigSidebarHide = () => {
    setLayoutState((prevState) => ({ ...prevState, configSidebarVisible: false }));
  };

  // const changeInputStyle = (e) => {
  //   setLayoutConfig((prevState) => ({ ...prevState, inputStyle: e.value }));
  // };

  const changeRipple = (e) => {
    PrimeReact.ripple = e.value;
    setLayoutConfig((prevState) => ({ ...prevState, ripple: e.value }));
  };

  const changeMenuMode = (e) => {
    setLayoutConfig((prevState) => ({ ...prevState, menuMode: e.value }));
  };

  const changeTheme = (theme, colorScheme) => {
    PrimeReact.changeTheme(layoutConfig.theme, theme, 'theme-css', () => {
      setLayoutConfig((prevState) => ({ ...prevState, theme, colorScheme }));
    });
  };

  const decrementScale = () => {
    setLayoutConfig((prevState) => ({ ...prevState, scale: prevState.scale - 1 }));
  };

  const incrementScale = () => {
    setLayoutConfig((prevState) => ({ ...prevState, scale: prevState.scale + 1 }));
  };

  const applyScale = () => {
    document.documentElement.style.fontSize = layoutConfig.scale + 'px';
  };

  useEffect(() => {
    applyScale();
  }, [layoutConfig.scale]);

  return (
    <>
      <button className="layout-config-button p-link" type="button" onClick={onConfigButtonClick}>
        <i className="pi pi-cog"></i>
      </button>

      <Sidebar visible={layoutState.configSidebarVisible} onHide={onConfigSidebarHide} position="right" className="layout-config-sidebar w-20rem">
        {!props.simple && (
          <>
            <h5>Tamaño</h5>
            <div className="flex align-items-center">
              <Button icon="pi pi-minus" type="button" onClick={decrementScale} rounded text className="w-2rem h-2rem mr-2" disabled={layoutConfig.scale === scales[0]}></Button>
              <div className="flex gap-2 align-items-center">
                {scales.map((item) => {
                  return <i className={classNames('pi pi-circle-fill', { 'text-primary-500': item === layoutConfig.scale, 'text-300': item !== layoutConfig.scale })} key={item}></i>;
                })}
              </div>
              <Button icon="pi pi-plus" type="button" onClick={incrementScale} rounded text className="w-2rem h-2rem ml-2" disabled={layoutConfig.scale === scales[scales.length - 1]}></Button>
            </div>

            <h5>Tipo de menú</h5>
            <div className="flex">
              <div className="field-radiobutton flex-1">
                <RadioButton name="menuMode" value={'static'} checked={layoutConfig.menuMode === 'static'} onChange={(e) => changeMenuMode(e)} inputId="mode1"></RadioButton>
                <label htmlFor="mode1">Estático</label>
              </div>
              <div className="field-radiobutton flex-1">
                <RadioButton name="menuMode" value={'overlay'} checked={layoutConfig.menuMode === 'overlay'} onChange={(e) => changeMenuMode(e)} inputId="mode2"></RadioButton>
                <label htmlFor="mode2">Dinámico</label>
              </div>
            </div>

            <h5>Efecto dominó</h5>
            <InputSwitch checked={layoutConfig.ripple} onChange={(e) => changeRipple(e)}></InputSwitch>
          </>
        )}

        <h5>Estilos de diseño</h5>
        <div className="grid">
          

          {/* Temas claros */}
          <div className="col-3">
            <button
              className="p-link w-2rem h-2rem" style={{ backgroundColor: '#B6EC8F', height: '200px' }}
              onClick={() => changeTheme('light-green', 'light')}></button>
          </div>
          <div className="col-3">
            <button
              className="p-link w-2rem h-2rem" style={{ backgroundColor: '#FF988D', height: '200px' }}
              onClick={() => changeTheme('light-rose', 'light')}></button>
          </div>
          <div className="col-3">
            <button
              className="p-link w-2rem h-2rem" style={{ backgroundColor: '#CF933A', height: '200px' }}
              onClick={() => changeTheme('light-orange', 'light')}></button>
          </div>
          <div className="col-3">
            <button
              className="p-link w-2rem h-2rem" style={{ backgroundColor: '#E54150', height: '200px' }}
              onClick={() => changeTheme('light-red', 'light')}></button>
          </div>

          {/* Temas oscuros */}
          <div className="col-3">
            <button
              className="p-link w-2rem h-2rem" style={{ backgroundColor: '#B6EC8F', height: '200px' }}
              onClick={() => changeTheme('dark-green', 'dark')}></button>
          </div>
          <div className="col-3">
            <button
              className="p-link w-2rem h-2rem" style={{ backgroundColor: '#FF988D', height: '200px' }}
              onClick={() => changeTheme('dark-rose', 'dark')}></button>
          </div>
          <div className="col-3">
            <button
              className="p-link w-2rem h-2rem" style={{ backgroundColor: '#CF933A', height: '200px' }}
              onClick={() => changeTheme('dark-orange', 'dark')}></button>
          </div>
          <div className="col-3">
            <button
              className="p-link w-2rem h-2rem" style={{ backgroundColor: '#E54150', height: '200px' }}
              onClick={() => changeTheme('dark-red', 'dark')}></button>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default AppConfig;

import React from 'react';
import PaginaNoEncontrada from './pages/noencontrado';

const Custom404 = () => {
  return <PaginaNoEncontrada />;
};

Custom404.getLayout = function getLayout(page) {
  return page;
};

export default Custom404;

//--> Funcion para token
export const temporizador = (tiempo) => {
  let minutos = Math.floor(tiempo / 60)
  let segundos = tiempo % 60

  if (segundos >= 10) return `0${minutos}:${segundos}`
  else return `0${minutos}:0${segundos}`
}

//--> Darle formato al precio
export const formatoPrecio = (value) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

export const FormatoFecha = ({ fechaDev }) => {
  const formattedDate = new Date(fechaDev).toLocaleDateString('en-US', {

    day: 'numeric',
    month: 'short',
    year: 'numeric',

  })
};

export const formatearFecha = (fechaBack) => {
  // Obtener los componentes de la fecha
  let fecha = new Date(fechaBack);
  let dia = fecha.getDate();
  let mes = fecha.toLocaleString("default", { month: "long" }); // Obtener el nombre completo del mes
  let año = fecha.getFullYear();

  // Formatear la fecha en el formato deseado (Ejemplo: 18 de junio de 2023)
  let fechaFormateada = dia + " de " + mes + " de " + año;

  return fechaFormateada;
}

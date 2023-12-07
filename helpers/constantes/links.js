//--> Crear usuario
export const nuevoUsuario = "http://localhost:4000/api/administrador"
export const validarToken = "http://localhost:4000/api/administrador/confirmar/"

//--> Iniciar sesion
export const iniciarSesion = "http://localhost:4000/api/administrador/iniSes"

//--> Resetear password
export const resetearPassword = "http://localhost:4000/api/administrador/olvide-password"
export const tokenResetearPassword = "http://localhost:4000/api/administrador/olvide-password/"
export const cambiarPassword = "http://localhost:4000/api/administrador/olvide-password/"

//--> Funciones crud de catalogo 'producto'
export const consultarProductos = "http://localhost:4000/api/productos/mostrarProductos"
export const editarProducto = "http://localhost:4000/api/productos/modificarProducto"
export const nuevoProducto = "http://localhost:4000/api/productos"
export const eliminarProducto = "http://localhost:4000/api/productos/eliminarProducto"

//--> Funciones crud de catalogo 'temporada'
export const nuevaTemporada = "http://localhost:4000/api/temporada"
export const modificarTemporada = "http://localhost:4000/api/temporada/modificarTemporada"
export const eliminarTemporada = "http://localhost:4000/api/temporada/eliminarTemporada"
export const verTemporadas = "http://localhost:4000/api/temporada/mostrarTemporada"

//--> Lista de dropdowns
export const listaFlores = "http://localhost:4000/api/productos/mostrarFlores"
export const listaPeluches = "http://localhost:4000/api/productos/mostrarPeluches"

//->Funciones consulta
export const consultarTarjeta = "http://localhost:4000/api/cliente/interaccionPed/verTarjetas"
export const consultarDir = "http://localhost:4000/api/cliente/interaccionPed/verDirecciones"


//--> Endpoints de pedidos
export const consultarPedidos = "http://localhost:4000/api/administrador/pedidos/mostrarPedidos"
export const consultarPedidosCancelados = "http://localhost:4000/api/administrador/pedidos/mostrarPedidosCancelados"
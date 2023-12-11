//--> Crear usuario
export const nuevoPaciente = "http://localhost:4444/api/pacientes"
export const validarToken = "http://localhost:4444/api/pacientes/confirmar/"

//--> Iniciar sesion
export const iniciarSesion = "http://localhost:4444/api/pacientes/login"

//--> Resetear password
export const resetearPassword = "http://localhost:4444/api/pacientes/olvide-password"
export const tokenResetearPassword = "http://localhost:4444/api/pacientes/olvide-password/"
export const cambiarPassword = "http://localhost:4444/api/pacientes/olvide-password/"

// --> Catalogo flores
export const mostrarFlores = "http://localhost:4444/api/productos/mostrarFlores"

//----DATOS USUARIO-------
// --> Cambiar nombre
export const modificarNombre = "http://localhost:4000/api/cliente/modificar/username"
//->Modificar contraseña
export const ModificarContrasena = "http://localhost:4000/api/cliente/modificar/password"
//->Modificar Telefono
export const modificarTel = "http://localhost:4000/api/cliente/modificar/telefono"
//->AgregarTarjeta
export const saveTarjeta = "http://localhost:4000/api/cliente/modificar/tarjeta"
//->AgregarDirección
export const saveDir = "http://localhost:4000/api/cliente/modificar/direccion"


//---CARRITO DE COMPRAS-----
//-> Agregar Producto
export const agregarProducto = "http://localhost:4000/api/cliente/carrito/agregarProducto"
//-> Incrementar Producto
export const incrementarProducto = "http://localhost:4000/api/cliente/carrito/incrementarProducto"
//-> Decrementar Producto
export const decrementarProducto = "http://localhost:4000/api/cliente/carrito/decrementarProducto"
//-> Eliminar Producto
export const eliminarProducto = "http://localhost:4000/api/cliente/carrito/eliminarProducto"
//-> Vaciar Carrito
export const vaciarCarrito = "http://localhost:4000/api/cliente/carrito/vaciarCarrito"
//--> Visualizar Carrito
export const visualizarCarrito = "http://localhost:4000/api/cliente/carrito/visualizarCarrito"
//-->Agregar a favorito
export const agregarFavorito = "http://localhost:4000/api/cliente/interaccionPro/agregarFavoritos"


//-->Funciones consulta
export const consultarTarjeta = "http://localhost:4000/api/cliente/interaccionPed/verTarjetas"
export const consultarDir = "http://localhost:4000/api/cliente/interaccionPed/verDirecciones"



//->Realizar pago
export const obtenerPedido = "http://localhost:4000/api/pedidos"
export const quitarPedido = "http://localhost:4000/api/pedidos/cancelarPedido"
export const pagarPedido = "http://localhost:4000/api/pedidos/pagarPedido"

//--> Personalizar producto
export const verFloresBack = "http://localhost:4000/api/cliente/interaccionPro/verFlores"
export const verPeluchesBack = "http://localhost:4000/api/cliente/interaccionPro/verPeluches"


//-->ConsultarCompras
export const consultarPedidos = "http://localhost:4000/api/cliente/interaccionPed/visualizar"

//-->Ver direcciones
export const verDirecciones = "http://localhost:4000/api/cliente/interaccionPed/verDirecciones"

//-->Ver tarjetas
export const verTarjetas = "http://localhost:4000/api/cliente/interaccionPed/verTarjetas"

//-->Favoritos
export const agregarFavoritos = "http://localhost:4000/api/cliente/interaccionPro/agregarFavoritos"
export const verFavoritos = "http://localhost:4000/api/cliente/interaccionPro/verFavoritos"
export const eliminarFavoritos = "http://localhost:4000/api/cliente/interaccionPro/eliminarFavoritos"

//-->ConsultarCompras
// export const consultarPedidos = "http://localhost:4000/api/cliente/interaccionPed/visualizar"
export const consultarHistorial = "http://localhost:4000/api/cliente/interaccionPed/visualizarEntregados"
export const mandarDevolucion = "http://localhost:4000/api/pedidos/solicitarReembolso"


//->Comentar Pedido
export const consultarProducto = "http://localhost:4000/api/cliente/interaccionPro/verAValorar"
export const valorar = "http://localhost:4000/api/cliente/interaccionPro/valorar"
export const Com = "http://localhost:4000/api/cliente/interaccionPro/comentar"
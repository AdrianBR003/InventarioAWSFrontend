var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { obtenerProductos, crearProductos, eliminarProductos, modificarProductos } from "./api/apiProductos.js";
import { obtenerColecciones, crearColeccion, eliminarColeccion, modificarColeccion } from "./api/apiColecciones.js";
import { obtenerTransacciones, crearTransaccion, eliminarTransaccion, modificarTransaccion } from "./api/apiTransacciones.js";
window.appData = () => ({
    currentTab: 'productos',
    productos: [],
    colecciones: [],
    transacciones: [],
    mostrarFormProducto: false,
    mostrarFormColeccion: false,
    mostrarFormTransaccion: false,
    editandoProducto: false,
    editandoColeccion: false,
    editandoTransaccion: false,
    formProducto: { id_producto: "0", nombre: '', precio: 0, cantidad: 0 },
    formColeccion: { id_coleccion: "0", nombre: '', responsable: '' },
    formTransaccion: {
        id_transaccion: "0",
        coleccionOrigen: '',
        coleccionDestino: '',
        producto: '',
        cantidad: 0,
        fecha: ''
    },
    tablaProductos: null,
    tablaColecciones: null,
    tablaTransacciones: null,
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [dataProductos, dataColecciones, dataTransacciones] = yield Promise.all([
                    obtenerProductos(),
                    obtenerColecciones(),
                    obtenerTransacciones()
                ]);
                this.productos = dataProductos;
                this.colecciones = dataColecciones;
                this.transacciones = dataTransacciones;
            }
            catch (error) {
                console.error("Error al inicializar: ", error);
            }
            const self = this;
            this.tablaProductos = new window.Tabulator('#tablaProductos', {
                data: this.productos,
                layout: 'fitColumns',
                columns: [
                    { title: 'ID', field: 'id_producto', width: 50 },
                    { title: 'Nombre', field: 'nombre' },
                    { title: 'Precio', field: 'precio', formatter: 'money' },
                    { title: 'Cantidad', field: 'cantidad' },
                    {
                        title: 'Acciones', width: 150,
                        formatter() {
                            return `<button class="editar-btn">Editar</button>
                    <button class="eliminar-btn">Eliminar</button>`;
                        },
                        cellClick(e, cell) {
                            const data = cell.getRow().getData();
                            if (e.target instanceof HTMLElement) {
                                if (e.target.classList.contains('editar-btn')) {
                                    self.iniciarEdicionProducto(data);
                                }
                                else if (e.target.classList.contains('eliminar-btn')) {
                                    self.eliminarProducto(data);
                                }
                            }
                        }
                    },
                ],
            });
            this.tablaColecciones = new window.Tabulator('#tablaColecciones', {
                data: this.colecciones,
                layout: 'fitColumns',
                columns: [
                    { title: 'ID', field: 'id_coleccion', width: 50 },
                    { title: 'Nombre', field: 'nombre' },
                    { title: 'Responsable', field: 'responsable' },
                    {
                        title: 'Acciones', width: 150,
                        formatter() {
                            return `<button class="editar-btn">Editar</button>
                    <button class="eliminar-btn">Eliminar</button>`;
                        },
                        cellClick(e, cell) {
                            const data = cell.getRow().getData();
                            if (e.target instanceof HTMLElement) {
                                if (e.target.classList.contains('editar-btn')) {
                                    self.iniciarEdicionColeccion(data);
                                }
                                else if (e.target.classList.contains('eliminar-btn')) {
                                    self.eliminarColeccion(data);
                                }
                            }
                        }
                    },
                ],
            });
            this.tablaTransacciones = new window.Tabulator('#tablaTransacciones', {
                data: this.transacciones,
                layout: 'fitColumns',
                columns: [
                    { title: 'ID', field: 'id_transaccion', width: 50 },
                    { title: 'Origen', field: 'coleccionOrigen' },
                    { title: 'Destino', field: 'coleccionDestino' },
                    { title: 'Producto', field: 'producto' },
                    { title: 'Cantidad', field: 'cantidad' },
                    { title: 'Fecha', field: 'fecha' },
                    {
                        title: 'Acciones', width: 150,
                        formatter() {
                            return `<button class="editar-btn">Editar</button>
                    <button class="eliminar-btn">Eliminar</button>`;
                        },
                        cellClick(e, cell) {
                            const data = cell.getRow().getData();
                            if (e.target instanceof HTMLElement) {
                                if (e.target.classList.contains('editar-btn')) {
                                    self.iniciarEdicionTransaccion(data);
                                }
                                else if (e.target.classList.contains('eliminar-btn')) {
                                    self.eliminarTransaccion(data);
                                }
                            }
                        }
                    },
                ],
            });
        });
    },
    toggleFormProducto() {
        if (this.mostrarFormProducto) {
            this.limpiarFormProducto();
            this.editandoProducto = false;
        }
        this.mostrarFormProducto = !this.mostrarFormProducto;
    },
    toggleFormColeccion() {
        if (this.mostrarFormColeccion) {
            this.limpiarFormColeccion();
            this.editandoColeccion = false;
        }
        this.mostrarFormColeccion = !this.mostrarFormColeccion;
    },
    toggleFormTransaccion() {
        if (this.mostrarFormTransaccion) {
            this.limpiarFormTransaccion();
            this.editandoTransaccion = false;
        }
        this.mostrarFormTransaccion = !this.mostrarFormTransaccion;
    },
    agregarProducto() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nuevoProducto = {
                    nombre: this.formProducto.nombre,
                    precio: this.formProducto.precio,
                    cantidad: this.formProducto.cantidad,
                };
                const productoAgregado = yield crearProductos(nuevoProducto);
                this.productos.push(productoAgregado);
                this.limpiarFormProducto();
                if (this.tablaProductos) {
                    this.tablaProductos.replaceData(this.productos);
                }
            }
            catch (error) {
                console.error("Error en agregar Producto: ", error);
            }
        });
    },
    agregarColeccion() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nuevaColeccion = {
                    nombre: this.formColeccion.nombre,
                    responsable: this.formColeccion.responsable,
                };
                const coleccionAgregada = yield crearColeccion(nuevaColeccion);
                this.colecciones.push(coleccionAgregada);
                this.limpiarFormColeccion();
                if (this.tablaColecciones) {
                    this.tablaColecciones.replaceData(this.colecciones);
                }
            }
            catch (error) {
                console.error("Error en agregar colección: ", error);
            }
        });
    },
    agregarTransaccion() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nuevaTransaccion = {
                    coleccionOrigen: this.formTransaccion.coleccionOrigen,
                    coleccionDestino: this.formTransaccion.coleccionDestino,
                    producto: this.formTransaccion.producto,
                    cantidad: this.formTransaccion.cantidad,
                    fecha: this.formTransaccion.fecha,
                };
                console.log("Transaccion : ", nuevaTransaccion);
                const transaccionAgregada = yield crearTransaccion(nuevaTransaccion);
                console.log("Respuesta de la API:", transaccionAgregada);
                this.transacciones.push(transaccionAgregada);
                this.limpiarFormTransaccion();
                if (this.tablaTransacciones) {
                    this.tablaTransacciones.replaceData(this.transacciones);
                }
            }
            catch (error) {
                console.error("Error en agregar Transacción: ", error);
            }
        });
    },
    iniciarEdicionProducto(producto) {
        this.formProducto = Object.assign({}, producto);
        this.editandoProducto = true;
        this.mostrarFormProducto = true;
    },
    iniciarEdicionColeccion(coleccion) {
        this.formColeccion = Object.assign({}, coleccion);
        this.editandoColeccion = true;
        this.mostrarFormColeccion = true;
    },
    iniciarEdicionTransaccion(transaccion) {
        this.formTransaccion = Object.assign({}, transaccion);
        this.editandoTransaccion = true;
        this.mostrarFormTransaccion = true;
    },
    guardarCambiosProducto() {
        const index = this.productos.findIndex((p) => p.id_producto === this.formProducto.id_producto);
        if (index !== -1) {
            this.productos[index] = Object.assign({}, this.formProducto);
            const productoSeleccionado = this.productos[index]; // producto seleccionado
            console.log("Valores nuevo producto:", productoSeleccionado);
            modificarProductos(productoSeleccionado);
        }
        this.limpiarFormProducto();
        this.editandoProducto = false;
        if (this.tablaProductos) {
            this.tablaProductos.replaceData(this.productos);
        }
    },
    guardarCambiosColeccion() {
        const index = this.colecciones.findIndex((c) => c.id_coleccion === this.formColeccion.id_coleccion);
        if (index !== -1) {
            this.colecciones[index] = Object.assign({}, this.formColeccion);
            const coleccionSeleccionada = this.colecciones[index];
            console.log("Valores nuevo coleccion:", coleccionSeleccionada);
            modificarColeccion(coleccionSeleccionada);
        }
        this.limpiarFormColeccion();
        this.editandoColeccion = false;
        if (this.tablaColecciones) {
            this.tablaColecciones.replaceData(this.colecciones);
        }
    },
    guardarCambiosTransaccion() {
        const index = this.transacciones.findIndex((t) => t.id_transaccion === this.formTransaccion.id_transaccion);
        if (index !== -1) {
            this.transacciones[index] = Object.assign({}, this.formTransaccion);
            const transaccionSeleccionada = this.transacciones[index];
            console.log("Valores nuevo transaccion:", transaccionSeleccionada);
            modificarTransaccion(transaccionSeleccionada);
        }
        this.limpiarFormTransaccion();
        this.editandoTransaccion = false;
        if (this.tablaTransacciones) {
            this.tablaTransacciones.replaceData(this.transacciones);
        }
    },
    eliminarProducto(producto) {
        if (confirm("¿Eliminar producto?")) {
            this.productos = this.productos.filter((p) => p.id_producto !== producto.id_producto);
            if (this.tablaProductos) {
                this.tablaProductos.replaceData(this.productos);
                eliminarProductos(producto);
                console.log("Se ha eliminado el producto: ", producto);
            }
        }
    },
    eliminarColeccion(coleccion) {
        if (confirm("¿Eliminar colección?")) {
            this.colecciones = this.colecciones.filter((c) => c.id_coleccion !== coleccion.id_coleccion);
            if (this.tablaColecciones) {
                this.tablaColecciones.replaceData(this.colecciones);
                eliminarColeccion(coleccion);
                console.log("Se ha eliminado la coleccion: ", coleccion);
            }
        }
    },
    eliminarTransaccion(transaccion) {
        if (confirm("¿Eliminar transacción?")) {
            this.transacciones = this.transacciones.filter((t) => t.id_transaccion !== transaccion.id_transaccion);
            if (this.tablaTransacciones) {
                this.tablaTransacciones.replaceData(this.transacciones);
                eliminarTransaccion(transaccion);
                console.log("Se ha eliminado la transaccion: ", transaccion);
            }
        }
    },
    limpiarFormProducto() {
        this.formProducto = { id_producto: "0", nombre: '', precio: 0, cantidad: 0 };
    },
    limpiarFormColeccion() {
        this.formColeccion = { id_coleccion: "0", nombre: '', responsable: '' };
    },
    limpiarFormTransaccion() {
        this.formTransaccion = { id_transaccion: "0", coleccionOrigen: '', coleccionDestino: '', producto: '', cantidad: 0, fecha: '' };
    }
});

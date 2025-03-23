import { obtenerProductos, crearProductos, eliminarProductos, modificarProductos} from "./api/apiProductos.js";
import { obtenerColecciones, crearColeccion, eliminarColeccion, modificarColeccion } from "./api/apiColecciones.js";
import { obtenerTransacciones, crearTransaccion, eliminarTransaccion, modificarTransaccion } from "./api/apiTransacciones.js";

interface Producto {
  id_producto: string;
  nombre: string;
  precio: number;
  cantidad: number;
}

interface Coleccion {
  id_coleccion: string;
  nombre: string;
  responsable: string;
}

interface Transaccion {
  id_transaccion: string;
  coleccionOrigen: string;
  coleccionDestino: string;
  producto: string;
  cantidad: number;
  fecha: string;
}

declare global {
  interface Window {
    appData: () => any;
    Tabulator: any;
  }
}

window.appData = () => ({
  currentTab: 'productos',

  productos: [] as Producto[],
  colecciones: [] as Coleccion[],
  transacciones: [] as Transaccion[],

  mostrarFormProducto: false,
  mostrarFormColeccion: false,
  mostrarFormTransaccion: false,

  editandoProducto: false,
  editandoColeccion: false,
  editandoTransaccion: false,

  formProducto: { id_producto: "0", nombre: '', precio: 0, cantidad: 0 } as Producto,
  formColeccion: { id_coleccion: "0", nombre: '', responsable: '' } as Coleccion,
  formTransaccion: {
    id_transaccion: "0",
    coleccionOrigen: '',
    coleccionDestino: '',
    producto: '',
    cantidad: 0,
    fecha: ''
  } as Transaccion,

  tablaProductos: null as any,
  tablaColecciones: null as any,
  tablaTransacciones: null as any,

  async init() {    
    
    if ((window as any).__appInitialized) {
      console.warn("La aplicación ya ha sido inicializada.");
      return;
    }
    (window as any).__appInitialized = true;
  
    try {
      const [dataProductos, dataColecciones, dataTransacciones] = await Promise.all([
        obtenerProductos(),
        obtenerColecciones(),
        obtenerTransacciones()
      ]);
      this.productos = dataProductos;
      this.colecciones = dataColecciones;
      this.transacciones = dataTransacciones;
    } catch (error) {
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
          cellClick(e: MouseEvent, cell: any) {
            const data = cell.getRow().getData();
            if (e.target instanceof HTMLElement) {
              if (e.target.classList.contains('editar-btn')) {
                self.iniciarEdicionProducto(data);
              } else if (e.target.classList.contains('eliminar-btn')) {
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
          cellClick(e: MouseEvent, cell: any) {
            const data = cell.getRow().getData();
            if (e.target instanceof HTMLElement) {
              if (e.target.classList.contains('editar-btn')) {
                self.iniciarEdicionColeccion(data);
              } else if (e.target.classList.contains('eliminar-btn')) {
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
          cellClick(e: MouseEvent, cell: any) {
            const data = cell.getRow().getData();
            if (e.target instanceof HTMLElement) {
              if (e.target.classList.contains('editar-btn')) {
                self.iniciarEdicionTransaccion(data);
              } else if (e.target.classList.contains('eliminar-btn')) {
                self.eliminarTransaccion(data);
              }
            }
          }
        },
      ],
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

  async agregarProducto() {
    try {
      const nuevoProducto = {
        nombre: this.formProducto.nombre,
        precio: this.formProducto.precio,
        cantidad: this.formProducto.cantidad,
      };
      const productoAgregado = await crearProductos(nuevoProducto);
      this.productos.push(productoAgregado);
      this.limpiarFormProducto();
      if (this.tablaProductos) {
        this.tablaProductos.replaceData(this.productos);
      }
    } catch (error) {
      console.error("Error en agregar Producto: ", error);
    }
  },
  async agregarColeccion() {
    try {
      const nuevaColeccion = {
        nombre: this.formColeccion.nombre,
        responsable: this.formColeccion.responsable,
      };
      const coleccionAgregada = await crearColeccion(nuevaColeccion);
      this.colecciones.push(coleccionAgregada);
      this.limpiarFormColeccion();
      if (this.tablaColecciones) {
        this.tablaColecciones.replaceData(this.colecciones);
      }
    } catch (error) {
      console.error("Error en agregar colección: ", error);
    }
  },
  async agregarTransaccion() {
    try {
      const nuevaTransaccion = {
        coleccionOrigen: this.formTransaccion.coleccionOrigen,
        coleccionDestino: this.formTransaccion.coleccionDestino,
        producto: this.formTransaccion.producto,
        cantidad: this.formTransaccion.cantidad,
        fecha: this.formTransaccion.fecha,
      };
      console.log("Transaccion : ", nuevaTransaccion); 
      const transaccionAgregada = await crearTransaccion(nuevaTransaccion);
      console.log("Respuesta de la API:", transaccionAgregada);
      this.transacciones.push(transaccionAgregada);
      this.limpiarFormTransaccion();
      if (this.tablaTransacciones) {
        this.tablaTransacciones.replaceData(this.transacciones);
      }
    } catch (error) {
      console.error("Error en agregar Transacción: ", error);
    }
  },

  iniciarEdicionProducto(producto: Producto) {
    this.formProducto = { ...producto };
    this.editandoProducto = true;
    this.mostrarFormProducto = true;
  },
  iniciarEdicionColeccion(coleccion: Coleccion) {
    this.formColeccion = { ...coleccion };
    this.editandoColeccion = true;
    this.mostrarFormColeccion = true;
  },
  iniciarEdicionTransaccion(transaccion: Transaccion) {
    this.formTransaccion = { ...transaccion };
    this.editandoTransaccion = true;
    this.mostrarFormTransaccion = true;
  },

  guardarCambiosProducto() {
    const index = this.productos.findIndex((p: Producto) => p.id_producto === this.formProducto.id_producto);
    if (index !== -1) {
      this.productos[index] = { ...this.formProducto };
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
    const index = this.colecciones.findIndex((c: Coleccion) => c.id_coleccion === this.formColeccion.id_coleccion);
    if (index !== -1) {
      this.colecciones[index] = { ...this.formColeccion };
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
    const index = this.transacciones.findIndex((t: Transaccion) => t.id_transaccion === this.formTransaccion.id_transaccion);
    if (index !== -1) {
      this.transacciones[index] = { ...this.formTransaccion };
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

  eliminarProducto(producto: Producto) {
    if (confirm("¿Eliminar producto?")) {
      this.productos = this.productos.filter((p: Producto) => p.id_producto !== producto.id_producto);
      if (this.tablaProductos) {
        this.tablaProductos.replaceData(this.productos);
        eliminarProductos(producto.id_producto); 
        console.log("Se ha eliminado el producto: ", producto); 
      }
    }
  },
  eliminarColeccion(coleccion: Coleccion) {
    if (confirm("¿Eliminar colección?")) {
      this.colecciones = this.colecciones.filter((c: Coleccion) => c.id_coleccion !== coleccion.id_coleccion);
      if (this.tablaColecciones) {
        this.tablaColecciones.replaceData(this.colecciones);
        eliminarColeccion(coleccion.id_coleccion) 
        console.log("Se ha eliminado la coleccion: ", coleccion); 
      }
    }
  },
  eliminarTransaccion(transaccion: Transaccion) {
    if (confirm("¿Eliminar transacción?")) {
      this.transacciones = this.transacciones.filter((t: Transaccion) => t.id_transaccion !== transaccion.id_transaccion);
      if (this.tablaTransacciones) {
        this.tablaTransacciones.replaceData(this.transacciones);
        eliminarTransaccion(transaccion.id_transaccion); 
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
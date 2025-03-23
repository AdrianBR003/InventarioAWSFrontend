import { API_BASE_URL } from "./config.js";

// GET 

export async function obtenerProductos(){
    const res = await fetch(API_BASE_URL+"/api/productos/all");
    if(!res.ok){
        throw new Error("Error GET productos")
    }

    const data = await res.json(); 
    console.log("GET productos", data); 
    return data; 
}

// POST 
export async function crearProductos(producto:any){
    const res = await fetch(API_BASE_URL+"/api/productos", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(producto),
    });

    if(!res.ok){
        throw new Error("Error POST Producto")
    }

    const data = await res.json(); 
    console.log("POST productos", data); 
    return data;
}

// DELETE 

/*
    De forma provisional, todas las solicitudes envían la información en el body,
    en vez de en el path. Como DELETE no debería de hacer esto, se obliga en el backend 
    a enviar así la peticion
*/

export async function eliminarProductos(id_producto: string) {
    const res = await fetch(`${API_BASE_URL}/api/productos?id_producto=${id_producto}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });

    if (!res.ok) {
        throw new Error("Error DELETE Producto");
    }

    return res.json();
}


// PUT 

export async function modificarProductos(producto:any){
    const res = await fetch(API_BASE_URL+"/api/productos", {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(producto),
    });

    if(!res.ok){
        throw new Error("Error PUT Producto")
    }

    const data = await res.json(); 
    console.log("PUT productos", data); 
    return data;
}

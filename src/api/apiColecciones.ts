import { API_BASE_URL } from "./config";

// GET 

export async function obtenerColecciones() {
    const res = await fetch(API_BASE_URL+"/api/colecciones/all");
    if (!res.ok) {
        throw new Error("Error GET Colecciones");
    }
    
    const data = await res.json(); 
    console.log("GET colecciones", data); 
    return data;
}


// POST 

export async function crearColeccion(coleccion:any){
    const res = await fetch(API_BASE_URL+"/api/colecciones", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(coleccion),
    });

    if(!res.ok){
        throw new Error("Error POST coleccion")
    }

    const data = await res.json(); 
    console.log("POST colecciones", data); 
    return data;
}



// DELETE 

export async function eliminarColeccion(id_coleccion: string) {
    const res = await fetch(`${API_BASE_URL}/api/colecciones?id_coleccion=${id_coleccion}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });

    if (!res.ok) {
        throw new Error("Error DELETE Producto");
    }

    return res.json();
}


// PUT 

// POST 

export async function modificarColeccion(coleccion:any){
    const res = await fetch(API_BASE_URL+"/api/colecciones", {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(coleccion),
    });

    if(!res.ok){
        throw new Error("Error PUT coleccion")
    }

    const data = await res.json(); 
    console.log("PUT colecciones", data); 
    return data;
}


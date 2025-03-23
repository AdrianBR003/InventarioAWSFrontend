import { API_BASE_URL } from "./config";

// GET 

export async function obtenerTransacciones(){
    const res = await fetch(API_BASE_URL+"/api/transacciones/all");
    if(!res.ok){
        throw new Error("Error GET transacciones")
    }

    const data = await res.json(); 
    console.log("GET transacciones", data); 
    return data;
}

// POST 

export async function crearTransaccion(transaccion:any){
    const res = await fetch(API_BASE_URL+"/api/transacciones", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(transaccion),
    });

    if(!res.ok){
        throw new Error("Error POST transacciones")
    }

    const data = await res.json(); 
    console.log("POST transacciones", data); 
    return data;
}

// DELETE 

export async function eliminarTransaccion(id_transaccion: string) {
    const res = await fetch(`${API_BASE_URL}/api/transacciones?id_transaccion=${id_transaccion}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });

    if (!res.ok) {
        throw new Error("Error DELETE Transaccion");
    }

    return res.json();
}

// PUT 

export async function modificarTransaccion(transaccion: any){
    const res = await fetch(API_BASE_URL+"/api/transacciones", {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(transaccion),
    });

    if(!res.ok){
        throw new Error("Error PUT transacciones")
    }

    const data = await res.json(); 
    console.log("PUT transacciones", data); 
    return data;
}
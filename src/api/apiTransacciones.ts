const API_URL = "https://35fjsu9dk2.execute-api.us-east-1.amazonaws.com/transacciones";

// GET 

export async function obtenerTransacciones(){
    const res = await fetch("http://localhost:8080/api/transacciones/all");
    if(!res.ok){
        throw new Error("Error GET transacciones")
    }

    const data = await res.json(); 
    console.log("GET transacciones", data); 
    return data;
}

// POST 

export async function crearTransaccion(transaccion:any){
    const res = await fetch(API_URL, {
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

export async function eliminarTransaccion(transaccion:any){
    const res = await fetch(API_URL, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(transaccion),
    });

    if(!res.ok){
        throw new Error("Error POST transacciones")
    }

    const data = await res.json(); 
    console.log("DEETE transacciones", data); 
    return data;
}

// PUT 

export async function modificarTransaccion(transaccion: any){
    const res = await fetch(API_URL, {
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
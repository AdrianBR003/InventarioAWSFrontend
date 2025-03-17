const API_URL = "https://35fjsu9dk2.execute-api.us-east-1.amazonaws.com/colecciones";

// GET 

export async function obtenerColecciones() {
    const res = await fetch(API_URL);
    if (!res.ok) {
        throw new Error("Error GET Colecciones");
    }
    
    const data = await res.json(); 
    console.log("GET colecciones", data); 
    return data;
}


// POST 

export async function crearColeccion(coleccion:any){
    const res = await fetch(API_URL, {
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

export async function eliminarColeccion(coleccion:any){
    const res = await fetch(API_URL, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(coleccion),
    });

    if(!res.ok){
        throw new Error("Error DEETE coleccion")
    }

    const data = await res.json(); 
    console.log("DELETE colecciones", data); 
    return data;
}

// PUT 

// POST 

export async function modificarColeccion(coleccion:any){
    const res = await fetch(API_URL, {
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


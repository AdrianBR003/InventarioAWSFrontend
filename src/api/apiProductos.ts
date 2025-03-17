const API_URL = "https://35fjsu9dk2.execute-api.us-east-1.amazonaws.com/productos";

// GET 

export async function obtenerProductos(){
    const res = await fetch(API_URL);
    if(!res.ok){
        throw new Error("Error GET productos")
    }

    const data = await res.json(); 
    console.log("GET productos", data); 
    return data; 
}

// POST 

export async function crearProductos(producto:any){
    const res = await fetch(API_URL, {
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

export async function eliminarProductos(producto:any){
    const res = await fetch(API_URL, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(producto),
    });

    if(!res.ok){
        throw new Error("Error DELETE Producto")
    }

    const data = await res.json(); 
    console.log("DELETE productos", data); 
    return data;
}

// PUT 

export async function modificarProductos(producto:any){
    const res = await fetch(API_URL, {
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

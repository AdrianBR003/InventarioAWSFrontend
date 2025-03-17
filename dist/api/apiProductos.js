var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_URL = "https://35fjsu9dk2.execute-api.us-east-1.amazonaws.com/productos";
// GET 
export function obtenerProductos() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(API_URL);
        if (!res.ok) {
            throw new Error("Error GET productos");
        }
        const data = yield res.json();
        console.log("GET productos", data);
        return data;
    });
}
// POST 
export function crearProductos(producto) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto),
        });
        if (!res.ok) {
            throw new Error("Error POST Producto");
        }
        const data = yield res.json();
        console.log("POST productos", data);
        return data;
    });
}
// DELETE 
export function eliminarProductos(producto) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(API_URL, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto),
        });
        if (!res.ok) {
            throw new Error("Error DELETE Producto");
        }
        const data = yield res.json();
        console.log("DELETE productos", data);
        return data;
    });
}
// PUT 
export function modificarProductos(producto) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(API_URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto),
        });
        if (!res.ok) {
            throw new Error("Error PUT Producto");
        }
        const data = yield res.json();
        console.log("PUT productos", data);
        return data;
    });
}

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { API_BASE_URL } from "./config.js";
// GET 
export function obtenerProductos() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(API_BASE_URL + "/api/productos/all");
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
        const res = yield fetch(API_BASE_URL + "/api/productos", {
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
/*
    De forma provisional, todas las solicitudes envían la información en el body,
    en vez de en el path. Como DELETE no debería de hacer esto, se obliga en el backend
    a enviar así la peticion
*/
export function eliminarProductos(id_producto) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`${API_BASE_URL}/api/productos?id_producto=${id_producto}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!res.ok) {
            throw new Error("Error DELETE Producto");
        }
        return res.json();
    });
}
// PUT 
export function modificarProductos(producto) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(API_BASE_URL + "/api/productos", {
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

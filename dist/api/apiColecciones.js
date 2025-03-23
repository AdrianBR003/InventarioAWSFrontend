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
export function obtenerColecciones() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(API_BASE_URL + "/api/colecciones/all");
        if (!res.ok) {
            throw new Error("Error GET Colecciones");
        }
        const data = yield res.json();
        console.log("GET colecciones", data);
        return data;
    });
}
// POST 
export function crearColeccion(coleccion) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(API_BASE_URL + "/api/colecciones", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(coleccion),
        });
        if (!res.ok) {
            throw new Error("Error POST coleccion");
        }
        const data = yield res.json();
        console.log("POST colecciones", data);
        return data;
    });
}
// DELETE 
export function eliminarColeccion(id_coleccion) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`${API_BASE_URL}/api/colecciones?id_coleccion=${id_coleccion}`, {
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
// POST 
export function modificarColeccion(coleccion) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(API_BASE_URL + "/api/colecciones", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(coleccion),
        });
        if (!res.ok) {
            throw new Error("Error PUT coleccion");
        }
        const data = yield res.json();
        console.log("PUT colecciones", data);
        return data;
    });
}

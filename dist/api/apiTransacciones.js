var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { API_BASE_URL } from "./config";
// GET 
export function obtenerTransacciones() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(API_BASE_URL + "/api/transacciones/all");
        if (!res.ok) {
            throw new Error("Error GET transacciones");
        }
        const data = yield res.json();
        console.log("GET transacciones", data);
        return data;
    });
}
// POST 
export function crearTransaccion(transaccion) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(API_BASE_URL + "/api/transacciones", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(transaccion),
        });
        if (!res.ok) {
            throw new Error("Error POST transacciones");
        }
        const data = yield res.json();
        console.log("POST transacciones", data);
        return data;
    });
}
// DELETE 
export function eliminarTransaccion(id_transaccion) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`${API_BASE_URL}/api/transacciones?id_transaccion=${id_transaccion}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!res.ok) {
            throw new Error("Error DELETE Transaccion");
        }
        return res.json();
    });
}
// PUT 
export function modificarTransaccion(transaccion) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(API_BASE_URL + "/api/transacciones", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(transaccion),
        });
        if (!res.ok) {
            throw new Error("Error PUT transacciones");
        }
        const data = yield res.json();
        console.log("PUT transacciones", data);
        return data;
    });
}

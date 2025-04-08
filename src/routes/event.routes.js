import express from 'express';
import {
    crearEvento,
    obtenerEventos,
    obtenerEventoPorId,
    actualizarEvento,
    eliminarEvento
} from '../controllers/eventos.controller.js';

const router = express.Router();

router.get('/eventos', obtenerEventos);
router.get('/eventos/:id', obtenerEventoPorId);
router.post('/eventos', crearEvento);
router.put('/eventos/:id', actualizarEvento);
router.delete('/eventos/:id', eliminarEvento);

export default router;

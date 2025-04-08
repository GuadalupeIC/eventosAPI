import {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
} from "../models/eventos.model.js";

export const obtenerEventos = async (req, res) => {
    try {
        const eventos = await getAllEvents();
        res.json(eventos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener eventos', error });
    }
};

export const obtenerEventoPorId = async (req, res) => {
    try {
        const evento = await getEventById(req.params.id);
        if (!evento) return res.status(404).json({ mensaje: 'Evento no encontrado' });
        res.json(evento);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el evento', error });
    }
};

export const crearEvento = async (req, res) => {
    try {
        const nuevoEvento = await createEvent(req.body);
        res.status(201).json({ id: nuevoEvento.id, ...req.body });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el evento', error });
    }
};

export const actualizarEvento = async (req, res) => {
    try {
        const updated = await updateEvent(req.params.id, req.body);
        if (!updated) return res.status(404).json({ mensaje: 'Evento no encontrado' });
        res.json({ mensaje: 'Evento actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el evento', error });
    }
};

export const eliminarEvento = async (req, res) => {
    try {
        const deleted = await deleteEvent(req.params.id);
        if (!deleted) return res.status(404).json({ mensaje: 'Evento no encontrado' });
        res.json({ mensaje: 'Evento eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el evento', error });
    }
};

import { Request, Response } from "express";
import { Bajas, BajasBecerro } from "../models/bajas.model";
import { Ganado } from "../models/ganado.model";
import { Becerros } from "../models/becerros.model";
import { before } from "node:test";


// POST Baja
const postBaja = async (req: Request, res: Response) => {
    try {
        const {id_ganado, motivo } = req.body;
        const ganado = await Ganado.findByPk(id_ganado);
        if (!ganado) return res.status(404).json({ message: 'Ganado no encontrado' });

        const newBaja = await Bajas.create({ id_ganado: parseInt(id_ganado), motivo_baja:motivo,fecha: new Date() });
        await ganado.destroy();
        return res.status(201).json(newBaja);
    } catch (error) {
        console.error("Error creando baja", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// GET Bajas
const getBajas = async (req: Request, res: Response) => {
    console.log('getBajas');
    try {
        const bajas = await Bajas.findAll();
        return bajas.length ? res.json(bajas) : res.status(202).json({ message: 'No hay registros de bajas' });
    } catch (error) {
        console.error('Error obteniendo bajas');
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// UPDATE Baja
const updateBaja = async (req: Request, res: Response) => {
    try {
        const { id_ganado } = req.params;
        const { motivo } = req.body;

        const baja = await Bajas.findOne({ where: { id_ganado } });
        if (!baja) return res.status(404).json({ message: 'Registro de baja no encontrado' });

        baja.motivo_baja = motivo;
        await baja.save();
        return res.status(200).json({ message: 'Registro de baja actualizado' });
    } catch (error) {
        console.error('Error actualizando baja');
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// DELETE Baja
const deleteBaja = async (req: Request, res: Response) => {
    try {
        const { id_ganado } = req.params;

        const baja = await Bajas.findOne({ where: { id_ganado } });
        if (!baja) return res.status(404).json({ message: 'Registro de baja no encontrado' });

        await baja.destroy();
        return res.status(200).json({ message: 'Registro de baja eliminado' });
    } catch (error) {
        console.error('Error eliminando baja');
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
const BajaBecerro = async (req: Request, res: Response) => {
    try {
        const { motivo } = req.body;
        const primerBecerro = await Becerros.findOne();
        if (!primerBecerro) return res.status(404).json({ message: 'No hay becerros registrados' });
        const newBaja = await BajasBecerro.create({motivo});
        await primerBecerro.destroy();
        
        return res.status(201).json(newBaja);
    } catch (error) {
        console.error("Error creando baja", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export { postBaja, getBajas, updateBaja, deleteBaja, BajaBecerro };

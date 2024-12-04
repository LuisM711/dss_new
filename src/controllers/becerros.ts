import { Request, Response } from "express";
import { Becerros } from "../models/becerros.model";

// POST Permiso
const postBecerro = async (req: Request, res: Response) => {
    try {
        const newBecerro = await Becerros.create();
        return res.status(201).json(newBecerro);
    } catch (error) {
        console.error("Error creando becerro", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// GET Permisos
const getBecerros = async (req: Request, res: Response) => {
    try {
        const becerros = await Becerros.count();
        return becerros ? res.json({ data: becerros }) : res.status(404).json({ data: 0, message: 'No hay becerros registrados' });
    } catch (error) {
        console.error('Error obteniendo becerros');
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// DELETE Permiso
const deleteBecerro = async (req: Request, res: Response) => {
    try {
        const becerro = await Becerros.findOne(); 
        if (becerro) {
            await becerro.destroy();
            console.log('Becerro eliminado');
            return res.status(200).json({ message: 'Becerro eliminado' });

        } else {
            console.log('No se encontró ningún becerro');
            return res.status(404).json({ message: 'Becerro no encontrado' });
        }
    } catch (error) {
        console.error('Error eliminando permiso');
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export { postBecerro, getBecerros, deleteBecerro };

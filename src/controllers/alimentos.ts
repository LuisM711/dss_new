import { Request, Response } from "express";
import { Alimentos } from "../models/alimentos.model";
import { Ganado } from "../models/ganado.model";

// POST Alimento
const postAlimento = async (req: Request, res: Response) => {
    try {
        const { id_ganado, nombre, costo } = req.body;

        const ganado = await Ganado.findByPk(id_ganado);
        if (!ganado) return res.status(404).json({ message: 'Ganado no encontrado' });

        const newAlimento = await Alimentos.create({ id_ganado: parseInt(id_ganado), nombre_alimento:nombre, coste:costo,fecha:new Date(),id:0 });
        return res.status(201).json(newAlimento);
    } catch (error) {
        console.error("Error creando alimento", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
const postAlimentoAll = async (req: Request, res: Response) => {
    try {
        let { tipo,nombre, costo } = req.body;
        try {
            const ganado = await Ganado.findAll();
            if (!ganado || ganado.length === 0) {
                return res.status(404).json({ message: 'Ganado no encontrado' });
            }
            if(tipo == 'g'){
                costo = costo / ganado.length;
            }
            for (const gan of ganado) {
                await Alimentos.create({
                    id_ganado: gan.id,
                    nombre_alimento: nombre,
                    coste: costo,
                    fecha: new Date(),
                    id:0
                });
            }
            res.status(201).json({ message: 'Medicamentos registrados correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocurrió un error al registrar los medicamentos', error });
        }
        
    } catch (error) {
        console.error("Error creando medicamento", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};



// GET Alimentos
const getAlimentos = async (req: Request, res: Response) => {
    try {
        const alimentos = await Alimentos.findAll();
        return alimentos.length ? res.json(alimentos) : res.status(404).json({ message: 'No hay alimentos registrados' });
    } catch (error) {
        console.error('Error obteniendo alimentos');
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// UPDATE Alimento
const updateAlimento = async (req: Request, res: Response) => {
    try {
        const { id_ganado, nombre } = req.params;
        const { coste } = req.body;

        const alimento = await Alimentos.findOne({ where: { id_ganado, nombre_alimento:nombre } });
        if (!alimento) return res.status(404).json({ message: 'Alimento no encontrado' });

        alimento.coste = coste;
        await alimento.save();
        return res.status(200).json({ message: 'Alimento actualizado' });
    } catch (error) {
        console.error('Error actualizando alimento');
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// DELETE Alimento
const deleteAlimento = async (req: Request, res: Response) => {
    try {
        const { id_ganado, nombre } = req.params;

        const alimento = await Alimentos.findOne({ where: { id_ganado, nombre_alimento:nombre } });
        if (!alimento) return res.status(404).json({ message: 'Alimento no encontrado' });

        await alimento.destroy();
        return res.status(200).json({ message: 'Alimento eliminado' });
    } catch (error) {
        console.error('Error eliminando alimento');
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export { postAlimento, getAlimentos, updateAlimento, deleteAlimento,postAlimentoAll };

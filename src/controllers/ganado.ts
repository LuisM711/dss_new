import { Request, Response } from "express";
import { Ganado, Raza, Padres } from "../models/ganado.model";
import { Alimentos } from "../models/alimentos.model";
import { Medicamentos } from "../models/medicamentos.model";

// POST Ganado
const postGanado = async (req: Request, res: Response) => {
    try {
        const { id_ganado,peso_registro, fecha_nacimiento, precio_adquisicion,raza,padre,madre } = req.body;
        console.log(req.body)
        if (await Ganado.findOne({where:{id:id_ganado}})) return res.status(404).json({ message: 'Registro de ganado ya existe' });
        const newGanado = await Ganado.create({ id:id_ganado,peso_registro, fecha_nacimiento, precio_adquisicion,fecha_adquisicion:new Date() });
        if(raza) await Raza.create({id:raza,nombre:raza});
        if(padre) await Padres.create({id:id_ganado,id_padre:padre,id_madre:madre});
        return res.status(201).json(newGanado);
    } catch (error) {
        console.error("Error creando ganado", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// GET Ganado
const getGanado = async (req: Request, res: Response) => {
    try {
        const ganado = await Ganado.findAll();
        return ganado.length ? res.json(ganado) : res.status(404).json({ message: 'No hay registros de ganado' });
    } catch (error) {
        console.error('Error obteniendo ganado');
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// UPDATE Ganado
const updateGanado = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { peso_registro, fecha_nacimiento, precio_adquisicion,fecha_adquisicion } = req.body;

        const ganado = await Ganado.findByPk(id);
        if (!ganado) return res.status(404).json({ message: 'Registro de ganado no existe' });

        await ganado.update({ peso_registro, fecha_nacimiento, precio_adquisicion ,fecha_adquisicion});
        return res.status(200).json({ message: 'Ganado actualizado' });
    } catch (error) {
        console.error('Error actualizando ganado');
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// DELETE Ganado
const deleteGanado = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const ganado = await Ganado.findByPk(id);
        if (!ganado) return res.status(404).json({ message: 'Registro de ganado no existe' });

        await ganado.destroy();
        return res.status(200).json({ message: 'Registro de ganado eliminado' });
    } catch (error) {
        console.error('Error eliminando ganado');
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
const getRaza = async (req: Request, res: Response) => {
    try {
        const { id } = req.query;
        const raza = await Raza.findAll({where:{id: Number(id)}});
        return raza.length ? res.json(raza) : res.status(404).json({ message: 'No se encontró la raza' });
    } catch (error) {
        console.error('Error obteniendo raza');
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
const getPadres = async (req: Request, res: Response) => {
    try {
        const { id } = req.query;
        const padres = await Padres.findAll({where:{id: Number(id)}});
        return padres.length ? res.json(padres) : res.status(404).json({ message: 'No se encontraron los padres' });
    } catch (error) {
        console.error('Error obteniendo padres');
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
const getInfo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const ganado = await Ganado.findOne({where:{id:id}});
        if (!ganado){
            return res.status(404).json({ message: 'No se encontró el ganado' });
        }
        const raza = await Raza.findOne({where:{id}});
        const padres = await Padres.findOne({where:{id}});
        const alimentos = await Alimentos.findAll({where:{id_ganado:id}});
        const medicamentos = await Medicamentos.findAll({where:{id_ganado:id}});
        return ganado ? res.json({ganado,raza,padres,alimentos,medicamentos}) : res.status(404).json({ message: 'No se encontró el ganado' });
    } catch (error) {
        console.error('Error obteniendo información del ganado');
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
export { postGanado, getGanado, updateGanado, deleteGanado, getRaza, getPadres, getInfo };

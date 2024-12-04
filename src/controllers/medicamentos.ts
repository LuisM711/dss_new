import e, { Request, Response } from "express";
import { Medicamentos } from "../models/medicamentos.model";
import { Ganado } from "../models/ganado.model";

// POST Medicamento
const postMedicamento = async (req: Request, res: Response) => {
    try {
        const {id_ganado, nombre, costo } = req.body;   
        console.log('recibo',id_ganado,nombre,costo);
        const ganado = await Ganado.findByPk(id_ganado);
        if (!ganado) return res.status(404).json({ message: 'Ganado no encontrado' });

        const newMedicamento = await Medicamentos.create({ id_ganado: parseInt(id_ganado), nombre_medicamento:nombre, coste:costo ,fecha:new Date(),id:0});
        return res.status(201).json(newMedicamento);
    } catch (error) {
        console.error("Error creando medicamento", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
const postMedicamentoAll = async (req: Request, res: Response) => {
    try {
        let { tipo, nombre, costo } = req.body;

        try {   
            const ganado = await Ganado.findAll();
            if (!ganado || ganado.length === 0) {
                return res.status(404).json({ message: 'Ganado no encontrado' });
            }
            if (tipo == 'g') {
                costo = costo/ganado.length;
            }
            for (const gan of ganado) {
                await Medicamentos.create({
                    id_ganado: gan.id,
                    nombre_medicamento: nombre,
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

// GET Medicamentos
const getMedicamentos = async (req: Request, res: Response) => {
    try {
        const medicamentos = await Medicamentos.findAll();
        return medicamentos.length ? res.json(medicamentos) : res.status(404).json({ message: 'No hay medicamentos registrados' });
    } catch (error) {
        console.error('Error obteniendo medicamentos');
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// UPDATE Medicamento
const updateMedicamento = async (req: Request, res: Response) => {
    try {
        const { id_ganado, nombre } = req.params;
        const { coste } = req.body;

        const medicamento = await Medicamentos.findOne({ where: { id_ganado,nombre_medicamento: nombre } });
        if (!medicamento) return res.status(404).json({ message: 'Medicamento no encontrado' });

        medicamento.coste = coste;
        await medicamento.save();
        return res.status(200).json({ message: 'Medicamento actualizado' });
    } catch (error) {
        console.error('Error actualizando medicamento');
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// DELETE Medicamento
const deleteMedicamento = async (req: Request, res: Response) => {
    try {
        const { id_ganado, nombre } = req.params;

        const medicamento = await Medicamentos.findOne({ where: { id_ganado,nombre_medicamento: nombre } });
        if (!medicamento) return res.status(404).json({ message: 'Medicamento no encontrado' });

        await medicamento.destroy();
        return res.status(200).json({ message: 'Medicamento eliminado' });
    } catch (error) {
        console.error('Error eliminando medicamento');
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export { postMedicamento, getMedicamentos, updateMedicamento, deleteMedicamento,postMedicamentoAll };

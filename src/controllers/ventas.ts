import { Request, Response } from "express";
import { Ventas } from "../models/ventas.model";
import { Ganado } from "../models/ganado.model";
import { Bajas } from "../models/bajas.model";

// POST Venta
const postVenta = async (req: Request, res: Response) => {
    try {
        const { id_ganado,precio_venta } = req.body;

        const ganado = await Ganado.findOne({where:{id:id_ganado}});
        console.log(ganado)
        if (!ganado) return res.status(404).json({ message: 'Ganado no encontrado' });

        const newVenta = await Ventas.create({ id:0,id_ganado:parseInt(id_ganado), precio_venta,fecha : new Date() });
        await Bajas.create({id_ganado: parseInt(id_ganado),motivo_baja:'venta',fecha:new Date()})
        await ganado.destroy()
        return res.status(201).json(newVenta);
    } catch (error) {
        console.error("Error creando venta", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// GET Ventas
const getVentas = async (req: Request, res: Response) => {
    try {
        const ventas = await Ventas.findAll();
        return ventas.length ? res.json(ventas) : res.status(404).json({ message: 'No hay ventas registradas' });
    } catch (error) {
        console.error('Error obteniendo ventas');
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// UPDATE Venta
const updateVenta = async (req: Request, res: Response) => {
    try {
        const { id_ganado } = req.params;
        const { precio_venta } = req.body;

        const venta = await Ventas.findOne({ where: { id_ganado } });
        if (!venta) return res.status(404).json({ message: 'Registro de venta no encontrado' });

        venta.precio_venta = precio_venta;
        await venta.save();
        return res.status(200).json({ message: 'Venta actualizada' });
    } catch (error) {
        console.error('Error actualizando venta');
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// DELETE Venta
const deleteVenta = async (req: Request, res: Response) => {
    try {
        const { id_ganado } = req.params;

        const venta = await Ventas.findOne({ where: { id_ganado } });
        if (!venta) return res.status(404).json({ message: 'Registro de venta no encontrado' });

        await venta.destroy();
        return res.status(200).json({ message: 'Venta eliminada' });
    } catch (error) {
        console.error('Error eliminando venta');
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export { postVenta, getVentas, updateVenta, deleteVenta };

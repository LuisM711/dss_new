import { Request, Response } from "express";
import { Usuarios } from "../models/usuarios.model";
import * as bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer';

// POST Usuario
const postUsuario = async (req: Request, res: Response) => {
    try {
        const { correo, nombre,permisos,contra } = req.body;
        if((await Usuarios.findByPk(correo))){
            return res.status(201).json('Usuario existente')
        }
        const newUsuario = await Usuarios.create({ correo, contraseña:contra, nombre,permisos });
        return res.status(201).json(newUsuario);
    } catch (error) {
        console.error("Error creando usuario", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// GET Usuarios
const getUsuarios = async (req: Request, res: Response) => {
    try {
        const usuarios = await Usuarios.findAll();
        return usuarios.length ? res.json(usuarios) : res.status(404).json({ message: 'No hay usuarios registrados' });
    } catch (error) {
        console.error('Error obteniendo usuarios');
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// UPDATE Usuario
const updateUsuario = async (req: Request, res: Response) => {
    try {
        const { correo } = req.params;
        const { correo2, nombre,permisos } = req.body;
        console.log('correo2: ',correo2);
        console.log('correo: ',correo);
        console.log('nombre: ',nombre);
        console.log('permisos: ',permisos);

        const usuario = await Usuarios.findByPk(correo);
        if (!usuario) return res.status(404).json({ message: 'El usuario no existe' });
        if (correo2==''||correo==correo2){
            await usuario.update({ nombre,permisos });
            console.log('usuario sin correo actualizado');
        } else {
            const usuarioExistente = await Usuarios.findByPk(correo2);
            if (usuarioExistente) {
                return res.status(400).json({ message: 'El nuevo correo ya está registrado' });
            }
            await Usuarios.create({
                correo: correo2,
                contraseña: usuario.contraseña,
                nombre: nombre,
                permisos: permisos
            });
            await usuario.destroy();
            console.log('usuario correo actualizado');
        }

        return res.status(200).json({ message: 'Usuario actualizado' });
    } catch (error) {
        console.error('Error actualizando usuario');
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// DELETE Usuario
const deleteUsuario = async (req: Request, res: Response) => {
    try {
        const { correo } = req.params;

        const usuario = await Usuarios.findByPk(correo);
        if (!usuario) return res.status(404).json({ message: 'El usuario no existe' });

        await usuario.destroy();
        return res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        console.error('Error eliminando usuario');
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
const iniciarSesion = async (req: Request, res: Response) => {
    const { mail, contra } = req.body;
    const usuario = await Usuarios.findOne({ where: { correo: mail } });
    if (!usuario) return res.status(200).json({ message: 'El usuario no existe' });
    bcryptjs.compare(contra, usuario.contraseña).then((result) => {
        if (result) return res.status(200).json({ message: 'Inicio de sesión exitoso' , correo: usuario.correo,nombre: usuario.nombre,permisos: usuario.permisos});
        else return res.status(200).json({ message: 'Contraseña incorrecta' });
    });
    
};
const cambiarContra = async (req: Request, res: Response) => {
    const { correo, contra } = req.body;
    const usuario = await Usuarios.findByPk(correo);
    if (!usuario) return res.status(404).json({ message: 'El correo no esta registrado' }); 
    const nuevaContra = await bcryptjs.hash(contra, 10);
    await usuario.update({ contraseña: nuevaContra });
    return res.status(200).json({ message: 'Contraseña actualizada' });
};
const recuperarContra = async (req: Request, res: Response) => {
    try {
        const { correo } = req.body;
        const usuario = await Usuarios.findByPk(correo);
        if (!usuario) return res.status(404).json({ message: 'El correo no esta registrado' }); 
        const codigoRecuperacion = Math.floor(100000 + Math.random() * 900000).toString();
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.correo, 
                pass: process.env.accesoCorreo
            }
        });
        const mailOptions = {
            from: process.env.correo,
            to: correo,
            subject: 'Código de recuperación de contraseña',
            text: `Tu código de recuperación es: ${codigoRecuperacion}`
        };

        await transporter.sendMail(mailOptions);
        
        return res.status(200).json({ 
            message: 'Código de recuperación enviado al correo',
            codigo: codigoRecuperacion
        });
    } catch (error) {
        console.error('Error en recuperación de contraseña:', error);
        return res.status(500).json({ message: 'Error al enviar el código de recuperación' });
    }
};

export { postUsuario, getUsuarios, updateUsuario, deleteUsuario, iniciarSesion, cambiarContra, recuperarContra };

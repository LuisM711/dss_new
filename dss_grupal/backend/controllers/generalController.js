const AlternativaModel = require('../models/AlternativaModel.js');
const CategoriaModel = require('../models/CategoriaModel.js');
const ChatModel = require('../models/ChatModel.js');
const ComentarioModel = require('../models/ComentarioModel.js');
const CriterioModel = require('../models/CriterioModel.js');
const GrupoModel = require('../models/GrupoModel.js');
const LluviaIdeasModel = require('../models/LluviaIdeasModel.js');
const MatrizModel = require('../models/MatrizModel.js');
const ProyectoModel = require('../models/ProyectoModel.js');
const ScoreModel = require('../models/ScoreModel.js');
const UsuarioModel = require('../models/UsuarioModel.js');

const sequelize = require('../database.js');

module.exports.test = async (req, res) => {
    console.log("Inicio de reinicio de la base de datos");
    try {
        await sequelize.sync({ force: true });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
    console.log("Finalizacion de reinicio de la base de datos");
    //insersion de datos
    const grupos = await GrupoModel.bulkCreate([
        { nombre: 'Asesores'},
        { nombre: 'Decisores'}
    ]);
    const proyecto = await ProyectoModel.create({ nombre: 'Laptop(prueba)', descripcion: 'Este proyecto de prueba es para elegir una laptop' });
    const usuarios = await UsuarioModel.bulkCreate([
        { nombre: 'Asesor 1', idGrupo: grupos[0].dataValues.idGrupo },
        { nombre: 'Decisor 1', idGrupo: grupos[1].dataValues.idGrupo }
    ]);
    const alternativas = await AlternativaModel.bulkCreate([
        { nombre: 'Lenovo', descripcion: 'Laptop de prueba como alternativa', idProyecto: proyecto.idProyecto },
        { nombre: 'Asus', descripcion: 'Otra laptop de prueba como alternativa', idProyecto: proyecto.idProyecto }
    ]);
    //console.log(proyecto);return res.json({ message: 'Listo' });
    const criterios = await CriterioModel.bulkCreate([
        { nombre: 'Precio', descripcion: 'El precio de la laptop', idProyecto: proyecto.idProyecto },
        { nombre: 'Costo', descripcion: 'El costo de la laptop', idProyecto: proyecto.idProyecto },
        //separacion logica de criterios a categorias
        { nombre: 'Potencia', descripcion: 'La potencia de la laptop', idProyecto: proyecto.idProyecto },
        { nombre: 'GPU', descripcion: 'La grafica de la laptop', idProyecto: proyecto.idProyecto }
    ]);
    const categorias = await CategoriaModel.bulkCreate([
        { nombre: 'Precio', idProyecto: proyecto.idProyecto },
        { nombre: 'Potencia', idProyecto: proyecto.idProyecto }
    ]);
    const comentarios = await ComentarioModel.bulkCreate([
        { idProyecto: proyecto.idProyecto, idCategoria: categorias[0].idCategoria, idUsuario: usuarios[1].idUsuario, fecha: new Date(), comentario: 'Comentario de prueba para el precio', aprobado: true },
        { idProyecto: proyecto.idProyecto, idCategoria: categorias[1].idCategoria, idUsuario: usuarios[1].idUsuario, fecha: new Date(), comentario: 'Comentario de prueba para la potencia', aprobado: true }
    ]);
    





    return res.json({ message: 'Listo' });
}
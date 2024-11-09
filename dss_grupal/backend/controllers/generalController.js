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
    const proyecto = await ProyectoModel.create({ nombre: 'Laptop(prueba)', descripcion: 'Este proyecto de prueba es para elegir una laptop' });
    const grupos = await GrupoModel.bulkCreate([
        { nombre: 'Asesores', idProyecto: proyecto.id },
        { nombre: 'Decisores', idProyecto: proyecto.id }
    ]);
    const usuarios = await UsuarioModel.bulkCreate([
        { nombre: 'Asesor 1', idGrupo: grupos[0].id },
        { nombre: 'Decisor 1', idGrupo: grupos[1].id }
    ]);
    //alternativa bulkCreate
    const alternativas = await AlternativaModel.bulkCreate([
        { nombre: 'Lenovo', descripcion: 'Laptop de prueba como alternativa', proyectoId: proyecto.id },
        { nombre: 'Asus', descripcion: 'Otra laptop de prueba como alternativa', proyectoId: proyecto.id }
    ]);
    

    





    return res.json({ message: 'Listo' });
}
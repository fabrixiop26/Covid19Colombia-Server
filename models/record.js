const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RecordSchema = new Schema({
    Caso : String,
    Ciudad_municipio: String,
    Departamento: String,
    Edad: Number,
    Estado: String,
    Fecha_Not: Date,
    Fecha_diagnostico: Date,
    Fecha_inicio_sintomas: Date,
    Fecha_muerte: Date,
    Fecha_recuperado: Date,
    Fuente_tipo_contagio: String,
    nombre_depa: String,
    nombre_mun: String,
    Sexo: String,
    Tipo_recuperacion: String,
    Ubicacion: String,
    Ubicacion_recuperados: String
});

module.exports = mongoose.model("Record", RecordSchema);
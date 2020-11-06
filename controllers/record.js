//Carga el modelo
const Record = require("../models/record");

const getRecordsByDepartmentSimple = () => {
    return Record.aggregate([
        {
            $group: {
                _id: "$Departamento",
                Casos: {
                    $sum: 1
                },
                Nombre: {
                    $first: "$nombre_depa"
                }
            }
        }
    ]);
}

const getCaso = (caso) => {
    return Record.findOne({
        Caso: caso
    })
}

const getDepartmentData = (id, page, limit) => {
    return Record.find({
        Departamento: id
    })
        .skip((page - 1) * limit)
        .limit(limit);
}

const getRecuperadosDeptByMonth = (id) => {
    return Record.aggregate([
        {
            $match: {
                Fecha_recuperado: { $ne: new Date("1970-01-01T00:00:00.000+00:00") },
                Departamento: id
            } //Evitamos los datos vacios
        },
        {
            $group: {
                _id: { $month: "$Fecha_recuperado" }, // el id sera el mes de la fecha de diagnostico
                Casos: { $sum: 1 },
                Nombre: {
                    $first: "$nombre_depa"
                },
                Hombres : {
                    $sum : {$cond : [ { $or: [{$eq: ["$Sexo", "M"]},{$eq: ["$Sexo", "m"]}]  }, 1,0 ]}
                  },
                Mujeres: {
                    $sum : {$cond : [ { $or: [{$eq: ["$Sexo", "F"]},{$eq: ["$Sexo", "f"]}]  }, 1,0 ]}
                }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ]);
}

const getNewCasesDeptByMonth = (id) => {
    return Record.aggregate([
        {
            $match: {
                Fecha_diagnostico: { $ne: new Date("1970-01-01T00:00:00.000+00:00") },
                Departamento: id
            } //Evitamos los datos vacios
        },
        {
            $group: {
                _id: { $month: "$Fecha_diagnostico" }, // el id sera el mes de la fecha de diagnostico
                Casos: { $sum: 1 },
                Nombre: {
                    $first: "$nombre_depa"
                },
                Hombres : {
                    $sum : {$cond : [ { $or: [{$eq: ["$Sexo", "M"]},{$eq: ["$Sexo", "m"]}]  }, 1,0 ]}
                },
                Mujeres: {
                    $sum : {$cond : [ { $or: [{$eq: ["$Sexo", "F"]},{$eq: ["$Sexo", "f"]}]  }, 1,0 ]}
                }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ]);
}

const getDeathDeptByMonth = (id) => {
    return Record.aggregate([
        {
            $match: {
                Fecha_muerte: { $ne: new Date("1970-01-01T00:00:00.000+00:00") }, //Evitamos los datos vacios
                Departamento: id
            } 
        },
        {
            $group: {
                _id: { $month: "$Fecha_muerte" }, // el id sera el mes de la fecha de diagnostico
                Casos: { $sum: 1 },
                Nombre: {
                    $first: "$nombre_depa"
                },
                Hombres: {
                    $sum: { $cond: [{ $or: [{ $eq: ["$Sexo", "M"] }, { $eq: ["$Sexo", "m"] }] }, 1, 0] }
                },
                Mujeres: {
                    $sum: { $cond: [{ $or: [{ $eq: ["$Sexo", "F"] }, { $eq: ["$Sexo", "f"] }] }, 1, 0] }
                }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ]);
}

module.exports = {
    getRecordsByDepartmentSimple,
    getCaso,
    getDepartmentData,
    getRecuperadosDeptByMonth,
    getNewCasesDeptByMonth,
    getDeathDeptByMonth
}
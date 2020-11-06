//Import the controller
const controller = require("../controllers/record");
//Create router instace
const router = require("express").Router();

//get casos gorup by depratamento
router.get("/groupByDepartmentSimple", (req, res) => {
    controller.getRecordsByDepartmentSimple()
    .then((response) => {
        res.status(200).json(response);
    })
    .catch((err) => {
        res.status(500).json({
            message: "Internal Error"
        })
    })
});

router.get("/getCaso/:Caso", (req, res) => {
    controller.getCaso(req.params.Caso)
    .then(caso => {
        if(!caso){
            return res.status(404).json({
                message: "Ese Caso no existe"
            })
        }

        res.status(200).json(caso);
    })
    .catch(err => {
        res.status(500).json({
            message: "Internal Error"
        })
    })
});

//Obtener informacion agrupada por departamento
//paginacion
router.get("/getDataByDepartment" , (req, res) => {
    const { id, page=1 } = req.query;
    if(!id){
        return res.status(400).json({
            message: "Necesita proporcionar un Id de departamento"
        });
    }
    controller.getDepartmentData(id, page, 20)
    .then(data => {
        if(data.length == 0){
            return res.status(404).json({
                message: "No se encuentra ese departamento"
            })
        }

        res.status(200).json({
            records: data,
            currentPage: page
        });
    })
    .catch(err => {
        res.status(500).json({
            message: "Internal Error"
        })
    })
});

router.get("/getRecuperadosDeptByMonth", (req, res) => {
    const id = req.query.id;
    if (!id){
        return res.status(400).json({
            message: "No ingresaste un id de departamento Amstrong, que te pasa ombe..."
        })
    }
    controller.getRecuperadosDeptByMonth(id)
    .then(data => {
        if(data.length == 0){
            return res.status(404).json({
                message: "No se encuentra datos"
            })
        }

        res.status(200).json(data);

    })
    .catch(err => {
        res.status(500).json({
            message: "Internal Error"
        })
    })
});

router.get("/getNewCasesDeptByMonth", (req, res) => {
    const id = req.query.id;
    if (!id){
        return res.status(400).json({
            message: "No ingresaste un id de departamento Amstrong, que te pasa ombe..."
        })
    }
    controller.getNewCasesDeptByMonth(id)
    .then(data => {
        if(data.length==0){
            return res.status(404).json({
                message: "No existe ese caso"
            })
        }
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(500).json({
            message:"Internal Error"
        })
    })
});

router.get("/getDeathDeptByMonth", (req, res) => {
    const id = req.query.id;
    if (!id){
        return res.status(400).json({
            message: "No ingresaste un id de departamento Amstrong, que te pasa ombe..."
        })
    }
    controller.getDeathDeptByMonth(id)
    .then(data => {
        if(data.length==0){
            return res.status(404).json({
                message: "No existe ese caso"
            })
        }
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(500).json({
            message:"Internal Error"
        })
    })
});

module.exports = router;
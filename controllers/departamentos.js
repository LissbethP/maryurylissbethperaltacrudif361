import cnn from "../database/connection.js"

export const listarDepartamentos = async (req, res) => {
    cnn.query(`SELECT * FROM departamento` , (err, result) => {
        if (err) {
            console.log("Ocurrio un error", err);
            return
        }
        res.render('departamentos',{ data: result })
    })
}
export const departamento = async (req, res) => {
    const { accion, IdDepto } = req.query
    let depto = ''
    if(accion == "editar" && IdDepto){
        cnn.query(`SELECT * FROM departamento where IdDepto=${IdDepto}`,(err, result) => {
            if (err) {
                console.log("Ocurrio un error", err);
                return
            }
            res.render('departamento', { accion: accion, depto: result})
        })
        return
    }
    res.render('departamento', { accion: accion})
}

export const guardarDepartamento = async (req, res) => {
    const {
        NombreDepto,
        Descripcion} = req.body
    console.log(NombreDepto,Descripcion)
    if (!NombreDepto || !Descripcion) {
        res.redirect('/departamento/?accion=ERROR-EN-DATOS')
        return
    }
    const data = {
        NombreDepto:NombreDepto,
        Descripcion:Descripcion
    }
    cnn.query("INSERT INTO departamento SET ?", [data], async (err, result) => {
        if (err) {
            console.log(err)
            res.redirect('/departamento/?accion=err')
            return
        }
        res.redirect("/departamentos")

    })

}

export const editarDepartamento = async (req, res) => {
    const {
        NombreDepto,
        Descripcion,
        IdDepto} = req.body
    if (!NombreDepto || !Descripcion || !IdDepto) {
        res.redirect('/departamento/?accion=error')
        return
    }
    cnn.query(`UPDATE departamento SET NombreDepto='${NombreDepto}',Descripcion='${Descripcion}' WHERE IdDepto='${IdDepto}'`, async (err, result) => {
        if (err) {
            console.log(err)
            res.redirect('/departamento/?accion=error')
            return
        }
        res.redirect("/departamentos")

    })
}

export const eliminarDepartamento = async (req, res) => {
    const { IdDepto } = req.body
    if (!IdDepto) {
        res.redirect('/departamentos')
        return
    }
    cnn.query("DELETE FROM departamento WHERE IdDepto=?", [IdDepto], async (err, result) => {
        if (err) {
            console.log(err)
            res.redirect('/departamentos')
            return
        }
        res.setHeader("Content-Type", "application/json")
        res.statusCode = 200
        res.json({ type: 'success' })

    })
}
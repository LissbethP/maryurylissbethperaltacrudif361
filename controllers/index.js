import cnn from "../database/connection.js"

export const listar = async (req, res) => {
    cnn.query(`
        SELECT e.IdEmpleado, e.NombreCompleto, e.Celular, e.Correo, e.Direccion, e.IdDepto, d.NombreDepto 
        FROM empleado e
        inner join departamento d on d.IdDepto = e.IdDepto
    ` , (err, result) => {
        if (err) {
            console.log("Ocurrio un error", err);
            return
        }
        res.render('index', { data: result })
    })
}

export const empleado = async (req,res) =>{
    const { accion, IdEmpleado } = req.query
    let depto = ''
    let empleado = ''
    if(accion == "editar" && IdEmpleado){
        cnn.query(`SELECT e.IdEmpleado, e.NombreCompleto, e.Celular, e.Correo, e.Direccion, e.IdDepto, d.NombreDepto 
        FROM empleado e
        inner join departamento d on d.IdDepto = e.IdDepto
        where IdEmpleado=${IdEmpleado}`,(err, result) => {
            if (err) {
                console.log("Ocurrio un error", err);
                return
            }
            empleado = result
        })
    }
    cnn.query(`select IdDepto, NombreDepto from departamento` , (err, result) => {
        if (err) {
            console.log("Ocurrio un error", err);
            return
        }
        depto = result
        res.render('empleado', { accion: accion, depto: depto, empleado: empleado})
    })
}

export const guardarEmpleado = async (req, res) => {
    const {
        IdEmpleado,
        NombreCompleto,
        Celular,
        Correo,
        Direccion,
        IdDepto} = req.body
    if (!IdEmpleado || !NombreCompleto || !Celular || !Correo || !Direccion || !IdDepto) {
        res.redirect('/empleado')
        return
    }
    const data = {
        IdEmpleado:IdEmpleado,
        NombreCompleto:NombreCompleto,
        Celular:Celular,
        Correo:Correo,
        Direccion:Direccion,
        IdDepto:IdDepto
    }
    cnn.query("INSERT INTO empleado SET ?", [data], async (err, result) => {
        if (err) {
            console.log(err)
            res.redirect('/empleado')
            return
        }
        res.redirect("/")

    })

}

export const editarEmpleado = async (req, res) => {
    const {
        IdEmpleado,
        NombreCompleto,
        Celular,
        Correo,
        Direccion,
        IdDepto } = req.body
    if (!IdEmpleado || !NombreCompleto || !Celular || !Correo || !Direccion || !IdDepto) {
        res.redirect('/empleado/?accion=error')
        return
    }
    cnn.query(`UPDATE empleado SET NombreCompleto='${NombreCompleto}',Celular='${Celular}',Correo='${Correo}',Direccion='${Direccion}',IdDepto='${IdDepto}' WHERE IdEmpleado='${IdEmpleado}'`, async (err, result) => {
        if (err) {
            console.log(err)
            res.redirect('/empleado/?accion=error')
            return
        }
        res.redirect("/")

    })
}

export const eliminarEmpleado = async (req, res) => {
    const { IdEmpleado } = req.body
    if (!IdEmpleado) {
        res.redirect('/')
        return
    }
    cnn.query("DELETE FROM empleado WHERE IdEmpleado=?", [IdEmpleado], async (err, result) => {
        if (err) {
            console.log(err)
            res.redirect('/')
            return
        }
        res.setHeader("Content-Type", "application/json")
        res.statusCode = 200
        res.json({ type: 'success' })

    })
}
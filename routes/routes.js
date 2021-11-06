import express from 'express'
import { departamento, editarDepartamento, eliminarDepartamento, guardarDepartamento, listarDepartamentos } from '../controllers/departamentos.js'
import { editarEmpleado, eliminarEmpleado, empleado, guardarEmpleado, listar } from '../controllers/index.js'
const router = express.Router()


router.get('/',listar)
router.get('/empleado', empleado)
router.post('/empleado/guardar', guardarEmpleado )
router.post('/empleado/editar', editarEmpleado )
router.delete('/empleado/eliminar', eliminarEmpleado )

router.get('/departamento', departamento)
router.get('/departamentos', listarDepartamentos )
router.post('/departamento/guardar',guardarDepartamento )
router.post('/departamento/editar', editarDepartamento )
router.delete('/departamento/eliminar', eliminarDepartamento )
export default router

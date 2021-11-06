$(document).ready(function () {
    let optDeptos = `<option selected disabled value="">Escoja...</option>`
    deptos.forEach(element => {
        if(accion === 'editar'){
            optDeptos += `<option ${element.NombreDepto == empleado[0].NombreDepto?'selected':null}  value="${element.IdDepto}">${element.NombreDepto}</option>`
        }else if(accion === 'nuevo'){
            optDeptos += `<option 'selected' value="${element.IdDepto}">${element.NombreDepto}</option>`
        }
    })
    $("#IdDepto").html(optDeptos)
    if(accion === 'editar'){
        $("#nombreEmpleado").text(empleado[0].NombreCompleto)
        $("#IdEmpleado").val(empleado[0].IdEmpleado)
        $("#NombreCompleto").val(empleado[0].NombreCompleto)
        $("#Celular").val(empleado[0].Celular)
        $("#Correo").val(empleado[0].Correo)
        $("#Direccion").val(empleado[0].Direccion)
    }
})
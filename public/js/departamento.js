$(document).ready(function () {
    if(accion === 'editar'){
        $("#nombreDepartamento").text(depto[0].NombreDepto)
        $("#IdDepto").val(depto[0].IdDepto)
        $("#NombreDepto").val(depto[0].NombreDepto)
        $("#Descripcion").val(depto[0].Descripcion)
    }
})
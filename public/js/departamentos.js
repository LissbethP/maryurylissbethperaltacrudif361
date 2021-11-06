window.onload = function () {
    let tr = ''
    data.forEach(element => {
        tr += `
            <tr id="fila-${element.IdDepto}">
                <th scope="row"> ${element.IdDepto}</th>
                <td> ${element.NombreDepto}</td>
                <td> ${element.Descripcion}</td>
                <td>
                    <a href="/departamento/?accion=editar&IdDepto=${element.IdDepto}" class="btn btn-success btn-sm"><i class="fas fa-edit"></i></a>
                    <a href="javascript:eliminarDepartamento('${element.IdDepto}')" class="btn btn-danger btn-sm"><i class="fas fa-eraser"></i></a>
                </td>
            </tr>
        `
    })
    $("#data-departamentos").html(tr)
    
}
function eliminarDepartamento(IdDepto){
    $.ajax({
        url : '/departamento/eliminar',
        method : 'DELETE',
        async:false,
        cache: false,
        data : {IdDepto :IdDepto}
    })
    .done((respuesta) => {
        if (respuesta.type == 'success') {
            $("#fila-"+IdDepto).fadeOut("normal", function() {
                $("#fila-"+IdDepto).remove()
            })
        }
    });
}
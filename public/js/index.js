window.onload = function () {
    let tr = ''
    data.forEach(element => {
        tr += `
            <tr id="fila-${element.IdEmpleado}">
                <th scope="row"> ${element.IdEmpleado}</th>
                <td> ${element.NombreCompleto}</td>
                <td> ${element.Celular}</td>
                <td> ${element.Correo}</td>
                <td> ${element.Direccion}</td>
                <td> ${element.NombreDepto}</td>
                <td>
                    <a href="/empleado/?accion=editar&IdEmpleado=${element.IdEmpleado}" class="btn btn-success btn-sm"><i class="fas fa-edit"></i></a>
                    <a href="javascript:eliminarEmpleado('${element.IdEmpleado}')" class="btn btn-danger btn-sm"><i class="fas fa-eraser"></i></a>
                </td>
            </tr>
        `
    })
    $("#data-empleados").html(tr)
    
}
function eliminarEmpleado(IdEmpleado){
    $.ajax({
        url : '/empleado/eliminar',
        method : 'DELETE',
        async:false,
        cache: false,
        data : {IdEmpleado :IdEmpleado}
    })
    .done((respuesta) => {
        if (respuesta.type == 'success') {
            $("#fila-"+IdEmpleado).fadeOut("normal", function() {
                $("#fila-"+IdEmpleado).remove()
            })
        }
    });
}
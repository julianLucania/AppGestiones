$(document).ready(function () {
    //function will be called on button click having id btnsave
    $("#btnActualizar").click(function () {
        var cuenta = $("#txtCuenta").val(); //Reading text box values using Jquery   
        var equipo = $("#txtEquipo").val();
        var segmento = $("#txtSegmento").val();
        var mensaje = "";

        if (validaSegmentoYEquipo(cuenta, segmento, equipo, mensaje) === true) {
            $.ajax(
                {
                    type: "POST", //HTTP POST Method  
                    url: "/AppGestiones/Grove/AddSegmentoyEquipo", // Controller/View   
                    data:
                    {
                        cuenta: cuenta, //Reading text box values using Jquery   
                        equipo: equipo,
                        segmentoCuenta: segmento
                    },
                    success: function (result)
                    {
                        alert("Datos Actualizados");
                        $("#txtCuenta").val("");
                        $("#txtEquipo").val("");
                        $("#txtSegmento").val("");

                    }
                });
        }


    });

    $("#btnProcesar2").click(function () {

        var rutaFichero = $("#rutaFichero").val();
        var mensaje = "";
        $('#imgPreloaderSegEquipos').css('display', 'inline');

        $.ajax(
            {
                type: "POST", //HTTP POST Method  
                url: "/AppGestiones/Grove/insertaDatosSegmentoyEquipo", // Controller/View     
                data:
                {
                    rutaFichero: rutaFichero
                },
                success: function (result)
                {
                    if (result === "1")
                    {
                        $('#imgPreloader').css('display', 'none');
                        alert("DATOS IMPORTADOS CORRECTAMENTE");
                    }   
                    else alert("LOS DATOS NO SE HAN GUARDADO CORRECTAMENTE ERROR : " + result);
                }
            });


    });

    $("#btnProcesarImportacion").click(function () {

        var camp = $("#selectCamp").val();
        $('#imgPreloader').css('display', 'inline');
        $.ajax(
            {
                type: "POST", //HTTP POST Method  
                url: "/AppGestiones/Grove/importaFicherosGrove", // Controller/View     
                data:
                {
                    camp: camp
                },
                success: function (result)
                {
                    $('#imgPreloader').css('display', 'none');
                    $("#panelResultado").html(result);
                }
            });


    });

});

function validaSegmentoYEquipo(cuenta, segmento, equipo, mensaje) {

    resultado = true;

    if (cuenta === "") {
        mensaje = "La cuenta no puede quedar en blanco";
    }
    else if ((segmento === "") && (equipo === "")) {
        mensaje = "Debe introducir el segmento o el equipo para continuar";
    }

    if (mensaje.length > 0) {
        resultado = false;
        alert('Error:\n\n' + mensaje);
    }

    return resultado;

}

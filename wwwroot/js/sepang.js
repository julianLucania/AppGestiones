$(document).ready(function () {

    $("#btnInforme").click(function () {

        var fechaDesde = $("#txtfechaDesde").val(); //Reading text box values using Jquery   
        var fechaHasta = $("#txtfechaHasta").val();
        var cartera = $("#selecCartera").val();
        var directorio = $("#directorioDescarga").val();
        var mensaje = "";

        if (validaCamposInforme(cartera, fechaDesde, fechaHasta, mensaje) === true) {
            $.ajax(
                {
                    type: "POST", //HTTP POST Method  
                    url: "/AppGestiones/" + cartera + "/GeneraInformeCobros", // Controller/View   
                    data:
                    {
                        cartera: cartera, //Reading text box values using Jquery   
                        fechaDesde: fechaDesde,
                        fechaHasta: fechaHasta,
                        directorio: directorio
                    },
                    success: function (result) {
                        if (result != "0") {
                            alert("EL FICHERO SE GENERO CORRECTAMENTE");
                            window.open(result, "_self")
                        }
                        else alert("EL FICHERO NO SE HA GENERADO CORRECTAMENTE ERROR : " + result);
                    }
                });
        }


    });

});

function validaCamposInforme(cartera, fechaDesde, fechaHasta, mensaje)
{

    resultado = true;
    mensaje   = "";

    if (fechaDesde.trim() == "")
    {
        mensaje = mensaje + "DEBE INTRODUCIR UNA FECHA DESDE" + "\n";
    }

    if (fechaHasta.trim() == "")
    {
        mensaje = mensaje + "DEBE INTRODUCIR UNA FECHA HASTA" + "\n";
    }



    if (mensaje.length > 0)
    {
        resultado = false;
        alert('Error:\n\n' + mensaje);
    }

    return resultado;

}
$(document).ready(function () {

    $("#btnProcesarImportacionSabadell").click(function ()
    {
        $('#imgPreloaderSabadell').css('display', 'inline');
        $.ajax(
            {
                type: "POST", //HTTP POST Method  
                url: "/AppGestiones/Sabadell/importaFicherosSabadell", // Controller/View     
                success: function (result)
                {
                    $('#imgPreloaderSabadell').css('display', 'none');
                    $("#panelResultado").html(result);
                }
            });


    });

    $("#btnFicheroSabadell").click(function () {


        $('#imgPreloaderSabadell2').css('display', 'inline');
        var fechaFicherosSabadell = $('#txtfechaSabadell').val();

        if (fechaFicherosSabadell.trim() != "") {

            $.ajax(
                {
                    type: "POST", //HTTP POST Method  
                    url: "/AppGestiones/Sabadell/buscaFicherosSabadell", // Controller/View     
                    data:
                    {
                        fechaFicherosSabadell: fechaFicherosSabadell
                    },
                    success: function (result) {

                        if ((result[0] !== "") && (result[0] !== null)) {

                            var fechaDirectorio = fechaFicherosSabadell.replace(/-/g, "");

                            url = "http://192.168.2.8/procesos/sabadell_new/in/archive/" + fechaDirectorio + "/";

                            $("#tablaFicherosSabadell tbody").empty();

                            for (x = 0; x < result.length; x++)
                            {
                                var fichero = result[x];
                                var archivo = url + fichero;
                                var img = "<img src='../images/iconoDownload.png' style='width: 29px;cursor:pointer'onclick=window.open('" + archivo + "','_blank')></img>";
                                //var img = "<a href='" + archivo + "' download> <img src='../images/iconoDownload.png' style='width: 29px;cursor:pointer'></img> </a>";
                                var markup = "<tr><td>" + x + "</td><td>" + fichero + "</td><td>" + img + "</td></tr>";
                                $("#tablaFicherosSabadell tbody").append(markup);
                            }

                            alert("DATOS IMPORTADOS CORRECTAMENTE");

                        }
                        else {
                            $("#tablaFicherosSabadell tbody").empty();
                            alert("FICHEROS NO ENCONTRADOS, CONTACTE CON DESARROLLO");
                        }

                        $('#imgPreloaderSabadell2').css('display', 'none');
                    }
                });
        }
        else
        {
            alert("DEBE INTRODUCIR UNA FECHA VALIDA");
        }


    });


});

function downloadURI(uri) {
    var link = document.createElement('a');

    debugger;

    link.href = uri;
    link.download = 'download';
    link.click();

}

function download(filename, text)
{
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
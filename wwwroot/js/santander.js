$(document).ready(function () {

    $("#btnFotoSantander").click(function () {

        $('#imgPreloader').css('display', 'inline');

        $.ajax(
            {
                type: "POST", //HTTP POST Method  
                url: "/AppGestiones/Santander/lanzaFotoSantander", // Controller/View     

                success: function (result)
                {
                    $('#imgPreloader').css('display', 'none');
                    $("#panelResultadoFoto").html(result);
                }
            });


    });

    $("#btnFicheroResllam").click(function () {


        $('#imgPreloaderResllam').css('display', 'inline');
        var fechaFicheroResllam = $('#txtfechaResllam').val();

        $.ajax(
            {
                type: "POST", //HTTP POST Method  
                url: "/AppGestiones/Santander/buscaFicherosResllam", // Controller/View     
                data:
                {
                    fechaFicheroResllam: fechaFicheroResllam
                },
                success: function (result)
                {
                  
                    if ((result[0] !== "") && (result[0] !== null)) {

                        url = "http://192.168.2.8/procesos/santander/out/archive/"
                        $("#tablaFicherosResllam tbody").empty();
                        for (x = 0; x < result.length; x++) {
                            var fichero = result[x];
                            var archivo = url + fichero;
                            var img = "<img src='../images/iconoDownload.png' style='width: 29px;cursor:pointer' onclick=window.open('" + archivo + "','_self')></img>";
                            var markup = "<tr><td>" + x + "</td><td>" + fichero + "</td><td>" + img + "</td></tr>";
                            $("#tablaFicherosResllam tbody").append(markup);
                        }

                        alert("DATOS IMPORTADOS CORRECTAMENTE");

                    }
                    else
                    {
                        $("#tablaFicherosResllam tbody").empty();
                        alert("FICHEROS NO ENCONTRADOS, CONTACTE CON DESARROLLO");
                    }

                    $('#imgPreloaderResllam').css('display', 'none');
                }
            });


    });

    $("#btnFicheroSipre").click(function () {

        $('#imgPreloaderSipre').css('display', 'inline');

        $.ajax(
            {
                type: "POST", //HTTP POST Method  
                url: "/AppGestiones/Santander/lanzaFicheroSipre", // Controller/View     

                success: function (result)
                {
                    $('#imgPreloaderSipre').css('display', 'none');
                    $("#panelResultadoSipre").html(result);
                }
            });


    });

});
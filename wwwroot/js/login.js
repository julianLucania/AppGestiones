// Write your JavaScript code.

$(document).ready(function ()
{
    //function will be called on button click having id btnsave
    $("#btnlogin").click(function ()
    {
 
        var usuario  = $("#loginusername").val();
        var password = $("#loginpassword").val();

        $.ajax(
        {
            type: "POST", //HTTP POST Method  
            url: "/AppGestiones/Home/compruebaUsuarioContrasenha", // Controller/View   
            data:
            {   
                usuario: usuario, //Reading text box values using Jquery   
                password: password
            },
            success: function (result)
            {
                if (result === "1")
                {
                    window.location.href = 'AppGestiones/Rendimiento/Index/';
                }
                else
                {
                    alert("El usuario o contraseña es erroneo");
                }
            }
        });

        


    });  
});

function validaSegmentoYEquipo(cuenta, segmento, equipo,mensaje)
{
    resultado = true;

    if (cuenta == "") 
    {
        mensaje = "La cuenta no puede quedar en blanco";
    }
    else if ((segmento == "") && (equipo == ""))
    {
        mensaje = "Debe introducir el segmento o el equipo para continuar";
    }

    if (mensaje.length > 0)
    {
        resultado = false;
        alert('Error:\n\n' + mensaje);
    } 

    return resultado;

}



  
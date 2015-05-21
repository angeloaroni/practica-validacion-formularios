'use strict';
$(document).ready(function() {
    $('#frmalta').validate({
        rules: {
            nombre: {
                required: true
                
            },
            apellido:{
            	required: true
            },
            telefono:{
            	required: true,
            	digits : true,
            	minlength : 9
            },
            email: {
                email: true,
                required: true,
                remote: 'http://www.futbolistas.com/php/validar_email_db.php'
            },
            email2: {
                equalTo: '#email'
            },
            conocido:{
            	required: true
            }


        } //,
        //para que se muestre los errores encima del formulario
        //'wrapper': 'p',
        //'errorLabelContainer':'#errores'        

    });
});

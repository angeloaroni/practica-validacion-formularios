'use strict';
$(document).ready(function() {
    $('#frmalta').validate({
        rules: {
            nombre: {
                required: true

            },
            apellido: {
                required: true
            },
            telefono: {
                required: true,
                digits: true,
                minlength: 9
            },
            email: {
                email: true,
                required: true,
                remote: 'http://www.aaroni.infenlaces.com/php/validar_email_db.php'
                    //remote: 'php/validar_email_db.php'
            },
            email2: {
                equalTo: '#email'
            },
            conocido: {
                required: true
            },
            codpostal: {
                required: true,
                digits: true,
                minlength: 4,
                maxlength: 5
            }


        } //,
        //para que se muestre los errores encima del formulario
        //'wrapper': 'p',
        //'errorLabelContainer':'#errores'        

    });
    $('#codpostal').focusout(function() {
        var caracteres = $('#codpostal').val();
        if (caracteres.length === 4){
            $('#codpostal').val('0' + caracteres);
        }
    });
    

});

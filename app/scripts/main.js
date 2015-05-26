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
            },  
            pass: {
                pass: true,
                required: true
            },
            pass2:{
                equalTo: '#pass'
            }


        } //,
        //para que se muestre los errores encima del formulario
        //'wrapper': 'p',
        //'errorLabelContainer':'#errores'        

    });
    //si el codigo postal son 4 digitos autocompleta con un 0 a la izquierda
    $('#codpostal').focusout(function() {
        var caracteres = $('#codpostal').val();
        if (caracteres.length === 4){
            $('#codpostal').val('0' + caracteres);
        }
    });
    //verifica la seguridad de la passsword con plugin complexify
    $('#complexify #pass').complexify({}, function (valid, complexity) {
        var progressBar = $('#complexify #complexity-bar');

        progressBar.toggleClass('progress-bar-success', valid);
        progressBar.toggleClass('progress-bar-danger', !valid);
        progressBar.css({'width': complexity + '%'});

        $('#complexify #complexity').text(Math.round(complexity) + '%');
    });
    
    $('#pass').passField({showWarn: false, showTip: false, allowEmpty: false});
    
});

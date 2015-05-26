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
                remote: 'http://www.futbolistas.com/php/validar_email_db.php'
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
            pass2: {
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
        if (caracteres.length === 4) {
            $('#codpostal').val('0' + caracteres);
        }
    });
    //verifica la seguridad de la passsword con plugin complexify
    $('#complexify #pass').complexify({}, function(valid, complexity) {
        var progressBar = $('#complexify #complexity-bar');

        progressBar.toggleClass('progress-bar-success', valid);
        progressBar.toggleClass('progress-bar-danger', !valid);
        progressBar.css({
            'width': complexity + '%'
        });

        $('#complexify #complexity').text(Math.round(complexity) + '%');
    });

    $('#pass').passField({
        showWarn: false,
        showTip: false,
        allowEmpty: false
    });
    //Para quese complete la provincia escribiendo el codigo postal
    $('#codpostal').change(function() {
        if ($('#pais option:selected').val() === 'ES/0/0') {
            if ($(this).val() !== '') {
                var dato = $(this).val();
                if (dato.length >= 2) {
                    dato = dato.substring(0, 2);
                }
                $('#provincia').val(dato);
            }
        }
    });

    $('#nombre,#apellido').on('change',function () {
        var value = $(this).val();
        $('#nomempresa').val(value);
    });

});

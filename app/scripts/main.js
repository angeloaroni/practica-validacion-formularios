'use strict';
$(document).ready(function() {
    $('#frmalta').validate({
        rules: {
            nombre: {
                required: true,
                minlength: 4
            },
            apellido: {
                required: true
            },
            telefono: {
                required: true,
                digits: true,
                minlength: 9,
                maxlength: 9
            },
            email: {
                email: true,
                required: true,
                remote: 'http://localhost/validacion/validar_email_db.php'
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
            },
            localidad: {
                required: true
            },
            iban: {
                iban: true,
                required: true
            },
            usuario: {
                required: true,
                minlength: 4
            },
            cifnif: {
                required: true,
                nifES: function() {
                    if ($('#particular').val() === '1') {
                        return true;
                    }
                },
                cifES: function() {
                    if ($('#empresa').val() === '2') {
                        return true;
                    }
                }
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
    //autocompletamos el nombre del particular
    $('#nombre,#apellido').on('change', function() {
        var nombre = $('#nombre').val();
        var apellido = $('#apellido').val();
        $('#nomempresa').val(nombre + ' ' + apellido);
        $('#nomempresa').attr('readonly', true);
    });
    //si elegimos empresa 
    $('#empresa').click(function() {
        $('#lcifnif').text('CIF');

        $('#lnomemp').text('Empresa');
        $('#nomempresa').val(' ');
        $('#nomempresa').attr('readonly', false);
    });
    //si elegimos particular
    $('#particular').click(function() {
        $('#lcifnif').text('NIF');
        $('#lnomemp').text('Nombre');
        var nombre = $('#nombre').val();
        var apellido = $('#apellido').val();
        $('#nomempresa').val(nombre + ' ' + apellido);
        $('#nomempresa').attr('readonly', true);
    });
    $('#email').on('change', function() {
        var dato = $('#email').val();
        if (dato.length >= 4) {
            dato = dato.substring(0, 4);
        }
        $('#usuario').val(dato);
        $('#usuario').attr('readonly', true);
    });
});

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
                remote: 'php/validar_email_db.php'
                //remote: 'http://www.futbolistas.com/php/validar_email_db.php'
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
                remote: 'http://www.futbolistas.com/php/validar_nif_db.php',
                nifES: function() {
                    if ($('input:radio[name=demandante]:checked').val() === '1') {
                        return true;
                    }
                
                },
                cifES: function() {
                    if ($('input:radio[name=demandante]:checked').val() === '2') {
                        return true;
                    }
                }

            },
            pais: {
                required: true
            },
            direccion: {
                required: true
            },
            provincia: {
                required: true
            },
            nomempresa: {
                required: true
            },
            pago: {
                required: true
            }

        },
        messages: {
            conocido: {
                required: 'Dinos como nos conociste',
            },
            pago: {
                required: 'Elige forma de pago',
            },
            cifnif:{
                remote: 'Este NIF ya axiste, por favor ingrese otro.',
            }
        }, //,
        //para que se muestre los errores encima del formulario
        //'wrapper': 'p',
        //'errorLabelContainer':'#errores'   
        //comportamiento si precionamos submit
        submitHandler: function(frmalta) {
            var cantidad = ($('input:radio[name=pago]:checked').val());
            if (cantidad === 'mensual') {
                confirm('Se va a proceder a dar de alta \n El tipo de pago es mensual \nLa primera cuota es de 50€');
            } else if (cantidad === 'trimestral') {
                confirm('Se va a proceder a dar de alta \nEl tipo de pago es trimestral \nLa primera cuota es de 140€');
            } else {
                confirm('Se va a proceder a dar de alta \nEl tipo de pago es anual \nLa cuota es de 550€');
            }
            frmalta.submit();
        }
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
    //otra opcion de passwors seguro con passfield
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
        $('#cifnif').attr('placeholder', 'Introduce tu CIF');
        $('#lnomemp').text('Nombre Empresa');
        $('#nomempresa').val(' ');
        //$('#nomempresa').attr('placeholder', 'Nombre de la empresa');
        $('#nomempresa').attr('readonly', false);

    });
    //si elegimos particular
    $('#particular').click(function() {
        $('#lcifnif').text('NIF');
        $('#lnomemp').text('Nombre');
        $('#cifnif').attr('placeholder', 'Introduce tu NIF');
        var nombre = $('#nombre').val();
        var apellido = $('#apellido').val();
        $('#nomempresa').val(nombre + ' ' + apellido);
        $('#nomempresa').attr('readonly', true);
    });
    //autocompletar nombre de usuario
    $('#email').on('change', function() {
        var dato = $('#email').val();
        $('#usuario').val(dato);
        $('#usuario').attr('readonly', true);
    });


});

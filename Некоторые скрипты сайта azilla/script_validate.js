/*Скрипт валидации формы регистрации.*/
function ValidateReg() {
    this.x = false;
    this.y = false;
    that = this;

    this.validateRegEx = function(regex, inputStr, helpText, helpMessage) {
        if (!regex.test(inputStr)) {
            if (helpText != null)
                helpText.text(helpMessage);
            return false;
        } else {
            if (helpText != null)
                helpText.text('');
            return true;
        }
    };

    this.validateNonEmpty = function(inputField, helpText) {
        if (inputField.val().length == 0) {
            if (helpText != null)
                helpText.text('Данное поле необходимо заполнить');
        } else {
            if (helpText != null)
                helpText.text('');
            return true;
        }
    };

    this.validateName = function(inputField, helpText) {
        if (!that.validateNonEmpty(inputField, helpText))
            return false;
        if (that.validateRegEx(/^[а-яА-ЯёЁa-zA-Z\s]{2,20}$/, inputField.val(), helpText,
                'Может содержать от 2 до 20 символов, не включая цифры и знаки.')) {
            return true;
        }
    };

    this.validateLogin = function(inputField, helpText) {
        if (!that.validateNonEmpty(inputField, helpText))
            return false;
        if (that.validateRegEx(/^[а-яА-ЯёЁa-zA-Z\s]{2,20}$/, inputField.val(), helpText,
                'Может содержать от 2 до 20 символов, не включая цифры и знаки.')) {
            return that.uniq_login(inputField.val());
        }

    };

    this.validatePassword = function(inputField, helpText) {
        if (!that.validateNonEmpty(inputField, helpText))
            return false;
        if (inputField.val().length < 8) {
            helpText.text('Пароль должен содержать минимум 8 символов.');
            return false;
        } else {
            helpText.text('');
            return true;
        }
    };

    this.validatePasswordConfirm = function(inputField, helpText) {
        if (!that.validateNonEmpty(inputField, helpText))
            return false;
        if ($('#password_v').val() == inputField.val()) {
            helpText.text('');
            return true;
        } else {
            helpText.text('Повторно пароль введён не верно.');
            return false;
        }

    };

    this.validateEmail = function(inputField, helpText) {
        if (!that.validateNonEmpty(inputField, helpText)) {
            return false;
        }
        if (that.validateRegEx(/^[\w\.-_\+]+@[\w-]+(\.\w{2,4})+$/, inputField.val(), helpText,
                'Пожалуйста, введите адрес(например, email@mail.ru).')) {
            return that.uniq_email(inputField.val());
        }

    };

    this.validatePhone = function(inputField, helpText) {
        if (!that.validateNonEmpty(inputField, helpText))
            return false;
        if (that.validateRegEx(/^\+?\s?\d\s?[\(]?\d\d\d[\)]?\s?\d\d\d\s?[\-]?\s?\d\d\s?[\-]?\s?\d\d$/, inputField.val(), helpText,
                'Телефон должен иметь вид: 79031234567 или +7(495)765-43-21')) {
            return true;
        }
    };

    this.uniq_login = function(inputField) {
        var data = inputField;

        $.ajax({
            url: '/ajax/uniq/uniq_login',
            type: 'POST',
            data: {data: data},
            dataType: 'json',
            success: function(data) {
                if (data == 0) {
                    $('#login_help').text('');
                    return true;
                } else {
                    $('#login_help').text('Пользователь с таким логином уже существует');
                    return false;
                }

            }
        });
    };

    this.uniq_email = function(inputField) {
        var data = inputField;
        $.ajax({
            url: '/ajax/uniq/uniq_email',
            type: 'POST',
            data: {data: data},
            dataType: 'json',
            success: function(data) {
                if (data == 0) {
                    $('#email_help').text('');
                    return true;
                } else {
                    $('#email_help').text('Пользователь с таким email уже существует');
                    return false;
                }

            }
        });
    };

    /*ПРОВЕРКА ПЕРЕД ОТПРАВКОЙ*/
    this.validateSendLogin = function(inputField, helpText) {
        if (!that.validateNonEmpty(inputField, helpText))
            return false;
        return that.validateRegEx(/^[а-яА-ЯёЁa-zA-Z\s]{2,20}$/, inputField.val(), helpText,
                'Может содержать от 2 до 20 символов, не включая цифры и знаки.');
    };

    this.validateSendEmail = function(inputField, helpText) {
        if (!that.validateNonEmpty(inputField, helpText)) {
            return false;
        }
        return that.validateRegEx(/^[\w\.-_\+]+@[\w-]+(\.\w{2,4})+$/, inputField.val(), helpText,
                'Пожалуйста, введите адрес(например, email@mail.ru).');
    };

    this.sendForm = function() {
        $('#ajax_timer').html('<h3>Подождите...</h3>');
        $('input').attr('disabled', true);
        $('#pay_prod').attr('disabled', true);
        if (that.validateSendLogin($('#login_v'), $('#login_help'))) {
            var data = $('#login_v').val();
            $.ajax({
                url: '/ajax/uniq/uniq_login',
                type: 'POST',
                data: {data: data},
                dataType: 'json',
                success: function(data) {
                    if (data == 0) {
                        $('#login_help').text('');
                        that.sendEmail();
                    } else {
                        $('#login_help').text('Пользователь с таким логином уже существует');
                        $('input').attr('disabled', false);
                        $('#pay_prod').attr('disabled', false);
                        $('#ajax_timer').html("");
                    }

                }
            });
        } else {
            $('input').attr('disabled', false);
            $('#pay_prod').attr('disabled', false);
            $('#ajax_timer').html("");
        }
    };

    this.sendEmail = function() {
        if (that.validateSendEmail($('#email_v'), $('#email_help'))) {
            var data = $('#email_v').val();
            $.ajax({
                url: '/ajax/uniq/uniq_email',
                type: 'POST',
                data: {data: data},
                dataType: 'json',
                success: function(data) {
                    if (data == 0) {
                        $('#email_help').text('');
                        that.sendOtherInput();
                    } else {
                        $('#email_help').text('Пользователь с таким email уже существует');
                        $('#pay_prod').attr('disabled', false);
                        $('input').attr('disabled', false);
                        $('#ajax_timer').html("");
                    }

                }
            });
        } else {
            $('#pay_prod').attr('disabled', false);
            $('input').attr('disabled', false);
            $('#ajax_timer').html("");
        }
    };

    this.sendOtherInput = function() {
        if (that.validatePassword($('#password_v'), $('#password_help'))
                && that.validatePasswordConfirm($('#password_confirm_v'), $('#password_confirm_help'))
                && that.validatePhone($('#phone_v'), $('#phone_help'))
                && that.validateName($('#name_v'), $('#name_help'))) {
                var login = $('#login_v').val();
                var email = $('#email_v').val();
                var phone = $('#phone_v').val();
                var name = $('#name_v').val();
                var address= ($('#address_v').val()) ? $('#address_v').val() : '';
                var password = $('#password_v').val();
                
                var data = {
                    username: login,
                    email: email,
                    phone: phone,
                    first_name: name,
                    address: address,
                    password: password
                };
            $.ajax({
                url: '/ajax/uniq/send_form',
                type: 'POST',
                data: data,
                dataType: 'json',
                complete: function() {
                    document.location.href='/';
                }
            });
        } else {
            $('#pay_prod').attr('disabled', false);
            $('input').attr('disabled', false);
            $('#ajax_timer').html("");
        }
    };

}
$(document).ready(function() {
    var validate = new ValidateReg();

    $('#phone_v').on('blur', function() {
        validate.validatePhone($(this), $('#phone_help'));
    });

    $('#name_v').on('blur', function() {
        validate.validateName($(this), $('#name_help'));
    });

    $('#password_v').on('blur', function() {
        validate.validatePassword($(this), $('#password_help'));
    });

    $('#password_confirm_v').on('blur', function() {
        validate.validatePasswordConfirm($(this), $('#password_confirm_help'));
    });

    $('#login_v').on('keyup', function() {
        validate.validateLogin($(this), $('#login_help'));
    });

    $('#email_v').on('keyup', function() {
        validate.validateEmail($(this), $('#email_help'));
    });

    $('#pay_prod').on('click', function(event) {
        $('#send_form').submit(function() {
            return false;
        });
        validate.sendForm();
    });
});

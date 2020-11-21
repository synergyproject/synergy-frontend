<template>
    <div class="auhtorization-page">
        <form class="form" method="POST" action="/login_form.php">
            <div class="form_inner">
                <h4 class="form_title">Добро пожаловать!</h4>

                <div class="form_login">
                    <label for="login" class="form_label">Введите логин</label>
                    <div class="input_password">
                        <input type="text" id="login" name="login" placeholder="Email" class="form_input">
                    </div>
                </div>

                <div class="form_password">
                    <label for="password" class="form_label">Введите пароль</label>
                    <div class="input_help">
                        <input type="password" id="password" name="password" placeholder="Password" class="form_input password">
                        <input type="checkbox" id="password_check" class="check">
                        <label for="password_check" class="label_check"></label>
                    </div>
                    
                    <div class="help">
                        <input type="checkbox" id="help_check" class="help_check">
                        <label for="help_check" class="help_label">help</label>
                        <div class="help_content">
                            <p class="help_article">Длина пароля должна быть <span class="help_strong">не менее 8</span> и <span class="help_strong"> более 64</span> символов.</p>
                            <p class="help_article">Пароль должен состоять из букв латинского алфавита <span class="help_strong">(A-z)</span>, арабских цифр <span class="help_strong">(0-9)</span> и специальных символов: <span class="help_strong">( . , : ; ? ! * + % - < > @ [ ] { } / \ _ {} $ # )</span>.</p>
                            <p class="help_article">Обязательно должна быть одна буква верхнего регистра <span class="help_strong">А-Z</span>, одна буква нижнего регистра <span class="help_strong">а-z</span>, специальный символ и арабская цифра.</p>
                        </div>
                    </div>
                </div>

                <div class="form_password">
                    <label for="password_submit" class="form_label">Повторите пароль</label>
                    <div class="input_help">
                        <input type="password" id="password_submit" name="password_submit" placeholder="Password" class="form_input password_submit">
                        <input type="checkbox" id="submit_check" class="check">
                        <label for="submit_check" class="label_check"></label>
                    </div>
                    <p class="attention">Неверный пароль</p>
                </div>

                <div class="password_forgot">
                    <a href="" class="password_link">Забыли пароль?</a>
                </div>
                <div class="submit_form">
                    <input type="submit" name="submit" value="Войти" class="auhtorization-button">
                </div>
            </div>	
	    </form>
    </div>
</template>

<script>
    import help_circle from '../assets/img/help_circle.png';
	import ahtung_circle from '../assets/img/ahtung_circle.png';
	import icon_eye_close from '../assets/img/icon_eye_close.png';
	import icon_eye_open from '../assets/img/icon_eye_open.png';

    export default {
        name: 'auhtorization',
        data () {
            return {

            }
        },
        components: {

        },
        methods: {

        }
    }
</script>

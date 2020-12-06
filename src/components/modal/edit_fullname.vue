<template>
    <div class="edit_fullname-window">
        <div class="info-block">Введите имя</div>
        <input type="text" maxlength="64" v-model="fullname.firstName">
        <div class="info-block">Введите Фамилию</div>
        <input type="text" maxlength="64" v-model="fullname.surname">
        <div class="save-fullname-button basic-buttons" v-on:click="changeFullname()">Сохранить</div>
    </div>
</template>

<script>
    import { mapMutations, mapGetters, mapActions } from 'vuex';

    export default {
        name: "fullname",
        data () {
            return {
                fullname: {firstName: '', surname: ''}
            }
        },
        components: {

        },
        methods: {
            ...mapMutations(['SET_USER']),

            changeFullname() {
                if (this.fullname.firstName && this.fullname.surname) {
                    this.SET_USER(this.fullname);
                    this.fullname.firstName = '';
                    this.fullname.surname = '';
                    this.$emit('closeFullName'); 
                    // и отправляем данные на сервер 
                }
            }
        }
    }
</script>
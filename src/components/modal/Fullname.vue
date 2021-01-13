<template>
    <div class="edit_fullname-window">
        <div class="info-block">
            {{ $t('m_enter_your_name') }}
        </div>
        <input 
            type="text" 
            maxlength="64" 
            v-model="fullname.firstName"
        >
        <div 
            class="info-block"
        >
            {{ $t('m_enter_your_last_name') }}
        </div>
        <input 
            type="text" 
            maxlength="64" 
            v-model="fullname.surname"
        >
        <div 
            class="save-fullname-button basic-buttons" 
            @click="changeFullname()"
        >
            {{ $t('m_save') }}
        </div>
    </div>
</template>

<script>
    import { mapMutations, mapGetters, mapActions } from 'vuex';

    export default {
        name: "Fullname",
        data () {
            return {
                fullname: {
                    firstName: '', 
                    surname: ''
                }
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
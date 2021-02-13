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
            v-model="fullname.lastName"
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
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: "Fullname",

        data () {
            return {
                fullname: {
                    firstName: '', 
                    lastName: ''
                }
            }
        },

        mounted() {
            this.fullname.firstName = this.GET_USER.firstName;
            this.fullname.lastName = this.GET_USER.lastName;
        },

        computed: {
            ...mapGetters(['GET_USER'])           
		},
        
        methods: {
            ...mapActions(['SEND_USER']),

            changeFullname() {
                if (this.fullname.firstName && this.fullname.lastName) {
                    this.SEND_USER(this.fullname);
                    this.$emit('closeFullName'); 
                }
            }
        }
    }
</script>
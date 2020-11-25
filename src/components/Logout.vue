<template>
  <div>logout</div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Logout',
    created() {
        // Logout clientside
        // Видаляємо токен з локального сховища, стора і робимо редиркет
        this.$store.dispatch('LOG_OUT')
        this.$router.push({path:'/'})

        // Ендпоінт /restore не працює поки
        // const token = this.$store.state.auth.token
        // axios.defaults.headers.common['Authorization'] = "Bearer "+token;
        // axios.get('http://ec2-3-127-40-46.eu-central-1.compute.amazonaws.com:8090/restore?token='+token)
        // .then(response=>{
        //         console.log(response)
        // })
        // .catch(error => {
        //     console.dir(error);
        // });
    }
}
</script>

<style>

</style>
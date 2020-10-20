<template>
  <div id="app">
      <router-view> </router-view>
  </div>
</template>

<script>
    import Main from "@/components/Main";

    //import global styles
    import '@/assets/styles/app.scss'

    export default {
        name: 'App',
        components: {
            Main
        }
    }
</script>

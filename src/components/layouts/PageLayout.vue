<template>
    <div class="page">
        <div class="page-sidebar">  
            <div class="page-sidebar__exit">
            </div>
            <div class="avatar" >
                <img src="@/assets/img/avatar.png">
            </div>
            <ul class="page-sidebar__menu">
                <li class="page-sidebar__menu-item">
                    <router-link to="/page" class="page-sidebar__menu-link"><span>Кабинет игрока</span></router-link>
                </li>
                <li class="page-sidebar__menu-item">
                    <router-link to="/page/line" class="page-sidebar__menu-link"><span>Лента</span></router-link>
                </li>
                <li class="page-sidebar__menu-item">
                    <router-link to="/page/goal" class="page-sidebar__menu-link"><span>Мои Цели</span></router-link>
                </li>
            </ul>
        </div>
        <slot></slot>
    </div>
</template>

<script>

    export default {
        name: "PageLayout",
        data () {
            return {
                
            }
        },
    }

</script>

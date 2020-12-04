<template>
    <article class="addpost">
        <div class="avatar" :style="{backgroundImage:`url(${bgImage})`}"></div>
        <form class="addpost__form">
            <div class="addpost__text-wrap">
                <div class="addpost__text"  @click = "onTexstarea" contenteditable="true"></div>
            </div>
            
            <div class="addpost__files">
                <input class="addpost__files-input" type="file" size="28" multiple="multiple" title="Send file">
                <img class="addpost__files-icon" src="@/assets/img/add-icon.png">
            </div>
            <button class="addpost__form-btn">
                <img src="@/assets/img/arrow-right.png">
            </button>
        </form>

    </article>

</template>

<script>
    import avatar from '@/assets/img/avatar.png'
    export default {
        name: "addpost",
        data () {
            return {
                bgImage: avatar,
                
            }
        },
          methods: {
        },
    }


</script>

<template>
    <article class="post">
        <header class="post__header">
            <div class="post__author">
                <div class="avatar">
                    <img src="@/assets/img/avatar.png">
                </div>
                <div class="post__author-info">
                    <h3 class="post__author-name">Данил Ким</h3>
                    <div class="post__date">
                        <div class="post__date-main">15.09.2020</div>
                        <div class="post__date-edit">(Edit)</div>
                    </div>
                </div>
            </div>
            <div class="post__settings">
                <div class="post__likes">
                    <img class="post__likes-icon" src="@/assets/img/heart-fill.png" >
                    <div class="post__likes-amount">9</div>
                </div>
                <div class="post__menu">
                    <div class="post__menu-img">
                        <img class="post__menu-icon" src="@/assets/img/post-menu-icon.png" >
                    </div>
                    <ul class="post__menu-list">
                        <li class="post__menu-item">Редактировать пост</li>
                        <li class="post__menu-item">Удалить пост</li>
                    </ul>
                    
                </div>
            </div>
        </header>
        <div class="post__main">
            <div class="post__files">
                <div class="post__file"></div>
                <div class="post__file"></div>
                <div class="post__file"></div>
            </div>
            <div class="post__text">
                <p class="post__text-paragraph">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es.
                </p>  
                <p class="post__text-paragraph">
                    Laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit am e enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex eadskvjbv
                </p>  
                <p class="post__text-paragraph">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es.
                </p>  
            </div>
            <div class="post__text-show">Показать полностью</div>
        </div>
        <div class="post__comments">
            <ul class="post__comments-list">
                <li class="post__comments-item">
                    <div class="avatar">
                        <img src="@/assets/img/avatar.png">
                    </div>
                    <div class="comment"></div>
                </li>
                <li class="post__comments-item">
                    <div class="avatar">
                        <img src="@/assets/img/avatar.png">
                    </div>
                    <div class="comment"></div>
                </li>
            </ul>
            <div class="post__comments-show"></div>
        </div>
        <div class="post__add-comment">
            <div class="avatar">
                <img src="@/assets/img/avatar.png">
            </div>
            <form class="post__form">
                <input type="text">
                <button>
                    <img src="@/assets/img/arrow-right.png">
                </button>
            </form>
        </div>
    </article>

</template>

<script>

    export default {
        name: "post",
        data () {
            return {
            }
        },
    }


</script>

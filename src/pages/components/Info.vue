<template>
    <div class="info">
        <img class="avatar" src="/res/SLIGHTNING/avatar.png" alt="头像">
        <div class="name">
            <img class="name-char" v-for="char in 'SLIGHTNING'" :src="`/res/text/${char}.svg`"></img>
        </div>
    </div>
</template>

<style scoped>
.info {
    top: -0.5rem;
    text-align: center;
}
.avatar {
    width: 128px;
    height: 128px;
    border-radius: 8px;
}
.name {
    overflow: hidden;
}
.name-char {
    display: inline;
    width: 32px;
    height: 64px;
    margin: -256px 0 252px;
    filter: drop-shadow(0px 256px var(--theme-color))
}
@media only screen and (min-width: 512px) {
    .info {
        z-index: 8;
        width: fit-content;
        margin-bottom: 8px;
        position: sticky;
        top: 0px;
    }
    .avatar {
        width: 64px;
        height: 64px;
        margin-right: 8px;
    }
    .name {
        width: fit-content;
        display: inline-block;
    }
}
</style>

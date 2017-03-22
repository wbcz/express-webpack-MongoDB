<style lang="sass">
@import 'mixin';
.tlx-error {
    width: 100vw;
    height: 100vh;
    text-align: center;
    background-color: #F4F6F6;
    position: relative;
    &::before {
        content: '';
        position: absolute;
        display: block;
        top: 0;
        width: 100vw;
        height: 10vh;
        background-image: -webkit-linear-gradient(rgba(0, 0, 0, .65) 0%, rgba(0, 0, 0, 0.55) 10%, rgba(0, 0, 0, .55) 11%, rgba(0, 0, 0, 0) 100%);
        background-image: -o-linear-gradient(rgba(0, 0, 0, .65) 0%, rgba(0, 0, 0, 0.55) 10%, rgba(0, 0, 0, .55) 11%, rgba(0, 0, 0, 0) 100%);
        background-image: linear-gradient(rgba(0, 0, 0, .65) 0%, rgba(0, 0, 0, 0.55) 10%, rgba(0, 0, 0, .55) 11%, rgba(0, 0, 0, 0) 100%);
        z-index: 10;
    }
    .error-inner {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        &::before {
            content: '';
            display: block;
            width: rem(440);
            height: rem(330);
            margin: 0 auto;
            background: url(../img/bg_networkerror.png) no-repeat center center;
            background-size: cover;
        }
    }
    p {
        &:first-child {
            margin-top: 20px;
        }
        font-size: 16px;
        margin: 10px 0;
    }
    .try-again {
        color: #0DBDD1;
    }
}
</style>
<template>
    <div class="tlx-error">
        <div class="error-inner">
            <p>页面君旅行去了，请后退看看别的~</p>
        </div>
    </div>
</template>
<script>
    export default {

    }
</script>
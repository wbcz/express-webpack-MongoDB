<style lang="sass">
    body {
        padding: 10px;
    }
</style>
<template>
    <div class="chat-index">
        <h1>hash</h1>
        <loading :showLoading="isShow"></loading>
    </div>
</template>

<script lang="babel">
import loading from '~components/loading'
import error from '~components/error'
import ajax from '~mod/ajax'
import nav from '../common/v-nav'
import ElementUI from 'element-ui' // 引入element-ui

Vue.use(ElementUI) // Vue全局使用

export default {
    name: 'list',
    data() {
        return {
            isShow: false,
        }
    },
    components: {
        loading
    },
    async mounted() {
        console.log(this.$route)
        console.log(await ajax.get('/chat'))
    }
}

</script>

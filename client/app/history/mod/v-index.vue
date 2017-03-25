<style lang="sass">
    body {
        padding: 10px;
    }
</style>
<template>
    <div class="chat-index">
        <router-link :to="{ path: '/chat/list/5' }">Home</router-link>
        <loading :showLoading="isShow"></loading>
    </div>
</template>

<script lang="babel">
import loading from '~components/loading'
import error from '~components/error'
import ajax from '~mod/ajax'
import nav from '../common/v-nav'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI) // Vue全局使用

export default {
    name: 'index',
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
        //const data = 
        console.log(await ajax.get('/chat'))
        //if (data) this.list = data
    }
}

</script>

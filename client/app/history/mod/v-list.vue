<style lang="sass">
    body {
        padding: 10px;
    }
</style>
<template>
    <div class="chat-index">
        list
        <p>动态组件list</p>
    </div>
</template>

<script lang="babel">
import loading from '~components/loading'
import error from '~components/error'
import ajax from '~mod/ajax'
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
        //const data = 
        console.log(await ajax.get('/chat'))
        //if (data) this.list = data
    }
}

</script>

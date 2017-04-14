<style lang="sass">
    body {
        padding: 10px;
    }
</style>
<template>
    <div class="chat-index">
        own

        <div>
            总共：{{total}}
            <p>
                点下面的数字：<vButton @increment="incrementTotal"></vButton>
            </p> 
        </div>
    </div>
</template>

<script lang="babel">
import ajax from '~mod/ajax'
import vButton from '../common/v-button'
import ElementUI from 'element-ui' // 引入element-ui


Vue.use(ElementUI) // Vue全局使用

export default {
    name: 'index',
    data() {
        return {
            total: 0
        }
    },
    components: {
        vButton
    },
    async mounted() {
        console.log(await ajax.get('/chat'))
        //if (data) this.list = data
    },
    methods: {
        incrementTotal() {
            this.total += 1
        }
    }
}

</script>

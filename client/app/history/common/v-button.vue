<style lang="sass">
    body {
        padding: 10px;
    }
</style>
<template>
    <div class="button" @click="increment">{{counter}}</div>
</template>

<script lang="babel">
import ajax from '~mod/ajax'
import vBus from '../common/v-bus'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI) // Vue全局使用

export default {
    name: 'index',
    data() {
        return {
            counter: 0,
        }
    },
    methods: {
        increment() {
            this.counter += 1
            this.$emit('increment')
            vBus.$emit('id-selected', 3)
        }
    },
    components: {
        vBus
    },
    mounted() {

    }
}

</script>

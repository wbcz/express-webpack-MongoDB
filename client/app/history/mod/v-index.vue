<style lang="sass" scoped>
    body {
        padding: 10px;
    }
    p {
        margin: 20px;
    }
</style>
<template>
    <div class="chat-index">
        <router-link :to="{ path: '/chat/list/5' }">goToList</router-link>
        <div>
            总共：{{total}}
            <p>
                点下面的数字：<vButton @increment="incrementTotal"></vButton>
            </p>            
            <p>
                点下面的数字：<vButton @increment="incrementTotal"></vButton>
            </p>
        </div>

        <input v-model="parentMsg" placeholder="请输入内容">
        <input v-model="mes" placeholder="请输入内容">
        <br>

        <vMessage :my-message="parentMsg" my-hi="AdfdDF">
            <h1 slot="header">定制的内容</h1>
        </vMessage>

        <div v-on:click.native="console.log(333)">点击我</div>

        <vInput v-model="price"></vInput>
        <button @click="changeView()">切换组件</button>

        <keep-alive>
            <component v-bind:is="currentView">
              <!-- 组件在 vm.currentview 变化时改变！ -->
            </component>
        </keep-alive>  
    </div>
</template>

<script lang="babel">
import ajax from '~mod/ajax'
import vButton from '../common/v-button'
import vInput from '../common/v-input'
import vMessage from '../common/v-message'
import vList from './v-list'
import vOwn from './v-own'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI) // Vue全局使用

export default {
    name: 'index',
    data() {
        return {
            total: 0,
            parentMsg: "",
            mes: "",
            price: "",
            currentView: 'vList',
            someObject:{}
        }
    },
    components: {
        vButton,
        vMessage,
        vInput,
        vList,
        vOwn
    },
    async mounted() {
    },
    methods: {
        incrementTotal() {
            this.total += 1
        },
        changeView() {
            if(this.currentView == "vOwn") {
                this.currentView = "vList"
            } else {
                this.currentView = "vOwn"
            }
        }
    },
    async mounted() {
        this.$set(this.someObject,'b',2)
        console.log(JSON.parse(JSON.stringify(this.someObject)))
        let {status, data} = await ajax.get('/')
    }
}

</script>

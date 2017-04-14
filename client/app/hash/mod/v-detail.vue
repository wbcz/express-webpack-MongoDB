ÅÅ<style lang="sass">
@import "mixin";
.footer-detail {
    position: fixed;
    bottom: rem(10);
    left: 0;
    width: 100%;
    display: flex;
    .ipt {
        flex: 3;
        height: rem(60);
    }
    .btn {
        flex: 1;
        height: rem(60);
    }
    input {
        border: solid rem(2) #000;
    }
}
.v-detail-main {
    // 软键盘唤起后，页面的 fixed 元素将失效（即无法浮动，也可以理解为变成了 absolute 定位）
    //所以当页面超过一屏且滚动时，失效的 fixed 元素就会跟随滚动了。所以采用此样式方案
    position: absolute;
    left: 0;
    top: rem(0);
    bottom: rem(120);
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    z-index:9999;
    width: 100%;
}
.detail-bot {
    height: rem(80);
}
</style>
<template>
    <div class="chat-detail">
        <main class="v-detail-main">
            <vMessage :messageDetails="messageDetails"></vMessage>
        </main>
        <footer class="footer-detail">
            <input classs="input" type="text" v-model="input" v-on:keyup.enter="sendData(input)">
            <el-button class="display" @click.prevent="sendData(input)">发送</el-button>
        </footer>
    </div>
</template>

<script lang="babel">
import ajax from '~mod/ajax'
import vNav from '../common/v-nav'
import vMessage from '../common/v-message'
import vNotic from '../common/v-notic'
import vItem from '../common/v-item'
import Vue from 'vue'

export default {

    name: 'vDetail',
    data() {
        return {
            isShow: false,
            messageDetails: [],
            input: '',
            notic: ''
        }
    },
    components: {
        vNav,
        vItem,
        vMessage,
        vNotic
    },
    async mounted() {
        this.init()
    },
    methods: {
        async init() {
            // let messageDetails= await ajax.get('/listMessages')
            // this.messageDetails = messageDetails.data
        },
        sendData(input, obj = {}) {
            let self = this
            obj.name = localStorage.getItem('user')
            obj.content = input
            console.log(obj)
            input && socket.emit('message', obj)
            self.input = ''

            if(!lock['a']) {
                socket.on('messageAll', async function(data) {
                    self.messageDetails.push(data)
                    self.scrollBottom()
                    if(data) {
                        obj = JSON.parse(JSON.stringify(data))
                        let result = await ajax.post('/addMessage', data)
                    }
                    lock['a'] = true;
                })
            }
        },
        scrollBottom() {
            setTimeout(() => {
                let oMain = document.querySelector('.v-detail-main')
                oMain.scrollTop = oMain.scrollHeight
            }, 0)
        }
    }
}

</script>

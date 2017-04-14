<style lang="sass">
@import "mixin";
.v-index-main {
    position: absolute;
    left: 0;
    top: rem(110);
    bottom: rem(120);
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    z-index:9999;
    width: 100%;
}
</style>
<template>
    <div class="chat-index">
        <vInput></vInput>
        <main class="v-index-main">
            <vItem></vItem>
        </main>
        <vNav></vNav>
    </div>
</template>

<script lang="babel">
import ajax from '~mod/ajax'
import vNav from '../common/v-nav'
import vInput from '../common/v-input'
import vItem from '../common/v-item'
import Vue from 'vue'

export default {

    name: 'index',
    data() {
        return {
            isShow: false,
            messageList: []
        }
    },
    components: {
        vNav,
        vInput,
        vItem
    },
    async mounted() {
        let {status, data} = await ajax.get('/')
        this.messageList = data
    }
}

</script>

<style lang="sass">
</style>
<template>
    <div class="chat-index">
        <vHeader></vHeader>
        <vNav></vNav>
    </div>
</template>

<script lang="babel">
import ajax from '~mod/ajax'
import vNav from '../common/v-nav'
import vHeader from '../common/v-header'
import Vue from 'vue'

export default {

    name: 'index',
    data() {
        this.$log.log('hello vue log')
        return {
            isShow: false,
        }
    },
    components: {
        vNav,
        vHeader
    },
    async mounted() {
        console.log(this.$route)
        console.log(await ajax.get('/chat'))
    }
}

</script>

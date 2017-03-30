<style lang="sass">
    body {
        padding: 10px;
    }
</style>
<template>
    <div class="chat-index">
        <h1>hash</h1>
    </div>
</template>

<script lang="babel">

import ajax from '~mod/ajax'
import nav from '../common/v-nav'


export default {
    name: 'list',
    data() {
        return {
            isShow: false,
        }
    },
    components: {

    },
    async mounted() {
        console.log(this.$route)
        console.log(await ajax.get('/chat'))
    }
}

</script>

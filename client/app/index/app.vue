<style lang="sass">
    body {
        padding: 10px;
    }
</style>
<template>
    <div class="chat-index">
        <loading :showLoading="isShow"></loading>
<!--         <nav-component :current="1" />
        <modules :list="list" /> -->
    </div>
</template>

<script lang="babel">
import loading from '~components/loading'
import error from '~components/error'
import ajax from '~mod/ajax'

export default {
    name: 'index',
    data() {
        return {
            isShow: true
        }
    },
    components: {
        loading
    },
    async mounted() {
        const {success, data} = await ajax.get('/topics', {page: 1})
        if (success) this.list = data
    }
}

</script>

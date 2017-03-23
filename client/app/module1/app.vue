<template>
    <div class="g-doc">
        this is app
        <loading :showLoading="true"></loading>
<!--         <nav-component :current="1" />
        <modules :list="list" /> -->
    </div>
</template>
<script lang="babel">
import loading from '~components/loading'
import error from '~components/error'
// import modules from '~components/module-1.vue'
// import api from '~api'
//import loading from './../../common/components/error'
export default {
    name: 'app',
    data() {
        return {
            isShow: false
        }
    },
    components: {
        // navComponent,
        loading
    },
    // async mounted() {
    //     const {success, data} = await api.get('topics', {page: 1})
    //     if (success) this.list = data
    // }
}

console.log(4444)
</script>

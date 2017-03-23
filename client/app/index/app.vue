<template>
    <div class="g-doc">
        <loading :showLoading="isShow"></loading>
<!--         <nav-component :current="1" />
        <modules :list="list" /> -->
    </div>
</template>
<script lang="babel">
// import navComponent from '~components/nav-component.vue'
// import modules from '~components/module-1.vue'
// import api from '~api'
console.log(6666)
import loading from '~components/error'
export default {
    name: 'app',
    data() {
        console.log(4444)
        return {
            isShow: true
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

</script>

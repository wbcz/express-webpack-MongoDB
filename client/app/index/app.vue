<style lang="sass">
    body {
        padding: 10px;
    }
</style>
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
    $.ajax({
     type: "GET",
     url: "/api/v1/topics",
     data: {page: 1},
     dataType: "json",
     success: function(data){
        console.log(data)
      }
    });
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
    //     // const {success, data} = await api.get('topics', {page: 1})
    //     // if (success) this.list = data
    // }
}
    let go = async function() {
        let t =   await $.get({
     type: "GET",
     url: "/api/v1/topics",
     data: {page: 1},
     dataType: "json",
     success: (data) => {
        console.log(data)
      }
    })
        // const {success, data} = await api.get('topics', {page: 1})
        // if (success) this.list = data
    }
    let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
    console.log(x); // 1
console.log(y); // 2
console.log(z); // { a: 3, b: 4 }
console.log(666)
</script>

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

    $.ajax({
     type: "POST",
     url: "/PGC/PGC/GetDestinationGuide/",
     data: {"Data":{"DestinationId":"4","EnName":"japan"},"Header":{"ClientIP":"","ClientName":"","ClientVersion":"10501000","DeviceId":"","DeviceType":"H5","Timestamp":1490266418676,"Token":"","UID":8,"ChannelSource":"","CustomerData":""},"DistributorType":1,"Channel":2},
     dataType: "json",
     success: function(data){
        console.log(data)
      }
    });
// const {success, data} = await api.get('topics', {page: 1})
// if (success) this.list = data


import loading from '~components/error'
export default {
    name: 'app',
    data() {
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

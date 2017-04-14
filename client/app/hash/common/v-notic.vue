<template>
  <div>
  <el-button
    plain
    @click="open5">
    消息
  </el-button>
  </div>
</template>

<script>
  export default {
    name: 'vNotic',
    methods: {
       open5() {
        this.$notify.info({
          title: '消息',
          message: '这是一条消息的提示消息'
        });
      }
    }
  }
</script>
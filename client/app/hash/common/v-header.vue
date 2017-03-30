<style lang="sass">
@import "mixin";
.v-header {
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	padding: rem(0) rem(20) rem(20) rem(20);
	background: #E5E9F2;
}
</style>
<template>
	<header class="v-header">
		<el-input
		  placeholder="输入内容"
		  icon="search"
		  v-model="input2"
		  :on-icon-click="handleIconClick">
		</el-input>
	</header>
</template>
<script>
export default {
	data() {
		return {
			input2: ''
		}
	},
	methods: {
		handleIconClick(ev) {
			console.log(ev);
		}
	}
}
</script>
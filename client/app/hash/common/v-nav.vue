<style lang="sass">
@import "mixin";
.v-footer {
	position: fixed;
	left: 0;
	bottom: 0;
	right: 0;
	display: flex;
	border-top: solid rem(4) #E5E9F2;
	padding: rem(15) 0 rem(15) 0;
	.el-icon-message {
		color: #F7BA2A;
		display: block;
		font-size: rem(48);
	}
	.link {
		text-decoration: none;
		display: block;
		text-align: center;
		flex: 1;
		height: rem(100);
	}
	.chat {
		font-size: rem(30);
		position: relative;
		top: rem(-20);
		color: #475669;
	}
}
</style>
<template>
	<footer class="v-footer">
		<router-link to="5" class="link">
			<i class="el-icon-message"></i>
			<span class="chat">聊天</span>
		</router-link>
		<router-link to="5" class="link">
			<i class="el-icon-message"></i>
			<span class="chat">通讯录</span>
		</router-link>
		<router-link to="5" class="link">
			<i class="el-icon-message"></i>
			<span class="chat">个人中心</span>
		</router-link>
	</footer>
</template>
<script>
	export default {
		name: 'v-nav'

	}
</script>
<style lang="sass">
@import "mixin";
.v-message {
	.name, .content {
		display: inline-block;
		line-height: rem(60);
		box-sizing: border-box;
		float:left;
		font-size: rem(28);
	}
	.item {
		width: 70%;
		margin-top: rem(20);
		overflow: hidden;
	}
	.name {
		padding: 0 rem(20);
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 30%;
	}
	.content {
		background: #d3dce6;
		width: 70%;
		border-radius: rem(8);
	}
}
</style>
<template>
	<section class="v-message">
		<div class="item" v-for="message in messageDetails" @click="goDetail()">
			<span class="name">{{message.name}}</span>
			<span class="content">{{message.content}}</span>
		</div>
	</section>
</template>
<script>
import ajax from '~mod/ajax'
import router from '../router'

export default {
    name: 'vItem',
    data() {
        return {
            isShow: false,
            messageList: []
        }
    },
    props: [
    	'messageDetails'
    ],
    async mounted() {
        let {status, data} = await ajax.get('/')
        this.messageList = data
    },
    methods: {
    }
}
</script>
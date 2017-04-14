<style lang="sass">
@import "mixin";
.el-row {
	border-bottom: solid #99a9bf rem(2);
	margin-bottom: 20px;
	&:last-child {
		margin-bottom: 0;
	}
}
.el-col {
	border-radius: 4px;
}
.bg-purple-dark {
	background: #fff;
}
.bg-purple {
	background: #d3dce6;
}
.bg-purple-light {
	background: #e5e9f2;
}
.grid-content {
	border-radius: rem(4);
	min-height: rem(100);
}
.row-bg {
	padding: 10px 0;
	background-color: #f9fafc;
}
.v-section {
	.item {
		display: flex;
		vertical-align: middle;
		font-size: rem(30);
		heigt: rem(100);
		line-height: rem(100);
		.name, .content {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			display: inline-block;
		}
		.name {
			flex: 1;
			text-align: center;
			padding: 0 rem(20);
		}
		.content {
			flex: 3;
			padding-left: rem(20);
			border-left: solid rem(2) #EFF2F7;
		}
	}
}
</style>
<template>
	<section class="v-section">
		<div v-for="message in messageList" @click="goDetail()">
			<el-row>
				<el-col :span="24">
					<div class="grid-content bg-purple-dark item">	
						<span class="name">{{message.name}}</span>
						<span class="content">{{message.age}}</span>
					</div>
				</el-col>
			</el-row>
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
    async mounted() {
        let {status, data} = await ajax.get('/')
        this.messageList = data
    },
    methods: {
    	goDetail() {
    		router.push({ name: 'detail', params: { detailsId: 123 }})
    	}
    }
}
</script>
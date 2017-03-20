<style lang="sass">
	.parent, .child {
		width: 10px;
		height: 10px;
	}
	.parent {
		background: red;
	}
	.child {
		background: blue;
	}
</style>
<template>
	<li @click="toggle()">
	 	<i :class="{child: !model.childTreeNode, parent: model.childTreeNode}"></i> {{model.data.series}}
		<ul v-show="isOpen" v-if="isFolder">
			<item v-for="cel in model.childTreeNode" :model="cel"></item>
		</ul>
	</li>
</template>
<script>
	export default {
		name: 'item',
		data() {
			return {
				isOpen: true
			}
		},
		props: {
			model: Object
		},
		computed: {
			isFolder() {
				console.log(this.model.childTreeNode.length)
				return this.model.childTreeNode && this.model.childTreeNode.length
			}
		},
		methods: {
			toggle() {
				if(this.isFolder) {
					this.isOpen = !this.isOpen
				}
			},
		},
	}
</script>
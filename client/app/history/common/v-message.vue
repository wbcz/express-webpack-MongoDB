<template>
	<div>
		<p>{{myHi}}{{myMessage}}</p>
		<span>{{newMessage}}</span>
		<h3>{{hi}}</h3>
		<p>{{normalizedSize}}</p>
		<slot name="header">
			备用内容....d.f..df.f..f
		</slot>
	</div>
</template>
<script lang="babel">
import vBus from '../common/v-bus'
	export default {
		data() {
			return {
				newMessage: this.myMessage,
				hi: this.myHi,
			}
		},
		props: {
			myMessage: {
				type: String,
				default: "laiba"
			},
			myHi: {
				type: String,
		      // validator: function (value) {
		      //   return value > -1
		      // }
			}
		},
		computed: {
			normalizedSize: function() {
				console.log(this.hi)
				return this.hi.toLowerCase()
			}
		},
		components: {
			vBus
		},
		mounted() {
			        // 在组件 B 创建的钩子中监听事件
        vBus.$on('id-selected', function (id) {
            console.log(id)
        })

		}


	}
</script>
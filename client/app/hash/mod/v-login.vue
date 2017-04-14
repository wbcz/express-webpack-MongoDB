<style lang="sass">
.v-login {
	display: flex;
	width: 100%;
	.input {
		width: 70%;
		border: solid 1px #000;
		display: inline-block;
		height: 40px;
	}
	.button {
		display: inline-block;
		flex: 1;
	}
}
</style>
<template>
    <div class="v-login">
        <input type="text" class="input" v-model="name">
        <button type="button" class="button" @click="submit(name)">登陆</button>
    </div>
</template>

<script lang="babel">
import ajax from '~mod/ajax'
import nav from '../common/v-nav'
import router from '../router'

export default {
    name: 'index',
    data() {
        return {
        	name: ''
        }
    },
    mounted() {
    },
    methods: {
    	async submit() {
    		let obj = JSON.parse(JSON.stringify({name: this.name}))
        	socket.emit('login', obj)
            socket.on('login', function(data) {
            	if(data.length) {
            		localStorage.setItem('user', data[0].name)
            		router.push({ name: 'index'})
            	}
            })

    	}
    }
}

</script>

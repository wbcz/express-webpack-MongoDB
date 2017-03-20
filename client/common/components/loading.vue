<style lang="sass">

	@import 'mixin';
    .el-loading-mask{
    	position:fixed;
    	z-index:10000;
    	background-color:rgba(255,255,255,1);
    	margin:0;
    	top:0;
    	right:0;
    	bottom:0;
    	left:0;
		height:100%;
		overflow:hidden;
    }
    .el-loading-mask.is-fullscreen{
    	position:fixed;
        .el-loading-spinner{
        	margin-top:-25px;
            .circular{
            	width:100px;
            }
        }
    }
    .el-loading-spinner{
    	top:50%;
    	margin-top:-21px;
    	width:100%;
    	text-align:center;
    	position:absolute;
		transform:translateY(-50%);
        .el-loading-text{
        	color:#20a0ff;
        	margin:3px 0;
        	font-size:14px;
        }
        .circular{
        	// width:100px;
			// height: 100px;
			width:rem(120);
			height:rem(120);
			background:#E5EAEF;
			border-radius:rem(20);
			margin:0 auto;
			position:relative;
        }
        .path {
        	// width: 28px;
			// height: 28px;
			width:rem(28);
			height:rem(28);
			background-color: #00D1E9;
			border-radius: 50%;
			position:absolute;
			top:50%;
			left:50%;
			transform:translate(-50%,-50%);
        }
    }
    .el-dialog,.el-message{
    	-ms-transform:translateX(-50%);
    }
    @keyframes zoomIn{
    	0%{
			opacity: .7;
	        -webkit-transform: scale(1);
	        transform: scale(1);
    	}
		65%{

		}
		67%{
			-webkit-transform: scale(1.8);
			transform: scale(1.8);
			opacity: 0;
		}
    	100%{
    		opacity: 0;
			-webkit-transform: scale(1);
	        transform: scale(1);
    	}
    }
	.pulse{
		width: rem(40);
		height: rem(40);
		background-color: #00D1E9;
		border-radius: 50%;
		position:absolute;
		top:50%;
		left:50%;
		// transform:translate(-50%,-50%);
		margin-top:rem(-20);
		margin-left:rem(-20);
		animation:zoomIn 1.5s linear infinite;
	}
</style>
<template>
	<div class="el-loading-mask" v-if="showLoading" v-on:touchmove.prevent>
		<div class="el-loading-spinner">
			<div class="circular">
				<div class="path"></div>
				<div class="pulse"></div>
			</div>
			<p v-if="loadingText" class="el-loading-text">{{loadingText}}</p>
		</div>
	</div>
</template>

<script>
    export default {
        data() {
            return {
                loadingText: this.loadingTextVue || null,
                showLoadingSvg : this.showLoading
            };
        },
        props:{
            showLoading:{
                type:Boolean,
                required:true
            },
            loadingTextVue:String
        }
    };
</script>

<style lang="sass">

@import "mixin";
.el-message-box__wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    background: rgba(0,0,0,.7);
    z-index:2036;
}
.el-message-box__wrapper:after {
    content: "";
    display: inline-block;
    height: 100%;
    width: 0;
    vertical-align: middle;
}
.el-message-box {
    text-align: left;
    display: inline-block;
    vertical-align: middle;
    background-color: #fff;
    width: rem(420);
    border-radius: 3px;
    font-size: 16px;
    -webkit-user-select: none;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}
.el-message-box__header {
    position: relative;
    padding: rem(20) rem(20) 0;
}
.el-message-box__title {
    padding-left: 0;
    margin-bottom: 0;
    font-size: 16px;
    font-weight: 700;
    height: rem(18);
    color: #333;
}
.el-message-box__close {
    display: inline-block;
    position: absolute;
    top: rem(19);
    right: 20px;
    color: #999;
    cursor: pointer;
    line-height: rem(20);
    text-align: center;
}
.el-icon-close{
    font-family: element-icons!important;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: inline-block;
    width:rem(30);
    height:rem(30);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    &:after{
        content:"";
        display:block;
        width:rem(30);
        height:rem(30);
        background:url(../img/closeBtn.png) no-repeat center center;
        background-size:cover;
    }
}
.el-message-box__content {
    padding: rem(50) rem(20) rem(30);
    color: #475669;
    font-size: 14px;
    position: relative;
}
</style>
<template>
    <div class="el-message-box__wrapper" style="z-index: 2036;" v-if="this.showAlertMsg">
        <div class="el-message-box">
            <div class="el-message-box__header">
                <div class="el-message-box__title">{{title}}</div>
                <i class="el-message-box__close el-icon-close" @click="closeMsg"></i>
            </div>
            <div class="el-message-box__content">
                <div class="el-message-box__message" style="margin-left: 0px;">
                    <p>{{content}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                showAlertMsg : this.showAlert,
				title:this.titleTxt,
				content:this.contentTxt
            };
        },
        props:{
            showAlert:{
                type:Boolean
            },
			titleTxt:{
				type:String
			},
			contentTxt:{
				type:String
			}
        },
        methods:{
            closeMsg(){
                this.showAlertMsg = false;
				console.log($('body').height());
            }
        }
    }
</script>

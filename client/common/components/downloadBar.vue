<style lang="sass">
    @import 'mixin';
    .download-bar-wrapper {
        position: fixed;
        left: 0;
        bottom: 0;
        right:0;
        z-index: 3001;
        height: rem(114);
        // width: 100%;
        background: url(../img/bg_download_bar.png) no-repeat center center;
        background:rgba(14,186,209,.9);
        background-size: cover;
        padding: rem(28) rem(30) 0 rem(40);
        box-sizing: border-box;
        .pull-left {
            overflow: hidden;
        }
        .logo {
            display: inline-block;
            width: rem(58);
            height: rem(58);
            background: url(../img/pic_icon.png) no-repeat center center;
            background-size: cover;
        }
        .slogan {
            margin-left: rem(12);
            display: inline-block;
            vertical-align: top;
            padding-top:rem(5);
            color: #000;
            h3 {
                font-size: rem(26);
                font-weight: bold;
                color:#ffffff;
                line-height: rem(26);
                margin-bottom:rem(10);
            }
            p {
                font-size: rem(20);
                color: #ffffff;
                line-height: rem(20);
            }
        }
        .pull-right {
            a {
                display: inline-block;
                width:rem(120);
                height:rem(54);
                text-align: center;
                line-height: rem(56);
           }
           .displaynone{
               display:none;
           }
        }
        .download-bar2{
            color: #0DBDD1;
            background: #fff;
            border:1px solid #fff;
        }
        .openAppBtn2{
            border:1px solid #fff;
            color:#fff;
            background:transparent;
            margin-right:rem(20);
        }
        .close_btn{
            position:absolute;
            top:0;
            left:0;
            bottom:0;
            width:rem(100);
        }
        .close_btn_img{
            display:block;
            width:rem(49);
            height:rem(46);
            background:url(../img/btn_x.png) no-repeat center center;
            background-size:cover;
        }
    }
    .hidden-download-bar-bg {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 3000;
        width: 100%;
        height: rem(114);
        background: #fff;
    }

    .hidden-download-bar-ele {
        width: 100%;
        height: rem(114);
    }
    .displaynone{
        display:none;
    }
</style>
<template >
    <div>
        <div class="download-bar-wrapper" :class="{displaynone:hidebar}">
            <div class="pull-left">
                <div class="logo"></div>
                <div class="slogan">
                    <h3><slot name="maintit">不要只fork，也要star</slot></h3>
                    <p><slot name="subhead">wbcz奉上</slot></p>
                </div>
            </div>
            <div class="pull-right">
                <a :href="skipurl" class="download-bar2 openAppBtn2" @click="loadurl" :class="{displaynone:hideopenbtn}">打开</a>
                <a  class="download-bar2 downloadBtn" @click="goDownload()" data-track="baidu">下载</a>
            </div>
            <div class="close_btn" @click="closeDownloadbar"><span class="close_btn_img"></span></div>
        </div>
        <div class="hidden-download-bar-ele" :class="{displaynone:hidebar}"></div>
    </div>
</template>

<script>

export default {
    data(){
        return {
            pagetype:this.backpagetype || "downloadbar",
            skiplink:this.backskiplink || "homepage",
            hidebar:false,
            hideopenbtn:false,
            skipurl:"",
        }
    },
    props:{
        backpagetype:{
            type: String
        },
        backskiplink:{
            type: String
        }
    },
    created(){
        torlax.clientType.isWeixin || torlax.clientType.isWeibo && this.hideopenbtn = true
        torlax.clientType.isApp && this.hidebar = true
    },
    methods:{
        closeDownloadbar(){
            this.hidebar = true
        },
        loadurl(){
            console.log(this.skiplink)
            if(this.skiplink == "homepage"){
                this.skipurl = 'torlax://#';
            }else{
                this.skipurl = 'torlax' + window.location.href.slice(window.location.href.indexOf(':'))
            }
        },
        goDownload() {
            torlax.clientType.ios 
            ? window.location = "itms-apps://itunes.apple.com/cn/app/zhang-shang-tao-lu-xing/id1081004854?l=zh&ls=1&mt=8"
            : window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.torlax.tlx"

            torlax.clientType.isWeibo || torlax.clientType.isWeixin && window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.torlax.tlx"
        }
    }
}
</script>

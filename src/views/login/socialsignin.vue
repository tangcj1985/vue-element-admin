<template>
  <div class="social-signup-container">
    <div v-loading.fullscreen.lock="fullscreenLoading" class="sign-btn" @click="wechatHandleClick('wechat')">
      <span class="wx-svg-container"><svg-icon icon-class="wechat" class="icon"/></span> 微信
    </div>
    <el-button
      type="primary"
      @click="openFullScreen"
    >
      指令方式
    </el-button>
    <div class="sign-btn" @click="tencentHandleClick('tencent')">
      <span class="qq-svg-container"><svg-icon icon-class="qq" class="icon"/></span> QQ
    </div>
  </div>
</template>

<script>
// import openWindow from '@/utils/openWindow'

export default {
  name: 'SocialSignin',
  data() {
    return {
      fullscreenLoading: false
    }
  },
  methods: {
    wechatHandleClick(thirdpart) {
      var finger = window.Jscall.finger
      console.log(finger.fingerGFP_Feature())

      // const aww = window.Jscall.clientScreenGetWorkingStatus()
      // console.log(aww)
      // aa
      // const aaaa = window.Jscall.clientScreenGetDeviceInfo()
      // console.log(aaaa)
      // this.openFullScreen()
    },
    openFullScreen() {
      console.log('openFullScreen')
      this.fullscreenLoading = true
      setTimeout(() => {
        console.log('clientScreenShowMainScreen')
        console.log(window.Jscall.clientScreen.GetWorkingStatus())
        // window.Jscall.clientScreen.ShowMainScreen('aaaaaa', '啊啊啊啊')
        this.fullscreenLoading = false
      }, 100)
      console.log('aaaa')
    },
    tencentHandleClick(thirdpart) {
      alert('ok')
      // this.$store.commit('SET_AUTH_TYPE', thirdpart)
      // const client_id = 'xxxxx'
      // const redirect_uri = encodeURIComponent('xxx/redirect?redirect=' + window.location.origin + '/auth-redirect')
      // const url = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirect_uri
      // openWindow(url, thirdpart, 540, 540)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .social-signup-container {
    margin: 20px 0;
    .sign-btn {
      display: inline-block;
      cursor: pointer;
    }
    .icon {
      color: #fff;
      font-size: 24px;
      margin-top: 8px;
    }
    .wx-svg-container,
    .qq-svg-container {
      display: inline-block;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      padding-top: 1px;
      border-radius: 4px;
      margin-bottom: 20px;
      margin-right: 5px;
    }
    .wx-svg-container {
      background-color: #24da70;
    }
    .qq-svg-container {
      background-color: #6BA2D6;
      margin-left: 50px;
    }
  }
</style>

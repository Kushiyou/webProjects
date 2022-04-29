<template>
  <div>
    <Row :gutter="10">
      <Col span="12"
        ><div
          v-if="myMusicList.imgUrlTrue === '' ? false : true"
          class="imgBox"
        >
          <img :src="myMusicList.imgUrlTrue" />
          <p>歌手：{{ myMusicList.musicName }}</p>
          <p>专辑：{{ myMusicList.musicAlbum }}</p>
          <div class="otherBox">
            <a href="javascript:;" title="评论"
              ><img src="../assets/pinglun.png" alt=""
            /></a>
            <a href="javascript:;" title="MV"
              ><img src="../assets/video.png" alt=""
            /></a>
            <a
              href="javascript:;"
              title="详情"
              @click="isShow = true"
              type="primary"
              ><img src="../assets/detal.png" alt=""
            /></a>
            <a href="javascript:;" title="更多"
              ><img src="../assets/more.png" alt=""
            /></a>
          </div>
        </div>
        <div v-else class="welcomeBox">
          <div class="showBox"></div>
          <p class="welcomeword">欢迎来到猪猪播放器</p>
        </div>
      </Col>
      <Col span="12">本来想着写一些其他的东西但是我太懒了</Col>
    </Row>

    <!-- 抽屉效果 -->
    <Drawer class="myDrawer" title="歌曲信息" :closable="false" v-model="isShow" width="40">
      <p>歌手：{{ myMusicList.musicName }}</p>
      <p>歌曲：{{ myMusicList.musicAlbum }}</p>
      <p>专辑：{{ myMusicList.musicAlbum }}</p>
      <p style="color:red">这是不三连能看的？！？！</p>
    </Drawer>
  </div>
</template>

<script>
export default {
  name: "myContent",

  data() {
    return {
      isShow: false,
      myMusicList: {
        imgUrlTrue: "",
        musicName: "",
        musicAlbum: "",
      },
    };
  },
  computed: {
    musicImgData() {
      return this.$store.state.musicList.img1v1Url;
    },
    musicNameData() {
      return this.$store.state.musicList.name;
    },
    musicAlbumData() {
      return this.$store.state.musicList.album;
    },
  },
  watch: {
    musicImgData(newVal, oldVal) {
      // 此处处理逻辑
      this.myMusicList.imgUrlTrue = this.$store.state.musicList.img1v1Url;
    },
    musicNameData() {
      this.myMusicList.musicName = this.$store.state.musicList.name;
    },
    musicAlbumData() {
      this.myMusicList.musicAlbum = this.$store.state.musicList.album;
    },
  },
  mounted() {},

  methods: {},
};
</script>

<style scoped>
.imgBox {
  position: relative;
  height: 16.25rem;
  width: 16.25rem;
  border: 0.125rem solid pink;
  margin: 1.25rem auto 0px;
  border-radius: 0.3125rem;
  text-align: center;
}
img {
  height: 16rem;
  width: 16rem;
}
.welcomeBox {
  position: relative;
  margin: 1.5rem auto 0;
  height: 26.75rem;
}
.showBox {
  margin: 1rem auto 0px;
  height: 24rem;
  background: url("../assets/welcom.png");
  background-size: 100% 100%;
}
.welcomeword {
  position: absolute;
  bottom: 0;
  color: cyan;
  font-weight: 43.75rem;
  font-size: 2rem;
}
.otherBox {
  position: absolute;
  top: 20.125rem;
  left: 2.5rem;
}
.otherBox img {
  margin-left: 0.625rem;
  height: 2rem;
  width: 2rem;
}

.myDrawer p{
    font-size: 1.5rem;
    color: chartreuse;
}
</style>
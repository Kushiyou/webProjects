<template>
  <div class="box">
    <!-- <button @click="testVuex">点我测试vuex</button> -->

    <Layout>
      <Header class="header"
        ><div class="icon">
          <svg
            t="1650962318209"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="7556"
            width="32"
            height="32"
          >
            <path
              d="M926.4 344.8c-2.3-0.6-9-3.7-21.2-19.5-11.1-14.3-22.8-34.1-35.3-55-21.2-35.5-45.2-75.8-76.4-108.4-21-22-43.3-33.1-66.1-33.1-16.3 0-40.6 5.9-63.4 34.2-2.1 2.6-4.1 5.2-5.9 7.8-44.6-23.6-94.2-36-145.4-36s-100.8 12.4-145.4 36c-1.8-2.6-3.8-5.2-5.9-7.8-22.8-28.3-47.1-34.2-63.4-34.2-22.8 0-45 11.1-66.1 33.1-31.2 32.6-55.2 72.9-76.4 108.4-12.5 20.9-24.3 40.7-35.3 55-12.2 15.8-18.9 18.9-21.2 19.5l-34.5 8.8 14.3 32.7c1.3 3 8.6 18.4 26.2 33.5 15.9 13.6 43.9 29.9 87.3 29.9 1.6 0 3.2 0 4.8-0.1-16.8 18.6-30.4 38.7-40.5 59.8-14.1 29.3-21.2 60.2-21.2 91.6 0 57.8 24 112.9 69.3 159.5 41.1 42.2 97.3 74.8 162.8 94.6 14.7 11.9 34.7 21.8 58.6 28.8 26 7.6 56 11.6 86.7 11.6s60.7-4 86.7-11.6c23.9-7 44-16.8 58.6-28.8 65.5-19.8 121.7-52.4 162.8-94.6 45.3-46.6 69.3-101.8 69.3-159.5 0-31.5-7.1-62.3-21.2-91.6-10.1-21.1-23.7-41.2-40.5-59.8 1.6 0 3.2 0.1 4.8 0.1 43.3 0 71.4-16.2 87.3-29.9 17.6-15.1 24.9-30.6 26.2-33.5l14.3-32.7-34.7-8.8z"
              fill="#BA7565"
              p-id="7557"
            ></path>
            <path
              d="M919 374.2c-47.1-12.1-81.8-122.9-147.2-191.2-59.7-62.3-96.5 15.8-102.5 29.9-44.6-30-98.5-47.6-156.6-47.6-58 0-111.9 17.6-156.6 47.6-6-14.1-42.7-92.2-102.5-29.9-65.5 68.3-100.1 179.1-147.2 191.2 0 0 28 64.1 128.9 39.7-0.9 8.9-1.3 17.9-1.3 27.1 0 4.6 0.1 9.3 0.3 13.8-43.3 40.8-68.9 91.5-68.9 146.4 0 102.7 89.6 190.5 216.7 226.9 23 22 72.7 37.3 130.5 37.3s107.5-15.3 130.5-37.3c127.1-36.4 216.7-124.2 216.7-226.9 0-54.9-25.6-105.5-68.9-146.4 0.2-4.6 0.3-9.2 0.3-13.8 0-9.1-0.5-18.2-1.3-27.1C891 438.3 919 374.2 919 374.2z"
              fill="#FFD9CC"
              p-id="7558"
            ></path>
            <path
              d="M643.2 794.9c-23 22-72.7 37.3-130.5 37.3s-107.5-15.3-130.5-37.3C262.1 760.5 175.4 680 166.3 584.5c-0.5 5.5-0.8 11-0.8 16.6 0 102.7 89.6 190.5 216.7 226.9 23 22 72.7 37.3 130.5 37.3S620.2 850 643.2 828c127.1-36.4 216.7-124.2 216.7-226.9 0-5.6-0.3-11.1-0.8-16.6-9 95.5-95.7 176-215.9 210.4z"
              fill="#F2B9AA"
              p-id="7559"
            ></path>
            <path
              d="M271.7 197.1c-39.1 32.3-27.7 151.4-87.1 175.8 0 0 37.8 24.3 71.1 0s77.5-151.6 77.5-151.6-22.4-56.6-61.5-24.2zM753.7 197.1c-39.1-32.3-61.4 24.3-61.4 24.3s44.2 127.3 77.5 151.6 71.1 0 71.1 0c-59.5-24.5-48.1-143.6-87.2-175.9z"
              fill="#FFA094"
              p-id="7560"
            ></path>
            <path
              d="M375.8 644.7a136.9 96.9 0 1 0 273.8 0 136.9 96.9 0 1 0-273.8 0Z"
              fill="#E86B62"
              p-id="7561"
            ></path>
            <path
              d="M512.7 721.4c-70.8 0-129-38-136.2-86.8-0.5 3.3-0.7 6.7-0.7 10.1 0 53.5 61.3 96.9 136.9 96.9s136.9-43.4 136.9-96.9c0-3.4-0.3-6.8-0.7-10.1-7.1 48.8-65.4 86.8-136.2 86.8z"
              fill="#D35854"
              p-id="7562"
            ></path>
            <path
              d="M428 648.4a30.1 30.3 0 1 0 60.2 0 30.1 30.3 0 1 0-60.2 0Z"
              fill="#992E2B"
              p-id="7563"
            ></path>
            <path
              d="M537.2 648.4a30.1 30.3 0 1 0 60.2 0 30.1 30.3 0 1 0-60.2 0Z"
              fill="#992E2B"
              p-id="7564"
            ></path>
            <path
              d="M331.3 439.2a37.7 37.9 0 1 0 75.4 0 37.7 37.9 0 1 0-75.4 0Z"
              fill="#BA7565"
              p-id="7565"
            ></path>
            <path
              d="M612.7 439.2a37.7 37.9 0 1 0 75.4 0 37.7 37.9 0 1 0-75.4 0Z"
              fill="#BA7565"
              p-id="7566"
            ></path>
          </svg>
        </div>
        <span class="title">猪猪播放器</span>
        <div class="search">
          <Input
            v-model="keywords"
            @keyup.enter.native="searchMusic"
            placeholder="请输入歌手..."
          >
            <span slot="append">
              <Button type="primary">
                <Icon type="ios-search" @click.prevent="searchMusic" />
              </Button>
            </span>
          </Input>
        </div>
      </Header>
      <Layout>
        <Sider class="side"
          ><showCard :keywords="keywords" :musicList="musicList"></showCard
        ></Sider>
        <Content class="content"><myContent></myContent></Content>
      </Layout>
      <Footer class="footer"
        ><audio
          :src="musicUrlTrue"
          controls="controls"
          autoplay="autoplay"
          loop="loop"
          class="myaudio"
        ></audio
      ></Footer>
    </Layout>
  </div>
</template>

<script>
import showCard from "../components/showCard.vue";
import myContent from "../components/myContent.vue";
export default {
  name: "shouye",

  data() {
    return {
      keywords: "",
      musicList: {},
      limit: 80,
      musicUrlTrue: "",
    };
  },
  components: { showCard,myContent},
  computed: {
    urlData() {
      return this.$store.state.musicUrl
    }
  },
watch: {
 urlData(newVal, oldVal) {
 // 此处处理逻辑
   this.musicUrlTrue = this.$store.state.musicUrl
 }
 },
  mounted() {},

  methods: {
    async searchMusic() {
      /* console.log('qqqq'); */
      if (!this.keywords)
        return this.$message({
          message: "请正确输入搜索内容！",
          type: "error",
        });

      let result = await this.$API.getRequestByKeyword(
        "/search?keywords=",
        this.keywords + "&limit=" + this.limit
      );
      //console.log(result);
      if (result.data.code == 200) {
        this.$message({
          message: "搜索成功！",
          type: "success",
        });
        this.musicList = result.data.result;
        
      }
    },
    playAudio() {},
  },
};
</script>

<style scoped>
.box {
  margin: 0.625rem auto;
  padding: 1.25rem;
  background-color: aqua;
  width: 70rem;
  border-radius: 1.25rem;
}
.header {
  background-color: pink;
  position: relative;
  height: 2.5rem;
}
.side {
  background-color: #fff;
  height: 30rem;
}
.content {
  padding: 0.625rem;
  height: 30rem;
}
.footer {
  padding: 0;
  margin: 0;
}
audio {
  width: 67.5rem;
  background-color: #f1f3f4;
}

.icon {
  position: absolute;
  left: 0.3125rem;
  top: 0.125rem;
}
.search {
  position: absolute;
  right: 1.25rem;
  top: 0.3125rem;
  line-height: 2.5rem;
  height: 100%;
  width: 37.5rem;
}

.title {
  position: absolute;
  font-size: 1rem;
  top: -0.6rem;
}
</style>
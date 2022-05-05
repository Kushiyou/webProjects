<template>
  <div class="showCard">
    <div class="musicTiyle">
      <p v-if="keywords===''?false:true" style="font-size: 0.8rem; text-align: center">
        为您找到“{{keywords}}”...
      </p>
    </div>
    <div class="songsBox">
      <ul>
      <li v-for="(item,index) in musicList.songs" :key="item.id" @click="getMusicUrl(item.id,item)">
        <span
          ><svg
            t="1650954841932"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2155"
            width="18"
            height="18"
          >
            <path
              d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m0 981.333333C253.866667 981.333333 42.666667 770.133333 42.666667 512S253.866667 42.666667 512 42.666667s469.333333 211.2 469.333333 469.333333-211.2 469.333333-469.333333 469.333333z"
              p-id="2156"
            ></path>
            <path
              d="M672 441.6l-170.666667-113.066667c-57.6-38.4-106.666667-12.8-106.666666 57.6v256c0 70.4 46.933333 96 106.666666 57.6l170.666667-113.066666c57.6-42.666667 57.6-106.666667 0-145.066667z"
              p-id="2157"
            ></path></svg></span
        ><a>{{item.name}} / {{item.artists[0].name}}</a>
      </li>
    </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "showCard",
  props:[
        'keywords',
        'musicList'
    ],
  data() {
    return {
      musicUrl:'',
      musicImgAndName:{
        img1v1Url:"",
        name:'',
      },
      itemList:{

      }
    };
  },
  mounted(){
  },
  methods:{
     async getMusicUrl(id,item){
      let result = await this.$API.getRequesBytId('/song/url?id=',id)
      if(result.data.code ===200){
        this.musicUrl = result.data.data[0].url
        console.log(item);
        this.musicImgAndName.img1v1Url = item.artists[0].img1v1Url
        this.musicImgAndName.name = item.artists[0].name
        this.$store.commit('setMusicList1', this.musicImgAndName)
        this.$store.commit('musicList',this.musicUrl)
      }
    }, 
    
  /* async getMusicUrl(item){
      let result = await this.$API.getRequesBytId('/song/url?id=',item.id)
      if(result.data.code ===200){
        this.musicUrl = result.data.data[0].url
        console.log(item);
        this.itemList = item
        this.$store.commit('itemData',this.item)
      }
    }, */

  }
};
</script>

<style scoped>
.songsBox{
  height: 28rem;
  overflow: auto;
}
.musicTiyle {
  margin-bottom: 0.625rem;
}
li {
  list-style: none;
  padding-left: 0.625rem;
  line-height: 27px;
}
span {
  display: inline-block;
}
span:hover {
  cursor: pointer;
}
span svg {
  margin: -0.125rem 0;
}
a {
  direction: none;
  color: black;
  font-size: 1.125rem;
  margin-left: 0.125rem;
}
</style>

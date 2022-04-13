 var app = new Vue({
     el: "#music",
     data: {
         searchName: '',
         musicList: [],
         musicURL: '',
         musicCover: '',
         hotComment: '',
     },
     methods: {
         searchmusic: function() {
             var that = this;
             axios.get("https://autumnfish.cn/search?keywords=" + this.searchName).then(function(res) {
                 console.log(res);
                 that.musicList = res.data.result.songs;
             }, function(err) {
                 alert("错误！");
             })
         },
         lisentmusic: function(musicID) {
             /* console.log(musicID); */
             var that = this;
             axios.get("https://autumnfish.cn/song/url?id=" + musicID).then(function(res) {
                     that.musicURL = res.data.data.url;
                 }, function(err) {
                     alert("错误！");
                 }),
                 //获取歌曲详情
                 axios.get("https://autumnfish.cn/song/detail?ids=" + musicID).then(function(res) {
                     that.musicCover = res.data.data.songs[0].al.picUrl;
                 }, function(err) {
                     alert("错误！");
                 }),
                 axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicID).then(function(res) {
                     console.log(res);
                     that.hotComment = res.data.data.hotComments;
                 }, function(err) {
                     alert("错误！");
                 })
         },

     }
 })
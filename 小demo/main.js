var app = new Vue({
    el: "#app",
    data() {
        return {
            city: '',
            weatherList: [],
        }
    },
    methods: {
        searchweather: function() {
            var that = this;
            console.log(this.city);
            axios.get("http://wthrcdn.etouch.cn/weather_mini?city=" + this.city).then(function(res) {
                console.log(res.data.data.forecast);
                that.weatherList = res.data.data.forecast;
            }, function(err) {
                console.log("出错了");
            })
        },
        changecity: function(city1) {
            this.city = city1;
            this.searchweather();
        }
    }
})
import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex)

const actions = {

}

const mutations = {
  musicList(context, data) {
    console.log('mutations', data);
    state.musicUrl = data;
  },
  setMusicList1(context, data) {
    console.log('2', data);
    state.musicList = data;
  },
  /* itemData(context,data){
    state.musicList = data;
  } */
}

const state = {
  musicUrl: '',
  musicList:{}
}


export default new Vuex.Store({
  actions,
  mutations,
  state
})
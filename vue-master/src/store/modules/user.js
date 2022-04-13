import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { anyRoutes, resetRouter, asyncRoutes, constantRoutes } from '@/router'
import router from '@/router'

const getDefaultState = () => {
    return {
        token: getToken(),
        name: '',
        avatar: '',
        routes: [],
        roles: [],
        buttons: [],
        resultAsyncRoutes: [],
        //最终路由
        resultAllRoutes: []
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    //存储用户信息
    SET_USERINFO: (state, userInfo) => {
        state.name = userInfo.name;
        state.avatar = userInfo.avatar;
        state.routes = userInfo.routes;
        state.buttons = userInfo.buttons;
        state.roles = userInfo.roles;
    },
    //最终计算出的异步路由
    SET_RESULTASYNCROUTES: (state, asyncRoutes) => {
        state.resultAsyncRoutes = asyncRoutes;
        state.resultAllRoutes = constantRoutes.concat(state.resultAsyncRoutes, anyRoutes);
        router.addRoutes(state.resultAllRoutes)
    }
}

//定义函数：两个数组进行对比，对比当前用户到底显示哪些异步路由
const computedAsyncRoutes = (asyncRoutes, routes) => {
    //过滤出当前用户【超级管理|普通员工】
    return asyncRoutes.filter(item => {
        if (routes.indexOf(item.name) != -1) {
            //递归
            if (item.children && item.children.length) {
                item.children = computedAsyncRoutes(item.children, routes)
            }
            return true
        }
    })
}

const actions = {
    // user login
    /* login({ commit }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ username: username.trim(), password: password }).then(response => {
          const { data } = response
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }, */
    //方法2 async await
    async login({ commit }, userInfo) {
        const { username, password } = userInfo
        let result = await login({ username: username.trim(), password: password })
        console.log(result);
        if (result.code == 20000) {
            commit('SET_TOKEN', result.data.token)
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const { data } = response

                if (!data) {
                    return reject('Verification failed, please Login again.')
                }
                //vuex存储用户全部的信息
                commit('SET_USERINFO', data)
                commit('SET_RESULTASYNCROUTES', computedAsyncRoutes(asyncRoutes, data.routes))
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    //方法2 async await
    /*  async getInfo({ commit, state }){
       let result = await getInfo(state.token)
       
     } */

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                removeToken() // must remove  token  first
                resetRouter()
                commit('RESET_STATE')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
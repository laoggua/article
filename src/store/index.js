import { createStore } from 'vuex'

export default createStore({
	state: {
		isLogin: false,
		token: {},
		info: {}
	},
	getters: {
		getLoginState: state => state.isLogin,
		getToken: state => state.token,
		getInfo: state => state.info,
	},
	mutations: {
		setLoginState: (state, flag) => state.isLogin = flag,
		setToken: (state, token) => state.token = token,
		setInfo: (state, info) => state.info = info,
	},
	actions: {
		asyncSetLoginState: ({
			commit
		}, flag) => commit('setLoginState', flag),
		asyncSetToken: ({
			commit
		}, token) => commit('setToken', token),
		asyncSetInfo: ({
			commit
		}, info) => commit('setInfo', info),
	},
	modules: {}
})

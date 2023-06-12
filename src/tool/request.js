import axios from 'axios';
import store from "../store";

const instance = axios.create({
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json',
	}
});

// 添加请求拦截器
instance.interceptors.request.use(function(config) {
	// console.log(store.state.token);
	let token = store.state.token;
	if(token!=null){
		config.headers.token = token;
	}
	return config;
}, function(error) {
	console.log(error);
	return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function(response) {
	return response;
}, function(error) {
	return Promise.reject(error);
});

export default instance;

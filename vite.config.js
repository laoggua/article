import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	base:"/article/",
	build: {
		outDir: "docs"
	},
	plugins: [vue()],
	transpileDependencies: true,
	publicPath: "./",
	productionSourceMap: false,
	server: {

		host: '0.0.0.0',
		port: 8080,
		open: true,
		proxy: {
			'/api': {
				target: "https://api.jqrjq.cn/",
				ws: true,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			}
		}
	},
})

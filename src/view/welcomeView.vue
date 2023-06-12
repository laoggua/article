<template>
	<div>
		<div style="display: flex;justify-content: space-between;">
			<el-card class="box-card" style="width: 30%;">
				访问量：9999
			</el-card>
			<el-card class="box-card" style="width: 30%;">
				访问量：9999
			</el-card>
			<el-card class="box-card" style="width: 30%;">
				访问量：9999
			</el-card>
		</div>
		<br>
		<div style="width: 100%;display: flex;justify-content: space-between;">
			<el-card class="box-card">
				<div id="lineCharts" style="width: 100%;height:400px;"></div>
			</el-card>
			<el-card class="box-card">
				<div id="barCharts" style="width: 100%;height:400px;"></div>
			</el-card>
		</div>
		<br>
		<div style="display: flex;justify-content: space-between;">
			<div style="width: 80%;">
				<el-calendar>
					<template #date-cell="{ data }">
						<p :class="data.isSelected ? 'is-selected' : ''">
							{{ data.day.split('-').slice(1).join('-') }}
							{{ data.isSelected ? '✔️' : '' }}
						</p>
					</template>
				</el-calendar>
			</div>
			<div>
				<el-timeline>
					<el-timeline-item v-for="(activity, index) in activities" :key="index" :icon="activity.icon"
						:type="activity.type" :color="activity.color" :size="activity.size" :hollow="activity.hollow"
						:timestamp="activity.timestamp">
						{{ activity.content }}
					</el-timeline-item>
				</el-timeline>
			</div>
		</div>


	</div>
</template>

<script>
import { MoreFilled } from '@element-plus/icons-vue';
import * as echarts from "echarts";

export default {
	data() {
		return {
			data: new Date(),
			activities: [
				{
					content: 'Custom icon',
					timestamp: '2018-04-12 20:46',
					size: 'large',
					type: 'primary',
					icon: MoreFilled,
				},
				{
					content: 'Custom color',
					timestamp: '2018-04-03 20:46',
					color: '#0bbd87',
				},
				{
					content: 'Custom size',
					timestamp: '2018-04-03 20:46',
					size: 'large',
				},
				{
					content: 'Custom hollow',
					timestamp: '2018-04-03 20:46',
					type: 'primary',
					hollow: true,
				},
				{
					content: 'Default node',
					timestamp: '2018-04-03 20:46',
				},
				{
					content: 'Custom icon',
					timestamp: '2018-04-12 20:46',
					size: 'large',
					type: 'primary',
					icon: MoreFilled,
				},
				{
					content: 'Custom color',
					timestamp: '2018-04-03 20:46',
					color: '#0bbd87',
				},
				{
					content: 'Custom size',
					timestamp: '2018-04-03 20:46',
					size: 'large',
				},
				{
					content: 'Custom color',
					timestamp: '2018-04-03 20:46',
					color: '#0bbd87',
				},
				{
					content: 'Custom size',
					timestamp: '2018-04-03 20:46',
					size: 'large',
				},
			],
		}
	},
	mounted() {
		this.drawBarCharts();
		this.drawLineCharts();
	},
	methods: {
		drawBarCharts() {
			var chartDom = document.getElementById('barCharts');
			var myChart = echarts.init(chartDom);
			var option;
			option = {
				title: {
					text: '月营业额'
				},
				legend: {
					data: ['销量']
				},
				xAxis: {
					type: 'category',
					data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
				},
				yAxis: {
					type: 'value'
				},
				series: [
					{
						data: [120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70],
						type: 'bar',
						showBackground: true,
						backgroundStyle: {
							color: 'rgba(180, 180, 180, 0.2)'
						},
						itemStyle: {
							normal: {
								color: function (params) {
									var colorList = [
										'#EA644A', '#F1A325', '#38B03F', '#03B8CF', '#BD7B46', '#8666B8',
										'#3280FC'
									];
									return colorList[params.dataIndex % colorList.length];
								}
							}
						}
					}
				]
			};
			option && myChart.setOption(option);
		},
		drawLineCharts() {
			var chartDom = document.getElementById('lineCharts');
			var myChart = echarts.init(chartDom);
			var option;
			option = {
				title: {
					text: '年营业额'
				},
				xAxis: {
					type: 'category',
					data: ['2010年', '2011年', '2012年', '2013年', '2014年', '2015年', '2016年', '2017年', '2018年', '2019年', '2020年', '2021年', '2022年', '2023年']
				},
				yAxis: {
					type: 'value'
				},
				series: [
					{
						data: [150, 230, 224, 218, 135, 147, 260, 150, 230, 224, 218, 135, 147, 260],
						type: 'line'
					}
				]
			};
			option && myChart.setOption(option);
		}
	}
}

</script>

<style scoped>
.is-selected {
	color: #1989fa;
}
</style>
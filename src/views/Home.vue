<template lang="pug">
.home
	#c1
	#c2
</template>
<script>
import G2 from '@antv/g2';
export default {
	name: 'home',
	data() {
		return {
			list: [],
			chart: {}
		}
	},
	methods: {
		async chart1Init() {
			const chart = new G2.Chart({
				container: 'c1',
				forceFit: true,
				width: 1000,
				height: 500
			});
			const res = await this.$store.dispatch('request', {
				path: '/zhaopin',
			})
			
			console.log('res: ', res);
			if (res.code == '200') {
				chart.source(res.result);
				chart.interval().position('name*count').color('name');
				chart.render();
			}
		},
		async chart2Init() {

			const res = await this.$store.dispatch('request', {
				path: '/chart',
			})

			let fields = Object.keys(res.result[0]);
			fields.shift();
			console.log('fields: ', fields);
			console.log('res.result: ', res.result);
			const ds = new DataSet();
			const dv = ds.createView().source(res.result);
			dv.transform({
				type: 'fold',
				fields, // 展开字段集
				key: 'language', // key字段
				value: 'count', // value字段
			});
			const chart = new G2.Chart({
				container: 'c2',
				forceFit: true,
				width: 1000,
				height: 500
			});
			chart.source(dv, {
				date: {
					range: [0, 1]
				}
			});
			chart.tooltip({
				crosshairs: {
					type: 'line'
				}
			});
			chart.axis('count', {
				label: {
					formatter: val => {
						return val + '人';
					}
				}
			});
			chart.line().position('date*count').color('language');
			chart.point().position('date*count').color('language').size(4).shape('circle').style({
				stroke: '#fff',
				lineWidth: 1
			});
			chart.render();
		},
	},
	async mounted() {
		this.chart1Init();
		this.chart2Init();
	}
}
</script>

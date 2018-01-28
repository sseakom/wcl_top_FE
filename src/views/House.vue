<template lang="pug">
.house
	h2 average: {{ average }} 元/㎡
	el-table(:data="tableData",style="width: 100%",height="500",@row-click="jump")
		el-table-column(prop="title",label="标题",width="300")
		el-table-column(prop="type",label="户型")
		el-table-column(prop="towards",label="朝向")
		el-table-column(prop="floor",label="楼层")
		el-table-column(prop="community",label="小区")
		el-table-column(prop="district",label="位置")
		el-table-column(prop="area",label="面积")
		el-table-column(prop="price",label="单价",width="100")
		el-table-column(prop="total",label="总价",width="120")
		el-table-column(prop="postdate",label="更新",width="200")
		el-table-column(prop="company",label="中介")
		el-table-column(prop="agent",label="经纪人")
	el-pagination(@size-change="handleSizeChange",@current-change="handleCurrentChange",:current-page="pageNo",:page-sizes="[50, 100, 200, 300, 400, 10000]",:page-size="pageSize",layout="total, sizes, prev, pager, next, jumper",:total="total")
</template>
<script>
export default {
	name: 'house',
	data() {
		return {
			tableData: [],
			total: 0,
			pageNo: 1,
			pageSize: 50,
			average: 0,
		}
	},
	methods: {
		jump(row, event, column) {
			console.log('row: ', row);
			window.open("http://wuhu.58.com/ershoufang/" + row.id + "x.shtml")
		},
		handleCurrentChange(pageNo) {
			this.pageNo = pageNo
			this.init(this.pageNo, this.pageSize)
		},
		handleSizeChange(pageSize) {
			this.pageSize = pageSize
			this.init(this.pageNo, this.pageSize)
		},
		async init(pageNo, pageSize) {
			const res = await this.$store.dispatch('request', {
				path: '/allHouse',
				args: {
					pageNo,
					pageSize,
				}
			})
			this.total = res.count
			let sum = 0
			for (let key in res.result) {
				this.tableData.push({
					id: res.result[key].id,
					title: res.result[key].title,
					type: res.result[key].type,
					area: res.result[key].area + "㎡",
					towards: res.result[key].towards,
					floor: res.result[key].floor,
					community: res.result[key].community,
					district: res.result[key].district,
					price: res.result[key].price + "元/㎡",
					total: res.result[key].total + "万元",
					postdate: new Date(parseInt(res.result[key].postdate)).Format("yyyy-MM-dd hh:mm"),
					agent: res.result[key].agent,
					company: res.result[key].company,
				})
				sum += res.result[key].price
			}
			this.average = parseInt((sum / res.result.length) * 100) / 100
		}
	},
	mounted() {
		this.init(this.pageNo, this.pageSize)
	}
}
</script>

<template lang="pug">
.log
	.list
		.item(v-for="item in list",@click="check(item)") {{ item }}
	.content  {{ log }}
</template>
<script>
export default {
	name: 'log',
	data() {
		return {
			log: '',
			list: ['web', 'agent', 'web'],
		}
	},
	methods: {
		check(item) {
			this.getLog(item)
		},
		async getLog(item) {
			const res = await this.$store.dispatch('request', {
				path: '/log/' + item,
			})
			if (res.code == '200') {
				this.log = res.result
			}
		},
	},
	mounted() {
		this.getLog('web')
		
	}
}
</script>
<style lang="stylus" scoped>
.log
	.list
		overflow hidden
		.item
			float left
			cursor pointer
			margin-right 20px
</style>


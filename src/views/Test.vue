<template lang="pug">
el-container.test
	el-header api-test
	el-main
		el-row(type="flex")
			el-col(:span="12")
				el-input(v-model="url",type="text")
		el-row(type="flex")
			el-col(:span="16")
				el-input(type="textarea",:rows="8",placeholder="请输入内容",v-model="textarea")
		el-row(type="flex")
			el-button(@click="request()",:span="8") request
	el-footer
</template>
<script>
export default {
	name: 'test',
	data() {
		return {
			url: 'http://localhost:7001/zhaopin',
			textarea: '',
		}
	},
	methods: {
		request() {
			let args = {}
			try {
				args = JSON.parse(this.textarea)
			} catch (error) {
				// console.log('error: ', error);				
			}
			this.$store.dispatch('request', {
				url: this.url,
				args,
			})
		}
	},
	mounted(){
	}
}
</script>

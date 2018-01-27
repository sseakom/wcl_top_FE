<template lang="pug">
el-container.login
	el-header
	el-main
		el-row(type="flex",justify="center")
			el-col(:span="8")
				el-input(v-model="username",type="text")
		el-row(type="flex",justify="center")
			el-col(:span="8")
				el-input(v-model="password",type="password")
		el-row(type="flex",justify="center")
			el-col(:span="8")
				el-button(@click="signIn()") 登录
	el-footer
</template>
<script>
export default {
	name: 'login',
	data() {
		return {
			username: '',
			password: ''
		}
	},
	methods: {
		signUp() {
			this.$store.dispatch('apiRequest', {
				method: 'signUp',
				args: {
					username: this.username,
					password: this.password
				}
			})
		},		
		async signIn() {
			const res = await this.$store.dispatch('apiRequest', {
				method: 'signIn',
				args: {
					username: this.username,
					password: this.password
				}
			})
			console.log(res);
		}
	}
}
</script>


let host = 'http://106.14.222.172:8080/' //接口

const config = {
    api: {
        'signUp': {
            url: host + 'user/signUp',
            desc: '注册'
        },
        'signIn': {
            url: host + 'user/signIn',
            desc: '登录'
        },
    }
}

export default config
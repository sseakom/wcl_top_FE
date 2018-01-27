import axios from 'axios'
import config from '../../config/index.js'

const output = data => {
    return JSON.stringify(data, null, "\t") || '没有数据'
}


export const request = (context, data) => {
    console.group('request:' + data.url);
    console.log('req:\n' + output(data.args))
    let host = ''
    const env = process.env.NODE_ENV
    if (env == 'development') {
        host = 'http://127.0.0.1:7001'
    } else if (env == 'production') {
        host = 'http://106.14.222.172:7001'
    } else {
        console.warn(env)
    }
    return new Promise((resolve, reject) => {
        axios.post(data.url || host + data.path, data.args || {})
            .then((response) => {
                console.log('res:\n', response.data)
                console.groupEnd('request:' + data.url);
                resolve(response.data)
            })
            .catch((response) => {
                console.warn('request:res:[' + output(response.status) + ']' + output(response.data));
            })
    })
}
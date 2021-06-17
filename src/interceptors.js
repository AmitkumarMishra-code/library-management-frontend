import axios from 'axios'


export default function interceptors(history) {
    axios.defaults.baseURL = 'http://localhost:3300/'

    axios.interceptors.request.use(function(req) {
        // Do something before request is sent
        console.log(req.method, req.url)
        let access_Token = window.localStorage.getItem('access_Token')

        if (access_Token) {
            req.headers['authorization'] = `Bearer ${access_Token}`
        } else {
            console.log('Token not found!')
        }

        return req;
    }, function(error) {
        // Do something with request error
        console.log('Error: ', error.message)
        return Promise.reject(error);
    });

    axios.interceptors.response.use(function(response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, async function(error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        let { status } = error.response
        let originalRequest = error.config
        if (status === 403) {
            await refreshAccessToken()
            return axios(originalRequest)
        } else if (status === 401) {
            history.replace('/login')
        }
        return Promise.reject(error);
    });
}

async function refreshAccessToken() {
    let response = await axios.post('/auth/token', {
        token: window.localStorage.getItem('refresh_Token'),
    })
    if (response.status === 200) {
        window.localStorage.setItem('access_Token', response.data.access_Token)
    }
}
import axios from "axios"


export const sendPost = (url) => {
    return (params, headers) =>
        axios.post(process.env.REACT_APP_API_URL + url, params, {
            headers,
        })
}
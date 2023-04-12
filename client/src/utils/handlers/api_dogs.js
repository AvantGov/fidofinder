import axios from 'axios';

export const search = async () => {
    return await axios.get('https://frontend-take-home-service.fetch.com/dogs/search', {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'fetch-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s',
        },
        params: {
            size: 99,
            from: 0,
            breed: '',
            maxAge: '20',
            minAge: '0',
            resultCount: 25,
        }
    })
}

export const getDogs = async (dogids) => {
    return await axios.post('https://frontend-take-home-service.fetch.com/dogs', dogids, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'fetch-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s',
        },
    })
}


export const match = () => {

}
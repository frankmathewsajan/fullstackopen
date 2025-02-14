import axios from 'axios'

const useAWS = false
const host = useAWS ? `51.21.181.130` : '127.0.0.1'
const baseUrl = `http://${host}:3001/api/notes`

const getAll = () => {
    return axios.get(baseUrl).then(res => res.data)
}

const create = newObject => {
    return axios.post(baseUrl, newObject).then(res => res.data)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject).then(res => res.data)
}

export default {create, getAll, update}
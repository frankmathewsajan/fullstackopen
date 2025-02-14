import ReactDOM from 'react-dom/client'
import axios from "axios";
import './index.css'

const useAWS = false

const host = useAWS ? `51.21.181.130` : '127.0.0.1'
axios
    .get(`http://${host}:3001/api/notes`)
    .then((res) => {
        console.log(res.data)
    })
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
    <App/>
)
import ReactDOM from 'react-dom/client'
import axios from "axios";

axios
    .get('http://localhost:3001/notes')
    .then((res) => {
        console.log(res.data)
    })
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
    <App/>
)
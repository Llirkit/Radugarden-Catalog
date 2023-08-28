import axios from 'axios';
import { onMounted, reactive} from "vue";

export function useRequest(id) {
    const item = reactive({})
    const getItem = async () => {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
            params: {
                id: id
        }})
        
        response.data[0].image = await axios.get("https://jsonplaceholder.typicode.com/photos", {
            params: {
                id: id
        }}).then(res => res.data[0])
        item.value = response.data[0]
    }
    onMounted(getItem)
    return {
        item
    }
}

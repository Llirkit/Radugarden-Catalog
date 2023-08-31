import axios from 'axios';
// import { onMounted, ref} from "vue";

export async function useRequest(id) {
    // const item = ref({})
    // const getItem = async () => {
        const post = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        let item = post.data
        const image = await axios.get(`https://jsonplaceholder.typicode.com/photos/${id}`)
        item.image = image.data
        return item
        // .then( function (res) {
            
        //     return res.data[0]
        // })
        // console.log(response)
        // item.value = response.data[0]
    // }
    // onMounted(getItem)
    // return {
    //     item
    // }
}

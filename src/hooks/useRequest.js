import axios from 'axios';
// import { onMounted, ref} from "vue";

export default  {
    // const item = ref({})
    // const getItem = async () => {
        useRequestItem: async (id) => {
            const post = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            let item = post.data
            const image = await axios.get(`https://jsonplaceholder.typicode.com/photos/${id}`)
            item.image = image.data
            return item
            },
        useRequestImage: async (id) => {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/photos/${id}`)
            let image = response.data
            return image
            }
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

import axios from 'axios';
import { Notify } from "quasar";

const getItemPicture = async (id) => {
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id%100}/photos?id=${id}`)

    return data[0]

}

export default {

    createItem: async (item) => { // Изменить на добавление в списокпередаваемый как параметр?
        const response = await axios.post(`https://jsonplaceholder.typicode.com/posts`, item, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
              }
        }).catch( function (respError) {
            return { error: respError} 
        })
        return response.data
    },

    getItem: async (id) => {
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
   
        return data
    },

    getItemPicture: getItemPicture,

    deleteItem: async (id, itemList) => {
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        if(response?.error){ // или как там ошибка высвечивается
            Notify.create({
                type: "negative",
                message: `Ошибка: ${response.error}`
            })
        } else {
            Notify.create({
                message: "Предмет удален!",
                type: "positive"
            })
            for (const item in itemList) {
                if (itemList[item]?.id == id) {
                    itemList.splice(item,1)
                }
            }  
        }
             
    },

    getItemList: async (page, limit) => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
                _limit: limit,
                _page: page
            }
        }).catch( function (respError) {
            return { error: respError} 
        })
        for (const item of response.data) {
            item.image = await getItemPicture(item.id)
        }
        return response.data
    },

    getPagesCount: async (limit) => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
                _limit: limit,
            }
        })
        return Math.ceil(response.headers['x-total-count'] / limit)
    },

    sortItemList: (sortOption, itemList) => {

        return itemList.slice().sort((item1, item2) => {
            if(typeof item1[sortOption.value] === 'number')
                return item1[sortOption.value] > item2[sortOption.value] ? 1 : -1
            else
                return item1[sortOption.value]?.localeCompare(item2[sortOption.value])
          })
    },

    searchItems: (search, itemList) => {
        return itemList.filter(elem => elem.title.includes(search.trim().toLowerCase()))
    },

}
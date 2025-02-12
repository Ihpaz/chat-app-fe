
const url = '/chat-rooms'
const name = 'Chat Rooms'
const folder = 'chatrooms'



export default {
    path:url,
    component:() => import('../views/index.vue'),
    meta:{auth:true},
    children:[
        {
            path:'',
            name:name,
            meta:{
                auth:true,
                key:name,
                path:name
            },
            component : () => import(`../views/${folder}/index.vue`)
        },
        {
            path:'create',
            name:'create'+name,
            meta:{
                auth:true,
                key:name,
                path:name+'.create'
            },
            component : () => import(`../views/${folder}/create.vue`)
        },
        {
            path:'list',
            name:'list'+name,
            meta:{
                auth:true,
                key:name,
                path:name+'.list'
            },
            component : () => import(`../views/${folder}/chatrooms.vue`)
        }
       
    ]
}

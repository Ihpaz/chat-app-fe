
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
            component : () => import(`../views/${folder}/ChatRooms.vue`)
        },
        {
            path:'active',
            name:'active'+name,
            meta:{
                auth:true,
                key:name,
                path:name+'.active'
            },
            component : () => import(`../views/${folder}/OpenChatRooms.vue`)
        },
        {
            path:'window/:id',
            name:'window',
            meta:{
                auth:true,
                key:name,
                path:name+'.window'
            },
            component : () => import(`../views/${folder}/WindowChatRooms.vue`)
        },
       
    ]
}

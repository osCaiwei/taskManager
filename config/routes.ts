export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/task/getTask',
              },
              {
                path: '/task',
                name: 'task',
                icon: 'crown',
                authority: ['admin', 'user'],
                component: './taskManagement/TaskManagement',
                routes: [
                  {
                    path: '/task/createTask',
                    name: 'createTask',
                    icon: 'smile',
                    component: './taskManagement/CreateTask',
                    authority: ['admin'],
                  },
                  {
                    path: '/task/getTask',
                    name: 'getTask',
                    icon: 'smile',
                    component: './taskManagement/GetTask',
                    authority: ['admin', 'user'],
                  },
                  {
                    path: '/task/coupleBackTask/:taskId',
                    name: 'coupleBackTask',
                    icon: 'smile',
                    component: './taskManagement/CoupleBackTask',
                    authority: ['admin', 'user'],
                    hideInMenu: true,
                  },
                ],
              },
              {
                path: '/map',
                name: 'map',
                icon: 'crown',
                authority: ['admin'],
                component: './locationManagement/LocationManagement',
                routes: [
                  {
                    path: '/map/usermap',
                    name: 'usermap',
                    icon: 'smile',
                    component: './locationManagement/UserMap',
                    authority: ['admin'],
                  },
                ],
              },
              {
                path: '/userManagement',
                name: 'userList',
                icon: 'smile',
                component: './User/List/UserManagement',
                authority: ['admin'],
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];

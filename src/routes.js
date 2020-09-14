let routes = [
	{
		path: '/login', // 菜单路由
		component: () => import('@/views/Login.vue'),
		name: '菜单', // 菜单名称
		iconCls: 'el-icon-message', // 图标样式class
		hidden: true // 菜单是否隐藏 true隐藏
	},
	{
		path: '/',
		component: () => import('@/views/Home.vue'),
		name: 'menu.configList',
		iconCls: 'iconshezhi', // 图标样式class
		hidden: false,
		children: [
			{
				path: '/main',
				component: () => import('@/views/Main.vue'),
				name: '主页',
				hidden: true // 隐藏子菜单
			},
			{
				path: '/clientList',
				component: () => import('@/views/nav1/clientList.vue'),
				iconCls: 'iconshujufenpei',
				name: 'menu.clientList'
			},
			{
				path: '/deployList',
				component: () => import('@/views/nav1/deployList.vue'),
				iconCls: 'iconshujufenpei',
				name: 'menu.deployList'
			},
			{
				path: '/dockerConfig',
				component: () => import('@/views/nav1/dockerConfig.vue'),
				iconCls: 'iconshujufenpei',
				name: 'menu.dockerConfig'
			}
		]
	},
	{
		path: '/',
		component: () => import('@/views/Home.vue'),
		name: 'menu.nav2',
		iconCls: 'icon-font iconshuju',
		children: [
			{
				path: '/page2',
				component: () => import('@/views/nav2/Page2.vue'),
				name: 'menu.editor'
			},
			{
				path: '/page3',
				component: () => import('@/views/nav2/Page3.vue'),
				name: 'menu.page3'
			}
		]
	},
	{
		path: '/',
		component: () => import('@/views/Home.vue'),
		name: 'menu.nav3',
		iconCls: 'icon-font iconV',
		// leaf: false, // 只有一个节点
		children: [
			{
				path: '/page6',
				component: () => import('@/views/nav3/Page6.vue'),
				name: 'menu.element'
			},
			{
				path: '/page7',
				component: () => import('@/views/nav3/Page7.vue'),
				name: 'menu.funcList'
			},
			{
				path: '/echart',
				component: () => import('@/views/charts/echarts.vue'),
				name: 'menu.echarts'
			}
		]
	},
	{
		path: '*',
		name: '404',
		hidden: true,
		component: () => import('@/views/404') // 404 页面
	}
]

export default routes
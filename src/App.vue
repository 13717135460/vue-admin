<template>
	<div id="app">
		<transition name="fade" mode="out-in">
			<router-view v-if="isRouterAlive"></router-view>
		</transition>
	</div>
</template>

<script>
import './styles/global.css'
import './api/index.js' // 导入api

export default {
	name: 'app',
	provide () {
		return {
			reload: this.reload
		}
  },
	data () {
		return {
			isRouterAlive: true
		}
	},
	methods: {
    reload () {
			this.isRouterAlive = false
			this.$nextTick(function() {
				this.isRouterAlive = true
			})
    }
  }
}

</script>

<style lang="less">
body {
	margin: 0px;
	padding: 0px;
	font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
	font-size: 14px;
	-webkit-font-smoothing: antialiased;
}

#app {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%;
}
.el-submenu__title {
	i {
		margin-right: 8px;
		font-size: 18px;
	}
}
.toolbar-pages {
	text-align: center;
}
// start色调配置
.el-menu {
	color: #fff !important;
	background-color: #545C64 !important;
	.el-menu-item {
		color: #fff;
		&:hover {
			// color: #eec154;
			color: #eec999;
			background-color: rgba(0, 0, 0, .1);
			i {
				color: #eec999;
				transition: border-color .3s, background-color .3s, color .3s;
			}
		}
		i {
			color: #fff;
      font-size: 18px;
      margin-right: 8px;
		}
	}
	.el-submenu__title {
		color: #fff;
	}
	.el-submenu__title i {
		color: #fff !important;
	}
	.el-submenu__title:hover {
		color: #fff !important;
		background-color: transparent !important;
  }
	.el-submenu .is-active {
		color: #eec999 !important;
		background-color: rgba(0, 0, 0, .3) !important;
	}
}
// end色调配置
.el-submenu [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}
.el-menu-item [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}
.toolbar {
	padding: 10px;
	margin: 10px 0px;
	.el-form-item {
		margin-bottom: 10px;
	}
}
.fade-enter-active,
.fade-leave-active {
	transition: all .2s ease;
}
.fade-enter,
.fade-leave-active {
	opacity: 0;
}
</style>
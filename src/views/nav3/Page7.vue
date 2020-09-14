<template>
	<section class="module-list">
		<!--查询-->
		<el-col :span="24" class="toolbar">
			<el-form :model="filters" ref="filters" :inline="true">
				<el-form-item label="客户名" prop="name">
					<el-input class="ipt1" v-model="filters.name" placeholder="请输入客户名" autocomplete="off" clearable></el-input>
					<el-button class="ml10" icon="el-icon-refresh" @click="resetForm('filters')">重置</el-button>
				</el-form-item>
				<br>
				<br>
				<br>
				<el-divider content-position="left">刷新页面 <span class="red">（vue reload() 方法实现页面刷新，浏览器不刷新）</span></el-divider>
				<el-form-item align="center">
					<el-button icon="el-icon-search" type="primary" @click="queryBtn">刷新页面</el-button>
				</el-form-item>
				<br>
				<br>
				<br>
				<el-divider content-position="left">函数防抖 <span class="red">（重复点击时只执行最后一次点击事件）</span></el-divider>
				<el-form-item>
					<el-button @click="debounceFn('wxy')">函数防抖</el-button>
				</el-form-item>
				<br>
				<br>
				<br>
				<el-divider content-position="left">函数节流 <span class="red">（固定时间内执行点击事件，该案例设置的是2000ms）</span></el-divider>
				<el-form-item>
					<el-button @click="throttleFn('wxyjolin')">函数节流</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<div>
			<div style="color:transparent;">全局过滤器</div>
			<el-divider content-position="left">全局过滤器</el-divider>
			<div>银行卡4位分隔：{{ bankNumber | bankFormat }}</div><br><br>
			<!-- 全局过滤器 -->
			<div>全局过滤器：{{ money | formatMoney }}</div><br><br>
			<!-- 局部过滤器 -->
			<div>局部过滤器：{{ bankNumber | thousandsBox }}</div><br><br>
			<!-- <span>{{scope.row.status === 0 ? '未下发' : scope.row.status === 1 ? '已下发' : scope.row.status === 2 ? '绑定成功' : '未知'}}</span> -->
		</div>
	</section>
</template>

<script>
	import local from '@/utils/local' // 引入localStorage组件
	import { isPhone, isLicense, isTrainNumber, checkPwd, getRandomNumber, isCarNumber, isPostcode, isFixedphone, dateFormat, Debounce, Throttle, getViewportOffset, staArrNum } from '@/utils/index' // 引入工具函数
	import NProgress from 'nprogress' // 进度条

	export default {
		inject: ['reload'],
		data() {
			return {
				bankNumber: Number('622024000039680476'),
        money: +'12345',
				filters: {
					name: ''
				}
			}
		},
		// 局部过滤器
		filters: {
			// 千分位分割
			thousandsBox (value) {
				if (typeof (value) === 'number') {
					return value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
				}
			}
		},
		mounted() {
			console.log('-------------------- 工具函数 ------------------------')
			console.log('一、13717135460是否是手机号码：' + isPhone(13717135460))
			console.log('二、JY1131002000596109 是否是营业执照：' + isLicense('JY1131002000596109'))
			console.log('三、d727 是否火车车次：' + isTrainNumber('d727'))
			console.log('四、12385@@!A6 密码强度是：' + checkPwd('12385@@!A6'))
			console.log('五、10, 20区间获取指定范围随机数：' + getRandomNumber(10, 20))
			console.log('六、粤B2584警是否是小汽车车牌号：' + isCarNumber('粤B2584警'))
			console.log('七、0713-7669133 是否座机：' + isFixedphone('0713-7669133'))
			console.log('八、518173 是否是邮编：' + isPostcode('518173'))
			console.log('九、当前时间：' + dateFormat('y-MM-dd hh:mm:ss', new Date()))
			console.log('十、视窗宽高：' + getViewportOffset().w)
			console.log('十一、视窗宽高：' + getViewportOffset().h)
			// 统计数组中各个元素出现的次数
			let arr = [1, 2, 3, 6, 5, 3, 2, 1, 2, 3, 2, 1]
			console.log('统计数组 [1, 2, 3, 6, 5, 3, 2, 1, 2, 3, 2, 1] 中各个元素出现的次数')
			console.log(staArrNum(arr))
		},
		methods: {
			queryBtn () {
				this.reload() // 重载页面 - inject
			},
			// 按钮防抖
			debounceFn: Debounce(function(val) {
				// this.queryUsers() 执行函数
				this.$message.success('函数防抖...')
				console.log(val)
			}, 1000),
			// 按钮节流
			throttleFn: Throttle(function(val) {
				// this.queryUsers() 执行函数
				this.$message.success('函数节流...')
				console.log(val)
			}, 2000),
			// 重置
			resetForm(formName) {
				this.$refs[formName].resetFields()
				this.queryUsers()
			}
		}
	}
</script>

<style lang="less" scoped>
.module-list {
	.ipt1 {
		width: 260px;
	}
	.cell {
		.el-link {
			margin-right: 20px;
		}
	}
}
</style>
<style lang="less">
.module-list {
	.el-form-item {
		.el-form-item__content {
			line-height: normal;
		}
	}
}
</style>

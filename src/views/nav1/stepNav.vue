<template>
	<section class="step">
		<div class="step-box">
			<el-steps :space="320" :active="parseInt(activeNum)" align-center finish-status="success">
				<el-step title="基本信息"></el-step>
				<el-step title="选择云手机服务器"></el-step>
				<el-step title="创建云服务器"></el-step>
				<el-step title="绑定"></el-step>
				<el-step title="部署"></el-step>
			</el-steps>
		</div>
  </section>
</template>

<script>
	export default {
		props: {
			activeNum: {
				type: String,
				required: true
			}
		}
	}
</script>
<style lang="less" scoped>
.step {
  .step-box {
		margin: 30px auto 50px;
	}
}
</style>
<style lang="less">
.step {
	.el-step__title.is-wait {
		color: #303133;
	}
	.el-step__head.is-wait {
		color: #303133;
		border-color: #303133;
	}
}
</style>
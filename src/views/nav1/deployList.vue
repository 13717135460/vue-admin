<template>
	<section class="deploy-list">
		<!--查询-->
		<el-col :span="24" class="toolbar">
			<el-form :inline="true" :model="filters" ref="filters">
				<el-form-item label="客户名称" prop="customer_name">
					<el-input class="ipt1" v-model="filters.customer_name" placeholder="请输入客户名称" clearable></el-input>
				</el-form-item>
				<el-form-item label="项目名称" prop="deploy_name">
					<el-input class="ipt1" v-model="filters.deploy_name" placeholder="请输入项目名称" clearable></el-input>
				</el-form-item>
				<el-form-item>
					<el-button icon="el-icon-search" type="primary" @click="getUsers" v-text="$t('form.searchBtn')"></el-button>
					<el-button icon="el-icon-refresh" @click="resetForm('filters')" v-text="$t('table.resetFilter')"></el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row  :header-cell-style="{background:'#f5f7fa',borderTop: '1px solid #ebeef5'}" v-loading="listLoading" @selection-change="selsChange">
			<el-table-column prop="customer_name" label="客户名称"></el-table-column>
			<el-table-column prop="deploy_name" label="项目名称" ></el-table-column>
			<el-table-column prop="no_deploy_num" label="未部署" ></el-table-column>
			<el-table-column prop="create_time" label="创建时间"></el-table-column>
			<el-table-column prop="deploy_desc" label="备注"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-link type="primary" :underline="false" @click="detailBtn(scope.row)">详情</el-link>
				</template>
			</el-table-column>
		</el-table>

		<!-- 分页 -->
		<el-col :span="24" class="toolbar toolbar-pages">
			<el-pagination
				background
				layout="total, prev, pager, next, sizes, jumper"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:pager-count="11"
				:page-sizes="[10, 20, 30]"
				:page-size="pageSize"
				:current-page="currentPage"
				:total="total">
			</el-pagination>
		</el-col>
		<!-- /分页 -->

		<!-- 详情弹窗界面 -->
		<el-dialog title="详情" :visible.sync="editFormVisible" center>
			<el-table :data="users" :model="filters" :visible.sync="editFormVisible" highlight-current-row :header-cell-style="{background:'#f5f7fa',borderTop: '1px solid #ebeef5'}">
				<el-table-column prop="masterEcsName" label="主节点"></el-table-column>
				<el-table-column prop="slavesEcsName" label="子节点" ></el-table-column>
				<el-table-column prop="cpName" label="CPM" ></el-table-column>
				<el-table-column label="状态">
					<template slot-scope="scope">
						<span v-if="parseInt(scope.row.status) === 0">成功</span>
						<span class="red" v-if="parseInt(scope.row.status) === 1">失败</span>
					</template>
				</el-table-column>
			</el-table>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editFormVisible = false">关闭</el-button>
			</div>
		</el-dialog>

	</section>
</template>

<script>
	import local from '@/utils/local' // 引入localStorage组件

	export default {
		data() {
			return {
				filters: {
					customer_name: '',
					deploy_name: ''
				},
				users: [
					{
						customer_name: '华为',
						deploy_name: '华为云',
						no_deploy_num: '是',
						create_time: '2019-10-10',
						deploy_desc: '华为云服务器',
						masterEcsName: '123.10.1.2',
						slavesEcsName: '202.103.24.68',
						cpName: 'CPM',
						status: 0
					},
					{
						customer_name: '阿里',
						deploy_name: '阿里云',
						no_deploy_num: '否',
						create_time: '2016-12-10',
						deploy_desc: '阿里云服务器',
						masterEcsName: '123.10.1.2',
						slavesEcsName: '202.103.24.68',
						cpName: 'CPM',
						status: 0
					},
					{
						customer_name: '腾讯',
						deploy_name: '腾讯云',
						no_deploy_num: '是',
						create_time: '2019-8-13',
						deploy_desc: '腾讯云服务器',
						masterEcsName: '123.10.1.2',
						slavesEcsName: '202.103.24.68',
						cpName: 'CPM',
						status: 1
					}
				],
				listLoading: false,
				sels: [], // 列表选中列
				editFormVisible: false, // 编辑界面是否显示
				editLoading: false,
				// 编辑界面数据
				editForm: {
					note: ''
				},
				addFormVisible: false, // 新增界面是否显示
				total: 0,
				currentPage: 1, // 初始页
				pageSize: 10 // 每页数据量
			}
		},
		mounted() {
			this.getUsers()
		},
		methods: {
			// 获取用户列表
			getUsers () {
				this.$message.success('查询成功')
			},
			// 查看详情
			detailBtn (row) {
				this.editFormVisible = true
				this.editForm = Object.assign({}, row)
			},
			// 每页显示条数
			handleSizeChange (val) {
				this.pageSize = val
				this.getUsers()
			},
			// 选择当前页数
			handleCurrentChange (val) {
				this.currentPage = val
				this.getUsers()
			},
			// 重置
			resetForm(formName) {
				this.$refs[formName].resetFields()
				this.getUsers()
			},
			selsChange (sels) {
				this.sels = sels
			}
		}
	}

</script>

<style lang="less" scoped>
.deploy-list {
	.create-btn {
		float: right;
	}
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

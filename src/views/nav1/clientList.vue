<template>
	<section class="client-list">
		<!--查询-->
		<el-col :span="24" class="toolbar">
			<el-form :model="filters" ref="filters" :inline="true">
				<el-form-item label="客户名" prop="name">
					<el-input class="ipt1" v-model="filters.name" placeholder="请输入客户名" autocomplete="off" clearable></el-input>
				</el-form-item>
				<el-form-item>
					<el-button icon="el-icon-search" type="primary" @click="queryBtn" v-text="$t('form.searchBtn')"></el-button>
					<el-button icon="el-icon-refresh" @click="resetForm('filters')" v-text="$t('table.resetFilter')"></el-button>
				</el-form-item>
				<el-form-item class="create-btn">
					<el-button icon="el-icon-plus" type="primary" @click="handleAdd" v-text="$t('form.createBtn')"></el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!-- 列表 -->
		<el-table :data="users" highlight-current-row  :header-cell-style="{background:'#f5f7fa',borderTop: '1px solid #ebeef5'}" v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column prop="customerId" label="客户id" ></el-table-column>
			<el-table-column prop="customerName" label="客户姓名"></el-table-column>
			<el-table-column prop="createTime" label="创建时间"></el-table-column>
			<el-table-column prop="remake" label="备注"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-link icon="el-icon-edit" type="primary" :underline="false" @click="editBtn(scope.$index, scope.row)">编辑</el-link>
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

		<!-- 编辑界面 -->
		<el-dialog title="编辑" :visible.sync="editFormVisible" center>
			<el-form :model="editForm" label-width="100px" ref="editForm">
				<el-form-item label="备注" prop="remake">
					<el-input type="textarea" v-model="editForm.remake" placeholder="请输入50字以内" maxlength="50" show-word-limit></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--创建界面-->
		<el-dialog title="创建客户" :visible.sync="addFormVisible" :before-close="handleClose" center>
			<el-form :model="addForm" status-icon label-width="180px" :rules="addFormRules" ref="addForm">
				<el-form-item label="客户名称" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="手机号码(多规则校验)" prop="phone">
					<el-input v-model="addForm.phone" auto-complete="off" maxlength="11" clearable></el-input>
				</el-form-item>
				<el-form-item label="AK" prop="ak">
					<el-input v-model="addForm.ak" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="SK" prop="sk">
					<el-input v-model="addForm.sk" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="备注">
					<el-input type="textarea" v-model="addForm.remake" placeholder="请输入50字以内" maxlength="50" show-word-limit></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancelBtn('addForm')">取消</el-button>
				<el-button type="primary" @click="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
import local from '@/utils/local' // 引入localStorage组件
import { isPhone, isLicense, isTrainNumber, checkPwd, getRandomNumber, isCarNumber, isPostcode, isFixedphone, dateFormat, Debounce, Throttle, getViewportOffset, staArrNum } from '@/utils/index' // 引入工具函数
import NProgress from 'nprogress' // 进度条

export default {
  data() {
		// 手机号码校验
		let checkPhone = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('请输入手机号码'))
			}
			setTimeout(() => {
				if (!isPhone(value)) {
					callback(new Error('请输入正确手机号码'))
				} else {
					callback()
				}
			}, 300)
		}
		return {
			filters: {
				name: ''
			},
			users: [
				{
					cpmsIp: null,
					createTime: '2020-08-10 13:54:48',
					customerAk: 'test222',
					customerId: '001',
					customerName: '张三',
					customerSk: 'test222',
					operator: 1,
					phoneAmount: null,
					remake: '张三。。。',
					serverAmount: null,
					status: '0',
					updateTime: '2020-08-10 13:54:48'
				},
				{
					cpmsIp: null,
					createTime: '2020-08-10 13:54:48',
					customerAk: 'test222',
					customerId: '002',
					customerName: '李四',
					customerSk: 'test222',
					operator: 1,
					phoneAmount: null,
					remake: '李四。。。',
					serverAmount: null,
					status: '0',
					updateTime: '2020-08-10 13:54:48'
				},
				{
					cpmsIp: null,
					createTime: '2020-08-10 13:54:48',
					customerAk: 'test222',
					customerId: '003',
					customerName: '王五',
					customerSk: 'test222',
					operator: 1,
					phoneAmount: null,
					remake: '王五。。。',
					serverAmount: null,
					status: '0',
					updateTime: '2020-08-10 13:54:48'
				}
			],
			listLoading: false,
			sels: [], // 列表选中列
			editFormVisible: false, // 编辑界面是否显示
			editLoading: false,
			// 编辑界面数据
			editForm: {
				id: '',
				remake: ''
			},
			addFormVisible: false, // 新增界面是否显示
			addLoading: false,
			addFormRules: {
				name: [
					{
						required: true, // 是否必填
						message: '请输入客户名称',
						trigger: 'blur'
					},
					{
						min: 3,
						max: 5,
						message: '长度在 3 到 5 个字符',
						trigger: 'blur'
					}
				],
				ak: [
					{
						required: true, // 是否必填
						message: '请输入AK',
						trigger: 'blur'
					}
				],
				sk: [
					{
						required: true, // 是否必填
						message: '请输入SK',
						trigger: 'blur'
					}
				],
				phone: [
					{
						required: true, // 是否必填
						validator: checkPhone,
						trigger: 'blur'
					}
				]
			},
			// 新增界面数据
			addForm: {
				name: '',
				phone: '',
				ak: '',
				sk: '',
				remake: ''
			},
			total: 0,
			currentPage: 1, // 初始页
			pageSize: 10 // 每页数据量
		}
	},
	methods: {
		queryBtn () {
			this.currentPage = 1
			this.queryUsers()
		},
		// 查询客户列表
		queryUsers () {
			let data = {
				customerName: this.filters.name,
				currentPage: this.currentPage,
				pageSize: this.pageSize
			}
			this.listLoading = true
			NProgress.start() // 进度条
			this.$message.success('查询成功')
			this.listLoading = false
			// this.$api.queryCustomerxxx(data).then(res => {
			// 	let { status, data } = res.data
			// 	if (status === 0) {
			// 		this.total = data.totalRow
			// 		// this.users = data.list
			// 		this.listLoading = false
			// 		NProgress.done() // 进度条
			// 	}
			// })
		},
		// 显示新增界面
		handleAdd: function () {
			this.addFormVisible = true
		},
		// 显示编辑界面
		editBtn (index, row) {
			console.log(row)
			this.editForm.id = row.customerId
			this.editForm.remake = row.remake
			this.editFormVisible = true
		},
		// 编辑
		editSubmit () {
			let data = {
				customer_id: this.editForm.id,
				remake: this.editForm.remake
			}
			console.log(data)
			this.editLoading = true
			this.$api.updateCustomer(data).then((res) => {
				this.editLoading = false
				this.$message.success('编辑成功')
				this.$refs['editForm'].resetFields()
				this.editFormVisible = false
				this.queryUsers()
			})
		},
		// 创建
		addSubmit () {
			this.$refs.addForm.validate((valid) => {
				if (valid) {
					let data = {
						customerName: this.addForm.name,
						customerAk: this.addForm.ak,
						customerSk: this.addForm.sk,
						remake: this.addForm.remake
					}
					this.$message.success('创建成功')
					this.addFormVisible = false
					// this.$api.createCustomer(data).then((res) => {
					// 	let { status, data } = res.data
					// 	if (status === 0) {
					// 		this.addLoading = false
					// 		this.addForm.remake = ''
					// 		this.$message.success('创建成功')
					// 		this.$refs.addForm.resetFields()
					// 		this.addFormVisible = false
					// 		this.queryUsers()
					// 	}
					// })
				}
			})
		},
		// 每页显示条数
		handleSizeChange (val) {
			this.pageSize = val
			this.queryUsers()
		},
		// 选择当前页数
		handleCurrentChange (val) {
			this.currentPage = val
			this.queryUsers()
		},
		// 取消
		cancelBtn (formName) {
			this.addFormVisible = false
			this.addLoading = false
			this.editLoading = false
			this.addForm.remake = ''
			this.$refs[formName].resetFields()
		},
		handleClose () {
			this.addFormVisible = false
			this.addLoading = false
			this.editLoading = false
			this.addForm.remake = ''
			this.$refs.addForm.resetFields()
		},
		selsChange: function (sels) {
			this.sels = sels
		},
		// 重置
		resetForm(formName) {
			this.$refs[formName].resetFields()
			this.$message.success('重置成功')
		}
	}
}
</script>

<style lang="less" scoped>
.client-list {
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
<style lang="less">
.client-list {
	.el-form-item {
		.el-form-item__content {
			line-height: normal;
		}
	}
}
</style>

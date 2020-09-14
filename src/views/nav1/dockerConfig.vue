<template>
	<section class="docker-box">
		<!--表单-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-button icon="el-icon-plus" type="primary" @click="createDocker" v-text="$t('form.createBtn')"></el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="users" highlight-current-row  :header-cell-style="{background:'#f5f7fa',borderTop: '1px solid #ebeef5'}" v-loading="listLoading" style="width: 100%;">
				<el-table-column prop="dockerVersion" label="docker版本"></el-table-column>
				<el-table-column prop="createTime" label="创建时间"></el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-link icon="el-icon-delete" type="danger" @click="handleDel(scope.$index, scope.row)" :underline="false">删除</el-link>
					</template>
			  </el-table-column>
			</el-table>
		</template>

		<!-- 创建界面 -->
		<el-dialog title="创建" :visible.sync="closeFormVisible" :before-close="handleClose" center>
			<el-form :model="createForm" label-width="100px" :rules="addFormRules" ref="createForm">
				<el-form-item label="docker版本" prop="docker">
					<el-input type="text" v-model="createForm.docker" placeholder="请输入docker版本" maxlength="30"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="cancelBtn('createForm')">取消</el-button>
				<el-button type="primary" @click="createSubmit">提交</el-button>
			</div>
		</el-dialog>

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
	</section>
</template>
<script>
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				// 创建docker版本
				createForm: {
					docker: ''
				},
				loading: false,
				users: [
					{
						dockerVersion: '1.2.3',
						createTime: '2010-5-10'
					},
					{
						dockerVersion: '2.1.1',
						createTime: '2010-9-10'
					},
					{
						dockerVersion: '1.2.6',
						createTime: '2013-11-11'
					}
				],
				listLoading: false,
				closeFormVisible: false, // 创建界面是否显示
				addFormRules: {
					docker: [
						{
							required: true, // 是否必填
							message: '请输入docker版本',
							trigger: 'blur'
						}
					]
				},
				total: 0,
				currentPage: 1, // 初始页
				pageSize: 10 // 每页数据量
			}
		},
		mounted() {
			this.getDocker()
		},
		methods: {
			// 获取docker列表
			getDocker () {
				let data = {
					currentPage: this.currentPage,
					pageSize: this.pageSize
				}
				this.loading = true
				// this.$api 请求接口
				this.$api.queryDockerxxx(data).then(res => {
					let { status, data } = res.data
					if (status === 0) {
						this.total = data.totalRow
						// this.users = data.list
						this.loading = false
					} else {
						this.loading = false
					}
				})
			},
			createDocker () {
				// 显示编辑界面
				this.closeFormVisible = true
			},
			// 每页显示条数
			handleSizeChange (val) {
				this.pageSize = val
				this.getDocker()
			},
			// 选择当前页数
			handleCurrentChange (val) {
				this.currentPage = val
				this.getDocker()
			},
			// 创建docker版本
			createSubmit () {
				this.$refs.createForm.validate((valid) => {
					if (valid) {
						let data = {
							dockerVersion: this.createForm.docker
						}
						this.closeFormVisible = false
						this.$message.success('创建成功')
					}
				})
			},
			// 删除docker
			handleDel (index, row) {
				this.$confirm(`确定要删除 <span style="color:red">${row.dockerVersion}</span> 的版本吗?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					dangerouslyUseHTMLString: true
				}).then(() => {
					let data = {
						docker_id: row.dockerId
					}
					this.$message.success('删除成功')
				}).catch(err => {
					this.getDocker()
					console.log(err)
				})
			},
			// 取消
			cancelBtn (formName) {
				this.closeFormVisible = false
				this.$refs[formName].resetFields()
			},
			handleClose () {
				this.closeFormVisible = false
				this.$refs.createForm.resetFields()
			}
		}
	}
</script>

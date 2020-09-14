<template>
	<section class="test-box">
		<el-form :model="ruleForm" status-icon ref="ruleForm" :rules="rules" label-width="160px" style="width:60%;">
			<el-form-item label="用户名" prop="userName">
				<el-input type="text" v-model="ruleForm.userName" autocomplete="off" clearable></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input type="password" v-model="ruleForm.password" autocomplete="off" clearable></el-input>
			</el-form-item>
			<el-form-item label="活动区域" prop="options">
				<el-select v-model="ruleForm.options" filterable placeholder="请选择活动区域">
					<el-option label="北京" value="shanghai"></el-option>
					<el-option label="上海" value="beijing1"></el-option>
					<el-option label="广州" value="beijing2"></el-option>
					<el-option label="深圳" value="beijing3"></el-option>
					<el-option label="武汉" value="beijing4"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button icon="el-icon-search" type="primary" @click="submitForm('ruleForm')" v-text="$t('form.submit')"></el-button>
				<el-button icon="el-icon-refresh" @click="resetForm('ruleForm')" v-text="$t('table.resetFilter')"></el-button>
				<el-button icon="el-icon-plus" @click="addForm('add')" v-text="$t('form.add')"></el-button>
				<el-button icon="el-icon-edit" @click="addForm('edit')" v-text="$t('form.edit')"></el-button>
				<el-button icon="el-icon-edit" size="mini" @click="addForm('edit')" v-text="$t('form.edit')"></el-button>
			</el-form-item>
			<el-form-item>
				<el-link type="primary" :underline="false" @click="submitForm('ruleForm')" v-text="$t('form.submit')"></el-link>
				<el-link type="warning" :underline="false" @click="resetForm('ruleForm')" v-text="$t('table.resetFilter')"></el-link>
				<el-link type="success" :underline="false" @click="addForm('add')" v-text="$t('form.add')"></el-link>
				<el-link type="danger" icon="el-icon-edit" :underline="false" @click="addForm('edit')" v-text="$t('form.edit')"></el-link>
			</el-form-item>
		</el-form>
		<el-form ref="form" :model="form" label-width="160px" @submit.prevent="onSubmit" :rules="addFormRules" style="width:60%;">
			<el-form-item label="手机号码(多规则校验)" prop="phone">
					<el-input v-model="form.phone" maxlength="11" auto-complete="off" placeholder="请输入手机号码" clearable></el-input>
				</el-form-item>
			<el-form-item label="客户名称(长度限制)" prop="name">
				<el-input type="text" v-model="form.name" placeholder="请输入客户名称" autocomplete="off" clearable></el-input>
			</el-form-item>
			<el-form-item label="活动区域(可搜索选择)">
				<el-select v-model="form.region" filterable placeholder="请选择活动区域">
					<el-option label="北京" value="shanghai"></el-option>
					<el-option label="上海" value="beijing1"></el-option>
					<el-option label="广州" value="beijing2"></el-option>
					<el-option label="深圳" value="beijing3"></el-option>
					<el-option label="武汉" value="beijing4"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="活动区域(可多选)">
				<el-select v-model="form.region1" filterable multiple default-first-option placeholder="请选择活动区域">
					<el-option label="北京" value="shanghai1"></el-option>
					<el-option label="上海" value="beijing2"></el-option>
					<el-option label="深圳" value="beijing3"></el-option>
					<el-option label="广州" value="beijing4"></el-option>
					<el-option label="武汉" value="beijing5"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="活动时间">
				<el-col :span="7">
					<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
				</el-col>
				<el-col class="line" :span="1">  -</el-col>
				<el-col :span="7">
					<el-date-picker v-model="form.date2" type="month" placeholder="选择月"></el-date-picker>
				</el-col>
				<el-col class="line" :span="1">  -</el-col>
				<el-col :span="7">
					<el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date3" style="width: 100%;"></el-time-picker>
				</el-col>
			</el-form-item>
			<el-form-item label="即时配送">
				<el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
			</el-form-item>
			<el-form-item label="活动性质">
				<el-checkbox-group v-model="form.type">
					<el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
					<el-checkbox label="地推活动" name="type"></el-checkbox>
					<el-checkbox label="线下主题活动" name="type"></el-checkbox>
					<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="特殊资源">
				<el-radio-group v-model="form.resource">
					<el-radio label="线上品牌商赞助"></el-radio>
					<el-radio label="线下场地免费"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="备注信息">
				<el-input type="textarea" maxlength="50" show-word-limit v-model="form.desc"></el-input>
			</el-form-item>
			<el-form-item label="树形菜单">
				<div class="tree-box" v-loading="treeLoading" element-loading-text="加载中...">
				<el-tree
					:data="treeData"
					show-checkbox
					node-key="id"
					ref="tree"
					:default-expanded-keys="[1, 2]"
					:props="defaultProps">
				</el-tree>
			</div>
			</el-form-item>
		</el-form>

		<el-form label-width="80px">
			<el-form-item style="float:right">
				<el-button type="primary" @click="createBtn">立即创建</el-button>
			</el-form-item>
		</el-form>

		<!-- 列表 -->
		<el-table :data="users" highlight-current-row  :header-cell-style="{background:'#f5f7fa',borderTop: '1px solid #ebeef5'}" v-loading="listLoading">
			<el-table-column prop="name" label="姓名"></el-table-column>
			<el-table-column prop="age" label="年龄"></el-table-column>
			<el-table-column prop="createTime" label="时间"></el-table-column>
			<el-table-column prop="remark" label="备注"></el-table-column>
			<el-table-column label="部署状态">
				<template slot-scope="scope">
					<!-- <span>{{parseInt(scope.row.status) === 0 ? '已上线' : '未上线'}}</span> -->
					<el-link class="status-link" icon="el-icon-circle-check" type="success" :underline="false" v-if="parseInt(scope.row.status) === 0">已上线</el-link>
					<el-link class="status-link" icon="el-icon-circle-close" type="warning" :underline="false" v-if="parseInt(scope.row.status) === 1">未上线</el-link>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-link type="primary" :underline="false" @click="detailBtn(scope.$index, scope.row)">详情</el-link>
					<el-link type="primary" :underline="false" icon="el-icon-edit" @click="editBtn(scope.$index, scope.row)">编辑</el-link>
				</template>
			</el-table-column>
		</el-table>

		<!--创建界面-->
		<el-dialog :title="formTitle" :visible.sync="addFormVisible" :before-close="handleClose" center>
			<el-form :model="addForms" status-icon label-width="180px" :rules="addFormRules" ref="addForms">
				<el-form-item label="姓名" prop="userName">
					<el-input v-model="addForms.userName" auto-complete="off" clearable></el-input>
				</el-form-item>
				<el-form-item label="年龄" prop="age">
					<el-input v-model="addForms.age" auto-complete="off" clearable></el-input>
				</el-form-item>
				<el-form-item label="爱好" prop="hobby">
					<el-select v-model="addForms.hobby" filterable placeholder="请选择爱好">
						<el-option
							v-for="item in hobbyOptions"
							:key="item.id"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="活动时间" required>
					<el-col :span="11">
						<el-form-item prop="date1">
							<el-date-picker type="date" placeholder="选择日期" v-model="addForms.date1" style="width: 100%;"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col class="line" :span="1">-</el-col>
					<el-col :span="11">
						<el-form-item prop="date2">
							<el-time-picker placeholder="选择时间" v-model="addForms.date2" style="width: 100%;"></el-time-picker>
						</el-form-item>
					</el-col>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancelBtn('addForm')">取消</el-button>
				<el-button type="primary" @click="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--编辑界面-->
		<el-dialog title="数据编辑" :visible.sync="editFormVisible" :before-close="handleClose" center>
			<el-form :model="editForms" status-icon label-width="180px" :rules="addFormRules" ref="addForms">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForms.name" auto-complete="off" clearable></el-input>
				</el-form-item>
				<el-form-item label="年龄" prop="age">
					<el-input v-model="editForms.age" auto-complete="off" clearable></el-input>
				</el-form-item>
				<el-form-item label="时间" prop="createTime">
					<el-input v-model="editForms.createTime" auto-complete="off" clearable></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="remark">
					<el-input v-model="editForms.remark" auto-complete="off" clearable></el-input>
				</el-form-item>
				<el-form-item label="状态" prop="status">
					<el-input v-model="editForms.status" auto-complete="off" clearable></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancelBtn('addForm')">取消</el-button>
				<el-button type="primary" @click="editSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
  import { isPhone, isLicense, isTrainNumber, checkPwd, getRandomNumber, isCarNumber, isPostcode, isFixedphone, dateFormat, Debounce, Throttle, getViewportOffset, staArrNum } from '@/utils/index' // 引入工具函数
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
				users: [
					{
						name: '张三',
						age: 20,
						createTime: '2010-6-1',
						status: 0,
						remark: 'zhangsan...'
					},
					{
						name: '李四',
						age: 22,
						createTime: '2000-8-1',
						status: 1,
						remark: 'lisi...'
					},
					{
						name: '王五',
						age: 23,
						createTime: '1998-11-1',
						status: 1,
						remark: 'wangwu...'
					}
				],
				listLoading: false,
				formTitle: '',
				addLoading: false,
				treeLoading: false,
				addFormVisible: false,
				editFormVisible: false,
				form: {
					name: '',
					region: '',
					region1: '',
					date1: '',
					date2: '',
					date3: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				addForms: {
					userName: '',
					age: '',
					hobby: '',
					date1: '',
					date2: ''
				},
				editForms: {
					name: '',
					age: '',
					createTime: '',
					remark: '',
					status: ''
				},
				treeData: [
					{
						active: 1,
						children: [
							{
								id: 'd7da1aacd09366020b87cff9af7952b3',
								moduleName: '客户权限管理',
								moduleCode: 'CUSTOMER_MANAGEMENT'
							}
						],
						createDate: '2020-08-21 14:31:11',
						httpMethod: 'GET',
						id: '3abf1ebf2cd6b3b2c3ac523ed2163eda',
						isOperating: 0,
						moduleCode: 'USER_MANAGED',
						moduleHide: false,
						moduleIcon: 'iconkehuguanli1',
						moduleName: '客户管理',
						modulePath: '/user',
						parentId: null,
						projectName: null,
						sort: 0,
						subModules: null,
						updateDate: null
					},
					{
						active: 1,
						children: [
							{
								id: 'd7da1aacd09366020b87cff9af7952b4',
								moduleName: '菜单查看管理',
								moduleCode: 'CUSTOMER_MANAGEMENT'
							}
						],
						createDate: '2020-08-21 13:30:11',
						httpMethod: 'GET',
						id: '3abf1ebf2cd6b3b2c3ac523ed2163ed1',
						isOperating: 0,
						moduleCode: 'USER_MANAGED',
						moduleHide: false,
						moduleIcon: 'iconkehuguanli1',
						moduleName: '菜单管理',
						modulePath: '/user',
						parentId: null,
						projectName: null,
						sort: 0,
						subModules: null,
						updateDate: null
					},
					{
						active: 1,
						children: [
							{
								id: 'd7da1aacd09366020b87cff9af7952b1',
								moduleName: '权限控制管理',
								moduleCode: 'CUSTOMER_MANAGEMENT'
							}
						],
						createDate: '2020-05-20 10:32:11',
						httpMethod: 'GET',
						id: '3abf1ebf2cd6b3b2c3ac523ed2163ed2',
						isOperating: 0,
						moduleCode: 'USER_MANAGED',
						moduleHide: false,
						moduleIcon: 'iconkehuguanli1',
						moduleName: '权限管理',
						modulePath: '/user',
						parentId: null,
						projectName: null,
						sort: 0,
						subModules: null,
						updateDate: null
					}
				],
				defaultProps: {
					label: 'moduleName',
					children: 'children'
				},
				ruleForm: {
					userName: '',
					password: '',
					options: []
				},
				hobbyOptions: [
					{
						label: '历史',
						value: 0
					},
					{
						label: '书法',
						value: 1
					},
					{
						label: '编程',
						value: 2
					}
				],
				rules: {
					userName: [
						{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						}
					],
					password: [
						{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						}
					],
					options: [
						{
							required: true,
							message: '请选择城市',
							trigger: 'change'
						}
					]
				},
				addFormRules: {
					userName: [
						{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						}
					],
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
					phone: [
						{
							required: true, // 是否必填
							validator: checkPhone,
							trigger: 'blur'
						}
					],
					age: [
						{
							required: true, // 是否必填
							message: '请输入年龄',
							trigger: 'blur'
						}
					],
					hobby: [
						{
							required: true, // 是否必填
							message: '请输入爱好',
							trigger: 'change'
						}
					],
					date1: [
						{
							required: true, // 是否必填
							message: '请选择日期',
							trigger: 'change'
						}
					],
					date2: [
						{
							required: true, // 是否必填
							message: '请选择时间',
							trigger: 'change'
						}
					]
				}
			}
		},
		mounted () {
			this.$refs.ruleForm.resetFields()
		},
		methods: {
			onSubmit() {
				console.log('submit!')
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						if (this.ruleForm.userName === 'admin' && this.ruleForm.password === '12345') {
							this.$message.success('登录成功')
							// this.$router.push('/home?id=100&name=wxy')
							this.$router.push({
								path: '/home',
								query: {
									id: 300,
									name: 'beyondwang'
								}
							})
							// this.$router.push({
							//   name: 'home',
							//   params: {
							//     id: '200',
							//     name: 'wxy200333'
							//   }
							// })
						}
					} else {
						return false
				  }
			  })
			},
			// 添加表单
			addForm (type) {
				this.addFormVisible = true
				if (type === 'add') {
					this.formTitle = '创建表单'
				}
				if (type === 'edit') {
					this.formTitle = '编辑表单'
				}
			},
			// 详情
			detailBtn () {
				this.$message.success('详情')
			},
			// 编辑
			editBtn (index, row) {
				this.editFormVisible = true
				this.editForms.name = row.name
				this.editForms.age = row.age
				this.editForms.createTime = row.createTime
				this.editForms.remark = row.remark
				this.editForms.status = row.status
			},
			// 编辑提交
			editSubmit () {
				console.log(this.editForms)
			},
			// 立即创建
			createBtn () {
				this.formTitle = '创建'
				this.addFormVisible = true
			},
			// 取消
			cancelBtn () {
				this.addFormVisible = false
				this.editFormVisible = false
				this.$refs.addForms.resetFields()
			},
			// 提交
			addSubmit () {
				this.$refs.addForms.validate((valid) => {
					if (valid) {
						this.$message.success('提交成功')
						this.addFormVisible = false
						this.$refs.addForms.resetFields()
					}
				})
			},
			handleClose () {
				this.addFormVisible = false
				this.editFormVisible = false
				this.$refs.addForms.resetFields()
			},
			// 重置
			resetForm(formName) {
				this.$refs[formName].resetFields()
			}
		}
	}
</script>

<style lang="less" scoped>
.test-box {
	.el-link {
		margin-right: 30px;
	}
	.status-link {
		cursor: auto;
	}
}
</style>

<template>
  <div>
    <el-row :gutter="10" style="margin-top:20px;">
      <el-col :span="10">
        <el-card v-loading="isEdit" element-loading-text="正在编辑中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.2)" class="box-card">
          <div style="margin-bottom: 20px">
            <!-- <span>交易菜单1</span> -->
            <el-button type="primary" icon="el-icon-plus">添加</el-button>
            <el-button type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button type="primary" icon="el-icon-delete">删除</el-button>
          </div>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-button type="primary" icon="el-icon-plus">添加</el-button>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" icon="el-icon-edit">编辑</el-button>
            </el-col>
            <el-col :span="8">
              <el-button type="danger" icon="el-icon-delete">删除</el-button>
            </el-col>
          </el-row>
          <div style="height:500px;">
            <el-tree ref="eltree" :data="data5" :expand-on-click-node="false" :highlight-current="true" node-key="grpid" default-expand-all @node-click="handleNodeClick">
              <span slot-scope="{ node, data }" :disabled="false" class="custom-tree-node">
                <span>{{ node.label }}</span>
                <span>
                  <el-button type="text" size="mini" @click="() => append(data)">
                    添加
                  </el-button>
                  <el-button type="text" size="mini" @click="() => remove(node, data)">
                    删除
                  </el-button>
                </span>
              </span>
            </el-tree>
          </div>
        </el-card>
      </el-col>

      <el-col :span="14">
        <el-card class="box-card">
          <div>
            <el-form ref="form" :model="form" :rules="submitRules" label-width="120px">
              <el-form-item label="上级交易组:">
                <el-input v-model="form.grpsuperid" :readonly="true" style="width:180px;" />
              </el-form-item>
              <el-form-item prop="grpid" label="交易组ID:">
                <el-input v-model="form.grpid" placeholder="交易组ID" style="width:180px;" />
              </el-form-item>
              <el-form-item prop="grpname" label="交易组名称:">
                <el-input v-model="form.grpname" placeholder="交易组名称" style="width:200px;" />
              </el-form-item>
              <el-form-item prop="grporder" label="交易组排序号:">
                <el-input v-model="form.grporder" placeholder="交易组排序号" style="width:100px;" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="resetForm('form')">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    const data = [
      {
        grpid: 'A001',
        label: '存款业务',
        children: [
          {
            grpid: 'A001B001',
            label: '存款账务处理',
            children: [
              {
                grpid: 'A001B001C001',
                label: '存款开户'
              },
              {
                grpid: 'A001B001C009',
                label: '借贷转账'
              }
            ]
          }
        ]
      },
      {
        grpid: 'A002',
        label: '贷款业务',
        children: [
          {
            grpid: 'A002B001',
            label: '贷款发放/归还'
          },
          {
            grpid: 'A002B002',
            label: '贷款管理维护'
          }
        ]
      },
      {
        grpid: 'A003',
        label: '支付业务',
        children: [
          {
            grpid: 'A003Z001',
            label: '二级 3-1'
          },
          {
            grpid: 'A003Z002',
            label: '二级 3-2'
          }
        ]
      }
    ]
    var validateGrpId = (rule, value, callback) => {
      if (!value.startsWith(this.form.grpsuperid)) {
        callback(new Error('交易组ID必须包含上级交易组ID'))
      } else {
        callback()
      }
    }
    return {
      isEdit: false,
      isDelete: false,
      data5: JSON.parse(JSON.stringify(data)),
      form: {
        grpid: '',
        grpsuperid: '',
        grpname: '',
        grporder: ''
      },
      submitRules: {
        grpid: [
          { required: true, message: '请输入交易组ID', trigger: 'blur' },
          { validator: validateGrpId, trigger: 'blur' }
        ],
        grpname: [
          { required: true, message: '请输入交易组名称', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    selected(id) {
      this.editMenu(id)
    }
  },
  methods: {
    append(data) {
      this.isEdit = true
      const parentGrpId = data.grpid // 上级交易组
      const childrenGrp = data.children
      let currentGrpIdIndex = 1 // 新增交易组序号
      let parentGrpIdLevel = '' // 上级交易组层级

      // 取新增的GrpId的层级A002B001 => B
      const parentGrpIdArr = parentGrpId.split('')
      let hasLevel = false
      for (let i = parentGrpIdArr.length - 1; i >= 0; i--) {
        if (parentGrpIdArr[i] >= 'A' && parentGrpIdArr[i] <= 'Z') {
          parentGrpIdLevel = parentGrpIdArr[i]
          hasLevel = true
          break
        }
      }
      if (!hasLevel) {
        this.$alert('上级交易组ID格式不正确', '错误', {
          confirmButtonText: '确定',
          type: 'error'
        })
        this.isEdit = false
        // this.$message({
        //   message: '上级交易组ID格式不正确',
        //   type: 'error'
        // })
        return
      }
      if (parentGrpIdLevel === 'Z') {
        this.$alert('嵌套层级超限，此交易组下已无法再嵌套交易组', '错误', {
          confirmButtonText: '确定',
          type: 'error'
        })
        // this.$message({
        //   message: '嵌套层级超限',
        //   type: 'error'
        // })
        this.isEdit = false
        return
      }
      const currentGrpIdLevel = String.fromCharCode(
        parentGrpIdLevel.charCodeAt() + 1
      )
      console.log('currentGrpIdLevel:' + currentGrpIdLevel)
      console.log(childrenGrp)

      if (childrenGrp && childrenGrp.length !== 0) {
        const childrenGrpId = childrenGrp.map(children =>
          children.grpid.slice(children.grpid.length - 3)
        )
        currentGrpIdIndex = Math.max.apply(null, childrenGrpId) + 1 // 取grpid
      }
      const currentGrpIdIndexStr = currentGrpIdIndex.toString().padStart(3, '0')
      console.log('currentGrpIdIndexStr:' + currentGrpIdIndexStr)
      const currentGrpId =
        parentGrpId + currentGrpIdLevel + currentGrpIdIndexStr
      // 表单赋值
      this.form.grpsuperid = data.grpid
      this.form.grpid = currentGrpId
      this.form.grpname = ''
      this.form.grporder = ''
      // const newChild = {
      //   grpid: currentGrpId,
      //   label: '',
      //   children: []
      // }
      // if (!childrenGrp) {
      //   this.$set(data, 'children', [])
      // }
      // data.children.push(newChild)

      // this.$refs.eltree.setCurrentKey('A002B001')
    },

    remove(node, data) {
      console.log('remove')
      this.isDelete = true
      if (node.childNodes && node.childNodes.length > 0) {
        this.$message.error('存在子节点，无法删除！')
        return
      }
      const parent = node.parent
      // 用以下方法删除后，父节点下面如果没有子节点，箭头仍然存在
      // const childrenNodes = parent.childNodes || parent
      // const index = childrenNodes.findIndex(d => d.id === data.id)
      // childrenNodes.splice(index, 1)

      const children = parent.data.children || parent.data
      console.log(children)
      const index = children.findIndex(d => d.grpid === data.grpid)
      console.log(index)
      children.splice(index, 1)
      // this.$set(data, 'children', children)
      this.data5 = JSON.parse(JSON.stringify(this.data5))
      this.$message.success('删除成功！')
      this.resetForm('form')
    },
    onSubmit() {
      const newChild = {
        grpid: this.form.grpid,
        label: this.form.grpname,
        children: []
      }
      this.$refs.eltree.append(newChild, this.$refs.eltree.getCurrentNode())
      console.log(this.data5)
      // if (!childrenGrp) {
      //   this.$set(data, 'children', [])
      // }
      // data.children.push(newChild)
      // console.log(this.$refs.eltree.getCurrentNode())

      this.$message.success('提交成功！')
      this.isEdit = false
    },
    handleNodeClick(data, node) {
      if (this.isEdit) {
        return
      }
      if (this.isDelete) {
        this.isDelete = false
        return
      }
      console.log('handleNodeClick')
      // this.form = data
      this.form.grpid = data.grpid
      this.form.grpsuperid = node.parent.data.grpid
      this.form.grpname = data.label
    },
    resetForm() {
      this.isEdit = false
      for (const key in this.form) {
        this.form[key] = ''
      }
    },
    editMenu(id) {
      // if (!id || this.tempMenu.id === id) {
      //   this.editingMenu = {}
      //   this.tempMenu = {
      //     id: 0,
      //     parentId: 0
      //   }
      //   return true
      // }
      // let menu = this.findMenuById(id)
      // this.tempMenu = menu
      console.log('editMenu')
    }
  }
}
</script>
<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>

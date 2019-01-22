<template>
  <div>
    <el-row :gutter="10" style="margin-top:20px;">
      <el-col :span="7">
        <el-card class="box-card">
          <div>
            <span>交易菜单</span>
          </div>
          <div style="height:500px;">
            <el-tree :data="data5" :expand-on-click-node="false" show-checkbox node-key="id" default-expand-all>
              <span slot-scope="{ node, data }" class="custom-tree-node">
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

      <el-col :span="17">
        <el-card class="box-card">
          <div>
            <el-form>
              <el-form-item style="margin-bottom: 40px;" prop="title">
                <el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label-width="100px" label="交易组ID:" class="postInfo-container-item">

                        <el-input v-model="grpid" placeholder="交易组ID" style="width:100px;" />

                      </el-form-item>
                    </el-col>
                    <el-col :span="16">
                      <el-form-item label-width="100px" label="上级交易组:" class="postInfo-container-item">
                        <el-input v-model="grpsuperid" placeholder="上级交易组" style="width:340px;" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-row>
                <MDinput :maxlength="100" name="grpid" required>
                  交易组ID
                </MDinput>
                <MDinput :maxlength="5" name="grpsuperid" required>
                  上级交易组
                </MDinput>
                <MDinput :maxlength="100" name="grpname" required>
                  交易组名称
                </MDinput>
                <MDinput :maxlength="100" name="grporder" required>
                  交易组排序号
                </MDinput>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import MDinput from '@/components/MDinput'
let id = 1000

export default {
  components: { MDinput },
  data() {
    const data = [
      {
        id: 1,
        label: '一级 1',
        children: [
          {
            id: 4,
            label: '二级 1-1',
            children: [
              {
                id: 9,
                label: '三级 1-1-1'
              },
              {
                id: 10,
                label: '三级 1-1-2'
              }
            ]
          }
        ]
      },
      {
        id: 2,
        label: '一级 2',
        children: [
          {
            id: 5,
            label: '二级 2-1'
          },
          {
            id: 6,
            label: '二级 2-2'
          }
        ]
      },
      {
        id: 3,
        label: '一级 3',
        children: [
          {
            id: 7,
            label: '二级 3-1'
          },
          {
            id: 8,
            label: '二级 3-2'
          }
        ]
      }
    ]
    return {
      grpid: '',
      grpsuperid: '',
      data4: JSON.parse(JSON.stringify(data)),
      data5: JSON.parse(JSON.stringify(data))
    }
  },
  watch: {
    selected(id) {
      this.editMenu(id)
    }
  },
  methods: {
    append(data) {
      const newChild = { id: id++, label: 'testtest', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },

    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
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

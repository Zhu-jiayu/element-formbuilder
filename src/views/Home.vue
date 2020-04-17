<template>
  <el-row>
    <el-col :span="12" class="drag">
      <el-form ref="form" class="b-a" :label-width="labelwidth">
        <draggable :clone="cloneData" :list="form_list" :options="dragOptions1" :move="allow">
          <transition-group class="form-list-group" type="transition" :name="'flip-list'" tag="div">
            <renders
              v-for="(items, index) in form_list"
              :key="index"
              :ele="items.ele"
              :obj="items.obj"
            ></renders>
          </transition-group>
        </draggable>
      </el-form>
    </el-col>
    <el-col :span="12">
      <el-form ref="form" :model="formData" class="b-a" :label-width="labelwidth">
        <draggable :list="list2" :options="dragOptions2" group="shared">
          <transition-group class="form-list-group" type="transition" :name="'flip-list'" tag="div">
            <renders
              v-for="(items, index) in list2"
              :key="index"
              :ele="items.ele"
              :obj="items.obj"
              @handleChangeVal="val => handleChangeVal(val,items)"
            >
              <div slot="setting" class="setting">
                <span @click="del(index)">删除</span>
                <span @click="edit(index)">设置</span>
              </div>
            </renders>
          </transition-group>
        </draggable>
        <el-form-item>
          <el-button @click="handleSubmit('form')">保存</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!-- 设置 -->
    <el-dialog title="参数设置" :visible.sync="dialogFormVisible" :close-on-click-modal="false" @close="dialogclose">
      <el-form :model="editobj">
         <el-form-item label="name字段" :label-width="labelwidth" v-if="editobj.label">
          <el-input v-model="editobj.name"></el-input>
        </el-form-item>
        <el-form-item label="标题" :label-width="labelwidth" v-if="editobj.label">
          <el-input v-model="editobj.label"></el-input>
        </el-form-item>
        <el-form-item label="placeholder" :label-width="labelwidth" v-if="editobj.placeholder">
          <el-input v-model="editobj.placeholder"></el-input>
        </el-form-item>

        <el-form-item label="选项" :label-width="labelwidth" v-if="editobj.options">
          <el-select
            placeholder="请添加选项"
            v-model="newoptions"
            multiple
            filterable
            allow-create
            default-first-option
          >
            <el-option v-for="(i, k) in editobj.options" :label="i.label" :value="i.value" :key="k"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setStatus=false,dialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="setStatus=true,dialogFormVisible=false">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>
<script>
import draggable from "vuedraggable";
import form_list from "@/components/custom/FormList";
import renders from "@/components/custom/Render";

export default {
  name: "home",
  data() {
    return {
      form_list,
      list2: [], //自定义的表单结构
      formData: {}, //表单数据
      dialogFormVisible: false,
      labelwidth: "150px",

      editobj: {},
      newoptions:[],
      editkey: "",
      setStatus:false
    };
  },
  components: {
    draggable,
    renders
  },
  methods: {
    handleSubmit(name) {
      //保存
      var namearr = [];
      var repeatname = this.list2.filter(i=>{
        if(namearr.indexOf(i.obj.name)<0){
          namearr.push(i.obj.name)
          return false
        }
        return true
      })
    
      if(repeatname.length>0){
        return this.$message.error(repeatname[0].obj.name+"name字段重复");
      }
      this.$refs[name].validate(valid => {
        if (valid) {
          console.log(this.formData,this.list2); //表单中的内容
        } else {
          console.log("验证不通过");
        }
      });
    },

    cloneData(original) {
      //clone回调

      return JSON.parse(JSON.stringify(original));
    },
    // 组件回填数据
    handleChangeVal(val, element) {
      
      this.$set(this.formData, element.obj.name, val);
    },
    //删除自定义表单，重置数据
    del(key) {
      delete this.formData[this.list2[key].obj.name];
      this.list2.splice(key, 1);
    },
    edit(key) {  //开启设置
      this.dialogFormVisible = true;
      var o = JSON.parse(JSON.stringify(this.list2[key].obj));

      for (var i in o) {
       
        this.$set(this.editobj, i, o[i]);
        
      }
      this.editkey = key

    },
    
    dialogclose(){
     
      if (this.setStatus) {
        this.list2[this.editkey].obj = this.editobj;
        this.setStatus=false
      }
     
      this.editobj = {};
      this.editkey = "";
      
    },
    allow(evt) {
      // console.log(evt.draggedContext.index);
      //console.log(evt.draggedContext.element);
      // console.log(evt.draggedContext.futureIndex);
      // console.log(evt.relatedContext.index);
      //console.log('-------',evt.relatedContext.element);
      // console.log(evt.relatedContext.list);
      // console.log(evt.relatedContext.component);
      //console.log( this.list2)

      //var element = evt.draggedContext.element;

      // this.$prompt("请输入id", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   inputPattern: /^\w+$/,
      //   inputErrorMessage: "id必填项"
      // })
      //   .then(({ value }) => {
         
      //     if (!this.list2.some(i => i.id == value)) {
      //       //设置自定义后表单组件的name
      //       this.$set(this.list2[evt.draggedContext.futureIndex], "id", value)
      //       this.list2[evt.draggedContext.futureIndex].obj.name += `_${value}`;
      //       this.list2[evt.draggedContext.futureIndex].obj.label = `${value}`;
      //     } else {
      //       this.list2.splice(evt.draggedContext.futureIndex, 1);
      //       this.$message.error("id重复");
      //     }
      //   })
      //   .catch(() => {
      //     this.list2.splice(evt.draggedContext.futureIndex, 1);
      //   });
    }
  },
  computed: {
    // 拖拽表单1
    dragOptions1() {
      return {
        animation: 0,
        ghostClass: "ghost",
        // 分组
        group: {
          name: "shared",
          pull: "clone",
          put: false
        },
        // 禁止拖动排序
        sort: false
      };
    },
    // 拖拽表单2
    dragOptions2() {
      return {
        animation: 0,
        ghostClass: "ghost",
        sort: true
      };
    }
  }
};
</script>
<style  >
.form-list-group {
  min-height: 200px;
  padding: 20px !important;
}

.b-a {
  border: 1px solid #ccc;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.setting {
  display: none;
}

.drag .el-form-item * {
  cursor: move;
}
.drag .el-form-item:hover {
  border: 1px dashed #999;
  background: #c8ebfb;
}
.el-form-item:hover .setting {
  display: flex;
  cursor: pointer;
  color: red;
  margin-left: 10px;
}
</style>

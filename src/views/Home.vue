<template>
  <el-row>
    <el-col :span="12">
      <el-form ref="form" class="b-a" label-width="80px">
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
      <el-form ref="form" :model="formData" class="b-a" label-width="80px">
        <draggable :list="list2" :options="dragOptions2" group="shared">
          <transition-group class="form-list-group" type="transition" :name="'flip-list'" tag="div">
            <renders
              v-for="(items, index) in list2"
              :key="index"
              :ele="items.ele"
              :obj="items.obj"
              @handleChangeVal="val => handleChangeVal(val,items)"
            >
              <span slot="close" class="close" @click="close(index)">删除</span>
            </renders>
          </transition-group>
        </draggable>
        <el-form-item>
          <el-button @click="handleSubmit('form')">保存</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
// @ is an alias to /src
import draggable from "vuedraggable";
import form_list from "@/components/custom/FormList";
import renders from "@/components/custom/Render";
// import buttons from "@/components/custom/control/button/index.vue"
export default {
  name: "home",
  data() {
    return {
      form_list,
      list2: [],
      formData: {},

      formid:[]
    };
  },
  components: {
    draggable,
    renders
  },
  methods: {
    handleSubmit(name) {
      //保存
      this.$refs[name].validate(valid => {
        if (valid) {
          //localStorage.setItem('template_form', JSON.stringify(this.formData));
          console.log(this.formData); //表单中的内容
        } else {
          console.log("验证不通过");
        }
      });
    },

    cloneData(original) {
      //clone回调

      return JSON.parse(JSON.stringify(original));
    },
    // 控件回填数据
    handleChangeVal(val, element) {
      this.$set(this.formData, element.obj.name, val);
    },

    close(key) {
      this.list2.splice(key, 1);
      //delete this.formData[key].obj.name
    },
    allow(evt) {
      // console.log(evt.draggedContext.index);
      // console.log(evt.draggedContext.element);
      // console.log(evt.draggedContext.futureIndex);
      // console.log(evt.relatedContext.index);
      // console.log(evt.relatedContext.element);
      // console.log(evt.relatedContext.list);
      // console.log(evt.relatedContext.component);
    
       this.$prompt('请输入id', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^\w+$/,
          inputErrorMessage: 'id必填项'
        }).then(({ value }) => {
          
          if(this.formid.indexOf(value)<0){
            this.formid.push(value)
          }else{
            this.list2.splice(evt.draggedContext.futureIndex,1)
            this.$message.error('id重复');
          }
          
          console.log( this.formid)
        }).catch(() => {
         
           this.list2.splice(evt.draggedContext.futureIndex,1)
        
        });
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
<style>
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
  cursor: move;
}
.close {
  cursor: pointer;
  color: red;
  margin-left: 10px;
  display: block;
}
</style>

<template>
  <div id="app3">
    <div id="form-create"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      $f: {},
      model: {}
    };
  },
  mounted: function() {
    //表单插入的节点
    const root = document.getElementById("form-create");

    //$f为表单api
    this.$f = this.$formCreate(
      //表单生成规则
      [
        this.$formCreate.maker.input("商品名称", "goods_name", ""),
        this.$formCreate.maker.date("创建时间", "created_at"),
        this.$formCreate.maker.number('排序','sort',0)
      ],
      //组件参数配置
      {
        el: root,
        //显示表单重置按钮
        resetBtn: true,
        //表单提交事件
        onSubmit: function(formData) {
          //formData为表单数据
            console.log('====================================');
            console.log(this.$f);
            console.log('====================================');
          //按钮进入提交状态
          this.$f.btn.loading();
          //重置按钮禁用
          this.$f.resetBtn.disabled();

          //重置按钮恢复正常
          //this.$f.resetBtn.disabled();
          //按钮进入可点击状态
          //this.$f.btn.loading(false);
        }

      }
    );

    //获取双向数据绑定的数据规则
    this.model = this.$f.model();
  }
};
</script>
<style lang="css">
</style>
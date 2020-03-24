export default (_self, h) => {
  return [
    h("el-input", {
      props: {
        value: _self.obj.value || "",
       
      },
      attrs: {
        maxlength: parseInt(_self.obj.maxlength) || 20,
        placeholder: _self.obj.placeholder || "这是一个输入框"
      },
      on: {
        change: function(val) {
          //   if (!_self.obj.name) {
          //     return false;
          //   }

          _self.obj.value = event.currentTarget.value;
          _self.$emit("handleChangeVal", event.currentTarget.value);
        }
      }
    })
  ];
};

export let inputConf = {
  
  label: "输入框",
  name: "Input",
  placeholder: "请输入",
 
  maxlength: 2,
  value: "",

  rules:[
    {
      required: true,
      message:"必填",
      trigger:"blur"
    },
    {
      type: "string",
      message:"需要为字符串",
      trigger:"blur"
    }
  ]
};

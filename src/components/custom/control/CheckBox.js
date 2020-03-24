export default (_self, h) => {
  return [
    h("el-checkbox-group", {
        props: {
          value: _self.obj.value || []
        },
        on: {
          'input'(arr) {
            _self.obj.value = arr;
            _self.$emit('handleChangeVal', arr)
          }
        }
      },
     
      _self.obj.items.map(v => {
        
        return h("el-checkbox", {
          props: {
            label: v.label_value
          }
        }, v.label_name)
      }))
  ];
};

export let checkBoxConf = {

  
  label: '多选框',


  value: ["1", "2"],
  
  items: [{ "label_value": "1", "label_name": "单选框1" }, { "label_value": "2", "label_name": "单选框2" }],

  name: 'checkbox',//必填
  rules:[{ type: 'array', required: true, message: '请至少选择一个', trigger: 'change' }]
}

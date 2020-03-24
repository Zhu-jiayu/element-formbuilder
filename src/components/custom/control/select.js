export default (_self, h) => {
  return [
    h(
      "el-select",
      {
        on: {
          change(arr) {
            _self.obj.value = arr;
            _self.$emit('handleChangeVal', arr)
          }
        },
        props:{
            value:_self.obj.value
        },
        attrs:{
            name: "aaaaaaaaaa"
        }
      },
      _self.obj.options.map(v => {
        return h(
          "el-option",
          {
            props: {
              label: v.label,
              value: v.value
            }
          }
        );
      })
    )
  ];
};

export let selectConf = {

  type: String,
 

  label: "选择框",
  value:"",
  


  options: [
    {
      value: "1",
      label: "黄金糕"
    },
    {
      value: "2",
      label: "双皮奶"
    },
    {
      value: "3",
      label: "蚵仔煎"
    }
  ],
   rules:[
    {  required: true, message: '请至少选择一个活动性质', trigger: 'change' }
   ],
  name: "A"
};

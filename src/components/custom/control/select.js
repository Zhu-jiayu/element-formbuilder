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
  // 对应数据库内类型
  type: "select",
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: "选择框",
  value:"3",
  // 选项内数据
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
  // 表单name
  name: "A"
};

import input from './control/Input';
import radio from './control/Radio';
import checkBox from './control/CheckBox';
import select from './control/select';

const form_item = {
  input,
  radio,
  checkBox,
  select
};

export default {
  name: 'renders',
  render(h) {
    
    return h('el-form-item', {
      props: {
        label: this.obj.label + "："
      }
    }, (()=>{
      var children = form_item[this.ele](this, h)
      if(this.$slots.close){
       
        children.push(this.$slots.close)
      }
    
      return children
    })() );
  },
  props: {
    ele: {
      type: String,
      default: "input"
    },
    obj: {
      type: Object,
      default: {}
    }
  }
}

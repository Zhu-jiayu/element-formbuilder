import { inputConf } from "./control/Input";
import { radioConf } from "./control/Radio";
import { checkBoxConf } from "./control/CheckBox";
import { selectConf } from "./control/select";


const formList = {
  input: inputConf,
  radio: radioConf,
  checkBox: checkBoxConf,
  select: selectConf
};
let list_arr = [];
for (let i in formList) {
  list_arr.push({
    ele: i,
    obj: formList[i]
  });
}
export default list_arr;

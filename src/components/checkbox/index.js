import { h, Component } from "preact";

import style from "./style";

class Checkbox extends Component {
  render(props) {
    return (
      <div class={style.container}>
        <input
          type="checkbox"
          id={props.value}
          value={props.value}
          name={props.name}
          checked={props.checked}
          onChange={props.onCheckChage}
        />
        <label for={props.value}>{props.value}</label>
      </div>
    );
  }
}

export default Checkbox;

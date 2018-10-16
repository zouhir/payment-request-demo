import { h, Component } from "preact";

import style from "./style";

class AddToCart extends Component {
  render(props) {
    return (
      <div class={style.container}>
        {props.visible && <button onClick={props.addToCart}></button>}
      </div>
    );
  }
}

export default AddToCart;

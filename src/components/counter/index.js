import { h, Component } from "preact";

import style from './style';

class AddToCart extends Component {
  render(props) {
    return (
        <div class={style.container}>
          <button onClick={props.decrement}>
            -
          </button>
          <span class={style.counter}>
          {props.count}
          </span>
          <button onClick={props.increment}>
            +
          </button>
        </div>
    )
  }
}

export default AddToCart;

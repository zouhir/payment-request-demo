import { h, Component } from "preact";
import style from "./style";

import iconBag from "../../assets/icon-bag.svg";

class CheckoutBar extends Component {
  render(props) {
    return (
      <div class={style.container}>
        {props.total > 0 && (
          <div class={style.total}>
            Total amount: <span>${props.total}</span>
          </div>
        )}
        <div class={style.checkout} style={{ opacity: props.total > 0 ? 1 : 0.6 }}>
          <button onClick={props.onCheckout}>
            <img src={iconBag} />
            check out
          </button>
        </div>
      </div>
    );
  }
}

export default CheckoutBar;

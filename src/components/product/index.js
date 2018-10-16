import { h, Component } from "preact";

import Counter from "../counter";

import style from "./style";

class Product extends Component {
  onClose = e => {
    e.stopPropagation();
    this.props.onCloseProduct();
  };
  onDelete  = e => {
    e.stopPropagation();
    this.props.removeFromCart(this.props.id)
  }
  render({
    id,
    title,
    subtitle,
    price,
    image,
    selected,
    onTempSelectProduct,
    increment,
    decrement,
    count,
    purchased
  }) {
    let transY = 0;
    if (selected === true) {
      transY = `-80px`;
    }
    return (
      <div class={style.container}>
        <h5>{title}</h5>
        <p>{subtitle}</p>
        <h4>{price}</h4>
        <Counter
          increment={() => increment(id)}
          decrement={() => decrement(id)}
          count={count}
        />
        <div
          class={style.figure}
          style={{
            backgroundImage: `url(${image})`,
            transform: `translateY( ${transY} )`
          }}
          onClick={() => onTempSelectProduct(id)}
        >
          <div class={style.topBar}>
            {purchased && <button onClick={this.onDelete} class={style.delete}>-</button>}
            {selected && (
              <button class={style.close} onClick={this.onClose}>
                +
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Product;

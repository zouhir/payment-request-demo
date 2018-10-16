import { h, Component } from "preact";
import style from "./style";

import Product from "../product";

import AddToCart from "../add-to-cart";

class ProductsGrid extends Component {
  state = {
    tempSelected: {}
  };
  onTempSelectProduct = id => {
    let count = 1;
    let tempSelected = {};
    if (typeof this.props.addedToCart[id] !== "undefined") {
      tempSelected[id] = this.props.addedToCart[id];
    } else {
      tempSelected[id] = this.state.tempSelected[id] || count;
    }
    this.setState({ tempSelected });
  };
  onCloseProduct = () => {
    this.setState({ tempSelected: {} });
  };
  increment = id => {
    let tempSelected = Object.assign({}, this.state.tempSelected);
    tempSelected[id] += 1;
    this.setState({ tempSelected });
  };
  decrement = id => {
    let tempSelected = Object.assign({}, this.state.tempSelected);
    tempSelected[id] -= 1;
    this.setState({ tempSelected });
  };
  addToCart = () => {
    let id = Object.keys(this.state.tempSelected)[0]
    let count = this.state.tempSelected[id]
    this.props.addToCart(id, count)
    this.setState({tempSelected: {}})
  }
  removeFromCart = (id) => {
    this.props.removeFromCart(id)
    this.setState({tempSelected: {}})
  }
  render(props, state) {
    return (
      <div class={style.container}>
        <div class={style.carouselWrapper}>
          <div class={style.carousel}>
            {props.productsData.map(({ id, title, subtitle, price, image }) => (
              <Product
                id={id}
                title={title}
                subtitle={subtitle}
                price={price}
                image={image}
                onTempSelectProduct={this.onTempSelectProduct}
                selected={state.tempSelected[id] ? true : false}
                increment={this.increment}
                decrement={this.decrement}
                count={state.tempSelected[id] ? state.tempSelected[id] : 0}
                onCloseProduct={this.onCloseProduct}
                purchased={!!props.addedToCart[id]}
                removeFromCart={this.removeFromCart}
              />
            ))}
          </div>
        </div>
        <AddToCart visible={ Object.keys(state.tempSelected).length > 0 } addToCart={this.addToCart}/>
      </div>
    );
  }
}

export default ProductsGrid;

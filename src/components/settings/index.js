import { h, Component } from "preact";

import style from "./style";

import Checkbox from "../checkbox";

import {
  cardNetworks,
  cardTypes,
  otherOptions,
  shippingType
} from "../../data/payment-request-spec";

class AddToCart extends Component {
  isChecked = (category, value) => {
    if (this.props[category].indexOf(value) > -1) {
      return true;
    }
    return false;
  };
  onCheckChage = e => {
    let category = e.target.name;
    let value = e.target.value;
    if( category === "shippingType" ) {
      return this.props.setSettings(category, value);
    }
    let updatedCheckBoxCategory = this.props[category].slice();

    if (e.target.checked === true) {
      updatedCheckBoxCategory.push(value);
    } else {
      let indexOfItem = updatedCheckBoxCategory.indexOf(value);
      if (indexOfItem > -1) {
        updatedCheckBoxCategory.splice(indexOfItem, 1);
      }
    }
    this.props.setSettings(category, updatedCheckBoxCategory);
    console.log(this.props.shippingType)
  };
  render(props) {
    return (
      <div class={style.container}>
        <div class={style.topBar}>
          <button onClick={() => props.toggleSettings(false)}>DONE</button>
        </div>
        <h3>Card Networks</h3>
        <section>
          {cardNetworks.map(network => (
            <Checkbox
              name="cardNetworks"
              value={network}
              checked={this.isChecked("cardNetworks", network)}
              onCheckChage={this.onCheckChage}
            />
          ))}
          <a
            href="https://www.w3.org/Payments/card-network-ids"
            target="_blank"
          >
            learn more
          </a>
        </section>
        <h3>Card Types</h3>
        <section>
          {cardTypes.map(type => (
            <Checkbox
              checked={false}
              name="cardTypes"
              checked={this.isChecked("cardTypes", type)}
              value={type}
              onCheckChage={this.onCheckChage}
            />
          ))}
          <a
            href="https://www.w3.org/TR/payment-method-basic-card/#basiccardtype-enum"
            target="_blank"
          >
            learn more
          </a>
        </section>
        <h3>Payment Request Options</h3>
        <section>
          {otherOptions.map(opt => (
            <Checkbox
              checked={false}
              name="otherOptions"
              checked={this.isChecked("otherOptions", opt)}
              value={opt}
              onCheckChage={this.onCheckChage}
            />
          ))}
          <a
            href="https://www.w3.org/TR/payment-request/#paymentoptions-dictionary"
            target="_blank"
          >
            learn more
          </a>
        </section>
        {props.otherOptions.indexOf("requestShipping") > -1 && (
          <div class={style.row}>
            <h3>Shipping</h3>
            <section>
              {shippingType.map(shipping => (
                <Checkbox
                  name="shippingType"
                  value={shipping}
                  checked={props.shippingType === shipping}
                  onCheckChage={this.onCheckChage}
                />
              ))}
              <a
            href="https://www.w3.org/TR/payment-request/#dom-paymentshippingtype"
            target="_blank"
          >
            learn more
          </a>
            </section>
          </div>
        )}

        <h3>Mock browser support</h3>
        <section>
          <Checkbox
            name="shippingType"
            value="togglePaymentRequestSuppport"
            checked={props.isPaymentRequestSupported === false}
            onCheckChage={props.togglePaymentRequestSuppport}
          />
        </section>
      </div>
    );
  }
}

export default AddToCart;

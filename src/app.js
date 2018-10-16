import { h, Component } from "preact";

import StatusBar from "./components/status-bar";
import ProductGrid from "./components/products-grid";
import CheckoutBar from "./components/checkout-bar";
import Settings from "./components/settings";

import productsData from "./data/products";

import { init, isSupported } from './lib/payment-request';

let preprocessPrices = {};
let preprocessTitle = {};
productsData.forEach(item => {
  preprocessPrices[item.id] = item.price;
  preprocessTitle[item.id] = item.title;
});

class App extends Component {
  state = {
    // demo stuff
    status: "",
    addedToCart: {},
    showSettigs: false,
    cartTotal: 0,
    // settings & options to pass to Payment Request
    isPaymentRequestSupported: false, // demonstrate what things look like if we have no support for this API,
    cardNetworks: ["amex", "mastercard", "visa"], // as a default state, let's allow amex, mastercard and visa
    cardTypes: [],
    otherOptions: [],
    shippingType: ''
  };
  componentDidMount() {
    /**
     * Check if PaymentReques is supported
     */
    if (window.PaymentRequest) {
      this.setState({
        isPaymentRequestSupported: true,
        status: "Payment Request is supported, you can modify API settings"
      });
    } else {
      this.setState({
        isPaymentRequestSupported: false,
        status: "Payment Request is not supported."
      });
    }
  }
  addToCart = (id, count) => {
    let addedToCart = this.state.addedToCart;
    addedToCart[id] = count;
    this.setState(
      {
        addedToCart,
        status: `✅ Added ${count} of ${preprocessTitle[id]} to cart.`
      },
      this.setState({ cartTotal: this.calculateTotalPrice() })
    );
  };
  removeFromCart = id => {
    let addedToCart = Object.assign({}, this.state.addedToCart);
    let count = addedToCart[id];
    delete addedToCart[id];
    this.setState(
      {
        addedToCart,
        status: `🗑 Removed ${count} of ${preprocessTitle[id]} to cart.`
      },
      this.setState({ cartTotal: this.calculateTotalPrice() }, () => this.setState({ cartTotal: this.calculateTotalPrice() }))
    );
  };
  togglePaymentRequestSuppport = e => {
    this.setState({
      isPaymentRequestSupported: !this.state.isPaymentRequestSupported,
      status:
        !this.state.isPaymentRequestSupported === false
          ? "MOCK: Payment Request is not supported"
          : ""
    });
  };

  calculateTotalPrice = () => {
    let addedToCart = this.state.addedToCart;
    if (Object.keys(addedToCart).length < 1) return 0;
    let total = Object.keys(addedToCart).reduce((sum, key) => {
      return sum + addedToCart[key] * preprocessPrices[key];
    }, 0);
    return total;
  };

  getCartItemsDetails = () => {
    let addedToCart = this.state.addedToCart;
    let cartItemDetails = [];
    Object.keys(addedToCart).forEach(key => {
      cartItemDetails.push({
        label: `${preprocessTitle[key]}, x ${addedToCart[key]}`,
        amount: {
          currency: "USD",
          value: addedToCart[key] * preprocessPrices[key]
        }
      });
    });

    return cartItemDetails;
  };

  toggleSettings = (newState = !this.state.showSettigs) => {
    this.setState({ showSettigs: newState });
  };

  setSettings = (category, data) => {
    this.setState({ [category]: data });
  };

  onCheckout = () => {
    let addedToCart = this.state.addedToCart;
    if (Object.keys(addedToCart).length < 1) {
      return this.setState({ status: "⚠️ Your cart is empty." });
    }
    if (!isSupported() || !this.state.isPaymentRequestSupported) {
      return this.setState({
        status: `❗️ Payment Request is not supported, redirect to /checkout`
      });
    }

    let cardNetworks = this.state.cardNetworks;
    let cardTypes = this.state.cardTypes;
    let otherOptions = this.state.otherOptions;
    let shippingType = this.state.shippingType;
    let totalPrice = this.state.cartTotal;
    let cartTotal = {
      label: "Total for Today",
      amount: { currency: "USD", value: totalPrice }
    };
    let cartItems = this.getCartItemsDetails();
    let paymentRequest = init(
      {
        cartTotal,
        cartItems
      },
      {
        cardNetworks,
        cardTypes,
        otherOptions,
        shippingType
      }
    );

    paymentRequest.show().catch(err => {
      this.setState({ status: `🚫 ${err}` });
    });
  };

  render(props, state) {
    /* settings bar */
    /* store items grid */
    /* add to cart  */
    /* checkout bar */
    return (
      <div id="app">
        <StatusBar
          status={state.status}
          onBrowserModeChange={this.onBrowserModeChange}
          toggleSettings={this.toggleSettings}
        />
        <ProductGrid
          productsData={productsData}
          onTempSelectProduct={this.onTempSelectProduct}
          addedToCart={state.addedToCart}
          addToCart={this.addToCart}
          removeFromCart={this.removeFromCart}
        />
        <CheckoutBar total={state.cartTotal} onCheckout={this.onCheckout} />
        {state.showSettigs && (
          <Settings
            cardNetworks={state.cardNetworks}
            cardTypes={state.cardTypes}
            otherOptions={state.otherOptions}
            shippingType={state.shippingType}
            setSettings={this.setSettings}
            toggleSettings={this.toggleSettings}
            isPaymentRequestSupported={state.isPaymentRequestSupported}
            togglePaymentRequestSuppport={this.togglePaymentRequestSuppport}
          />
        )}
      </div>
    );
  }
}



export default App;

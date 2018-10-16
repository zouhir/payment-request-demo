function isSupported() {
  if (window.PaymentRequest) return true;
  return false;
}

function init(
  { cartTotal, cartItems } /* shopping cart related */,
  {
    cardNetworks,
    cardTypes,
    shippingType,
    otherOptions
  } /* Payment Request configs related */
) {
  let acceptedPaymentMethods = [
    {
      supportedMethods: "basic-card",
      data: { supportedNetworks: cardNetworks, supportedTypes: cardTypes }
    }
  ];

  let cartDetails = {
    //total: { label: "Donation", amount: { currency: "USD", value: "55.00" } },
    total: cartTotal,
    displayItems: cartItems,
    shippingOptions: [
      {
        id: "freephillyshipping",
        label: "Free Philadelphia",
        amount: { currency: "USD", value: "0.00" },
        selected: true
      }
    ]
  };

  let options = {
    requestPayerName: otherOptions.indexOf("requestPayerName") > -1,
    requestPayerPhone: otherOptions.indexOf("requestPayerPhone") > -1,
    requestPayerEmail: otherOptions.indexOf("requestPayerEmail") > -1,
    requestShipping: otherOptions.indexOf("requestShipping") > -1,
    shippingType: shippingType.length > 0 ? shippingType : 'shipping'
  };

  return new PaymentRequest(acceptedPaymentMethods, cartDetails, options);
}

function mockServerResponse(dialogResult) {
  return new Promsie((resolve, reject) => {
    setTimeout(() => {
      dialogResult
        .complete("success")
        .then(_ => {
          resolve("success");
        })
        .catch(err => reject(err));
    }, 1000);
  });
}

export {
  isSupported, init
}

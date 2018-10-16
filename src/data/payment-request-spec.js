/**
 * This file contains all possible options the W3C spec allows
 */

// https://www.w3.org/Payments/card-network-ids
const cardNetworks = [
  "amex",
  "cartebancaire",
  "diners",
  "discover",
  "jcb",
  "mastercard",
  "mir",
  "unionpay",
  "visa"
];

//https://www.w3.org/TR/payment-method-basic-card/#basiccardtype-enum
const cardTypes = ["debit", "credit", "prepaid"];

// https://www.w3.org/TR/payment-request/#dom-paymentshippingtype
const shippingType = ["delivery", "shipping", "pickup"]

//https://www.w3.org/TR/payment-request/#paymentoptions-dictionary
const otherOptions =  [
  "requestPayerName",
  "requestPayerEmail",
  "requestPayerPhone",
  "requestShipping"
];
export {
  cardNetworks, cardTypes, shippingType, otherOptions
}
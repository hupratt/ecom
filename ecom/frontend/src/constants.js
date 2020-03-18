export const localhost = "https://shop.lapetiteportugaise.eu";
// export const localhost = "http://127.0.0.1:8000";

const apiURL = "/api";

export const endpoint = `${localhost}${apiURL}`;
export const productListURL = `${endpoint}/products/`;
export const bookListURL = (items, language, authors = "") =>
  `${endpoint}/books/?limit=12&offset=${items}&language=${language}&authors=${authors}`;
export const productDetailURL = id => `${endpoint}/products/${id}/`;
export const bookDetailURL = id => `${endpoint}/books/${id}/`;
export const addToCartURL = `${endpoint}/add-to-cart/`;
export const orderSummaryURL = `${endpoint}/order-summary/`;
export const checkoutURL = `${endpoint}/checkout/`;
export const addCouponURL = `${endpoint}/add-coupon/`;
export const countryListURL = `${endpoint}/countries/`;
export const userIDURL = `${endpoint}/user-id/`;
export const addressListURL = addressType =>
  `${endpoint}/addresses/?address_type=${addressType}`;
export const addressCreateURL = `${endpoint}/addresses/create/`;
export const addressUpdateURL = id => `${endpoint}/addresses/${id}/update/`;
export const addressDeleteURL = id => `${endpoint}/addresses/${id}/delete/`;
export const orderItemDeleteURL = id => `${endpoint}/order-items/${id}/delete/`;
export const orderItemUpdateQuantityURL = `${endpoint}/order-item/update-quantity/`;
export const paymentListURL = `${endpoint}/payments/`;
export const s3_base_url = `https://bookshop-images-f1492f08-f236-4a55-afb7-70ded209cb24.s3.eu-west-2.amazonaws.com/`;

'use strict'
const CART_KEY = 'cart'
const Config = use('Config')
// setup stripe library
const Stripe = use('stripe')(Config.get('stripe.secret_key'))

class CheckoutController {
  async checkout({response, session, view}){
  //create line items (ie what the ser is paying for)
  let cart = session.get(CART_KEY,{})

let cartArray = object.values(cart)
let lineItems = cartArray.map(cartItem => {
  return {
    'name':cartItem.title,
    'images':[cartItem.image_url],
    'amount':cartItem.price,
    'quantity':cartItem.qty,
    'currency':'SGD',
  }
})
//create meta-data
let metaData = JSON.stringify(cartArray)

//2create a stripe payment session
const payment = {
  payment_method_types:['card'],
  line_items:lineItems,
  success_url: Config.get('stripe.success_url'),
  cancel_url: Config.get('stripe.error_url'),
  metadata: {
    'orders': metaData
  }
}

//3send that payment session to stripe(to get the session id)
let stripeSession = await Stripe.checkout.sessions.create(payment);


  //4send the session id to our view(the view will do the redirect)
return view.render('checkout/checkout',{
  sessionId:stripeSession.id,
  publishableKey: Config.get('stripe.publishable_key')
})
}

  processPayment({request, response}) {
    let payload = request.raw();
    let sigHeader = request.header('stripe-signature');
    let event = null;
    let endpointSecret = Config.get('stripe.endpoint_secret')

    // verify with Stripe that it is they who actually send
    // the data
    try {
      event = Stripe.webhooks.constructEvent(payload, sigHeader, endpointSecret)
    } catch (e) {
      console.log(e);
      // send the error to stripe
      response.json({
        'error':e.message
      })
    }

    if (event.type=='checkout.session.completed') {
      let stripeSession = event.data.object;
      console.log(stripeSession);
      console.log(stripeSession.metadata);
    }

    response.json({
      received:true
    })
  }
}


module.exports = CheckoutController


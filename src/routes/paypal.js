const express = require('express');
const router = express.Router();
const paypal = require('paypal-rest-sdk');




paypal.configure({
    'mode': 'sandbox', // sandbox o live
    'client_id': 'AfXN2UyypS281bV4htq7pmcloicf7G9k7eLA9OelcWblyoJpIAc9nDYtAiKifbHWXISJLBmDoGdiOBiZ',
    'client_secret': 'ECtOjPirjh0rZgTa-c6XGFy8M66mDPx2ZSQcSGxGsv6U1FUEWDhlhPxmgViBtPWIBtRZflKgt5N8UWTn'
    });

router.post('/pay', (req, res) => {
const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
                "return_url": "http://localhost:3000/paypal/success",
                "cancel_url": "http://localhost:3000/paypal/cancel"
        },
        "transactions": [{
            "item_list": {
            "items": req.session.cart.map((item) => ({
                name: item.nombreProducto,
                sku: item.idProducto,
                price: item.precio.toString(),
                currency: "USD",
                quantity: 1
        }))
        },
        "amount": {
             "currency": "USD",
             "total": req.session.cart.reduce((a, b) => a + b.precio, 0).toString()
        },
        "description": "This is the payment description."
        }]
        };

paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for(let i = 0; i < payment.links.length; i++){
                if(payment.links[i].rel === 'approval_url'){
                    res.redirect(payment.links[i].href);
                    }
                  }
                }
             });
          });

//aqui
router.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
  
    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
          "amount": {
              "currency": "USD",
              "total":  req.session.cart.reduce((a, b) => a + b.precio, 0).toString()
              
          }
      }]
    };
  
  // Obtains the transaction details from paypal
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
       
        if (error) {
          console.log(error.response);
          throw error;
      } else {
          console.log(JSON.stringify(payment));
          res.render('pages/success');
      }
  });
  });

router.get('/cancel', (req, res) => res.render('pages/cancel'));

module.exports = router;
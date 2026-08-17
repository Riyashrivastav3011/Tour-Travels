import Razorpay from 'razorpay';
import crypto from 'crypto';

const razorpayInstance = new Razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET
})

export const createOrder = async (req , res) => {
    try{
      const { amount } = req.body;
      if(!amount){
        return res.status(404).json({msg:"no amaount recieve"});
      }
      const options = {
        amount : amount * 100,
        currency : "INR",
        receipt : `receipt_pay.${Date.now()}`
      }

      const order = await razorpayInstance.orders.create(options);

      res.json({
        orderId:order.id,
        amount:order.amount,
        currency:order.currency,
        key: process.env.RAZORPAY_KEY_ID
      })
    }catch(err){
        console.log("error" , err);
        res.status(400).json({msg:'could not create order'});
    }
}

export function verifyPayment(orderId , paymentId , signature){
    const generateSignature = crypto
    .createHmac("sha256" , process.env.RAZORPAY_KEY_SECRET)
    .update(orderId + "|" + paymentId)
    .digest("hex");

    if(signature === generateSignature)return true;
    else return false;
}
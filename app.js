require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
// const routes = require("./routes");
const authController = require("./controllers/authController");
const errorHandler = require("./middlewares/errorHandler");
const stripe = require("stripe")(process.env.SECRET_KEY);
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.use(routes);

app.post(
  "/stripe/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        sig,
        process.env.END_POINT_SECRET
      );
      // console.log("type", event);
    } catch (err) {
      // console.log("type2", err);
      response.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log("PaymentIntent was successful!");
        break;
      case "payment_method.attached":
        const paymentMethod = event.data.object;
        console.log("PaymentMethod was attached to a Customer!");
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    response.json({ received: true });
  }
);

app.use(express.json());

app.post("/register", authController.register);
app.post("/login", authController.login);

app.post("/stripe", async (request, response) => {
  const { amount } = request.body;
  // Should calculate server side

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });

    response.status(200).send({ secret: paymentIntent.client_secret });
  } catch (error) {
    console.log("error", error);
    response.status(500).send("error" + error);
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

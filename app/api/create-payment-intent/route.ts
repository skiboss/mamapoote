// import { type NextRequest, NextResponse } from "next/server"
// import Stripe from "stripe"

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
//   apiVersion: "2024-06-20",
// })

// export async function POST(request: NextRequest) {
//   try {
//     const { amount, currency, customerInfo, items } = await request.json()

//     // Create a PaymentIntent with the order amount and currency
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency,
//       metadata: {
//         customerEmail: customerInfo.email,
//         customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
//         customerPhone: customerInfo.phone,
//         deliveryAddress: `${customerInfo.address}, ${customerInfo.city}, ${customerInfo.zipCode}`,
//         deliveryInstructions: customerInfo.deliveryInstructions || "",
//         orderItems: JSON.stringify(items),
//       },
//     })

//     return NextResponse.json({
//       clientSecret: paymentIntent.client_secret,
//     })
//   } catch (error) {
//     console.error("Error creating payment intent:", error)
//     return NextResponse.json({ error: "Failed to create payment intent" }, { status: 500 })
//   }
// }

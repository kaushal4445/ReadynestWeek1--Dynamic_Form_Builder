import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

function Pricing() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);



const handleDemoPayment = async () => {
  try {
    const { data: order } = await axios.post(
      "http://localhost:5000/api/payment/create-order"
    );

    const options = {
      key: "rzp_test_T36cXCBOxbg40n",

      amount: order.amount,
      currency: order.currency,

      name: "Dynamic Form Builder",
      description: "Pro Plan Upgrade",

      order_id: order.id,

      prefill: {
        name: "Demo User",
        email: "demo@gmail.com",
        contact: "9999999999",
      },

      theme: {
        color: "#06b6d4",
      },

      handler: function (response) {
        console.log("SUCCESS:", response);

        localStorage.setItem("isPremium", "true");

        localStorage.setItem(
          "premiumPlan",
          JSON.stringify({
            plan: "Pro",
            amount: 999,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
          })
        );

        alert("🎉 Payment Successful!");
        window.location.href = "/";
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error(err);
    alert("Failed to create order");
  }
};

  return (
    <Layout>
      
      <div className="min-h-screen text-white px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-extrabold mb-4">
            Pricing Plans
          </h1>

          <p className="text-slate-400 text-xl">
            Choose the plan that's right for you
          </p>

          <p className="mt-4 text-cyan-400 font-semibold">
            ⭐ Trusted by 1,000+ users
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* FREE */}
          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8">
            <h2 className="text-3xl font-bold mb-4">Free</h2>

            <p className="text-5xl font-extrabold mb-6">₹0</p>

            <ul className="space-y-4 text-slate-300 mb-8">
              <li>✅ Create 3 Forms</li>
              <li>✅ Basic Analytics</li>
              <li>✅ Form Responses</li>
              <li>❌ CSV Export</li>
              <li>❌ Premium Themes</li>
            </ul>

            <button className="w-full bg-slate-700 py-3 rounded-xl font-bold">
              Current Plan
            </button>
          </div>

          {/* PRO */}
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl p-8 scale-105 shadow-2xl">
            <div className="bg-white text-black inline-block px-4 py-1 rounded-full font-bold mb-4">
              🔥 MOST POPULAR
            </div>

            <h2 className="text-3xl font-bold mb-4">Pro</h2>

            <div className="mb-6">
              <span className="text-lg line-through opacity-70 mr-2">
                ₹1999
              </span>

              <span className="text-5xl font-extrabold">
                ₹999
              </span>
            </div>

            <ul className="space-y-4 mb-8">
              <li>✅ Unlimited Forms</li>
              <li>✅ Advanced Analytics</li>
              <li>✅ CSV Export</li>
              <li>✅ Premium Themes</li>
              <li>✅ Notifications</li>
            </ul>

            <button
              onClick={handleDemoPayment}
              disabled={loading}
              className={`w-full py-3 rounded-xl font-bold transition ${
                loading
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-white text-black hover:scale-105"
              }`}
            >
              {loading
                ? "⏳ Processing Payment..."
                : "🚀 Upgrade Now"}
            </button>
          </div>

          {/* ENTERPRISE */}
          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8">
            <h2 className="text-3xl font-bold mb-4">
              Enterprise
            </h2>

            <p className="text-5xl font-extrabold mb-6">
              Custom
            </p>

            <ul className="space-y-4 text-slate-300 mb-8">
              <li>✅ Everything in Pro</li>
              <li>✅ Team Access</li>
              <li>✅ API Access</li>
              <li>✅ Dedicated Support</li>
              <li>✅ Custom Branding</li>
            </ul>

            <Link
              to="/"
              className="block text-center w-full bg-purple-600 py-3 rounded-xl font-bold hover:bg-purple-700 transition"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Pricing;
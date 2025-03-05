import React, { useState } from 'react';
import { CreditCard, Building2, User } from 'lucide-react';

interface StripePaymentProps {
  onComplete: () => void;
}

export function StripePayment({ onComplete }: StripePaymentProps) {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: '',
    company: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would process the payment through Stripe
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-blue-600" />
            <div className="relative p-8 text-center text-white">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm mb-4">
                <CreditCard className="h-8 w-8" />
              </div>
              <h1 className="text-2xl font-bold">Complete Your Subscription</h1>
              <p className="text-emerald-100 mt-2">Enter your payment details to continue</p>
            </div>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Company Name</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="block w-full rounded-lg border border-gray-200 pl-10 py-2.5 focus:border-emerald-500 focus:ring-emerald-500 shadow-sm"
                    placeholder="Your Company"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="block w-full rounded-lg border border-gray-200 pl-10 py-2.5 focus:border-emerald-500 focus:ring-emerald-500 shadow-sm"
                    placeholder="Name on card"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Card Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="block w-full rounded-lg border border-gray-200 pl-10 py-2.5 focus:border-emerald-500 focus:ring-emerald-500 shadow-sm"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                  <input
                    type="text"
                    value={formData.expiry}
                    onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                    className="block w-full rounded-lg border border-gray-200 px-3 py-2.5 focus:border-emerald-500 focus:ring-emerald-500 shadow-sm"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">CVC</label>
                  <input
                    type="text"
                    value={formData.cvc}
                    onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
                    className="block w-full rounded-lg border border-gray-200 px-3 py-2.5 focus:border-emerald-500 focus:ring-emerald-500 shadow-sm"
                    placeholder="123"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 text-white rounded-lg hover:from-emerald-600 hover:via-teal-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 shadow-lg transform transition-all duration-200 hover:scale-[1.02]"
              >
                Complete Payment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
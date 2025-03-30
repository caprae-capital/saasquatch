import React, { useState } from 'react';
import { CreditCard, Lock, User, Calendar, X, CheckCircle2, CreditCard as CreditCardIcon } from 'lucide-react';

interface ProfileProps {
  onClose: () => void;
}

const plans = [
  {
    name: 'Starter',
    price: 600,
    hours: 50,
  },
  {
    name: 'Professional',
    price: 1200,
    hours: 100,
  },
  {
    name: 'Enterprise',
    price: 2000,
    hours: 200,
  }
];

export function Profile({ onClose }: ProfileProps) {
  const [activeTab, setActiveTab] = useState<'password' | 'payment'>('password');
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    cardNumber: '•••• •••• •••• 4242',
    expiry: '12/24',
    cvc: '•••',
    name: 'John Doe',
  });
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Professional');
  const currentPlan = 'Professional';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the plan change if selectedPlan !== currentPlan
    onClose();
  };

  const handleCancelSubscription = () => {
    setShowCancelConfirm(false);
    alert('Subscription cancelled successfully');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Profile Settings</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-4 flex gap-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('password')}
              className={`pb-4 text-sm font-medium ${
                activeTab === 'password'
                  ? 'text-emerald-600 border-b-2 border-emerald-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Password
            </button>
            <button
              onClick={() => setActiveTab('payment')}
              className={`pb-4 text-sm font-medium ${
                activeTab === 'payment'
                  ? 'text-emerald-600 border-b-2 border-emerald-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Payment Details
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'password' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                    className="block w-full rounded-lg border border-gray-200 pl-10 py-2.5 focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    className="block w-full rounded-lg border border-gray-200 pl-10 py-2.5 focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="block w-full rounded-lg border border-gray-200 pl-10 py-2.5 focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Update Password
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Current Plan: {currentPlan}</p>
                    <p className="text-sm text-emerald-600">${plans.find(p => p.name === currentPlan)?.price}/month</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCancelConfirm(true)}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Cancel Plan
                </button>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700">Available Plans</h3>
                <div className="grid grid-cols-3 gap-3">
                  {plans.map((plan) => (
                    <button
                      key={plan.name}
                      onClick={() => setSelectedPlan(plan.name)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        plan.name === selectedPlan
                          ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500'
                          : 'border-gray-200 hover:border-emerald-200 hover:bg-emerald-50/50'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{plan.name}</h4>
                          <div className="mt-1">
                            <span className="text-lg font-bold text-gray-900">${plan.price}</span>
                            <span className="text-sm text-gray-500">/mo</span>
                          </div>
                        </div>
                        {plan.name === selectedPlan && (
                          <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-emerald-600 mt-2">{plan.hours} hours/month</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Name on Card</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="block w-full rounded-lg border border-gray-200 pl-10 py-2.5 focus:border-emerald-500 focus:ring-emerald-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Card Information</label>
                    <div className="relative">
                      <CreditCardIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="block w-full rounded-lg border border-gray-200 pl-10 py-2.5 focus:border-emerald-500 focus:ring-emerald-500"
                        placeholder="Card number"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={formData.expiry}
                        onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                        className="rounded-lg border border-gray-200 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
                        placeholder="MM/YY"
                        required
                      />
                      <input
                        type="text"
                        value={formData.cvc}
                        onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
                        className="rounded-lg border border-gray-200 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
                        placeholder="CVC"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
             Update Payment Details
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-full">
                <X className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Cancel Subscription</h3>
            </div>
            <p className="text-gray-500 mb-6">
              Are you sure you want to cancel your subscription? You'll lose access to all premium features at the end of your current billing period.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Keep Subscription
              </button>
              <button
                onClick={handleCancelSubscription}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
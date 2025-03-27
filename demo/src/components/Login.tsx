import React, { useState } from 'react';
import { Mail, Lock, Hexagon, User, ArrowRight, ArrowLeft, CheckCircle2, CreditCard } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

interface SignupData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  selectedPlan: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
  nameOnCard: string;
}

const plans = [
  {
    name: 'Starter',
    price: 600,
    hours: 50,
    features: ['50 hours of lead generation', 'Basic support', 'Weekly reports']
  },
  {
    name: 'Professional',
    price: 1200,
    hours: 100,
    features: ['100 hours of lead generation', 'Priority support', 'Daily reports', 'Custom integrations']
  },
  {
    name: 'Enterprise',
    price: 2000,
    hours: 200,
    features: ['200 hours of lead generation', '24/7 dedicated support', 'Real-time reporting', 'Custom integrations', 'Dedicated account manager']
  }
];

export function Login({ onLogin }: LoginProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [signupStep, setSignupStep] = useState(1);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState<SignupData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    selectedPlan: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    nameOnCard: ''
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(loginData.email, loginData.password);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupStep === 1) {
      setSignupStep(2);
    } else if (signupStep === 2) {
      setSignupStep(3);
    } else {
      onLogin(signupData.email, signupData.password);
    }
  };

  const renderSignupStep = () => {
    switch (signupStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={signupData.firstName}
                    onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                    className="block w-full rounded-lg border border-gray-200 pl-10 py-2.5 focus:border-emerald-500 focus:ring-emerald-500 shadow-sm"
                    placeholder="John"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={signupData.lastName}
                    onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                    className="block w-full rounded-lg border border-gray-200 pl-10 py-2.5 focus:border-emerald-500 focus:ring-emerald-500 shadow-sm"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  className="block w-full rounded-lg border border-gray-200 pl-10 py-2.5 focus:border-emerald-500 focus:ring-emerald-500 shadow-sm"
                  placeholder="you@company.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  className="block w-full rounded-lg border border-gray-200 pl-10 py-2.5 focus:border-emerald-500 focus:ring-emerald-500 shadow-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={signupData.confirmPassword}
                  onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                  className="block w-full rounded-lg border border-gray-200 pl-10 py-2.5 focus:border-emerald-500 focus:ring-emerald-500 shadow-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900">Choose Your Plan</h3>
              <p className="text-sm text-gray-500 mt-1">Select the plan that best fits your needs</p>
            </div>
            
            <div className="grid gap-4">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-xl border-2 p-6 cursor-pointer transition-all duration-200 ${
                    signupData.selectedPlan === plan.name
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setSignupData({ ...signupData, selectedPlan: plan.name })}
                >
                  {signupData.selectedPlan === plan.name && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <h4 className="text-lg font-semibold text-gray-900">{plan.name}</h4>
                    <div className="mt-2">
                      <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                      <span className="text-gray-500">/month</span>
                    </div>
                    <p className="text-sm text-emerald-600 font-medium mt-2">{plan.hours} hours included</p>
                    <ul className="mt-4 space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900">Payment Details</h3>
              <p className="text-sm text-gray-500 mt-1">Enter your payment information to complete signup</p>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="text-sm font-medium text-emerald-900">Selected Plan: {signupData.selectedPlan}</p>
                    <p className="text-sm text-emerald-600">
                      ${plans.find(p => p.name === signupData.selectedPlan)?.price}/month
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Name on Card</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={signupData.nameOnCard}
                    onChange={(e) => setSignupData({ ...signupData, nameOnCard: e.target.value })}
                    className="block w-full rounded-lg border border-gray-200 pl-10 py-2.5 focus:border-emerald-500 focus:ring-emerald-500 shadow-sm"
                    placeholder="John Doe"
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
                    value={signupData.cardNumber}
                    onChange={(e) => setSignupData({ ...signupData, cardNumber: e.target.value })}
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
                    value={signupData.expiry}
                    onChange={(e) => setSignupData({ ...signupData, expiry: e.target.value })}
                    className="block w-full rounded-lg border border-gray-200 px-3 py-2.5 focus:border-emerald-500 focus:ring-emerald-500 shadow-sm"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">CVC</label>
                  <input
                    type="text"
                    value={signupData.cvc}
                    onChange={(e) => setSignupData({ ...signupData, cvc: e.target.value })}
                    className="block w-full rounded-lg border border-gray-200 px-3 py-2.5 focus:border-emerald-500 focus:ring-emerald-500 shadow-sm"
                    placeholder="123"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-blue-600 rounded-xl transform rotate-45"></div>
              <div className="absolute inset-2 bg-gradient-to-tl from-emerald-400 to-teal-500 rounded-lg transform -rotate-45"></div>
              <Hexagon className="absolute inset-3 text-white transform rotate-45" />
            </div>
            <div>
              <span className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-700 text-transparent bg-clip-text">
                SaaSQuatch
              </span>
              <span className="block text-sm text-gray-500 -mt-1">by Caprae Capital</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {!isSignup ? (
            <div className="p-8">
              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className="block w-full rounded-lg border border-gray-200 pl-10 py-2.5 focus:border-emerald-500 focus:ring-emerald-500 shadow-sm"
                      placeholder="you@company.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className="block w-full rounded-lg border border-gray-200 pl-10 py-2.5 focus:border-emerald-500 focus:ring-emerald-500 shadow-sm"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 text-white rounded-lg hover:from-emerald-600 hover:via-teal-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 shadow-lg transform transition-all duration-200 hover:scale-[1.02]"
                >
                  Sign In
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setIsSignup(true)}
                    className="text-sm text-emerald-600 hover:text-emerald-700"
                  >
                    Don't have an account? Sign up
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="p-8">
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {signupStep === 1 ? 'Create Account' : 
                     signupStep === 2 ? 'Choose Plan' : 
                     'Payment Details'}
                  </h2>
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${signupStep >= 1 ? 'bg-emerald-500' : 'bg-gray-200'}`} />
                    <div className={`h-2 w-2 rounded-full ${signupStep >= 2 ? 'bg-emerald-500' : 'bg-gray-200'}`} />
                    <div className={`h-2 w-2 rounded-full ${signupStep >= 3 ? 'bg-emerald-500' : 'bg-gray-200'}`} />
                  </div>
                </div>
              </div>

              <form onSubmit={handleSignupSubmit} className="space-y-6">
                {renderSignupStep()}

                <div className="flex items-center justify-between gap-4">
                  {signupStep > 1 && (
                    <button
                      type="button"
                      onClick={() => setSignupStep(signupStep - 1)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                  )}
                  
                  <button
                    type="submit"
                    className={`flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 text-white rounded-lg hover:from-emerald-600 hover:via-teal-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 shadow-lg transform transition-all duration-200 hover:scale-[1.02] ${
                      signupStep === 1 ? 'w-full' : 'ml-auto'
                    }`}
                  >
                    {signupStep === 3 ? (
                      'Complete Signup'
                    ) : (
                      <>
                        Continue
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>

                {signupStep === 1 && (
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setIsSignup(false)}
                      className="text-sm text-emerald-600 hover:text-emerald-700"
                    >
                      Already have an account? Sign in
                    </button>
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
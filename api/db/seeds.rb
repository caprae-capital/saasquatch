# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
plans = [
  {
    stripe_plan_id: 'prod_S5cRRpwLziIkH3',
    stripe_price_id: 'price_1RBRCyChxYzl4aG4qk9riGoE',
    name: 'Starter',
    price: 600,
    hours: 50,
    features: ['50 hours of lead generation', 'Basic support', 'Weekly reports'],
    visible: true
  },
  {
    stripe_plan_id: 'prod_S5cS29NpBIadfT',
    stripe_price_id: 'price_1RBRDPChxYzl4aG40VEqJNZi',
    name: 'Professional',
    price: 1200,
    hours: 100,
    features: ['100 hours of lead generation', 'Priority support', 'Daily reports', 'Custom integrations'],
    visible: true
  },
  {
    stripe_plan_id: 'prod_S5cSTkyxh129gT',
    stripe_price_id: 'price_1RBRDcChxYzl4aG48WwxQA4e',
    name: 'Enterprise',
    price: 2000,
    hours: 200,
    features: ['200 hours of lead generation', '24/7 dedicated support', 'Real-time reporting', 'Custom integrations', 'Dedicated account manager'],
    visible: true
  }
]

plans.each do |plan|
  Plan.create!(plan)
end

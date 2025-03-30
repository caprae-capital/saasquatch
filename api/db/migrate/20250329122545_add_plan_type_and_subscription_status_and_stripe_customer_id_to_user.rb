class AddPlanTypeAndSubscriptionStatusAndStripeCustomerIdToUser < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :plan_type, :string
    add_column :users, :subscription_status, :string, null: false, default: "new"
    add_column :users, :stripe_customer_id, :string
  end
end

class AddStripePriceIdToPlans < ActiveRecord::Migration[8.0]
  def change
    add_column :plans, :stripe_price_id, :string, null: false, default: ""
  end
end

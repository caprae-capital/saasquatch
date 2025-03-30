class CreatePlans < ActiveRecord::Migration[8.0]
  def change
    create_table :plans do |t|
      t.string :stripe_plan_id, null: false
      t.string :name, null: false
      t.string :price, null: false
      t.string :hours, null: false
      t.jsonb :features, null: false, default: []
      t.boolean :visible, default: false

      t.timestamps
    end
  end
end

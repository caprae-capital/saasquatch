class AddDefaultCardIdToUser < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :default_card_id, :string
  end
end

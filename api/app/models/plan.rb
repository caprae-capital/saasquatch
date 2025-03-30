class Plan < ApplicationRecord
  ### VALIDATIONS ###

  validates :stripe_plan_id, :name, :price, :hours, :features, presence: true

  ### SCOPES ###

  scope :visible, -> { where(visible: true) }
end

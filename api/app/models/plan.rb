class Plan < ApplicationRecord
  ### VALIDATIONS ###

  validates :stripe_plan_id, :stripe_price_id, :name, :price, :hours, :features, presence: true

  ### SCOPES ###

  scope :visible, -> { where(visible: true) }

  ### CLASS METHODS ###

  class << self
    def pull_all_prices
      self.visible.each do |plan|
        plan.pull_latest_price
      end
    end
  end

  ### INSTANCE METHODS ###

  def pull_latest_price
    price_obj = Stripe::Price.retrieve(stripe_price_id)
    self.update!(price: price_obj.unit_amount / 100)
  rescue StandardError => e
    puts e.message
  end
end

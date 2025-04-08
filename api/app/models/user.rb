class User < ApplicationRecord
  has_secure_password

  ### RELATIONSHIPS ###

  has_many :user_sessions


  ### CONSTANTS ###

  NEW_STATUS = "new"
  ACTIVE_STATUS = "active"
  INACTIVE_STATUS = "inactive"
  VALID_STATUSES = [NEW_STATUS, ACTIVE_STATUS, INACTIVE_STATUS].freeze


  ### VALIDATIONS ###

  validates :first_name, :last_name, :email, presence: true
  validates :email, uniqueness: true
  validates :subscription_status, inclusion: { in: VALID_STATUSES }

  ### INSTANCE METHOD ###

  def plan
    Plan.find_by!(stripe_plan_id: plan_type)
  end
end

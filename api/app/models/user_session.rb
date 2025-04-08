class UserSession < ApplicationRecord
  ### RELATIONSHIPS ###

  belongs_to :user


  ### VALIDATIONS ###

  validates :token, :expires_at, :user, presence: true
  validates :token, uniqueness: true

  ### INSTANCE METHODS ###

  def expired?
    expires_at < Time.now
  end
end

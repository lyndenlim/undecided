class User < ApplicationRecord
  has_many :reviews, dependent: :destroy

  has_secure_password

  attr_accessor :old_password

  validates :email, presence: true, uniqueness: true
  validates :first_name, presence: true
  validates :last_name, presence: true
end

class User < ApplicationRecord
  has_many :reviews

  has_secure_password

  attr_accessor :old_password

  validates :email, presence: true, uniqueness: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :password, length: { minimum: 6 }
end

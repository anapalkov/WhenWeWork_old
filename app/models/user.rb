class User < ApplicationRecord
  has_many :recipes
  has_many :shifts
  belongs_to :company
  
  has_secure_password

  validates :username, presence: true, uniqueness: true
end

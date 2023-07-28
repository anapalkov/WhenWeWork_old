# frozen_string_literal: true

class User < ApplicationRecord # rubocop:todo Style/Documentation
  has_many :shifts
  belongs_to :company

  has_secure_password

  #validates :username, presence: true, uniqueness: true
  #validates :username, presence: true, uniqueness: { scope: :id }
  validates :username, presence: true, uniqueness: { scope: :id, unless: :username_changed? }
end

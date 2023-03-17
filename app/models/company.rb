# frozen_string_literal: true

class Company < ApplicationRecord # rubocop:todo Style/Documentation
  has_many :users
  has_many :shifts, through: :users
end

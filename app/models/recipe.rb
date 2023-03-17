# frozen_string_literal: true

class Recipe < ApplicationRecord # rubocop:todo Style/Documentation
  belongs_to :user

  validates :title, presence: true
  validates :instructions, length: { minimum: 50 }
end

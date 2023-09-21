# frozen_string_literal: true

class Shift < ApplicationRecord # rubocop:todo Style/Documentation
  belongs_to :user
  belongs_to :company

  # validates :title, presence: true
  # validates :instructions, length: { minimum: 50 }
end

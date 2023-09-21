# frozen_string_literal: true

class ShiftSerializer < ActiveModel::Serializer # rubocop:todo Style/Documentation
  attributes :id, :title, :location, :start, :end, :trading, :user_id
  belongs_to :user
end

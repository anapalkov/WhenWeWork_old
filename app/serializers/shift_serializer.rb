# frozen_string_literal: true

class ShiftSerializer < ActiveModel::Serializer # rubocop:todo Style/Documentation
  attributes :id, :shift_type, :location, :start_time, :end_time, :trading
  has_one :user
end

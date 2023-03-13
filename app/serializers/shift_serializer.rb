class ShiftSerializer < ActiveModel::Serializer
  attributes :id, :shift_type, :location, :start_time, :end_time, :trading
  has_one :user
end

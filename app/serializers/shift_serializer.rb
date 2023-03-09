class ShiftSerializer < ActiveModel::Serializer
  attributes :id, :company, :shift_type, :location, :start_time, :end_time
  has_one :user

end

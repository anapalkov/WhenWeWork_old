# frozen_string_literal: true

# class UserSerializer < ActiveModel::Serializer # rubocop:todo Style/Documentation
#   attributes :id, :username, :admin, :role, :fname, :lname
#   belongs_to :company
#   has_many :shifts
# end

class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :admin, :role, :fname, :lname
  belongs_to :company
  has_many :shifts

  def shifts
    object.shifts
  end
end

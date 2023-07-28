# frozen_string_literal: true

class UserSerializer < ActiveModel::Serializer # rubocop:todo Style/Documentation
  attributes :id, :username, :admin, :role
  has_one :company
  has_many :shifts
end

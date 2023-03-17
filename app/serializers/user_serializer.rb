# frozen_string_literal: true

class UserSerializer < ActiveModel::Serializer # rubocop:todo Style/Documentation
  attributes :id, :username, :image_url, :admin
  has_one :company
  has_many :shifts
end

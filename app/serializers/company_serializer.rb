# frozen_string_literal: true

class CompanySerializer < ActiveModel::Serializer # rubocop:todo Style/Documentation
  attributes :id, :name, :secretkey
  has_many :users
  has_many :shifts, through: :users
  # doesn't seem to work the way I want it to
end

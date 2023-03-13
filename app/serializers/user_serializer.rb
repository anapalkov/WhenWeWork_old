class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :image_url, :admin
  has_one :company
  has_many :shifts
end

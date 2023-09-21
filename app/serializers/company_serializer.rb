# class CompanySerializer < ActiveModel::Serializer # rubocop:todo Style/Documentation
#   attributes :id, :name, :secretkey
#   has_many :users, include_nested_associations: true
#   # has_many :shifts, through: :users
#   # doesn't seem to work the way I want it to

# end

# class CompanySerializer < ActiveModel::Serializer
#   attributes :id, :name, :secretkey
#   has_many :users
#   # has_many :shifts, through: :users

#   def users
#     object.users.includes(:shifts)
#   end
# end

class CompanySerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :users
  has_many :shifts

  # def users
  #   ActiveModel::SerializableResource.new(object.users.includes(:shifts), each_serializer: UserSerializer)
  # end

  #correct one

  def users
    object.users.includes(:shifts).map do |user|
      {
        :id => user.id,
        :username => user.username,
        :admin => user.admin,
        :role => user.role,
        :fname => user.fname,
        :lname => user.lname,
        :shifts => user.shifts,
      }
    end
  end

  # def users
  #   object.users.includes(:shifts)
  # end

  # def users
  #   object.users.collect do |users|
  #     { :shifts => users.shifts }
  #   end
  # end
end

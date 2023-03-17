# frozen_string_literal: true

class RecipeSerializer < ActiveModel::Serializer # rubocop:todo Style/Documentation
  attributes :id, :title, :instructions, :minutes_to_complete
  has_one :user
end

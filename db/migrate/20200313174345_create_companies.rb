# frozen_string_literal: true

class CreateCompanies < ActiveRecord::Migration[6.1] # rubocop:todo Style/Documentation
  def change
    create_table :companies do |t|
      t.string :name
      t.timestamps
    end
  end
end

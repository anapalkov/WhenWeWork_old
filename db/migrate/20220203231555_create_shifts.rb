# frozen_string_literal: true

class CreateShifts < ActiveRecord::Migration[6.1] # rubocop:todo Style/Documentation
  def change
    create_table :shifts do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :title
      t.string :location
      t.datetime :start
      t.datetime :end
      t.boolean :trading
      t.timestamps
    end
  end
end

# frozen_string_literal: true

class CreateShifts < ActiveRecord::Migration[6.1] # rubocop:todo Style/Documentation
  def change
    create_table :shifts do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :shift_type
      t.string :location
      t.datetime :start_time
      t.datetime :end_time
      t.boolean :trading
      t.timestamps
    end
  end
end

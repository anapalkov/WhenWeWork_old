class CreateShifts < ActiveRecord::Migration[6.1]
  def change
    create_table :shifts do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :company
      t.string :shift_type
      t.string :location
      t.datetime :start_time
      t.datetime :end_time
      t.timestamps
    end
  end
end


# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[6.1] # rubocop:todo Style/Documentation
  def change
    create_table :users do |t|
      t.belongs_to :company
      t.string :username
      t.string :password_digest
      t.string :role
      t.string :fname
      t.string :lname
      t.string :email
      t.boolean :admin
      t.integer :companyrequest
      t.timestamps
    end
  end
end

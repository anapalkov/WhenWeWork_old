# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Deleting all"
Company.destroy_all
Shift.destroy_all
User.destroy_all

puts "Creating Companies..."
company0 = Company.create(name: "default")
company1 = Company.create(name: "Initech")
company2 = Company.create(name: "Verizon")

puts "Creating Users..."
user1 = User.create(username: "bob", password: "123", admin: false, company_id: company1.id, role: "user", fname: "Bob", lname: "Stevenson")
user2 = User.create(username: "joe", password: "123", admin: false, company_id: company1.id, role: "user", fname: "Joe", lname: "Wagner")
user3 = User.create(username: "stew", password: "123", admin: true, company_id: company1.id, role: "manager", fname: "Stew", lname: "Disco")
user4 = User.create(username: "stewy", password: "123", admin: true, company_id: company1.id, role: "head", fname: "Stewy", lname: "Hill")

puts "Creating Shifts..."

shift1 = Shift.create(trading: false, user_id: user1.id, company_id: company1.id, title: "pest control", location: "Reston",
                      start: DateTime.new(2023, 9, 9, 9, 0, 0), end: DateTime.new(2023, 9, 9, 17, 0, 0))

shift2 = Shift.create(trading: true, user_id: user1.id, company_id: company1.id, title: "delivery guy", location: "Reston",
                      start: DateTime.new(2023, 9, 10, 10, 0, 0), end: DateTime.new(2023, 9, 10, 17, 0, 0))

shift3 = Shift.create(trading: false, user_id: user1.id, company_id: company1.id, title: "cleaner", location: "Reston",
                      start: DateTime.new(2023, 9, 11, 10, 0, 0), end: DateTime.new(2023, 9, 11, 17, 0, 0))

shift4 = Shift.create(trading: false, user_id: user1.id, company_id: company1.id, title: "cook", location: "Reston",
                      start: DateTime.new(2023, 9, 20, 10, 0, 0), end: DateTime.new(2023, 9, 20, 17, 0, 0))

shift5 = Shift.create(trading: true, user_id: user2.id, company_id: company1.id, title: "backup", location: "Reston",
                      start: DateTime.new(2023, 9, 21, 10, 0, 0), end: DateTime.new(2023, 9, 21, 17, 0, 0))
shift6 = Shift.create(trading: true, user_id: user3.id, company_id: company1.id, title: "advertiser", location: "Reston",
                      start: DateTime.new(2023, 9, 21, 10, 0, 0), end: DateTime.new(2023, 9, 21, 17, 0, 0))

# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts 'Deleting all'
Company.destroy_all
Shift.destroy_all
User.destroy_all

puts 'Creating Companies...'
company1 = Company.create(name: 'Initech', secretkey: 'pw')

puts 'Creating Users...'
user1 = User.create(username: 'bob', password: '123', admin: false, company_id: company1.id)
user2 = User.create(username: 'joe', password: '123', admin: false, company_id: company1.id)
user3 = User.create(username: 'joe', password: '123', admin: true, company_id: company1.id)

puts 'Creating Shifts...'

shift1 = Shift.create(trading: false, user_id: user1.id, shift_type: 'pest control', location: 'Reston',
                      start_time: DateTime.new(2023, 3, 9, 9, 0, 0), end_time: DateTime.new(2023, 3, 9, 17, 0, 0))

shift2 = Shift.create(trading: true, user_id: user1.id, shift_type: 'delivery guy', location: 'Reston',
                      start_time: DateTime.new(2023, 3, 10, 10, 0, 0), end_time: DateTime.new(2023, 3, 10, 17, 0, 0))

shift3 = Shift.create(trading: false, user_id: user1.id, shift_type: 'cleaner', location: 'Reston',
                      start_time: DateTime.new(2023, 3, 11, 10, 0, 0), end_time: DateTime.new(2023, 3, 11, 17, 0, 0))

shift4 = Shift.create(trading: false, user_id: user1.id, shift_type: 'cook', location: 'Reston',
                      start_time: DateTime.new(2023, 3, 20, 10, 0, 0), end_time: DateTime.new(2023, 3, 20, 17, 0, 0))

shift5 = Shift.create(trading: true, user_id: user2.id, shift_type: 'backup', location: 'Reston',
                      start_time: DateTime.new(2023, 3, 21, 10, 0, 0), end_time: DateTime.new(2023, 3, 21, 17, 0, 0))
shift6 = Shift.create(trading: true, user_id: user3.id, shift_type: 'advertiser', location: 'Reston',
                      start_time: DateTime.new(2023, 3, 21, 10, 0, 0), end_time: DateTime.new(2023, 3, 21, 17, 0, 0))
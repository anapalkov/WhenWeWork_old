# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Deleting all"
Recipe.destroy_all
Shift.destroy_all
User.destroy_all

puts "Creating Users..."
user1 = User.create(username: 'bob', password: '123', bio: 'simple bob', admin: true)

puts "Creating Shifts..."
#concert1 = Concert.create(date: '8/12/2011', band1: 'Blink 182', band2: 'My Chemical Romance', band3: '', band4: '', venuename: 'Jiffy Lube Live, VA', festival: false)
shift1 = Shift.create(trading: false, user_id: user1.id, company: 'default', shift_type: 'default', location: 'Reston', start_time: DateTime.new(2023, 3, 9, 9, 0, 0), end_time: DateTime.new(2023, 3, 9, 17, 0, 0))
shift2 = Shift.create(trading: true, user_id: user1.id, company: 'default', shift_type: 'default', location: 'Reston', start_time: DateTime.new(2023, 3, 10, 10, 0, 0), end_time: DateTime.new(2023, 3, 10, 17, 0, 0))


# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Deleting all"
User.destroy_all
Concert.destroy_all
Ticket.destroy_all
Comment.destroy_all

puts "Creating Users..."
user1 = User.create(name: 'bob', password: '123')

puts "Creating Shifts..."
concert1 = Concert.create(date: '8/12/2011', band1: 'Blink 182', band2: 'My Chemical Romance', band3: '', band4: '', venuename: 'Jiffy Lube Live, VA', festival: false)

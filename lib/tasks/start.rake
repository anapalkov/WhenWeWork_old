# frozen_string_literal: true

desc 'Run Rails server and React in development'
task start: :environment do
  exec 'foreman start -f Procfile.dev'
end

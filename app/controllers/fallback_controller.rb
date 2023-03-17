# frozen_string_literal: true

class FallbackController < ActionController::Base # rubocop:todo Style/Documentation
  def index
    # React app index page
    render file: 'public/index.html'
  end
end

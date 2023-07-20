# frozen_string_literal: true

module Api
  class UsersController < ApplicationController # rubocop:todo Style/Documentation
    skip_before_action :authorize, only: :create

    def create
      user = User.create!(user_params)
      session[:user_id] = user.id
      render json: user, status: :created
    end

    def update
      user = User.create!(user_params)
      session[:user_id] = user.id
      render json: user, status: :created
    end

    def show
      render json: @current_user
    end

    private

    def user_params
      params.permit(:username, :password, :password_confirmation, :admin, :bio, :admin, :company_id)
      # , :image_url, :bio, :admin

    end
  end
end

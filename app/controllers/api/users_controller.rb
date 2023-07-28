# frozen_string_literal: true

module Api
  class UsersController < ApplicationController # rubocop:todo Style/Documentation
    skip_before_action :authorize, only: :create

    def create
      user = User.create!(user_params)
      session[:user_id] = user.id
      if user.save
        # render json: { user: user }, status: :created
        render json: user
      else
        render json: { errors: user.errors }, status: :unprocessable_entity
      end
    end

    def update
      user = User.find(params[:id])
      if user.update(user_params)
        render json: user, status: :ok
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def show
      render json: @current_user
    end

    private

    def user_params
      permitted_params = params.require(:user).permit(
        :username,
        :password,
        :password_confirmation,
        :admin,
        :company_id,
        :role,
        :companyrequest
      )
      puts "Permitted params: #{permitted_params.inspect}"
      permitted_params
    end
  end
end

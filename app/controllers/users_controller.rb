# frozen_string_literal: true
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

  def create_empty_user(username, company)
    User.create(username: username, company: company, password: SecureRandom.hex(10), password_confirmation: SecureRandom.hex(10))
  end

  def update
    user = @current_user
    # user = User.find(params[:id])
    if user.update(user_params)
      render json: user, status: :ok
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def setcompany
    user = User.find(params[:id])
    # Check if the current user is an admin and belongs to the same company as the user being edited
    if @current_user.admin? && @current_user.company_id == user.company_id
      if user.update(company_id: params[:user][:company_id])
        render json: user, status: :ok
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "You are not authorized to perform this action." }, status: :unauthorized
    end
  end

  def accepttocompany
    user = User.find(params[:id])
    # Check if the current user is an admin and belongs to the same company as the user being edited
    if @current_user.admin? && @current_user.company_id == user.companyrequest
      if user.update(company_id: params[:user][:company_id], companyrequest: params[:user][:companyrequest])
        render json: user, status: :ok
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "You are not authorized to perform this action." }, status: :unauthorized
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
      :companyrequest,
      :fname,
      :lname
    )
    puts "Permitted params: #{permitted_params.inspect}"
    permitted_params
  end
end

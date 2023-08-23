# frozen_string_literal: true

class CompaniesController < ApplicationController # rubocop:todo Style/Documentation
  # before_action :set_company, only: [:show]
  def index
    render json: Company.all
  end

  def create
    company = Company.create(company_params)
    render json: company, status: :created
  end

  def update # rubocop:todo Metrics/MethodLength
    company = Company.find_by(id: params[:id])
    if company
      # if found, check for validation
      Company.update(company_params)
      if Company.valid?
        # if updated, render
        render json: company
      else
        # fix to specify exact error
        render json: { error: "validation errors" }
      end
    else
      render json: { error: "company not found" }, status: :not_found
    end
  end

  def company_params
    params.require(:company).permit(:company_id, :name, :secretkey)
  end

  def unassigned
    company = Company.first

    if company
      users = company.users.where(companyrequest: @current_user.company_id)
      render json: users, status: :ok
    else
      render json: { error: "Company not found" }, status: :not_found
    end
  end

  # def show
  #   company = @current_user.company

  #   if company
  #     render json: company
  #   else
  #     # Handle the case when the company does not exist or doesn't belong to the current user
  #     render json: { error: "Company not found or doesn't belong to the current user" }, status: :not_found
  #   end
  # end

  def show
    company = @current_user.company

    if company
      # Eager load the shifts of the users associated with the company
      # company_with_associations = Company.includes(users: :shifts).find(company.id)
      # render json: company_with_associations
      render json: company
    else
      # Handle the case when the company does not exist or doesn't belong to the current user
      render json: { error: "Company not found or doesn't belong to the current user" }, status: :not_found
    end
  end
end

#   def show
#     if @company
#       render json: @company
#       # , include: ["users.shifts"]
#     else
#       render json: { error: "Company not found or doesn't belong to the current user" }, status: :not_found
#     end
#   end

#   private

#   def set_company
#     @company = @current_user.company
#   end
# end

# frozen_string_literal: true

class CompaniesController < ApplicationController # rubocop:todo Style/Documentation
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
        render json: { error: 'validation errors' }
      end
    else
      render json: { error: 'company not found' }, status: :not_found
    end
  end

  def company_params
    params.require(:company).permit(:company_id, :name, :secretkey)
  end

  def show
    company = Company.find_by(id: params[:id])

    if company
      render json: company
    else
      render json: { error: 'company not found' }
    end
  end
end

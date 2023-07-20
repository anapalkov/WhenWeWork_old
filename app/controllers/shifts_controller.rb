class ShiftsController < ApplicationController
  def index
    render json: Shift.all
  end

  def create
    shift = Shift.create(shift_params)
    render json: shift, status: :created
  end

  def update
    shift = Shift.find_by(id: params[:id])
    if shift
      # if found, check for validation
      shift.update(shift_params)
      if shift.valid?
        # if updated, render
        render json: shift
      else
        # fix to specify exact error
        render json: { error: "validation errors" }
      end
    else
      render json: { error: "shift not found" }, status: :not_found
    end
  end

  def shift_params
    params.require(:shift).permit(:user_id, :title, :location, :start, :end, :trading)
  end

  def show
    shift = Shift.find_by(id: params[:id])

    if shift
      render json: shift
    else
      render json: { error: "shift not found" }
    end
  end
end

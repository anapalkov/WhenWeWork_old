class ShiftsController < ApplicationController
  def index
    render json: Shift.all
  end

  def create
    shift = Shift.create(shift_params)
    render json: shift, status: :created
  end

  def update_pickup
    shift = Shift.find_by(id: params[:id])
    if shift
      # Ensure that the shift belongs to the company of the current user
      if shift.user.company == @current_user.company
        # Check for trading flag
        if shift[:trading]
          shift.update(shift_params)
          if shift.valid?
            render json: shift
          else
            render json: { error: shift.errors.full_messages }, status: :unprocessable_entity
          end
        else
          render json: { error: "Shift must have trading set to true to update" }, status: :unprocessable_entity
        end
      else
        render json: { error: "Shift does not belong to your company" }, status: :forbidden
      end
    else
      render json: { error: "Shift not found" }, status: :not_found
    end
  end

  def update_offer
    shift = Shift.find_by(id: params[:id])

    if shift
      #if shift belongs to current user
      if shift.user_id == @current_user.id
        if shift.update(trading: params[:trading])
          render json: shift
        else
          render json: { error: "Validation errors" }, status: :unprocessable_entity
        end
      else
        render json: { error: "You are not authorized to update this shift" }, status: :forbidden
      end
    else
      render json: { error: "Shift not found" }, status: :not_found
    end
  end

  def update_admin_change
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

  private
end

class RoomsController < ApplicationController
  def new
    @room = Room.new
  end
  
  # GET /rooms
  # Return all rooms in the database
  def index
    @rooms = Room.all
    render json: @rooms
  end

  # GET /rooms/:id
  # Return a specific room by id
  def show
    @room = Room.includes(:messages).find(params[:id])
    render json: @room, include: :messages
  end

  # POST /rooms
  # Create a new room
  def create
    @room = Room.new(room_params)
    if @room.save
      render json: @room, status: :created
    else
      render json: @room.errors, status: :unprocessable_entity
    end
  end

  private
  def room_params
    params.require(:room).permit(:name)
  end
end
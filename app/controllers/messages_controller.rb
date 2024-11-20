class MessagesController < ApplicationController
  # POST /rooms/:room_id/messages
  def create
    @room = Room.find_by(id: params[:room_id])
    unless @room
      render json: { error: "Room not found" }, status: :not_found
      return
    end

    @message = @room.messages.build(message_params)
    if @message.save
      ActionCable.server.broadcast("room_#{@room.id}_messages", @message)
      render json: @message, status: :created
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  private

  def message_params
    params.require(:message).permit(:content)
  end
end

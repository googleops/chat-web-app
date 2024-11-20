class MessagesController < ApplicationController
  # POST /messages
  # Create a new message
  def create
    @message = Message.new(message_params)
    if @message.save
      ActionCable.server.broadcast "room_#{message_params[:room_id]}_messages", @message
      render json: @message, status: :created
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :room_id)
  end
end
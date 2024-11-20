class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "room_#{params[:room_id]}_messages"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
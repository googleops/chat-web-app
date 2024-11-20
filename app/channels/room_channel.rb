class RoomChannel < ApplicationCable::Channel
  def subscribed
    # Stream from a specific room's messages
    room = Room.find(params[:room_id])
    stream_from "room_#{room.id}_messages"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end

class RoomChannel < ApplicationCable::Channel
  def subscribed
    if params[:room_id].present?
      room = Room.find_by(id: params[:room_id])
      if room
        stream_for room
      else
        reject
      end
    else
      reject
    end
  end
end

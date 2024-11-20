require 'rails_helper'

RSpec.describe RoomChannel, type: :channel do
  let!(:room) { create(:room) }

  context "subscribing to a room" do
    it "rejects the subscription without a room_id" do
      subscribe
      expect(subscription).to be_rejected
    end

    it "rejects the subscription with an invalid room_id" do
      subscribe(room_id: -1)
      expect(subscription).to be_rejected
    end

    it "successfully subscribes with a valid room_id" do
      subscribe(room_id: room.id)
      expect(subscription).to be_confirmed
      expect(subscription).to have_stream_for(room)
    end
  end
end

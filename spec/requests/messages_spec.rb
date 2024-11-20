require 'rails_helper'

RSpec.describe "Messages", type: :request do
  let!(:room) { create(:room, name: "General") } # Existing valid room
  let(:valid_attributes) { { content: "Hello World", room_id: room.id } } # Valid message data
  let(:invalid_message_attributes) { { content: "", room_id: room.id } } # Invalid message content
  let(:non_existent_room_id) { -1 } # An invalid room ID

  describe "POST /rooms/:room_id/messages" do
    context "with valid parameters" do
      it "creates a new message" do
        expect {
          post "/rooms/#{room.id}/messages", params: { message: valid_attributes }
        }.to change(Message, :count).by(1)

        expect(response).to have_http_status(:created)
        json_response = JSON.parse(response.body)
        expect(json_response["content"]).to eq("Hello World")
        expect(json_response["room_id"]).to eq(room.id)
      end
    end

    context "when the room does not exist" do
      it "returns a not found error" do
        expect {
          post "/rooms/#{non_existent_room_id}/messages", params: { message: valid_attributes }
        }.to change(Message, :count).by(0)

        expect(response).to have_http_status(:not_found)
        json_response = JSON.parse(response.body)
        expect(json_response["error"]).to eq("Room not found")
      end
    end

    context "with invalid message attributes" do
      it "does not create a new message" do
        expect {
          post "/rooms/#{room.id}/messages", params: { message: invalid_message_attributes }
        }.to change(Message, :count).by(0)

        expect(response).to have_http_status(:unprocessable_entity)
        json_response = JSON.parse(response.body)
        expect(json_response["content"]).to include("can't be blank")
      end
    end
  end
end

require 'rails_helper'

RSpec.describe RoomsController, type: :controller do
  let!(:room) { create(:room, name: "General") }
  let!(:message) { create(:message, room: room, content: "Hello World") }

  describe "GET #index" do
    it "returns all rooms" do
      get :index
      expect(response).to be_successful
      json_response = JSON.parse(response.body)
      expect(json_response.size).to eq(1)
      expect(json_response.first["name"]).to eq("General")
    end
  end

  describe "GET #show" do
    context "when the room exists" do
      it "returns the room and its messages" do
        get :show, params: { id: room.id }
        expect(response).to be_successful
        json_response = JSON.parse(response.body)
        expect(json_response["name"]).to eq("General")
        expect(json_response["messages"].size).to eq(1)
        expect(json_response["messages"].first["content"]).to eq("Hello World")
      end
    end

    context "when the room does not exist" do
      it "returns a not found error" do
        get :show, params: { id: -1 }
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe "POST #create" do
    context "with valid parameters" do
      it "creates a new room" do
        expect {
          post :create, params: { room: { name: "New Room" } }
        }.to change(Room, :count).by(1)
        expect(response).to have_http_status(:created)
        json_response = JSON.parse(response.body)
        expect(json_response["name"]).to eq("New Room")
      end
    end

    context "with invalid parameters" do
      it "returns validation errors" do
        post :create, params: { room: { name: "" } }
        expect(response).to have_http_status(:unprocessable_entity)
        json_response = JSON.parse(response.body)
        expect(json_response["name"]).to include("can't be blank")
      end
    end
  end
end

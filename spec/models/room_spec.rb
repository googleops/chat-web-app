require 'rails_helper'

RSpec.describe Room, type: :model do
  # Test associations
  describe "associations" do
    it { should have_many(:messages).dependent(:destroy) }
  end

  # Test validations
  describe "validations" do
    it { should validate_presence_of(:name) }
    it { should validate_uniqueness_of(:name) }
  end

  # Test instance methods
  describe "methods" do
    let(:room) { create(:room, name: "Chat Room") }

    it "returns the name of the room" do
      expect(room.name).to eq("Chat Room")
    end
  end
end

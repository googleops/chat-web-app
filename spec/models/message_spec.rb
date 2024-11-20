require 'rails_helper'

RSpec.describe Message, type: :model do
  # Test associations
  describe "associations" do
    it { should belong_to(:room) }
  end

  # Test validations
  describe "validations" do
    it { should validate_presence_of(:content) }
  end
end

FactoryBot.define do
  factory :message do
    content { "This is a message" }
    room
  end
end

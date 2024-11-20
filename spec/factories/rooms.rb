FactoryBot.define do
  factory :room do
    sequence(:name) { |n| "Room #{n}" } # Generates unique names like "Room 1", "Room 2", etc.
  end
end

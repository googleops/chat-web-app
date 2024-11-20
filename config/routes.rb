Rails.application.routes.draw do
  resources :rooms, only: [:index, :show, :create] do
    resources :messages, only: [:create]
  end
end
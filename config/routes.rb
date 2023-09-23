# frozen_string_literal: true

Rails.application.routes.draw do
  #CHATGPT SHIT MIGHT DELETE
  # root "sessions#login"

  # get "/shifts", to: "shifts#index"
  # get '/companies', to: 'companies#index'

  resources :companies, only: %i[index create show update]
  get "/companies", to: "companies#index"
  get "/mycompany", to: "companies#show"
  get "/unassignedusers", to: "companies#unassigned"
  # get "/shifts", to: "shifts#index"
  # put "/shifts", to: "shifts#update"

  #SHIFTS
  # resources :shifts, only: %i[index create show update]
  # post "/createshift", to: "shifts#create"

  resources :shifts, only: %i[index create show] do
    member do
      patch :update_pickup
      patch :update_offer
      patch :update_admin_change
      # Add more custom update routes as needed
    end
  end

  # namespace :api do
  post "/signup", to: "users#create"

  put "/signup/:id", to: "users#update"
  put "/setcompany/:id", to: "users#setcompany"
  put "/accepttocompany/:id", to: "users#accepttocompany"
  # delete "/signup/:id", to: "users#delete"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  # end

  # all other routes will be load our React application
  # this route definition matches:
  # - *path: all paths not matched by one of the routes defined above
  # - constraints:
  #   - !req.xhr?: it's not a XHR (fetch) request
  #   - req.format.html?: it's a request for a HTML document
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end

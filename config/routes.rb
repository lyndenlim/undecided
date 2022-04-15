Rails.application.routes.draw do
  resources :reviews
  resources :users

  # get "/hello", to: "application#hello_world"

  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "yelp_restaurants", to: "yelps#yelp_restaurants"
  get "yelp_random_restaurant", to: "yelps#yelp_random_restaurant"
  get "yelp_restaurant", to: "yelps#yelp_restaurant"
  get "yelp_reviews", to: "yelps#yelp_reviews"

  get "*path",
      to: "fallback#index",
      constraints: ->(req) { !req.xhr? && req.format.html? }
end

Rails.application.routes.draw do

  scope "/api" do
    post "signup" => "api#signup"
    post "plan_type" => "api#plan_type"
    post "purchase" => "api#purchase"
    post "payment" => "api#payment"
    post "plan" => "api#update_plan"
    post "password" => "api#password"
    post "login" => "api#login"
    post "logout" => "api#logout"
    get "current_user" => "api#get_current_user"
    get "plans" => "api#plans"
    get "plan" => "api#plan"
    get "payment" => "api#get_payment_details"
  end
  root to: "home#index"

  get "*path", to: "home#index"
end

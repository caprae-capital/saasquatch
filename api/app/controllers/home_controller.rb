class HomeController < ApplicationController
  def index
    render file: Rails.root.join("public", "web", "index.html"), layout: false
  end
end

require "net/http"
require "uri"
require "json"

class YelpsController < ApplicationController
  def yelp_restaurants
    url = URI("https://api.yelp.com/v3/businesses/search?limit=16&latitude=#{params[:locationLat]}&longitude=#{params[:locationLng]}&radius=1610&open_now=true&categories=restaurants")

    https = Net::HTTP.new(url.host, url.port)
    https.use_ssl = true

    request = Net::HTTP::Get.new(url)
    request["Authorization"] = "Bearer #{params[:api_key]}"

    response = https.request(request)
    JSON.parse(response.body)
    render json: response.body
  end

  def yelp_random_restaurant
    url = URI("https://api.yelp.com/v3/businesses/search?limit=50&latitude=#{params[:currentLat]}&longitude=#{params[:currentLng]}&radius=1610&open_now=true&categories=restaurants")

    https = Net::HTTP.new(url.host, url.port)
    https.use_ssl = true

    request = Net::HTTP::Get.new(url)
    request["Authorization"] = "Bearer #{params[:api_key]}"

    response = https.request(request)
    JSON.parse(response.body)
    render json: response.body
  end

  def yelp_restaurant
    url = URI("https://api.yelp.com/v3/businesses/#{params[:restaurant_id]}")

    https = Net::HTTP.new(url.host, url.port)
    https.use_ssl = true

    request = Net::HTTP::Get.new(url)
    request["Authorization"] = "Bearer #{params[:api_key]}"

    response = https.request(request)
    JSON.parse(response.body)
    render json: response.body
  end

  def yelp_reviews
    url = URI("https://api.yelp.com/v3/businesses/#{params[:restaurant_id]}/reviews")

    https = Net::HTTP.new(url.host, url.port)
    https.use_ssl = true

    request = Net::HTTP::Get.new(url)
    request["Authorization"] = "Bearer #{params[:api_key]}"

    response = https.request(request)
    JSON.parse(response.body)
    render json: response.body
  end
end

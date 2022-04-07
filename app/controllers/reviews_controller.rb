class ReviewsController < ApplicationController
  def index
    render json: Review.all
  end

  def show
    render json: find_review
  end

  def create
    review = Review.create!(review_params)
    render json: review, status: :created
  end

#   def update
#   end

  def destroy
    find_review.destroy
    head :no_content
  end

  private

  def find_review
    Review.find(params[:id])
  end

  def review_params
    params.permit(:user_id, :restaurant_id, :rating, :comment)
  end
end

class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :restaurant_id, :rating, :comment
end

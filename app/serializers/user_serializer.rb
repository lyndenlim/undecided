class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :profile_picture

  has_many :reviews do
    object.reviews.order(:created_at)
  end
end

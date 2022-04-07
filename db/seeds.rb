User.create(first_name: 'John', last_name: 'smith', email: 'john@smith.com', password_digest: 'test')
Review.create(user_id: 1, restaurant_id: 1, rating: 5, comment: "OK")
Restaurant.create(yelp_id:"8qSOz7oTPUUCafsMOBBNEQ")
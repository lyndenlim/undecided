class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.integer :user_id, null: false
      t.integer :restaurant_id
      t.integer :rating
      t.text :comment

      t.timestamps
    end
  end
end

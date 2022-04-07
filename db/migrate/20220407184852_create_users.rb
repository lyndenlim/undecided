class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.text :email
      t.text :password_digest
      t.text :profile_picture

      t.timestamps
    end
  end
end

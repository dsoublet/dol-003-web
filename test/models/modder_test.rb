# == Schema Information
#
# Table name: modders
#
#  id               :bigint           not null, primary key
#  bio              :string
#  city             :string
#  etsy_shop        :string
#  featured_link    :string
#  latitude         :string
#  logo             :string
#  longitude        :string
#  name             :string           not null
#  photo_1          :string
#  photo_10         :string
#  photo_2          :string
#  photo_3          :string
#  photo_4          :string
#  photo_5          :string
#  photo_6          :string
#  photo_7          :string
#  photo_8          :string
#  photo_9          :string
#  slug             :string           not null
#  status           :string           not null
#  twitter_username :string
#  website_url      :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  user_id          :bigint           not null
#
# Indexes
#
#  index_modders_on_slug     (slug) UNIQUE
#  index_modders_on_user_id  (user_id)
#
require "test_helper"

class ModderTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

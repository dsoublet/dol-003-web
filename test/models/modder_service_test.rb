# == Schema Information
#
# Table name: modder_services
#
#  id         :bigint           not null, primary key
#  index      :integer          not null
#  service    :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  modder_id  :bigint           not null
#
# Indexes
#
#  index_modder_services_on_modder_id  (modder_id)
#
require "test_helper"

class ModderServiceTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

# == Schema Information
#
# Table name: taggings
#
#  id         :bigint           not null, primary key
#  note_id    :integer          not null
#  tag_id     :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Tagging < ApplicationRecord

    belongs_to :note,
        primary_key: :id,
        foreign_key: :note_id,
        class_name: :Note

    belongs_to :tag,
        primary_key: :id,
        foreign_key: :tag_id,
        class_name: :Tag
    
end

class ChangeColumnDefaultNotebook < ActiveRecord::Migration[5.2]
  def change
    change_column :users, :default_notebook, :string
  end
end

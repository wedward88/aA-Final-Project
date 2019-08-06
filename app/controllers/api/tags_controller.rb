class Api::TagsController < ApplicationController

    def index
        @tags = current_user.tags
        render :index
    end

    def show
        @tag = Tag.find(params[:id])
        render :show
    end

    def create
        
        @note = Note.find(params[:tag][:note_id])
        @tag = @note.tags.create(name: params[:tag][:name], user_id: current_user.id)
        
        if @tag.id != nil
            render json: {:tag => @tag, :tagging => @tag.taggings}
        else
            render json: @tag.errors.full_messages, status: 422
        end
    end

    def update
        @tag = Tag.find(params[:id])

        if @tag.update(tag_params)
            render json: @tag
        else
            render json: @tag.errors.full_messages, status: 422
        end
    end

    def destroy
        @note = Note.find(params[:tag][:note_id])
        @tag = Tag.find(params[:id])

        if @tag.user_id == current_user.id
            if @note.taggings.where(tag_id: @tag.id).delete_all
                @tag.destroy
                render json: @tag
            else
                render json: @tag.errors.full_messages, status: 418
            end
        else
            render json: ['This is not your tag to delete!'], status: 418
        end
    end

    private

    def tag_params
        params.require(:tag).permit(:name, :note_id)
    end

end
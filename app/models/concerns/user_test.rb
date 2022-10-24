# frozen_string_literal: true
module UserTest
    extend ActiveSupport::Concern

    included do 
        include Decidim::Favorites::Favoritable
        
        def favoriting?(favoritable)
            Decidim::Favorites::Favorite.where(user: self, favoritable: favoritable).any?
        end
    end
end
 
# frozen_string_literal: true
module DecidimAssembliesControllerExtensions
    extend ActiveSupport::Concern

    included do

        helper_method :collection

        def members
            @members ||= current_participatory_space.members.not_ceased
        end

        alias collection members
    end
      
end
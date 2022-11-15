require_relative 'boot'

require "decidim/rails"

# Add the frameworks used by your app that are not loaded by Decidim.
# require "action_mailbox/engine"
# require "action_text/engine"
require "action_cable/engine"
require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ProjektKomponente
  class Application < Rails::Application

    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0


    initializer "decidim_assemblies_controller_extensions.rb" do
      ActiveSupport.on_load(:action_controller) do
        include DecidimAssembliesControllerExtensions
      end
    end



  end
end

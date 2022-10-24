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

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
    initializer "user_test" do |app|
      Decidim::User.send(:include, UserTest)

      # The following hook is for the development environment and it is needed
      # to load the correct omniauth configurations to the Decidim::User model
      # BEFORE the routes are reloaded in Decidim::Core::Engine. Without this,
      # the extra omniauth authentication methods are lost during application
      # reloads as the Decidim::User class is reloaded during which the omniauth
      # configurations are overridden by the core class. After the override, the
      # routes are reloaded (before call to to_prepare) which causes the extra
      # configured methods to be lost.
      #
      # The load order is:
      # - Models, including Decidim::Core::Engine models (sets the omniauth back
      #   to Decidim defaults)
      # - ActionDispatch::Reloader - after_class_unload hook (below)
      # - Routes, including Decidim::Core::Engine routes (reloads the routes
      #   using the omniauth providers set by Decidim::Core)
      # - to_prepare hook (which would be the optimal place for this but too
      #   late in the load process)
      #
      # In case you are planning to change this, make sure that the following
      # works:
      # - Start the application with Tunnistamo omniauth method configured
      # - Load the login page and see that Tunnistamo is configured
      # - Make a change to any file under the `app` folder
      # - Reload the login page and see that Tunnistamo is configured
      #
      # This could be also fixed in the Decidim core by making the omniauth
      # providers configurable through the application configs. See:
      # https://github.com/decidim/decidim/blob/a40656/decidim-core/app/models/decidim/user.rb#L17
      #
      # NOTE: This problem only occurs when the models and routes are reloaded,
      #       i.e. in development environment.
      app.reloader.after_class_unload do
        Decidim::User.send(:include, UserTest)
      end
    end

    


    initializer "decidim_assemblies_controller_extensions.rb" do
      # Devise controller overrides to add some extra functionality into them.
      # Currently this is only for debugging purposes.
      ActiveSupport.on_load(:action_controller) do
        include DecidimAssembliesControllerExtensions
      end
    end
  end
end

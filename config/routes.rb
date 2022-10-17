Rails.application.routes.draw do
  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end

  mount Decidim::Core::Engine => '/'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
  get "/forYou", to: "static#forYou"

  get "/projectIdea", to: "static#projectIdea"

  get "/createdByYou", to: "static#createdByYou"

  root to: "decidim#assembly"

end

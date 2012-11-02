$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "task-manager/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "task-manager"
  s.version     = TaskManager::VERSION
  s.authors     = ["Beijing Menglifang Network Science and Technology CO.,Ltd."]
  s.email       = ["dev@menglifang.org"]
  s.homepage    = "https://github.com/menglifang/task-manager"
  s.summary     = "With TaskManager, you can manage and trace your routine tasks."
  s.description = "TaskManager can help you to manage your routine tasks effectually."

  s.files = Dir["{app,config,db,lib}/**/*"] + ["MIT-LICENSE", "Rakefile", "README.md"]

  s.add_dependency "rails", "~> 3.2.8"
  s.add_dependency "activerecord-postgres-hstore", "~> 0.4.1"
  # s.add_dependency "jquery-rails"

  s.add_development_dependency "pg"
  s.add_development_dependency "rspec-rails"
end

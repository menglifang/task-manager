TaskManager
-----------

[![Build Status](https://secure.travis-ci.org/menglifang/task-manager.png?branch=develop)](http://travis-ci.org/menglifang/task-manager)
[![Dependency Status](https://gemnasium.com/menglifang/task-manager.png)](https://gemnasium.com/menglifang/task-manager)
[![Code Climate](https://codeclimate.com/badge.png)](https://codeclimate.com/github/menglifang/task-manager)

TaskManager是一个可挂载的Rails引擎（Mountable Rails
Engine），因此您可以在Rails应用中通过挂载的方式来使用。另外，TaskManager使用了PostgreSQL的hstore特性，因此TaskManager只能工作在PostgreSQL数据库之上。

屁话：鉴于PostgreSQL的宽松的免费使用政策，以及其越来越出色的性能，强烈建议您使用之。

### 依赖

* PostgreSQL数据库

  ```bash
  # Ubuntu
  sudo apt-get install postgresql-contrib
  ```

### 安装

* 安装Gem包

  在您的Rails应用程序的Gemfile文件中添加：

  ```ruby
  gem 'task-manager', '~>0.1.3'
  ```

  然后，运行`bundle install`。

* 创建数据库表

  * 生成数据库迁移文件

  ```bash
  rake task_manager:install:migrations
  ```

  * 创建数据库表

  ```bash
  rake db:migrate
  ```

### 使用说明

#### 挂载TaskManager API

编辑`config/routes.rb`文件，在其中挂载TaskManager路由。

```ruby
mount TaskManager::Engine => "/task-manager"
```

使用`rake
routes`命令，检查是否正常挂载成功。如果挂载成功，命令行中将会有如下输出：

```
Routes for TaskManager::Engine:
api_plans GET    /api/plans(.:format)     task_manager/api/v1/plans#index {:format=>"json"}
          POST   /api/plans(.:format)     task_manager/api/v1/plans#create {:format=>"json"}
api_plan  PUT    /api/plans/:id(.:format) task_manager/api/v1/plans#update {:format=>"json"}
          DELETE /api/plans/:id(.:format) task_manager/api/v1/plans#destroy {:format=>"json"}
api_tasks GET    /api/tasks(.:format)     task_manager/api/v1/tasks#index {:format=>"json"}
api_task  DELETE /api/tasks/:id(.:format) task_manager/api/v1/tasks#destroy {:format=>"json"}
```

详细的接口使用说明请查看[TaskManager
API文档](http://rdoc.info/github/menglifang/task-manager/master/TaskManager/Api/V1)

#### 界面

##### ExtJS

* 导入资源文件

在`app/assets/javascripts/application.js`文件中添加：

```javascript
// 代码需要放置在导入ExtJS库之后
// require task-manager/extjs
```

在`app/assets/stylesheets/application.css`文件中添加：

```css
/* require task-manager/extjs */
```

### 开发指南

* 安装依赖包

```bash
bundle install
```

* 创建数据库

```bash
cd spec/dummy

# 创建开发数据库
rake db:create db:migrate db:seed RAILS_ENV=development

# 创建测试数据库
rake db:create db:migrate db:seed RAILS_ENV=test
```

* 运行后端测试（Ruby）

```bash
cd path/to/task-manager
rake
```

* 运行前端测试（Javascript)

```bash
cd path/to/task-manager/spec/dummy
rails s
```

然后，打开浏览器访问：[http://localhost:3000/siesta](http://localhost:3000/siesta)。
待页面打开后，点击打开页面的运行按钮进行前端测试。

* 查看Demo应用

```bash
cd path/to/task-manager/spec/dummy
rails s
```

然后，打开浏览器访问：[http://localhost:3000/extjs](http://localhost:3000/extjs)。

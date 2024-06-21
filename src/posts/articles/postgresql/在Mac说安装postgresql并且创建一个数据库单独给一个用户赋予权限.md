---
date: 2024-06-20
category:
  - PostgreSQL
  - MacOS
tag:
  - PostgreSQL
  - MacOS
  - Homebrew
  - Database
head:
  - - meta
    - name: keywords
      content: PostgreSQL, MacOS, Homebrew, Database, User, Owner ,Permission
---
# 在MacOS使用Homebrew安装postgresql并且创建新用户和数据库，并将数据库的所有权分配给新用户。

## 1. 安装PostgreSQL

### 先决条件：您的计算机上已安装 Homebrew。如果没有，您可以随时访问 https://brew.sh/zh-cn/ 获取安装说明。

使用以下命令安装 PostgreSQL：

```bash
brew install postgresql@16
```

## 2.配置PostgreSQL后台运行

启动PostgreSQL服务
使用以下命令启动 PostgreSQL 服务：

```bash
brew services start postgresql@16
```

现在，要从命令行访问 postgres，您必须将其添加到路径变量中，在终端中键入以下命令以在 TextEdit 中打开 ~/.zshrc 文件：

```bash
nano .zshrc
```

将以下行添加到文件的末尾：

```bash
# 例如，要将 postgresql@16 bin 目录添加到您的 PATH：
export PATH="/opt/homebrew/opt/postgresql@16/bin:$PATH" 

# 为了让编译器找到 postgresql@16，您可能需要设置：
export LDFLAGS="-L/opt/homebrew/opt/postgresql@16/lib"
export CPPFLAGS="-I/opt/homebrew/opt/postgresql@16/include"

# 为了让 pkg-config 找到 postgresql@16，您可能需要设置：:
export PKG_CONFIG_PATH="/opt/homebrew/opt/postgresql@16/lib/pkgconfig"
```

在终端中键入以下命令以使更改生效：

```bash
source ~/.zshrc
```

当我们执行成功后，我们可以通过以下命令检查 PostgreSQL 的版本：

```bash
psql --version
```

你会看到类似这样的输出：

```bash
psql (PostgreSQL) 16.0 (Homebrew)
```

## 3.配置 PostgreSQL

使用 homebrew 安装 Postgres 将创建一个没有密码和用户名的用户作为您的 MacOS 用户名（在终端中输入“id -un”，您将获得您的用户名），除此之外，它还会创建一个名为“postgres”的数据库，因此第一个我们要做的就是连接到默认数据库（即 postgres）并为我们的用户（或角色）分配一个密码。

连接数据库

```bash
psql -U <CURRENTLY_LOGGED_IN_MAC_USERNAME> postgres
```

为当前用户分配密码(可选)

```bash
ALTER USER <CURRENTLY_LOGGED_IN_MAC_USERNAME> PASSWORD '<PASSWORD>';
```

> *注意：用单引号输入您的密码，并且不要忘记附加分号 (;)。*

完成密码修改后，使用 \q 退出，现在需要修改 pg_hba.conf 文件中定义的身份验证方法，默认情况下它被设置为 "信任"，这就是连接到数据库后没有密码提示的原因。
你可以使用以下命令找到 pg_hba.conf 文件，随后会出现密码提示（输入在前一条命令中设置的密码）：

```mar
sudo -u <CURRENTLY_LOGGED_IN_MAC_USERNAME> psql postgres -c "SHOW hba_file;"
```

最有可能的是，它会存储在与我相同的路径中，即 /opt/homebrew/var/postgresql@16/pg_hba.conf 。现在你可以在你选择的任何编辑器中打开这个文件，我使用 vs-code 来打开这个文件。
配置文件将如下图所示。我们现在需要将所有身份验证方法从“trust”更改为“md5”。

```properties
# "local" is for Unix domain socket connections only
local   all             all                                     trust
# IPv4 local connections:
host    all             all             127.0.0.1/32            trust
# IPv6 local connections:
host    all             all             ::1/128                 trust
# Allow replication connections from localhost, by a user with the
# replication privilege.
local   replication     all                                     trust
host    replication     all             127.0.0.1/32            trust
host    replication     all             ::1/128                 trust
```

改完之后如下所示

```properties
# "local" is for Unix domain socket connections only
local   all             all                                     md5
# IPv4 local connections:
host    all             all             127.0.0.1/32            md5
# IPv6 local connections:
host    all             all             ::1/128                 md5
# Allow replication connections from localhost, by a user with the
# replication privilege.
local   replication     all                                     md5
host    replication     all             127.0.0.1/32            md5
host    replication     all             ::1/128                 md5
```

使用以下命令重新启动 postgres 服务以使更改生效：

```bash
brew services restart postgresql@16
```

尝试使用相同的用户名连接到 postgres 数据库，现在系统会要求您输入密码，请使用我们最初连接到数据库时使用的相同命令：

```bash
psql -U <CURRENTLY_LOGGED_IN_MAC_USERNAME> postgres
```

输入密码，就可以成功连接到数据库了。由于默认用户是superuser（拥有所有权限，输入 \du+ 查找所有用户及与之相关的角色，在上一条命令之后）。

我们将创建一个具有最小权限的新用户/角色，以遵循最小权限原则，以增强本地 postgres 服务器的安全性。使用上述命令连接数据库后，使用以下命令创建新用户：

#### 3.1 创建用户和数据库

创建新用户和数据库，并将数据库的所有权分配给新用户。

```postgresql
CREATE USER db_admin WITH PASSWORD 'secure_password';
CREATE DATABASE my_database OWNER db_admin;
```

#### 3.2 切换到目标数据库

切换到新创建的数据库。

```postgresql
\c my_database
```

#### 3.3授予模式的权限

授予新用户对 `public` 模式的使用和创建权限。

```postgresql
GRANT USAGE ON SCHEMA public TO db_admin;
GRANT CREATE ON SCHEMA public TO db_admin;
```

#### 3.4 授予数据库和表的权限

授予新用户对数据库和所有现有表的所有权限。

```postgresql
GRANT ALL PRIVILEGES ON DATABASE my_database TO db_admin;
```

命令执行后，使用 \q 退出并使用新的用户名和密码登录。

通过这些步骤，你可以确保 `db_admin` 用户在 `my_database` 数据库中拥有所有必要的权限。

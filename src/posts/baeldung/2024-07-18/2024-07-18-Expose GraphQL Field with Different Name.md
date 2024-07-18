---
date: 2024-07-18
category:
  - GraphQL
  - Web Services
tag:
  - GraphQL
  - Schema
  - Aliases
head:
  - - meta
    - name: keywords
      content: GraphQL, Web Services, Schema, Aliases
------
# GraphQL字段名称不同

## 1. 概述

GraphQL 已被广泛用作网络服务中的通信模式。**GraphQL 的基本前提是通过客户端应用程序灵活使用。**

在本教程中，我们将探讨灵活性的另一个方面。我们还将探索如何以不同的名称公开 GraphQL 字段。

## 2. GraphQL Schema

让我们以一个拥有不同《作者》的《帖子》的博客为例。GraphQL 模式看起来像这样：

```graphql
query {
    recentPosts(count: 1, offset: 0){
        id
        title
        text
        category
        author {
            id
            name
            thumbnail
        }
    }
}

type Post {
    id: ID!
    title: String!
    text: String!
    category: String
    authorId: Author!
}

type Author {
    id: ID!
    name: String!
    thumbnail: String
    posts: [Post]!
}
```

在这里我们可以获取最近的帖子。**每个 _帖子_ 都会伴随其 _作者_。** 查询的结果如下：

```json
{
    "data": {
        "recentPosts": [
            {
                "id": "Post00",
                "title": "Post 0:0",
                "text": "Post 0 + by author 0",
                "category": null,
                "author": {
                    "id": "Author0",
                    "name": "Author 0",
                    "thumbnail": "http://example.com/authors/0"
                }
            }
        ]
    }
}
```

## 3. 以不同的名称公开 GraphQL 字段

客户端应用程序可能需要使用字段 _first_author_。目前它使用的是 _author_。为了满足这个要求，我们有两个解决方案：

- 更改 GraphQL 服务器中的模式定义
- 利用 GraphQL 中的别名概念

让我们逐一看看两者。

### 3.1. 更改模式

让我们更新 _帖子_ 的模式定义：

```graphql
type Post {
    id: ID!
    title: String!
    text: String!
    category: String
    first_author: Author!
}

```

_author_ 不是一个简单的字段。它是一个复杂的字段。我们还需要更新处理方法以适应这种变化。

**标记为 @SchemaMapping 的 _author(Post post)_ 方法需要更新为 _getFirst_author(Post post)_。或者，需要在 @SchemaMapping 中添加 _field_ 属性以反映新的字段名称。**

这是查询：

```graphql
query{
    recentPosts(count: 1,offset: 0){
        id
        title
        text
        category
        first_author{
            id
            name
            thumbnail
        }
    }
}

```

上述查询的结果如下：

```json
{
    "data": {
        "recentPosts": [
            {
                "id": "Post00",
                "title": "Post 0:0",
                "text": "Post 0 + by author 0",
                "category": null,
                "first_author": {
                    "id": "Author0",
                    "name": "Author 0",
                    "thumbnail": "http://example.com/authors/0"
                }
            }
        ]
    }
}

```

这个解决方案有两个主要问题：

- 它引入了模式和服务器端实现的更改
- 它迫使其他客户端应用程序遵循这个更新的模式定义

这些问题与 GraphQL 提供的灵活性特性相矛盾。

### 3.2. GraphQL 别名

**在 GraphQL 中，别名让我们可以将字段的结果重命名为我们想要的任何名称，而不需要更改模式定义。** 要在查询中引入别名，别名和冒号符号 (:) 必须在 GraphQL 字段之前。

这是查询的演示：

```graphql
query {
    recentPosts(count: 1,offset: 0) {
        id
        title
        text
        category
        first_author:author {
            id
            name
            thumbnail
        }
    }
}

```

上述查询的结果如下：

```json
{
    "data": {
        "recentPosts": [
            {
                "id": "Post00",
                "title": "Post 0:0",
                "text": "Post 0 + by author 0",
                "category": null,
                "first_author": {
                    "id": "Author0",
                    "name": "Author 0",
                    "thumbnail": "http://example.com/authors/0"
                }
            }
        ]
    }
}

```

让我们注意到查询本身是请求第一篇帖子。另一个客户端应用程序可能会请求 _first_post_ 而不是 _recentPosts_。再次，别名将派上用场。

```graphql
query {
    first_post: recentPosts(count: 1,offset: 0) {
        id
        title
        text
        category
        author {
            id
            name
            thumbnail
        }
    }
}

```

上述查询的结果如下：

```json
{
    "data": {
        "first_post": [
            {
                "id": "Post00",
                "title": "Post 0:0",
                "text": "Post 0 + by author 0",
                "category": null,
                "author": {
                    "id": "Author0",
                    "name": "Author 0",
                    "thumbnail": "http://example.com/authors/0"
                }
            }
        ]
    }
}

```

**这两个例子清楚地展示了使用 GraphQL 的灵活性。** 每个客户端应用程序都可以根据要求进行更新。同时，服务器端的模式定义和实现保持不变。

## 4. 结论

在本文中，我们探讨了两种以不同名称公开 GraphQL 字段的方法。我们通过示例介绍了别名的概念，并解释了为什么这是正确的方法。

一如既往，本文的示例代码可在 GitHub 上找到。
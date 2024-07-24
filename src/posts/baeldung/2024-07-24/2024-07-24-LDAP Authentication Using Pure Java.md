---
date: 2022-04-01
category:
  - Java
  - LDAP
tag:
  - LDAP
  - JNDI
  - Java
head:
  - - meta
    - name: keywords
      content: LDAP, JNDI, Java, 认证
------
# LDAP 使用纯 Java 进行认证

## **1. 引言**

在本文中，我们将介绍如何使用纯 Java 进行 LDAP 认证。此外，我们将探讨如何搜索用户的可区分名称（DN）。这很重要，因为 LDAP 需要 DN 来认证用户。

为了进行搜索和用户认证，我们将使用 Java 命名和目录接口（JNDI）的目录服务访问功能。

首先，我们将简要讨论 LDAP 和 JNDI 是什么。然后，我们将讨论如何通过 JNDI API 进行 LDAP 认证。

## **2. LDAP 是什么？**

**轻量级目录访问协议（LDAP）定义了客户端发送请求和从目录服务接收响应的方式**。我们称使用此协议的目录服务为 LDAP 服务器。

**由 LDAP 服务器提供的数据存储在基于 X.500 的信息模型中**。这是一组用于电子目录服务的计算机网络标准。

## **3. JNDI 是什么？**

**JNDI 提供了一个标准 API，供应用程序发现和访问命名和目录服务**。其根本目的是为应用程序提供一种访问组件和资源的方式。这包括本地和网络访问。

命名服务是这种能力的基础，因为它们通过层次命名空间中的名称提供对服务、数据或对象的单点访问。每个这些本地或网络可访问资源的名称在托管命名服务的服务器上配置。

**我们可以通过 JNDI 的命名服务接口访问目录服务，如 LDAP**。这是因为目录服务仅仅是命名服务的一种特殊类型，它使每个命名条目能够关联一个属性列表。

除了属性，每个目录条目可能有一个或多个子项。这使得条目可以层次链接。在 JNDI 中，目录条目的子项被表示为其父上下文的子上下文。

JNDI API 的一个关键好处是它独立于任何底层服务提供程序实现，例如 LDAP。因此，我们可以使用 JNDI 访问 LDAP 目录服务，而无需使用协议特定的 API。

使用 JNDI 不需要外部库，因为它是 Java SE 平台的一部分。此外，作为 Java EE 的核心技术，它被广泛用于实现企业应用程序。

## **4. 使用 JNDI API 进行 LDAP 认证的概念**

在讨论示例代码之前，让我们先了解一下使用 JNDI API 进行基于 LDAP 的认证的基础知识。

要连接到 LDAP 服务器，我们首先需要创建一个 JNDI _InitialDirContext_ 对象。这样做时，我们需要将其构造函数中的环境属性作为 _Hashtable_ 传递以配置它。

其中，我们需要为此 _Hashtable_ 添加属性，以便我们希望认证的用户名和密码。为此，我们必须将用户的 DN 和密码分别设置为 _Context.SECURITY_PRINCIPAL_ 和 _Context.SECURITY_CREDENTIALS_ 属性。

_InitialDirContext_ 实现了 _DirContext_，这是主要的 JNDI 目录服务接口。通过这个接口，我们可以使用我们的新上下文对 LDAP 服务器执行各种目录服务操作。这些包括将名称和属性绑定到对象以及搜索目录条目。

值得注意的是，JNDI 返回的对象将具有与其底层 LDAP 条目相同的名称和属性。因此，要搜索条目，我们可以使用其名称和属性作为查找标准。

一旦我们通过 JNDI 检索到目录条目，我们可以使用 _Attributes_ 接口查看其属性。此外，我们可以使用 _Attribute_ 接口检查每一个属性。

## **5. 如果我们没有用户的 DN 怎么办？**

有时我们没有立即可用的用户 DN 来进行认证。为了解决这个问题，我们首先需要使用管理员凭据创建一个 _InitialDirContext_。之后，我们可以使用它从目录服务器搜索相关用户并获取他的 DN。

然后，一旦我们有了用户的 DN，我们可以通过创建一个新的 _InitialDirContext_ 来认证他，这次使用他的凭据。为此，我们首先需要在环境属性中设置用户的 DN 和密码。然后，我们需要在创建 _InitDirContext_ 时将这些属性传递给它的构造函数。

现在我们已经讨论了如何使用 JNDI API 通过 LDAP 使用用户的 DN 和密码进行用户认证，让我们来看示例代码。

## **6. 示例代码**

在我们的示例中，我们将使用 ApacheDS 目录服务器的嵌入式版本。这是一个使用 Java 构建的 LDAP 服务器，设计为在单元测试中以嵌入式模式运行。

让我们看看如何设置它。

### **6.1. 设置嵌入式 ApacheDS 服务器**

要使用嵌入式 ApacheDS 服务器，我们需要定义 Maven 依赖项：

```
`<dependency>`
    `<groupId>`org.apache.directory.server`</groupId>`
    `<artifactId>`apacheds-test-framework`</artifactId>`
    `<version>`2.0.0.AM26`</version>`
    `<scope>`test`</scope>`
`</dependency>`
```

接下来，我们需要创建一个使用 JUnit 4 的单元测试类。为了在这个类中使用嵌入式 ApacheDS 服务器，我们必须声明它扩展了 ApacheDS 库中的 _AbstractLdapTestUnit_。由于此库尚不兼容 JUnit 5，因此我们需要使用 JUnit 4。

此外，我们还需要在单元测试类声明上方包含 Java 注解以配置服务器。我们可以从稍后将探讨的完整代码示例中看到要给它们的值。

最后，我们还需要将 _users.ldif_ 添加到类路径中。这样，当运行我们的代码示例时，ApacheDS 服务器可以从该文件加载 LDIF 格式的目录条目。这样做时，服务器将加载用户 _Joe Simms_ 的条目。

接下来，我们将讨论将运行对 LDAP 服务器进行认证的示例代码。为了运行它，我们需要将我们的代码添加到我们的单元测试类的方法中。这将使用他在文件中定义的 DN 和密码通过 LDAP 认证 Joe。

### **6.2. 认证用户**

要认证用户 _Joe Simms_，我们需要创建一个新的 _InitialDirContext_ 对象。这会创建到目录服务器的连接，并使用他的 DN 和密码通过 LDAP 认证用户。

为此，我们首先需要将这些环境属性添加到一个 _Hashtable_ 中：

```
Hashtable````<String, String>```` environment = new Hashtable````<String, String>````();

environment.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
environment.put(Context.PROVIDER_URL, "ldap://localhost:10389");
environment.put(Context.SECURITY_AUTHENTICATION, "simple");
environment.put(Context.SECURITY_PRINCIPAL, "cn=Joe Simms,ou=Users,dc=baeldung,dc=com");
environment.put(Context.SECURITY_CREDENTIALS, "12345");
```

接下来，在名为 _authenticateUser_ 的新方法中，我们将通过将环境属性传递到其构造函数中来创建 _InitialDirContext_ 对象。然后，我们将关闭上下文以释放资源：

```
DirContext context = new InitialDirContext(environment);
context.close();
```

最后，我们将认证用户：

```
assertThatCode(() -> authenticateUser(environment)).doesNotThrowAnyException();
```

现在我们已经涵盖了用户认证成功的情况，让我们检查一下当它失败时会发生什么。

### **6.3. 处理用户认证失败**

使用与之前相同的环境属性，让我们通过使用错误的密码使认证失败：

```
environment.put(Context.SECURITY_CREDENTIALS, "wrongpassword");
```

然后，我们将检查使用此密码认证用户是否如预期失败：

```
assertThatExceptionOfType(AuthenticationException.class).isThrownBy(() -> authenticateUser(environment));
```

接下来，让我们讨论当我们没有他的 DN 时如何认证用户。

### **6.4. 以管理员身份查找用户的 DN**

有时当我们想要认证一个用户时，我们没有他立即可用的 DN。在这种情况下，我们首先需要使用管理员凭据创建一个目录上下文来查找用户的 DN，然后使用该 DN 认证用户。

和以前一样，我们首先需要在 _Hashtable_ 中添加一些环境属性。但这次，我们将使用管理员的 DN 作为 _Context.SECURITY_PRINCIPAL_，以及他的默认管理员密码作为 _Context.SECURITY_CREDENTIALS_ 属性：

```
Hashtable````<String, String>```` environment = new Hashtable````<String, String>````();

environment.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
environment.put(Context.PROVIDER_URL, "ldap://localhost:10389");
environment.put(Context.SECURITY_AUTHENTICATION, "simple");
environment.put(Context.SECURITY_PRINCIPAL, "uid=admin,ou=system");
environment.put(Context.SECURITY_CREDENTIALS, "secret");
```

接下来，我们将使用这些属性创建一个 _InitialDirContext_ 对象：

```
DirContext adminContext = new InitialDirContext(environment);
```

这将创建一个目录上下文，与服务器的连接被认证为管理员。这使我们具有搜索用户 DN 的安全权限。

现在我们将定义基于用户 CN（即他的通用名称）的搜索过滤器。

```
String filter = "(&(objectClass=person)(cn=Joe Simms))";
```

然后，使用此 _filter_ 搜索用户，我们将创建一个 _SearchControls_ 对象：

```
String[]attrIDs = { "cn" };
SearchControls searchControls = new SearchControls();
searchControls.setReturningAttributes(attrIDs);
searchControls.setSearchScope(SearchControls.SUBTREE_SCOPE);
```

接下来，我们将使用我们的 _filter_ 和 _SearchControls_ 搜索用户：

```
NamingEnumeration`<SearchResult>` searchResults
  = adminContext.search("dc=baeldung,dc=com", filter, searchControls);

String commonName = null;
String distinguishedName = null;
if (searchResults.hasMore()) {

    SearchResult result = (SearchResult) searchResults.next();
    Attributes attrs = result.getAttributes();

    distinguishedName = result.getNameInNamespace();
    assertThat(distinguishedName, isEqualTo("cn=Joe Simms,ou=Users,dc=baeldung,dc=com")));

    commonName = attrs.get("cn").toString();
    assertThat(commonName, isEqualTo("cn: Joe Simms"));
}

```

现在我们已经获得了用户的 DN，让我们使用它来认证用户。

### **6.5. 使用查找到的用户 DN 进行认证**

现在我们有了用户的 DN 来认证，我们将用用户的 DN 和密码替换现有环境属性中的管理员 DN 和密码：

```
environment.put(Context.SECURITY_PRINCIPAL, distinguishedName);
environment.put(Context.SECURITY_CREDENTIALS, "12345");
```

然后，有了这些设置，让我们认证用户：

```
assertThatCode(() -> authenticateUser(environment)).doesNotThrowAnyException();
```

最后，我们将关闭管理员的上下文以释放资源：

```
adminContext.close();
```

## **7. 结论**

在本文中，我们讨论了如何使用 JNDI 通过用户的 DN 和密码与 LDAP 进行用户认证。

我们还探讨了如果我们没有它，如何查找 DN。

像往常一样，示例的完整源代码可以在 GitHub 上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/23388d092a2958f09a67088ff3bd3cf8?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-security-post-footer-main-1.2.0.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-security-lightbox-icn-1.0.0-1.png)![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/whiteleaf.svg)

OK
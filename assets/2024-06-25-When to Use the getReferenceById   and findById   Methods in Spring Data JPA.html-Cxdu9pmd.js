import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as i,a as s}from"./app-JQDgXkz7.js";const t={},r=s(`<h1 id="在spring-data-jpa中何时使用getreferencebyid-和findbyid-方法" tabindex="-1"><a class="header-anchor" href="#在spring-data-jpa中何时使用getreferencebyid-和findbyid-方法"><span>在Spring Data JPA中何时使用getReferenceById()和findById()方法</span></a></h1><p><em>JpaRepository</em> 提供了基本的CRUD操作方法。然而，其中一些方法并不那么直接明了，有时很难确定哪种方法最适合给定的情况。</p><p><strong><em>getReferenceById(ID)</em> 和 <em>findById(ID)</em> 是经常造成混淆的方法。</strong> 这些方法是 <em>getOne(ID)</em>, findOne(ID), <em>getById(ID)</em> 的新API名称。</p><p>在本教程中，我们将学习它们之间的区别，并找出每种方法可能更适合的情况。</p><p>让我们从这两种方法中最简单的一个开始。这个方法做了它所说的事情，通常开发者对它没有任何问题。它简单地根据特定的ID在仓库中找到一个实体：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Override
Optional\`&lt;T&gt;\` findById(ID id);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>该方法返回一个_Optional_。因此，如果我们传递一个不存在的ID，假设它是空的，这是正确的。</p><p>该方法在内部使用急切加载，所以每当我们调用这个方法时，我们都会向数据库发送请求。让我们看一个例子：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public User findUser(long id) {
    log.info(&quot;Before requesting a user in a findUser method&quot;);
    Optional\`\`\`&lt;User&gt;\`\`\` optionalUser = repository.findById(id);
    log.info(&quot;After requesting a user in a findUser method&quot;);
    User user = optionalUser.orElse(null);
    log.info(&quot;After unwrapping an optional in a findUser method&quot;);
    return user;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码将生成以下日志：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[2023-12-27 12:56:32,506]-[main] INFO  com.baeldung.spring.data.persistence.findvsget.service.SimpleUserService - Before requesting a user in a findUser method
[2023-12-27 12:56:32,508]-[main] DEBUG org.hibernate.SQL -
    select
        user0_.&quot;id&quot; as id1_0_0_,
        user0_.&quot;first_name&quot; as first_na2_0_0_,
        user0_.&quot;second_name&quot; as second_n3_0_0_
    from
        &quot;users&quot; user0_
    where
        user0_.&quot;id&quot;=?
[2023-12-27 12:56:32,508]-[main] TRACE org.hibernate.type.descriptor.sql.BasicBinder - binding parameter [1] as [BIGINT] - [1]
[2023-12-27 12:56:32,510]-[main] INFO  com.baeldung.spring.data.persistence.findvsget.service.SimpleUserService - After requesting a user in a findUser method
[2023-12-27 12:56:32,510]-[main] INFO  com.baeldung.spring.data.persistence.findvsget.service.SimpleUserService - After unwrapping an optional in a findUser method
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Spring可能会在事务中批量请求，但总是会执行它们。</strong> 总的来说，<em>findById(ID)</em> 不会试图让我们感到惊讶，它做了我们期望它做的事情。然而，由于它有一个做类似事情的对应方法，所以产生了混淆。</p><h3 id="_3-getreferencebyid" tabindex="-1"><a class="header-anchor" href="#_3-getreferencebyid"><span>3. <em>getReferenceById()</em></span></a></h3><p>这个方法有一个类似于_findById(ID)_的签名：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Override
T getReferenceById(ID id);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>仅凭签名判断，我们可以假设如果实体不存在，这个方法会抛出一个异常。<strong>这是真的，但这并不是我们拥有的唯一区别。这两种方法之间的主要区别在于 <em>getReferenceById(ID)</em> 是懒加载的。</strong> Spring不会发送数据库请求，直到我们明确地在事务中尝试使用实体。</p><h3 id="_3-1-事务" tabindex="-1"><a class="header-anchor" href="#_3-1-事务"><span>3.1. 事务</span></a></h3><p><strong>每个事务都有一个专用的持久性上下文与之工作。</strong> 有时，我们可以在事务范围之外扩展持久性上下文，但这并不常见，并且只对特定场景有用。让我们看看持久性上下文关于事务的行为：</p><p>在事务中，持久性上下文内的所有实体在数据库中都有直接表示。这是一个管理状态。因此，对实体的所有更改都将反映在数据库中。在事务之外，实体转移到了分离状态，更改在实体被移回管理状态之前不会被反映。</p><p>懒加载实体的行为略有不同。Spring直到我们在持久性上下文中明确使用它们时才会加载它们：</p><p>Spring将分配一个空的代理占位符来延迟从数据库中获取实体。<strong>然而，如果我们不这样做，实体将在事务之外保持为空代理，任何对它的调用都将导致</strong> <em>LazyInitializationException.</em> <strong>然而，如果我们确实调用或以需要内部信息的方式与实体交互，实际的数据库请求将被发出：</strong></p><h3 id="_3-2-非事务性服务" tabindex="-1"><a class="header-anchor" href="#_3-2-非事务性服务"><span>3.2. 非事务性服务</span></a></h3><p>了解事务和持久性上下文的行为后，让我们看看以下非事务性服务，它调用了仓库。<strong><em>findUserReference</em> 没有连接到它的持久性上下文，并且 <em>getReferenceById</em> 将在单独的事务中执行：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public User findUserReference(long id) {
    log.info(&quot;Before requesting a user&quot;);
    User user = repository.getReferenceById(id);
    log.info(&quot;After requesting a user&quot;);
    return user;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码将生成以下日志输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[2023-12-27 13:21:27,590]-[main] INFO  com.baeldung.spring.data.persistence.findvsget.service.TransactionalUserReferenceService - Before requesting a user
[2023-12-27 13:21:27,590]-[main] INFO  com.baeldung.spring.data.persistence.findvsget.service.TransactionalUserReferenceService - After requesting a user
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，没有数据库请求。<strong>在了解了懒加载之后，Spring假设如果我们不在内部使用实体，我们可能不需要它。</strong> 技术上我们不能使用它，因为我们唯一的事务是 <em>getReferenceById</em> 方法内部的事务。因此，我们返回的 <em>user</em> 将是一个空代理，如果我们访问它的内部，将会导致异常：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public User findAndUseUserReference(long id) {
    User user = repository.getReferenceById(id);
    log.info(&quot;Before accessing a username&quot;);
    String firstName = user.getFirstName();
    log.info(&quot;This message shouldn&#39;t be displayed because of the thrown exception: {}&quot;, firstName);
    return user;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-事务性服务" tabindex="-1"><a class="header-anchor" href="#_3-3-事务性服务"><span>3.3. 事务性服务</span></a></h3><p>让我们看看如果我们使用一个带有 <em>@Transactional</em> 服务的行为：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Transactional
public User findUserReference(long id) {
    log.info(&quot;Before requesting a user&quot;);
    User user = repository.getReferenceById(id);
    log.info(&quot;After requesting a user&quot;);
    return user;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将给我们一个与前面例子相同的原因的结果，因为我们没有在事务内使用实体：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[2023-12-27 13:32:44,486]-[main] INFO  com.baeldung.spring.data.persistence.findvsget.service.TransactionalUserReferenceService - Before requesting a user
[2023-12-27 13:32:44,486]-[main] INFO  com.baeldung.spring.data.persistence.findvsget.service.TransactionalUserReferenceService - After requesting a user
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，任何尝试在这个事务性服务方法之外与这个用户交互的行为都将导致异常：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void whenFindUserReferenceUsingOutsideServiceThenThrowsException() {
    User user = transactionalService.findUserReference(EXISTING_ID);
    assertThatExceptionOfType(LazyInitializationException.class)
      .isThrownBy(user::getFirstName);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，现在，<em>findUserReference</em> 方法定义了我们事务的范围。这意味着我们可以尝试在我们的服务方法中访问 <em>user</em>，它应该会导致对数据库的调用：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Transactional
public User findAndUseUserReference(long id) {
    User user = repository.getReferenceById(id);
    log.info(&quot;Before accessing a username&quot;);
    String firstName = user.getFirstName();
    log.info(&quot;After accessing a username: {}&quot;, firstName);
    return user;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码将以以下顺序输出消息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[2023-12-27 13:32:44,331]-[main] INFO  com.baeldung.spring.data.persistence.findvsget.service.TransactionalUserReferenceService - Before accessing a username
[2023-12-27 13:32:44,331]-[main] DEBUG org.hibernate.SQL -
    select
        user0_.&quot;id&quot; as id1_0_0_,
        user0_.&quot;first_name&quot; as first_na2_0_0_,
        user0_.&quot;second_name&quot; as second_n3_0_0_
    from
        &quot;users&quot; user0_
    where
        user0_.&quot;id&quot;=?
[2023-12-27 13:32:44,331]-[main] TRACE org.hibernate.type.descriptor.sql.BasicBinder - binding parameter [1] as [BIGINT] - [1]
[2023-12-27 13:32:44,331]-[main] INFO  com.baeldung.spring.data.persistence.findvsget.service.TransactionalUserReferenceService - After accessing a username: Saundra
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们调用 <em>getReferenceById()</em> 时，数据库请求并没有发出，而是在我们调用 <em>user.getFirstName()</em> 时发出的。</p><h3 id="_3-3-1-事务性服务与新的仓库事务" tabindex="-1"><a class="header-anchor" href="#_3-3-1-事务性服务与新的仓库事务"><span>3.3.1 事务性服务与新的仓库事务</span></a></h3><p>让我们检查一个更复杂的例子。假设我们有一个仓库方法，每次调用它时都会创建一个单独的事务：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Override
@Transactional(propagation = Propagation.REQUIRES_NEW)
User getReferenceById(Long id);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong><em>Propagation.REQUIRES_NEW</em> 意味着外部事务不会传播，仓库方法将创建它自己的持久性上下文。</strong> 在这种情况下，即使我们使用事务性服务，Spring也会创建两个不相互交互的单独持久性上下文，任何尝试使用 <em>user</em> 都会导致异常：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void whenFindUserReferenceUsingInsideServiceThenThrowsExceptionDueToSeparateTransactions() {
    assertThatExceptionOfType(LazyInitializationException.class)
      .isThrownBy(() -&gt;
        transactionalServiceWithNewTransactionRepository.findAndUseUserReference(EXISTING_ID)
      );
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以使用几种不同的传播配置来创建事务之间更复杂的交互，它们可能会产生不同的结果。</p><h3 id="_3-4-不进行获取访问实体" tabindex="-1"><a class="header-anchor" href="#_3-4-不进行获取访问实体"><span>3.4. 不进行获取访问实体</span></a></h3><p>让我们考虑一个现实生活场景。假设我们有一个 <em>Group</em> 类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Entity
@Table(name = &quot;group&quot;)
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @OneToOne
    private User administrator;
    @OneToMany(mappedBy = &quot;id&quot;)
    private Set\`\`\`&lt;User&gt;\`\`\` users = new HashSet&lt;&gt;();
    // getters, setters 和其他方法
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们想要将一个用户添加为一个组的管理员，我们可以使用 <em>findById()</em> 或 <em>getReferenceById()</em>。在这个测试中，我们使用 <em>findById()</em> 获取一个用户，并使其成为一个新的组的管理员：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void givenEmptyGroup_whenAssigningAdministratorWithFindBy_thenAdditionalLookupHappens() {
    Optional\`\`\`&lt;User&gt;\`\`\` optionalUser = userRepository.findById(1L);
    assertThat(optionalUser).isPresent();
    User user = optionalUser.get();
    Group group = new Group();
    group.setAdministrator(user);
    groupRepository.save(group);
    assertSelectCount(2);
    assertInsertCount(1);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可能会合理地假设我们应该有一个 SELECT 查询，但我们得到了两个。这是因为额外的ORM检查。让我们使用 <em>getReferenceById()</em> 做类似的操作：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void givenEmptyGroup_whenAssigningAdministratorWithGetByReference_thenNoAdditionalLookupHappens() {
    User user = userRepository.getReferenceById(1L);
    Group group = new Group();
    group.setAdministrator(user);
    groupRepository.save(group);
    assertSelectCount(0);
    assertInsertCount(1);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们不需要关于用户的额外信息；我们只需要一个ID。因此，我们可以使用 <em>getReferenceById()</em> 方便地提供的占位符，我们有一个单一的 INSERT 而没有额外的 SELECTs。</p><p>这样，数据库在映射时会照顾数据的正确性。例如，我们使用错误的ID时会抛出异常：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void givenEmptyGroup_whenAssigningIncorrectAdministratorWithGetByReference_thenErrorIsThrown() {
    User user = userRepository.getReferenceById(-1L);
    Group group = new Group();
    group.setAdministrator(user);
    assertThatExceptionOfType(DataIntegrityViolationException.class)
      .isThrownBy(() -&gt; {
          groupRepository.save(group);
      });
    assertSelectCount(0);
    assertInsertCount(1);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同时，我们仍然只有一个 INSERT 而没有任何 SELECTs。</p><p>然而，我们不能使用相同的方法来添加用户作为组成员。因为我们使用 <em>Set</em>，将调用 <em>equals(T)</em> 和 <em>hashCode()</em> 方法。Hibernate会抛出异常，因为 <em>getReferenceById()</em> 没有获取一个真实的对象：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void givenEmptyGroup_whenAddingUserWithGetByReference_thenTryToAccessInternalsAndThrowError() {
    User user = userRepository.getReferenceById(1L);
    Group group = new Group();
    assertThatExceptionOfType(LazyInitializationException.class)
      .isThrownBy(() -&gt; {
          group.addUser(user);
      });
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，关于方法的决定应该考虑我们使用实体的数据类型和上下文。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p><em>findById()</em> 和 <em>getReferenceById()</em> 之间的主要区别在于它们将实体加载到持久性上下文的时间。理解这一点可能有助于实现优化并避免不必要的数据库查找。这个过程与事务及其传播紧密相关。这就是为什么应该观察事务之间的关系。</p><p>像往常一样，本教程中使用的所有代码都可以在GitHub上找到。 OK</p>`,63),a=[r];function d(l,c){return i(),n("div",null,a)}const v=e(t,[["render",d],["__file","2024-06-25-When to Use the getReferenceById   and findById   Methods in Spring Data JPA.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-06-25/2024-06-25-When%20to%20Use%20the%20getReferenceById%20%20%20and%20findById%20%20%20Methods%20in%20Spring%20Data%20JPA.html","title":"在Spring Data JPA中何时使用getReferenceById()和findById()方法","lang":"zh-CN","frontmatter":{"date":"2023-12-27T00:00:00.000Z","category":["Spring Data JPA","CRUD"],"tag":["getReferenceById","findById"],"head":[["meta",{"name":"keywords","content":"Spring Data JPA, getReferenceById, findById, JPA, 数据库操作"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-25/2024-06-25-When%20to%20Use%20the%20getReferenceById%20%20%20and%20findById%20%20%20Methods%20in%20Spring%20Data%20JPA.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Spring Data JPA中何时使用getReferenceById()和findById()方法"}],["meta",{"property":"og:description","content":"在Spring Data JPA中何时使用getReferenceById()和findById()方法 JpaRepository 提供了基本的CRUD操作方法。然而，其中一些方法并不那么直接明了，有时很难确定哪种方法最适合给定的情况。 getReferenceById(ID) 和 findById(ID) 是经常造成混淆的方法。 这些方法是 get..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-25T05:32:00.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"getReferenceById"}],["meta",{"property":"article:tag","content":"findById"}],["meta",{"property":"article:published_time","content":"2023-12-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-25T05:32:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Spring Data JPA中何时使用getReferenceById()和findById()方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-12-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-25T05:32:00.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Spring Data JPA中何时使用getReferenceById()和findById()方法 JpaRepository 提供了基本的CRUD操作方法。然而，其中一些方法并不那么直接明了，有时很难确定哪种方法最适合给定的情况。 getReferenceById(ID) 和 findById(ID) 是经常造成混淆的方法。 这些方法是 get..."},"headers":[{"level":3,"title":"3. getReferenceById()","slug":"_3-getreferencebyid","link":"#_3-getreferencebyid","children":[]},{"level":3,"title":"3.1. 事务","slug":"_3-1-事务","link":"#_3-1-事务","children":[]},{"level":3,"title":"3.2. 非事务性服务","slug":"_3-2-非事务性服务","link":"#_3-2-非事务性服务","children":[]},{"level":3,"title":"3.3. 事务性服务","slug":"_3-3-事务性服务","link":"#_3-3-事务性服务","children":[]},{"level":3,"title":"3.3.1 事务性服务与新的仓库事务","slug":"_3-3-1-事务性服务与新的仓库事务","link":"#_3-3-1-事务性服务与新的仓库事务","children":[]},{"level":3,"title":"3.4. 不进行获取访问实体","slug":"_3-4-不进行获取访问实体","link":"#_3-4-不进行获取访问实体","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719293520000,"updatedTime":1719293520000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.85,"words":2355},"filePathRelative":"posts/baeldung/2024-06-25/2024-06-25-When to Use the getReferenceById   and findById   Methods in Spring Data JPA.md","localizedDate":"2023年12月27日","excerpt":"\\n<p><em>JpaRepository</em> 提供了基本的CRUD操作方法。然而，其中一些方法并不那么直接明了，有时很难确定哪种方法最适合给定的情况。</p>\\n<p><strong><em>getReferenceById(ID)</em> 和 <em>findById(ID)</em> 是经常造成混淆的方法。</strong> 这些方法是 <em>getOne(ID)</em>, findOne(ID), <em>getById(ID)</em> 的新API名称。</p>\\n<p>在本教程中，我们将学习它们之间的区别，并找出每种方法可能更适合的情况。</p>\\n<p>让我们从这两种方法中最简单的一个开始。这个方法做了它所说的事情，通常开发者对它没有任何问题。它简单地根据特定的ID在仓库中找到一个实体：</p>","autoDesc":true}');export{v as comp,m as data};

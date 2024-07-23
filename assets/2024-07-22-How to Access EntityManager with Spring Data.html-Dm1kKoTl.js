import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a as i}from"./app-BXV9mEGh.js";const a={},r=i(`<h1 id="如何在spring-data中访问entitymanager-baeldung" tabindex="-1"><a class="header-anchor" href="#如何在spring-data中访问entitymanager-baeldung"><span>如何在Spring Data中访问EntityManager | Baeldung</span></a></h1><h2 id="_1-概览" tabindex="-1"><a class="header-anchor" href="#_1-概览"><span>1. 概览</span></a></h2><p>在开发Spring Data应用程序时，我们通常不需要直接访问_EntityManager_。然而，在某些情况下，我们可能想要访问它，比如创建自定义查询或分离实体。</p><p>在这个快速教程中，我们将学习如何通过扩展Spring Data Repository来访问_EntityManager_。</p><h2 id="_2-访问entitymanager" tabindex="-1"><a class="header-anchor" href="#_2-访问entitymanager"><span>2. 访问EntityManager</span></a></h2><p>我们可以通过创建一个自定义仓库来获取_EntityManager_，例如扩展内置的_JpaRepository_。</p><p>首先，我们将定义一个示例_实体_，用于存储我们想要在数据库中存储的用户：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Entity
public class User {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String email;
    // ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在_JpaRepository_中，我们没有直接访问_EntityManager_的权限，因此我们需要创建我们自己的。</p><p>让我们创建一个带有自定义查找方法的仓库：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public interface CustomUserRepository {
    User customFindMethod(Long id);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用_@PeristenceContext_，我们可以在实现类中注入_EntityManager_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class CustomUserRepositoryImpl implements CustomUserRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public User customFindMethod(Long id) {
        return (User) entityManager.createQuery(&quot;FROM User u WHERE u.id = :id&quot;)
          .setParameter(&quot;id&quot;, id)
          .getSingleResult();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，我们可以使用_@PersistenceUnit_注解，在这种情况下我们将访问_EntityManagerFactory_，并从中获取_EntityManager_。</p><p>最后，我们将创建一个扩展了_JpaRepository_和_CustomRepository_的_Repository_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Repository
public interface UserRepository extends JpaRepository\`&lt;User, Long&gt;\`, CustomUserRepository {
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，我们可以创建一个_Spring Boot_应用程序，并进行测试以确保一切都连接起来并按预期工作：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@SpringBootTest(classes = CustomRepositoryApplication.class)
class CustomRepositoryUnitTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void givenCustomRepository_whenInvokeCustomFindMethod_thenEntityIsFound() {
        User user = new User();
        user.setEmail(&quot;foo@gmail.com&quot;);
        user.setName(&quot;userName&quot;);

        User persistedUser = userRepository.save(user);

        assertEquals(persistedUser, userRepository.customFindMethod(user.getId()));
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-结论" tabindex="-1"><a class="header-anchor" href="#_3-结论"><span>3. 结论</span></a></h2><p>在本文中，我们查看了一个在Spring Data应用程序中访问_EntityManager_的快速示例。我们可以在自定义仓库中访问_EntityManager_，并通过扩展其功能来使用我们的Spring Data Repository。</p><p>如常，这些示例的代码可以在GitHub上找到。</p>`,21),s=[r];function d(l,o){return n(),t("div",null,s)}const u=e(a,[["render",d],["__file","2024-07-22-How to Access EntityManager with Spring Data.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-22/2024-07-22-How%20to%20Access%20EntityManager%20with%20Spring%20Data.html","title":"如何在Spring Data中访问EntityManager | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Data","JPA"],"tag":["EntityManager","Repository"],"head":[["meta",{"name":"keywords","content":"Spring Data, JPA, EntityManager, Repository"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-22/2024-07-22-How%20to%20Access%20EntityManager%20with%20Spring%20Data.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在Spring Data中访问EntityManager | Baeldung"}],["meta",{"property":"og:description","content":"如何在Spring Data中访问EntityManager | Baeldung 1. 概览 在开发Spring Data应用程序时，我们通常不需要直接访问_EntityManager_。然而，在某些情况下，我们可能想要访问它，比如创建自定义查询或分离实体。 在这个快速教程中，我们将学习如何通过扩展Spring Data Repository来访问_..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-22T11:15:00.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"EntityManager"}],["meta",{"property":"article:tag","content":"Repository"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-22T11:15:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在Spring Data中访问EntityManager | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-22T11:15:00.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在Spring Data中访问EntityManager | Baeldung 1. 概览 在开发Spring Data应用程序时，我们通常不需要直接访问_EntityManager_。然而，在某些情况下，我们可能想要访问它，比如创建自定义查询或分离实体。 在这个快速教程中，我们将学习如何通过扩展Spring Data Repository来访问_..."},"headers":[{"level":2,"title":"1. 概览","slug":"_1-概览","link":"#_1-概览","children":[]},{"level":2,"title":"2. 访问EntityManager","slug":"_2-访问entitymanager","link":"#_2-访问entitymanager","children":[]},{"level":2,"title":"3. 结论","slug":"_3-结论","link":"#_3-结论","children":[]}],"git":{"createdTime":1721646900000,"updatedTime":1721646900000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.63,"words":489},"filePathRelative":"posts/baeldung/2024-07-22/2024-07-22-How to Access EntityManager with Spring Data.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概览</h2>\\n<p>在开发Spring Data应用程序时，我们通常不需要直接访问_EntityManager_。然而，在某些情况下，我们可能想要访问它，比如创建自定义查询或分离实体。</p>\\n<p>在这个快速教程中，我们将学习如何通过扩展Spring Data Repository来访问_EntityManager_。</p>\\n<h2>2. 访问EntityManager</h2>\\n<p>我们可以通过创建一个自定义仓库来获取_EntityManager_，例如扩展内置的_JpaRepository_。</p>\\n<p>首先，我们将定义一个示例_实体_，用于存储我们想要在数据库中存储的用户：</p>","autoDesc":true}');export{u as comp,m as data};

import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DzJ3ruqA.js";const p={},o=t(`<hr><h1 id="jpa仓库的bootstrap模式" tabindex="-1"><a class="header-anchor" href="#jpa仓库的bootstrap模式"><span>JPA仓库的Bootstrap模式</span></a></h1><p>在这篇简短的教程中，我们将专注于Spring为JPA仓库提供的不同类型的_BootstrapMode_，这些模式用于改变它们的实例化协调方式。</p><p>在启动时，Spring Data会扫描仓库并将其注册为单例作用域的bean定义。在它们的初始化过程中，仓库会立即获得一个_EntityManager_。具体来说，它们会获取JPA元模型并验证声明的查询。</p><p>默认情况下，JPA是同步启动的。因此，仓库的实例化会被阻塞，直到启动过程完成。随着仓库数量的增加，应用程序可能需要很长时间才能启动并开始接受请求。</p><h3 id="_2-1-默认" tabindex="-1"><a class="header-anchor" href="#_2-1-默认"><span>2.1. 默认</span></a></h3><p>Bootstrap模式的默认值将急切地实例化仓库。因此，像任何其他Spring beans一样，它们的初始化将在注入时发生。</p><p>让我们创建一个_Todo_实体：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Todo</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> label<span class="token punctuation">;</span>

    <span class="token comment">// 标准setter和getter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们需要它的关联仓库。让我们创建一个扩展_CrudRepository_的仓库：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">TodoRepository</span> <span class="token keyword">extends</span> <span class="token class-name">CrudRepository</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Todo</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>\` <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们添加一个使用我们仓库的测试：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@DataJpaTest</span>
<span class="token keyword">class</span> <span class="token class-name">BootstrapmodeDefaultIntegrationTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">TodoRepository</span> todoRepository<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">givenBootstrapmodeValueIsDefault_whenCreatingTodo_shouldSuccess</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Todo</span> todo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Todo</span><span class="token punctuation">(</span><span class="token string">&quot;Something to be done&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">assertThat</span><span class="token punctuation">(</span>todoRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>todo<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasNoNullFieldsOrProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动我们的测试后，让我们查看日志，我们将发现Spring是如何启动我们的_TodoRepository_的：</p><div class="language-log line-numbers-mode" data-ext="log" data-title="log"><pre class="language-log"><code><span class="token punctuation">[</span><span class="token date number">2022-03-22</span> <span class="token time number">14:46:47,597</span><span class="token punctuation">]</span><span class="token operator">-</span><span class="token punctuation">[</span>main<span class="token punctuation">]</span> <span class="token level info keyword">INFO</span>  org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>repository<span class="token punctuation">.</span>config<span class="token punctuation">.</span>RepositoryConfigurationDelegate <span class="token operator">-</span> 在DEFAULT模式下启动Spring Data JPA仓库。
<span class="token punctuation">[</span><span class="token date number">2022-03-22</span> <span class="token time number">14:46:47,737</span><span class="token punctuation">]</span><span class="token operator">-</span><span class="token punctuation">[</span>main<span class="token punctuation">]</span> <span class="token level trace comment">TRACE</span> org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>repository<span class="token punctuation">.</span>config<span class="token punctuation">.</span>RepositoryConfigurationDelegate <span class="token operator">-</span> Spring Data JPA <span class="token operator">-</span> 注册仓库：todoRepository <span class="token operator">-</span> 接口：com<span class="token punctuation">.</span>baeldung<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>bootstrapmode<span class="token punctuation">.</span>repository<span class="token punctuation">.</span>TodoRepository <span class="token operator">-</span> 工厂：org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>jpa<span class="token punctuation">.</span>repository<span class="token punctuation">.</span>support<span class="token punctuation">.</span>JpaRepositoryFactoryBean
<span class="token punctuation">[</span><span class="token date number">2022-03-22</span> <span class="token time number">14:46:49,718</span><span class="token punctuation">]</span><span class="token operator">-</span><span class="token punctuation">[</span>main<span class="token punctuation">]</span> <span class="token level debug keyword">DEBUG</span> org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>repository<span class="token punctuation">.</span>core<span class="token punctuation">.</span>support<span class="token punctuation">.</span>RepositoryFactorySupport <span class="token operator">-</span> 初始化com<span class="token punctuation">.</span>baeldung<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>bootstrapmode<span class="token punctuation">.</span>repository<span class="token punctuation">.</span>TodoRepository的仓库实例<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">[</span><span class="token date number">2022-03-22</span> <span class="token time number">14:46:49,792</span><span class="token punctuation">]</span><span class="token operator">-</span><span class="token punctuation">[</span>main<span class="token punctuation">]</span> <span class="token level debug keyword">DEBUG</span> org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>repository<span class="token punctuation">.</span>core<span class="token punctuation">.</span>support<span class="token punctuation">.</span>RepositoryFactorySupport <span class="token operator">-</span> 完成com<span class="token punctuation">.</span>baeldung<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>bootstrapmode<span class="token punctuation">.</span>repository<span class="token punctuation">.</span>TodoRepository的仓库实例的创建。
<span class="token punctuation">[</span><span class="token date number">2022-03-22</span> <span class="token time number">14:46:49,858</span><span class="token punctuation">]</span><span class="token operator">-</span><span class="token punctuation">[</span>main<span class="token punctuation">]</span> <span class="token level info keyword">INFO</span>  com<span class="token punctuation">.</span>baeldung<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>bootstrapmode<span class="token punctuation">.</span>BootstrapmodeDefaultIntegrationTest <span class="token operator">-</span> 在<span class="token number">3.547</span>秒内启动BootstrapmodeDefaultIntegrationTest（JVM运行了<span class="token number">4.877</span>秒）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们的示例中，我们提前初始化仓库，并在应用程序启动后使它们可用。</p><h3 id="_2-2-延迟" tabindex="-1"><a class="header-anchor" href="#_2-2-延迟"><span>2.2. 延迟</span></a></h3><p>通过使用延迟的_BootstrapMode_为JPA仓库，Spring注册了我们仓库的bean定义，但不会立即实例化它。因此，使用延迟选项，首次使用会触发其初始化。</p><p>让我们修改我们的测试，并将延迟选项应用于_bootstrapMode_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@DataJpaTest</span><span class="token punctuation">(</span>bootstrapMode <span class="token operator">=</span> <span class="token class-name">BootstrapMode</span><span class="token punctuation">.</span><span class="token constant">LAZY</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后，让我们使用我们的新配置启动我们的测试，并检查相应的日志：</p><div class="language-log line-numbers-mode" data-ext="log" data-title="log"><pre class="language-log"><code><span class="token punctuation">[</span><span class="token date number">2022-03-22</span> <span class="token time number">15:09:01,360</span><span class="token punctuation">]</span><span class="token operator">-</span><span class="token punctuation">[</span>main<span class="token punctuation">]</span> <span class="token level info keyword">INFO</span>  org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>repository<span class="token punctuation">.</span>config<span class="token punctuation">.</span>RepositoryConfigurationDelegate <span class="token operator">-</span> 在LAZY模式下启动Spring Data JPA仓库。
<span class="token punctuation">[</span><span class="token date number">2022-03-22</span> <span class="token time number">15:09:01,398</span><span class="token punctuation">]</span><span class="token operator">-</span><span class="token punctuation">[</span>main<span class="token punctuation">]</span> <span class="token level trace comment">TRACE</span> org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>repository<span class="token punctuation">.</span>config<span class="token punctuation">.</span>RepositoryConfigurationDelegate <span class="token operator">-</span> Spring Data JPA <span class="token operator">-</span> 注册仓库：todoRepository <span class="token operator">-</span> 接口：com<span class="token punctuation">.</span>baeldung<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>bootstrapmode<span class="token punctuation">.</span>repository<span class="token punctuation">.</span>TodoRepository <span class="token operator">-</span> 工厂：org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>jpa<span class="token punctuation">.</span>repository<span class="token punctuation">.</span>support<span class="token punctuation">.</span>JpaRepositoryFactoryBean
<span class="token punctuation">[</span><span class="token date number">2022-03-22</span> <span class="token time number">15:09:01,971</span><span class="token punctuation">]</span><span class="token operator">-</span><span class="token punctuation">[</span>main<span class="token punctuation">]</span> <span class="token level info keyword">INFO</span>  com<span class="token punctuation">.</span>baeldung<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>bootstrapmode<span class="token punctuation">.</span>BootstrapmodeLazyIntegrationTest <span class="token operator">-</span> 在<span class="token number">1.299</span>秒内启动BootstrapmodeLazyIntegrationTest（JVM运行了<span class="token number">2.148</span>秒）
<span class="token punctuation">[</span><span class="token date number">2022-03-22</span> <span class="token time number">15:09:01,976</span><span class="token punctuation">]</span><span class="token operator">-</span><span class="token punctuation">[</span>main<span class="token punctuation">]</span> <span class="token level debug keyword">DEBUG</span> org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>repository<span class="token punctuation">.</span>config<span class="token punctuation">.</span>RepositoryConfigurationDelegate<span class="token operator">$</span>LazyRepositoryInjectionPointResolver <span class="token operator">-</span> 为com<span class="token punctuation">.</span>baeldung<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>bootstrapmode<span class="token punctuation">.</span>repository<span class="token punctuation">.</span>TodoRepository创建延迟注入代理<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">[</span><span class="token date number">2022-03-22</span> <span class="token time number">15:09:02,588</span><span class="token punctuation">]</span><span class="token operator">-</span><span class="token punctuation">[</span>main<span class="token punctuation">]</span> <span class="token level debug keyword">DEBUG</span> org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>repository<span class="token punctuation">.</span>core<span class="token punctuation">.</span>support<span class="token punctuation">.</span>RepositoryFactorySupport <span class="token operator">-</span> 初始化com<span class="token punctuation">.</span>baeldung<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>bootstrapmode<span class="token punctuation">.</span>repository<span class="token punctuation">.</span>TodoRepository的仓库实例<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该注意到这里的一些缺点：</p><ul><li>Spring可能在没有初始化仓库的情况下开始接受请求，从而增加了首次处理请求时的延迟。</li><li>将_BootstrapMode_设置为全局延迟是容易出错的。Spring不会验证不在我们测试中的仓库中包含的查询和元数据。</li></ul><p><strong>我们只能在开发期间使用延迟启动，以避免部署一个可能存在初始化错误的应用程序到生产环境中</strong>。我们可以使用Spring Profiles来优雅地实现这一点。</p><h3 id="_2-3-延迟" tabindex="-1"><a class="header-anchor" href="#_2-3-延迟"><span>2.3. 延迟</span></a></h3><p>延迟是异步启动JPA的正确选项。因此，仓库不需要等待_EntityManagerFactory_的初始化。</p><p>让我们在一个配置类中声明一个_AsyncTaskExecutor_，使用_ThreadPoolTaskExecutor_ - 它的Spring实现之一 - 并覆盖返回_Future_的_submit_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token class-name">AsyncTaskExecutor</span> <span class="token function">delayedTaskExecutor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ThreadPoolTaskExecutor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> \`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>\`\`\` <span class="token class-name">Future</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>\`\`\` <span class="token function">submit</span><span class="token punctuation">(</span><span class="token class-name">Callable</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span>\`\`\` task<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">5000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">interrupt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">return</span> task<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们按照我们的JPA与Spring指南添加一个_EntityManagerFactory_ bean，并指明我们想要使用我们的异步执行器进行后台启动：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token class-name">LocalContainerEntityManagerFactoryBean</span> <span class="token function">entityManagerFactory</span><span class="token punctuation">(</span><span class="token class-name">DataSource</span> dataSource<span class="token punctuation">,</span> <span class="token class-name">AsyncTaskExecutor</span> delayedTaskExecutor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">LocalContainerEntityManagerFactoryBean</span> factory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LocalContainerEntityManagerFactoryBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    factory<span class="token punctuation">.</span><span class="token function">setPackagesToScan</span><span class="token punctuation">(</span><span class="token string">&quot;com.baeldung.boot.bootstrapmode&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    factory<span class="token punctuation">.</span><span class="token function">setJpaVendorAdapter</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">HibernateJpaVendorAdapter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    factory<span class="token punctuation">.</span><span class="token function">setDataSource</span><span class="token punctuation">(</span>dataSource<span class="token punctuation">)</span><span class="token punctuation">;</span>
    factory<span class="token punctuation">.</span><span class="token function">setBootstrapExecutor</span><span class="token punctuation">(</span>delayedTaskExecutor<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Map</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\` properties <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    properties<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;hibernate.hbm2ddl.auto&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;create-drop&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    factory<span class="token punctuation">.</span><span class="token function">setJpaPropertyMap</span><span class="token punctuation">(</span>properties<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> factory<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们修改我们的测试以启用延迟启动模式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@DataJpaTest</span><span class="token punctuation">(</span>bootstrapMode <span class="token operator">=</span> <span class="token class-name">BootstrapMode</span><span class="token punctuation">.</span><span class="token constant">DEFERRED</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们再次启动我们的测试并检查日志：</p><div class="language-log line-numbers-mode" data-ext="log" data-title="log"><pre class="language-log"><code><span class="token punctuation">[</span><span class="token date number">2022-03-23</span> <span class="token time number">10:31:16,513</span><span class="token punctuation">]</span><span class="token operator">-</span><span class="token punctuation">[</span>main<span class="token punctuation">]</span> <span class="token level info keyword">INFO</span>  org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>repository<span class="token punctuation">.</span>config<span class="token punctuation">.</span>RepositoryConfigurationDelegate <span class="token operator">-</span> 在DEFERRED模式下启动Spring Data JPA仓库。
<span class="token punctuation">[</span><span class="token date number">2022-03-23</span> <span class="token time number">10:31:16,543</span><span class="token punctuation">]</span><span class="token operator">-</span><span class="token punctuation">[</span>main<span class="token punctuation">]</span> <span class="token level trace comment">TRACE</span> org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>repository<span class="token punctuation">.</span>config<span class="token punctuation">.</span>RepositoryConfigurationDelegate <span class="token operator">-</span> Spring Data JPA <span class="token operator">-</span> 注册仓库：todoRepository <span class="token operator">-</span> 接口：com<span class="token punctuation">.</span>baeldung<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>bootstrapmode<span class="token punctuation">.</span>repository<span class="token punctuation">.</span>TodoRepository <span class="token operator">-</span> 工厂：org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>jpa<span class="token punctuation">.</span>repository<span class="token punctuation">.</span>support<span class="token punctuation">.</span>JpaRepositoryFactoryBean
<span class="token punctuation">[</span><span class="token date number">2022-03-23</span> <span class="token time number">10:31:16,545</span><span class="token punctuation">]</span><span class="token operator">-</span><span class="token punctuation">[</span>main<span class="token punctuation">]</span> <span class="token level debug keyword">DEBUG</span> org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>repository<span class="token punctuation">.</span>config<span class="token punctuation">.</span>RepositoryConfigurationDelegate <span class="token operator">-</span> 注册延仓库初始化侦听器。
<span class="token punctuation">[</span><span class="token date number">2022-03-23</span> <span class="token time number">10:31:17,108</span><span class="token punctuation">]</span><span class="token operator">-</span><span class="token punctuation">[</span>main<span class="token punctuation">]</span> <span class="token level info keyword">INFO</span>  org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>repository<span class="token punctuation">.</span>config<span class="token punctuation">.</span>DeferredRepositoryInitializationListener <span class="token operator">-</span> 触发Spring Data仓库的延迟初始化<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">[</span><span class="token date number">2022-03-23</span> <span class="token time number">10:31:22,538</span><span class="token punctuation">]</span><span class="token operator">-</span><span class="token punctuation">[</span>main<span class="token punctuation">]</span> <span class="token level debug keyword">DEBUG</span> org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>repository<span class="token punctuation">.</span>core<span class="token punctuation">.</span>support<span class="token punctuation">.</span>RepositoryFactorySupport <span class="token operator">-</span> 初始化com<span class="token punctuation">.</span>baeldung<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>bootstrapmode<span class="token punctuation">.</span>repository<span class="token punctuation">.</span>TodoRepository的仓库实例<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">[</span><span class="token date number">2022-03-23</span> <span class="token time number">10:31:22,572</span><span class="token punctuation">]</span><span class="token operator">-</span><span class="token punctuation">[</span>main<span class="token punctuation">]</span> <span class="token level info keyword">INFO</span>  com<span class="token punctuation">.</span>baeldung<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>bootstrapmode<span class="token punctuation">.</span>BootstrapmodeDeferredIntegrationTest <span class="token operator">-</span> 在<span class="token number">6.769</span>秒内启动BootstrapmodeDeferredIntegrationTest（JVM运行了<span class="token number">7.519</span>秒）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，应用程序上下文启动完成触发了仓库的初始化。简而言之，Spring将仓库标记为延迟，并注册了一个_DeferredRepositoryInitializationListener_ bean。当_ApplicationContext_触发一个_ContextRefreshedEvent_时，它初始化所有仓库。</p><p><strong>因此，在应用程序启动之前，Spring Data初始化仓库并验证它们包含的查询和元数据</strong>。</p><h2 id="_3-结论在这篇文章中-我们探讨了不同的方式来初始化jpa仓库-以及在哪些情况下使用它们。" tabindex="-1"><a class="header-anchor" href="#_3-结论在这篇文章中-我们探讨了不同的方式来初始化jpa仓库-以及在哪些情况下使用它们。"><span>3. 结论在这篇文章中，<strong>我们探讨了不同的方式来初始化JPA仓库，以及在哪些情况下使用它们</strong>。</span></a></h2><p>像往常一样，本文中使用的所有代码示例都可以在GitHub上找到。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/custom_avatars/david-martinez-150x150.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-icn-1.0.0.png" alt="img" loading="lazy"></p><p>OK</p>`,41),e=[o];function c(i,u){return s(),a("div",null,e)}const k=n(p,[["render",c],["__file","2024-07-20-BootstrapMode for JPA Repositories.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-20/2024-07-20-BootstrapMode%20for%20JPA%20Repositories.html","title":"JPA仓库的Bootstrap模式","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Data JPA","JPA Repository"],"tag":["Spring","JPA","Repository"],"head":[["meta",{"name":"BootstrapMode for JPA Repositories","content":"探索Spring Data JPA仓库的不同启动模式，以优化应用程序启动时间。"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-20/2024-07-20-BootstrapMode%20for%20JPA%20Repositories.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"JPA仓库的Bootstrap模式"}],["meta",{"property":"og:description","content":"JPA仓库的Bootstrap模式 在这篇简短的教程中，我们将专注于Spring为JPA仓库提供的不同类型的_BootstrapMode_，这些模式用于改变它们的实例化协调方式。 在启动时，Spring Data会扫描仓库并将其注册为单例作用域的bean定义。在它们的初始化过程中，仓库会立即获得一个_EntityManager_。具体来说，它们会获取J..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T03:14:44.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring"}],["meta",{"property":"article:tag","content":"JPA"}],["meta",{"property":"article:tag","content":"Repository"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T03:14:44.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JPA仓库的Bootstrap模式\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/custom_avatars/david-martinez-150x150.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-main-1.2.0.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-icn-1.0.0.png\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-20T03:14:44.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"JPA仓库的Bootstrap模式 在这篇简短的教程中，我们将专注于Spring为JPA仓库提供的不同类型的_BootstrapMode_，这些模式用于改变它们的实例化协调方式。 在启动时，Spring Data会扫描仓库并将其注册为单例作用域的bean定义。在它们的初始化过程中，仓库会立即获得一个_EntityManager_。具体来说，它们会获取J..."},"headers":[{"level":3,"title":"2.1. 默认","slug":"_2-1-默认","link":"#_2-1-默认","children":[]},{"level":3,"title":"2.2. 延迟","slug":"_2-2-延迟","link":"#_2-2-延迟","children":[]},{"level":3,"title":"2.3. 延迟","slug":"_2-3-延迟","link":"#_2-3-延迟","children":[]},{"level":2,"title":"3. 结论在这篇文章中，我们探讨了不同的方式来初始化JPA仓库，以及在哪些情况下使用它们。","slug":"_3-结论在这篇文章中-我们探讨了不同的方式来初始化jpa仓库-以及在哪些情况下使用它们。","link":"#_3-结论在这篇文章中-我们探讨了不同的方式来初始化jpa仓库-以及在哪些情况下使用它们。","children":[]}],"git":{"createdTime":1721445284000,"updatedTime":1721445284000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.89,"words":1466},"filePathRelative":"posts/baeldung/2024-07-20/2024-07-20-BootstrapMode for JPA Repositories.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>JPA仓库的Bootstrap模式</h1>\\n<p>在这篇简短的教程中，我们将专注于Spring为JPA仓库提供的不同类型的_BootstrapMode_，这些模式用于改变它们的实例化协调方式。</p>\\n<p>在启动时，Spring Data会扫描仓库并将其注册为单例作用域的bean定义。在它们的初始化过程中，仓库会立即获得一个_EntityManager_。具体来说，它们会获取JPA元模型并验证声明的查询。</p>\\n<p>默认情况下，JPA是同步启动的。因此，仓库的实例化会被阻塞，直到启动过程完成。随着仓库数量的增加，应用程序可能需要很长时间才能启动并开始接受请求。</p>","autoDesc":true}');export{k as comp,d as data};

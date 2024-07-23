import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-on0L14Tx.js";const p={},e=t(`<hr><h1 id="如何在jpa中使用findby-与多列查询" tabindex="-1"><a class="header-anchor" href="#如何在jpa中使用findby-与多列查询"><span>如何在JPA中使用findBy()与多列查询</span></a></h1><p>Spring Data JPA提供了一个查询派生特性，通过遵循方法命名约定，我们可以自动派生查询。</p><p>在本文中，我们将使用查询派生特性通过一个或多个列来查找实体。</p><h2 id="_2-示例设置" tabindex="-1"><a class="header-anchor" href="#_2-示例设置"><span>2. 示例设置</span></a></h2><p>为了示例目的，我们将使用一个包含与用户账户相关的属性的_Account_实体：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token annotation punctuation">@Table</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;ACCOUNTS&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Account</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">SEQUENCE</span><span class="token punctuation">,</span> generator <span class="token operator">=</span> <span class="token string">&quot;accounts_seq&quot;</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@SequenceGenerator</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;accounts_seq&quot;</span><span class="token punctuation">,</span> sequenceName <span class="token operator">=</span> <span class="token string">&quot;accounts_seq&quot;</span><span class="token punctuation">,</span> allocationSize <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;user_id&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> userId<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> username<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> password<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> email<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Timestamp</span> createdOn<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Timestamp</span> lastLogin<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@OneToOne</span>
    <span class="token annotation punctuation">@JoinColumn</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;permissions_id&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Permission</span> permission<span class="token punctuation">;</span>

    <span class="token comment">// getters and setters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了演示目的，我们还将向_Accounts_表中添加一些示例数据：</p><table><thead><tr><th>userId</th><th>username</th><th>password</th><th>email</th><th>createdOn</th><th>lastLogin</th><th>permission</th></tr></thead><tbody><tr><td>1</td><td>user_admin</td><td>737d4251-7ccf-46ce-8227-24cce9be812e</td><td>test@test.com</td><td>2024-02-08 21:26:30.372286</td><td>2024-02-09 21:26:30.37229</td><td>editor</td></tr><tr><td>2</td><td>user_admin_1</td><td>65cfd915-240c-4f64-8378-27fa1ff9cdf5</td><td>test1@test.com</td><td>2024-02-06 21:26:30.372286</td><td>2024-02-07 21:26:30.37229</td><td>editor</td></tr><tr><td>3</td><td>user_admin_2</td><td>9b4dca2e-f1d2-4b14-9553-3b8913323b48</td><td>test2@test.com</td><td>2024-02-04 21:26:30.372286</td><td>2024-02-06 21:26:30.37229</td><td>editor</td></tr></tbody></table><h2 id="_3-查询派生" tabindex="-1"><a class="header-anchor" href="#_3-查询派生"><span>3. 查询派生</span></a></h2><p><strong>查询派生允许开发者在仓库接口中定义遵循命名约定的方法名称，框架基于该方法名称生成适当的查询。</strong></p><p>例如，如果我们想要通过电子邮件地址搜索_accounts_表，那么我们在_AccountRepository_中的方法看起来如下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">AccountRepository</span> <span class="token keyword">extends</span> <span class="token class-name">JpaRepository</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Account</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token punctuation">{</span>
    <span class="token class-name">Account</span> <span class="token function">findByEmail</span><span class="token punctuation">(</span><span class="token class-name">String</span> email<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们在_AccountRepository_上执行_findByEmail()_，Spring Data会生成以下SQL并针对_accounts_表执行它：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">select</span> a1_0<span class="token punctuation">.</span>user_id<span class="token punctuation">,</span>a1_0<span class="token punctuation">.</span>created_on<span class="token punctuation">,</span>a1_0<span class="token punctuation">.</span>email<span class="token punctuation">,</span>a1_0<span class="token punctuation">.</span>last_login<span class="token punctuation">,</span>a1_0<span class="token punctuation">.</span>password<span class="token punctuation">,</span>a1_0<span class="token punctuation">.</span>permissions_id<span class="token punctuation">,</span>a1_0<span class="token punctuation">.</span>username
<span class="token keyword">from</span> accounts a1_0
<span class="token keyword">where</span> a1_0<span class="token punctuation">.</span>email<span class="token operator">=</span>?
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的测试验证了_findByEmail()_的工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenAccountInDb_whenPerformFindByEmail_thenReturnsAccount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> email <span class="token operator">=</span> <span class="token string">&quot;test@test.com&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">Account</span> account <span class="token operator">=</span> accountRepository<span class="token punctuation">.</span><span class="token function">findByEmail</span><span class="token punctuation">(</span>email<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>account<span class="token punctuation">.</span><span class="token function">getEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>email<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们可以扩展查询派生特性，以添加组合条件来获得适当的结果。</strong></p><p>让我们使用_AccountRepository_接口并编写另一个方法来查找具有_username_和_email_的Accounts：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">AccountRepository</span> <span class="token keyword">extends</span> <span class="token class-name">JpaRepository</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Account</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token punctuation">{</span>
    <span class="token class-name">Account</span> <span class="token function">findByUsernameAndEmail</span><span class="token punctuation">(</span><span class="token class-name">String</span> username<span class="token punctuation">,</span> <span class="token class-name">String</span> email<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是为定义的方法生成的SQL：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">select</span> a1_0<span class="token punctuation">.</span>user_id<span class="token punctuation">,</span>a1_0<span class="token punctuation">.</span>created_on<span class="token punctuation">,</span>a1_0<span class="token punctuation">.</span>email<span class="token punctuation">,</span>a1_0<span class="token punctuation">.</span>last_login<span class="token punctuation">,</span>a1_0<span class="token punctuation">.</span>password<span class="token punctuation">,</span>a1_0<span class="token punctuation">.</span>permissions_id<span class="token punctuation">,</span>a1_0<span class="token punctuation">.</span>username
<span class="token keyword">from</span> accounts a1_0
<span class="token keyword">where</span> a1_0<span class="token punctuation">.</span>username<span class="token operator">=</span>? <span class="token operator">and</span> a1_0<span class="token punctuation">.</span>email<span class="token operator">=</span>?
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的测试验证了_findByUsernameAndEmail()_的工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenAccountInDb_whenPerformFindByUsernameAndEmail_thenReturnsAccount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">String</span> email <span class="token operator">=</span> <span class="token string">&quot;test@test.com&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> username <span class="token operator">=</span> <span class="token string">&quot;user_admin&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">Account</span> account <span class="token operator">=</span> accountRepository<span class="token punctuation">.</span><span class="token function">findByUsernameAndEmail</span><span class="token punctuation">(</span>username<span class="token punctuation">,</span> email<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>account<span class="token punctuation">.</span><span class="token function">getUsername</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>username<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>account<span class="token punctuation">.</span><span class="token function">getEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>email<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们也可以使用_OR_运算符来组合两个条件。</strong> 例如，我们可以通过_username_或_email_进行搜索：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">AccountRepository</span> <span class="token keyword">extends</span> <span class="token class-name">JpaRepository</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Account</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token punctuation">{</span>
    <span class="token class-name">Account</span> <span class="token function">findByUsernameOrEmail</span><span class="token punctuation">(</span><span class="token class-name">String</span> username<span class="token punctuation">,</span> <span class="token class-name">String</span> email<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们看看生成的SQL：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">select</span> a1_0<span class="token punctuation">.</span>user_id<span class="token punctuation">,</span>a1_0<span class="token punctuation">.</span>created_on<span class="token punctuation">,</span>a1_0<span class="token punctuation">.</span>email<span class="token punctuation">,</span>a1_0<span class="token punctuation">.</span>last_login<span class="token punctuation">,</span>a1_0<span class="token punctuation">.</span>password<span class="token punctuation">,</span>a1_0<span class="token punctuation">.</span>permissions_id<span class="token punctuation">,</span>a1_0<span class="token punctuation">.</span>username
<span class="token keyword">from</span> accounts a1_0
<span class="token keyword">where</span> a1_0<span class="token punctuation">.</span>username<span class="token operator">=</span>? <span class="token operator">or</span> a1_0<span class="token punctuation">.</span>email<span class="token operator">=</span>?
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们验证_findByUsernameOrEmail()_的工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenAccountInDb_whenPerformFindByUsernameOrEmail_thenReturnsAccount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">String</span> email <span class="token operator">=</span> <span class="token string">&quot;test@test.com&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> username <span class="token operator">=</span> <span class="token string">&quot;user_editor&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">Account</span> account <span class="token operator">=</span> accountRepository<span class="token punctuation">.</span><span class="token function">findByUsernameOrEmail</span><span class="token punctuation">(</span>username<span class="token punctuation">,</span> email<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>account<span class="token punctuation">.</span><span class="token function">getUsername</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isNotEqualTo</span><span class="token punctuation">(</span>username<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>account<span class="token punctuation">.</span><span class="token function">getEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>email<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们可以使用_findBy()_方法中的集合输入。</strong> 例如，要查找存在于电子邮件列表或用户名列表中的所有账户，我们可以在_AccountRepository_中编写一个方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">AccountRepository</span> <span class="token keyword">extends</span> <span class="token class-name">JpaRepository</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Account</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token punctuation">{</span>
    <span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Account</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token function">findByUsernameInOrEmailIn</span><span class="token punctuation">(</span><span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\` usernames<span class="token punctuation">,</span> <span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\` emails<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们看看生成的SQL：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">select</span> a1_0<span class="token punctuation">.</span>user_id<span class="token punctuation">,</span>a1_0<span class="token punctuation">.</span>created_on<span class="token punctuation">,</span>a1_0<span class="token punctuation">.</span>email<span class="token punctuation">,</span>a1_0<span class="token punctuation">.</span>last_login<span class="token punctuation">,</span>a1_0<span class="token punctuation">.</span>password<span class="token punctuation">,</span>a1_0<span class="token punctuation">.</span>permissions_id<span class="token punctuation">,</span>a1_0<span class="token punctuation">.</span>username
<span class="token keyword">from</span> accounts a1_0
<span class="token keyword">where</span> a1_0<span class="token punctuation">.</span>username <span class="token operator">in</span> <span class="token punctuation">(</span>?<span class="token punctuation">,</span>?<span class="token punctuation">)</span> <span class="token operator">or</span> a1_0<span class="token punctuation">.</span>email <span class="token operator">in</span> <span class="token punctuation">(</span>?<span class="token punctuation">,</span>?<span class="token punctuation">,</span>?<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的测试确认了_findByUsernameInOrEmailIn()_的工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenAccountInDb_whenPerformFindByUsernameInOrEmailIn_thenReturnsAccounts</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\` emails <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;test@test.com&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;abc@abc.com&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;pqr@pqr.com&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">List</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\` usernames <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;user_editor&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;user_admin&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Account</span><span class="token punctuation">&gt;</span></span>\`\` byUsernameInOrEmailIn <span class="token operator">=</span> accountRepository<span class="token punctuation">.</span><span class="token function">findByUsernameInOrEmailIn</span><span class="token punctuation">(</span>usernames<span class="token punctuation">,</span> emails<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>byUsernameInOrEmailIn<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>byUsernameInOrEmailIn<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;test@test.com&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本教程中，我们讨论了Spring Data的查询派生特性，并使用它在表中查找实体。我们还探讨了使用AND和OR等条件查找实体的各种输入参数的用法。</p><p>如常，示例代码可在GitHub上找到。</p>`,39),o=[e];function c(i,l){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","2024-06-22-How To Use findBy   With Multiple Columns in JPA.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-22/2024-06-22-How%20To%20Use%20findBy%20%20%20With%20Multiple%20Columns%20in%20JPA.html","title":"如何在JPA中使用findBy()与多列查询","lang":"zh-CN","frontmatter":{"date":"2024-02-09T00:00:00.000Z","category":["Spring Data JPA","JPA"],"tag":["findBy","多列查询"],"head":[["meta",{"name":"keywords","content":"Spring Data JPA, JPA, findBy, 多列查询"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-22/2024-06-22-How%20To%20Use%20findBy%20%20%20With%20Multiple%20Columns%20in%20JPA.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在JPA中使用findBy()与多列查询"}],["meta",{"property":"og:description","content":"如何在JPA中使用findBy()与多列查询 Spring Data JPA提供了一个查询派生特性，通过遵循方法命名约定，我们可以自动派生查询。 在本文中，我们将使用查询派生特性通过一个或多个列来查找实体。 2. 示例设置 为了示例目的，我们将使用一个包含与用户账户相关的属性的_Account_实体： 为了演示目的，我们还将向_Accounts_表中添..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-22T08:49:52.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"findBy"}],["meta",{"property":"article:tag","content":"多列查询"}],["meta",{"property":"article:published_time","content":"2024-02-09T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-22T08:49:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在JPA中使用findBy()与多列查询\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-02-09T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-22T08:49:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在JPA中使用findBy()与多列查询 Spring Data JPA提供了一个查询派生特性，通过遵循方法命名约定，我们可以自动派生查询。 在本文中，我们将使用查询派生特性通过一个或多个列来查找实体。 2. 示例设置 为了示例目的，我们将使用一个包含与用户账户相关的属性的_Account_实体： 为了演示目的，我们还将向_Accounts_表中添..."},"headers":[{"level":2,"title":"2. 示例设置","slug":"_2-示例设置","link":"#_2-示例设置","children":[]},{"level":2,"title":"3. 查询派生","slug":"_3-查询派生","link":"#_3-查询派生","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719046192000,"updatedTime":1719046192000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.01,"words":904},"filePathRelative":"posts/baeldung/2024-06-22/2024-06-22-How To Use findBy   With Multiple Columns in JPA.md","localizedDate":"2024年2月9日","excerpt":"<hr>\\n<h1>如何在JPA中使用findBy()与多列查询</h1>\\n<p>Spring Data JPA提供了一个查询派生特性，通过遵循方法命名约定，我们可以自动派生查询。</p>\\n<p>在本文中，我们将使用查询派生特性通过一个或多个列来查找实体。</p>\\n<h2>2. 示例设置</h2>\\n<p>为了示例目的，我们将使用一个包含与用户账户相关的属性的_Account_实体：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Entity</span>\\n<span class=\\"token annotation punctuation\\">@Table</span><span class=\\"token punctuation\\">(</span>name <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"ACCOUNTS\\"</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Account</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token annotation punctuation\\">@Id</span>\\n    <span class=\\"token annotation punctuation\\">@GeneratedValue</span><span class=\\"token punctuation\\">(</span>strategy <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">GenerationType</span><span class=\\"token punctuation\\">.</span><span class=\\"token constant\\">SEQUENCE</span><span class=\\"token punctuation\\">,</span> generator <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"accounts_seq\\"</span><span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token annotation punctuation\\">@SequenceGenerator</span><span class=\\"token punctuation\\">(</span>name <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"accounts_seq\\"</span><span class=\\"token punctuation\\">,</span> sequenceName <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"accounts_seq\\"</span><span class=\\"token punctuation\\">,</span> allocationSize <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token annotation punctuation\\">@Column</span><span class=\\"token punctuation\\">(</span>name <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"user_id\\"</span><span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">int</span> userId<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">String</span> username<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">String</span> password<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">String</span> email<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">Timestamp</span> createdOn<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">Timestamp</span> lastLogin<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token annotation punctuation\\">@OneToOne</span>\\n    <span class=\\"token annotation punctuation\\">@JoinColumn</span><span class=\\"token punctuation\\">(</span>name <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"permissions_id\\"</span><span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">Permission</span> permission<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token comment\\">// getters and setters</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};

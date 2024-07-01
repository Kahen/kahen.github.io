import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CZdUP17Q.js";const p={},c=t(`<h1 id="transactional-和-async-是否可以一起工作-baeldung" tabindex="-1"><a class="header-anchor" href="#transactional-和-async-是否可以一起工作-baeldung"><span>@Transactional 和 @Async 是否可以一起工作？ | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本文中，我们将探讨Spring框架中@Transactional和@Async注解之间的兼容性。</p><h2 id="_2-理解-transactional-和-async" tabindex="-1"><a class="header-anchor" href="#_2-理解-transactional-和-async"><span>2. 理解 @Transactional 和 @Async</span></a></h2><p><strong>@Transactional注解从许多其他代码块中创建一个原子代码块。因此，如果一个块以异常方式完成，所有部分都会回滚</strong>。因此，只有当其所有部分都成功时，新创建的原子单元才会成功完成提交。</p><p>创建事务使我们能够避免代码中的部分失败，提高数据一致性。</p><p>另一方面，@Async告诉Spring，被注解的单元可以与调用线程并行运行。<strong>换句话说，如果我们从线程调用一个@Async方法或类，Spring会在具有不同上下文的另一个线程中运行其代码</strong>。</p><p>定义异步代码可以通过与调用线程并行执行单元来提高执行时间性能。</p><p>有些场景中我们需要代码中的性能和一致性。使用Spring，我们可以混合使用@Transactional和@Async来实现这两个目标，只要我们注意如何一起使用这些注解。</p><p>在接下来的部分中，我们将探讨不同的场景。</p><p>异步和事务代码可能会引入问题，例如如果我们没有正确实现它们，可能会导致数据不一致。</p><p>注意Spring的事务上下文和上下文之间的数据传播是充分利用@Async和@Transactional并避免陷阱的关键。</p><h3 id="_3-1-创建演示应用程序" tabindex="-1"><a class="header-anchor" href="#_3-1-创建演示应用程序"><span>3.1. 创建演示应用程序</span></a></h3><p>我们将使用银行服务的转账功能来说明事务和异步代码的使用。</p><p>简而言之，我们可以通过从一个账户中扣除金额并将其添加到另一个账户来实现资金转账。我们可以将其想象为数据库操作，例如选择涉及的账户并更新它们的余额：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">transfer</span><span class="token punctuation">(</span><span class="token class-name">Long</span> depositorId<span class="token punctuation">,</span> <span class="token class-name">Long</span> favoredId<span class="token punctuation">,</span> <span class="token class-name">BigDecimal</span> amount<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Account</span> depositorAccount <span class="token operator">=</span> accountRepository<span class="token punctuation">.</span><span class="token function">findById</span><span class="token punctuation">(</span>depositorId<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">orElseThrow</span><span class="token punctuation">(</span><span class="token class-name">IllegalArgumentException</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Account</span> favoredAccount <span class="token operator">=</span> accountRepository<span class="token punctuation">.</span><span class="token function">findById</span><span class="token punctuation">(</span>favoredId<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">orElseThrow</span><span class="token punctuation">(</span><span class="token class-name">IllegalArgumentException</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    depositorAccount<span class="token punctuation">.</span><span class="token function">setBalance</span><span class="token punctuation">(</span>depositorAccount<span class="token punctuation">.</span><span class="token function">getBalance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">subtract</span><span class="token punctuation">(</span>amount<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    favoredAccount<span class="token punctuation">.</span><span class="token function">setBalance</span><span class="token punctuation">(</span>favoredAccount<span class="token punctuation">.</span><span class="token function">getBalance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>amount<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    accountRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>depositorAccount<span class="token punctuation">)</span><span class="token punctuation">;</span>
    accountRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>favoredAccount<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们首先使用findById()找到涉及的账户，并在给定ID找不到账户时抛出IllegalArgumentException。</p><p>然后，我们使用新金额更新检索到的账户。最后，我们使用CrudRepository的save()方法保存新更新的账户。</p><p>在这个简单的例子中，有一些潜在的失败。例如，我们可能找不到favoredAccount并以异常失败。或者，save()操作对depositorAccount完成但对favoredAccount失败。这些被定义为部分失败，因为失败之前发生的事情不能撤销。</p><p><strong>因此，如果我们没有正确地使用事务来管理我们的代码，部分失败会造成数据一致性问题</strong>。例如，我们可能从一个账户中扣除了金额，但没有有效地将其传递到另一个账户。</p><h3 id="_3-2-从-async-调用-transactional" tabindex="-1"><a class="header-anchor" href="#_3-2-从-async-调用-transactional"><span>3.2. 从 @Async 调用 @Transactional</span></a></h3><p><strong>如果我们从@Async方法调用@Transactional方法，Spring会正确管理事务并传播其上下文</strong>，确保数据一致性。</p><p>例如，让我们从@Async调用者调用一个@Transactional的transfer()方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Async</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">transferAsync</span><span class="token punctuation">(</span><span class="token class-name">Long</span> depositorId<span class="token punctuation">,</span> <span class="token class-name">Long</span> favoredId<span class="token punctuation">,</span> <span class="token class-name">BigDecimal</span> amount<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">transfer</span><span class="token punctuation">(</span>depositorId<span class="token punctuation">,</span> favoredId<span class="token punctuation">,</span> amount<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 其他与转账隔离的异步操作</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Transactional</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">transfer</span><span class="token punctuation">(</span><span class="token class-name">Long</span> depositorId<span class="token punctuation">,</span> <span class="token class-name">Long</span> favoredId<span class="token punctuation">,</span> <span class="token class-name">BigDecimal</span> amount<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Account</span> depositorAccount <span class="token operator">=</span> accountRepository<span class="token punctuation">.</span><span class="token function">findById</span><span class="token punctuation">(</span>depositorId<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">orElseThrow</span><span class="token punctuation">(</span><span class="token class-name">IllegalArgumentException</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Account</span> favoredAccount <span class="token operator">=</span> accountRepository<span class="token punctuation">.</span><span class="token function">findById</span><span class="token punctuation">(</span>favoredId<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">orElseThrow</span><span class="token punctuation">(</span><span class="token class-name">IllegalArgumentException</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    depositorAccount<span class="token punctuation">.</span><span class="token function">setBalance</span><span class="token punctuation">(</span>depositorAccount<span class="token punctuation">.</span><span class="token function">getBalance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">subtract</span><span class="token punctuation">(</span>amount<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    favoredAccount<span class="token punctuation">.</span><span class="token function">setBalance</span><span class="token punctuation">(</span>favoredAccount<span class="token punctuation">.</span><span class="token function">getBalance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>amount<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    accountRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>depositorAccount<span class="token punctuation">)</span><span class="token punctuation">;</span>
    accountRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>favoredAccount<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_transferAsync()_方法由于是@Async，与调用线程并行在不同上下文中运行。</p><p>然后，我们调用事务性的_transfer()_方法来运行关键的业务逻辑。在这种情况下，Spring正确地将_transferAsync()<em>线程上下文传播到_transfer()</em>。因此，我们在那次交互中不会丢失任何数据。</p><p>_transfer()_方法定义了一组关键的数据库操作，如果发生故障则必须回滚。Spring只处理_transfer()_事务，这将所有代码隔离在_transfer()_体之外，不参与事务。因此，如果发生故障，Spring只会回滚_transfer()_代码。</p><p><strong>从@Async方法调用@Transactional可以提高性能，通过与调用线程并行执行操作，而不在特定内部操作中出现数据不一致</strong>。</p><h3 id="_3-3-从-transactional-调用-async" tabindex="-1"><a class="header-anchor" href="#_3-3-从-transactional-调用-async"><span>3.3. 从 @Transactional 调用 @Async</span></a></h3><p>Spring目前使用ThreadLocal来管理当前线程事务。因此，它不会在应用程序的不同线程之间共享线程上下文。</p><p><strong>因此，如果一个@Transactional方法调用一个@Async方法，Spring不会传播事务的相同线程上下文</strong>。</p><p>为了说明，让我们在transfer()内部添加一个对异步printReceipt()方法的调用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Async</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">transferAsync</span><span class="token punctuation">(</span><span class="token class-name">Long</span> depositorId<span class="token punctuation">,</span> <span class="token class-name">Long</span> favoredId<span class="token punctuation">,</span> <span class="token class-name">BigDecimal</span> amount<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">transfer</span><span class="token punctuation">(</span>depositorId<span class="token punctuation">,</span> favoredId<span class="token punctuation">,</span> amount<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Transactional</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">transfer</span><span class="token punctuation">(</span><span class="token class-name">Long</span> depositorId<span class="token punctuation">,</span> <span class="token class-name">Long</span> favoredId<span class="token punctuation">,</span> <span class="token class-name">BigDecimal</span> amount<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Account</span> depositorAccount <span class="token operator">=</span> accountRepository<span class="token punctuation">.</span><span class="token function">findById</span><span class="token punctuation">(</span>depositorId<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">orElseThrow</span><span class="token punctuation">(</span><span class="token class-name">IllegalArgumentException</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Account</span> favoredAccount <span class="token operator">=</span> accountRepository<span class="token punctuation">.</span><span class="token function">findById</span><span class="token punctuation">(</span>favoredId<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">orElseThrow</span><span class="token punctuation">(</span><span class="token class-name">IllegalArgumentException</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    depositorAccount<span class="token punctuation">.</span><span class="token function">setBalance</span><span class="token punctuation">(</span>depositorAccount<span class="token punctuation">.</span><span class="token function">getBalance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">subtract</span><span class="token punctuation">(</span>amount<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    favoredAccount<span class="token punctuation">.</span><span class="token function">setBalance</span><span class="token punctuation">(</span>favoredAccount<span class="token punctuation">.</span><span class="token function">getBalance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>amount<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">printReceipt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    accountRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>depositorAccount<span class="token punctuation">)</span><span class="token punctuation">;</span>
    accountRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>favoredAccount<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Async</span> <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">printReceipt</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 使用转账结果打印收据的逻辑 }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>_transfer()_逻辑与之前相同，但现在我们调用printReceipt()打印转账结果。由于printReceipt()是@Async，Spring会在另一个具有不同上下文的线程上运行其代码。</p><p>问题是收据信息依赖于正确执行整个_transfer()_方法。此外，_printReceipt()_和_transfer()_代码中保存到数据库的其他部分在不同线程上使用不同的数据运行，使得应用程序的行为变得不可预测。例如，我们可能会打印一个没有成功保存到数据库的货币转账交易的结果。</p><p><strong>因此，为了避免那种数据一致性问题，我们必须避免从@Transactional调用@Async方法，因为线程上下文传播不会发生</strong>。</p><h3 id="_3-4-在类级别使用-transactional" tabindex="-1"><a class="header-anchor" href="#_3-4-在类级别使用-transactional"><span>3.4. 在类级别使用 @Transactional</span></a></h3><p>使用@Transactional定义类会使Spring事务管理对其所有公共方法都可用。因此，该注解一次为所有方法创建事务。</p><p>使用类级别@Transactional时可能会发生的一件事是在同一方法中混合使用@Async。实际上，我们正在创建一个事务单元，该单元在与调用线程不同的线程上运行：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Transactional</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AccountService</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Async</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">transferAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 这是一个异步和事务性的方法</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">transfer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 事务性方法</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在示例中，_transferAsync()_方法是事务性和异步的。因此，它定义了一个事务单元，并在不同的线程上运行。因此，它可用于事务管理，但与调用线程的上下文不同。</p><p>因此，如果发生故障，_transferAsync()_内部的代码会回滚，因为它是@Transactional。然而，由于该方法也是@Async，Spring不会将调用上下文传播给它。<strong>因此，在故障场景中，Spring不会像我们调用一系列仅事务性方法时那样回滚_transferAsync()_之外的任何代码</strong>。因此，这与从@Transactional调用@Async时遇到的数据完整性问题相同。</p><p>类级别注释对于编写较少的代码以创建定义一系列完全事务性方法的类非常有用。</p><p><strong>然而，这种混合的事务和异步行为在调试代码时可能会造成混淆</strong>。例如，我们期望在发生故障时，一系列仅事务性方法调用中的所有代码都被回滚。然而，如果该序列中的一个方法也是@Async，行为就会出乎意料。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本教程中，我们从数据完整性的角度学习了何时可以安全地一起使用@Transactional和@Async注解。</p><p>通常，<strong>从@Async方法调用@Transactional保证数据完整性</strong>，因为Spring正确地传播了相同的上下文。</p><p>另一方面，当<strong>从@Transactional调用@Async时，我们可能会遇到数据完整性问题</strong>。</p><p>如常，源代码可在GitHub上获得。</p><p>文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。</p><p>OK</p>`,54),o=[c];function e(i,l){return s(),a("div",null,o)}const d=n(p,[["render",e],["__file","Can  Transactional and  Async Work Together .html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/Can%20%20Transactional%20and%20%20Async%20Work%20Together%20.html","title":"@Transactional 和 @Async 是否可以一起工作？ | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-19T00:00:00.000Z","category":["Spring","Java"],"tag":["Spring Framework","Asynchronous","Transactional"],"head":[["meta",{"name":"keywords","content":"Spring, Java, Transactional, Async, Annotation, Data Consistency, Performance"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Can%20%20Transactional%20and%20%20Async%20Work%20Together%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"@Transactional 和 @Async 是否可以一起工作？ | Baeldung"}],["meta",{"property":"og:description","content":"@Transactional 和 @Async 是否可以一起工作？ | Baeldung 1. 引言 在本文中，我们将探讨Spring框架中@Transactional和@Async注解之间的兼容性。 2. 理解 @Transactional 和 @Async @Transactional注解从许多其他代码块中创建一个原子代码块。因此，如果一个块以异常..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Framework"}],["meta",{"property":"article:tag","content":"Asynchronous"}],["meta",{"property":"article:tag","content":"Transactional"}],["meta",{"property":"article:published_time","content":"2024-06-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"@Transactional 和 @Async 是否可以一起工作？ | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-19T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"@Transactional 和 @Async 是否可以一起工作？ | Baeldung 1. 引言 在本文中，我们将探讨Spring框架中@Transactional和@Async注解之间的兼容性。 2. 理解 @Transactional 和 @Async @Transactional注解从许多其他代码块中创建一个原子代码块。因此，如果一个块以异常..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 理解 @Transactional 和 @Async","slug":"_2-理解-transactional-和-async","link":"#_2-理解-transactional-和-async","children":[{"level":3,"title":"3.1. 创建演示应用程序","slug":"_3-1-创建演示应用程序","link":"#_3-1-创建演示应用程序","children":[]},{"level":3,"title":"3.2. 从 @Async 调用 @Transactional","slug":"_3-2-从-async-调用-transactional","link":"#_3-2-从-async-调用-transactional","children":[]},{"level":3,"title":"3.3. 从 @Transactional 调用 @Async","slug":"_3-3-从-transactional-调用-async","link":"#_3-3-从-transactional-调用-async","children":[]},{"level":3,"title":"3.4. 在类级别使用 @Transactional","slug":"_3-4-在类级别使用-transactional","link":"#_3-4-在类级别使用-transactional","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":6.74,"words":2023},"filePathRelative":"posts/baeldung/Archive/Can  Transactional and  Async Work Together .md","localizedDate":"2024年6月19日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在本文中，我们将探讨Spring框架中@Transactional和@Async注解之间的兼容性。</p>\\n<h2>2. 理解 @Transactional 和 @Async</h2>\\n<p><strong>@Transactional注解从许多其他代码块中创建一个原子代码块。因此，如果一个块以异常方式完成，所有部分都会回滚</strong>。因此，只有当其所有部分都成功时，新创建的原子单元才会成功完成提交。</p>\\n<p>创建事务使我们能够避免代码中的部分失败，提高数据一致性。</p>\\n<p>另一方面，@Async告诉Spring，被注解的单元可以与调用线程并行运行。<strong>换句话说，如果我们从线程调用一个@Async方法或类，Spring会在具有不同上下文的另一个线程中运行其代码</strong>。</p>","autoDesc":true}');export{d as comp,k as data};

import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CQatNWII.js";const e={},p=t('<h1 id="用-kotlin-实现铁路导向编程" tabindex="-1"><a class="header-anchor" href="#用-kotlin-实现铁路导向编程"><span>用 Kotlin 实现铁路导向编程</span></a></h1><p>在本教程中，我们将实现 Scott Wlaschin 创造的铁路导向编程（ROP），ROP 帮助我们使用函数式编程（FP）编写带有验证、日志记录、网络和服务错误以及其他副作用的代码。</p><p>ROP 中的“快乐路径”指的是代码在没有异常和错误的情况下运行的路径。“不快乐或失败路径”是当一些异常和错误由开发人员处理时。我们将解释如何在 FP 中使用 ROP 来处理成功和失败的路径。</p><p>假设我们有一个函数，它从用户那里接收客户详细信息，如姓名和电子邮件地址。然后它创建 <em>Customer</em> 对象以保存到数据库中。</p><p>让我们看看快乐路径是什么样子的：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> input <span class="token operator">=</span> <span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token keyword">val</span> customer <span class="token operator">=</span> <span class="token function">parse</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span>\n<span class="token function">saveCustomer</span><span class="token punctuation">(</span>customer<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下是 <em>parse</em> 和 <em>saveCustomer</em> 函数。</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">parse</span><span class="token punctuation">(</span>inp<span class="token operator">:</span> List```<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>```<span class="token punctuation">)</span><span class="token operator">:</span> Customer <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token function">Customer</span><span class="token punctuation">(</span>inp<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span> inp<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">fun</span> <span class="token function">saveCustomer</span><span class="token punctuation">(</span>customer<span class="token operator">:</span> Customer<span class="token punctuation">)</span><span class="token operator">:</span> Unit <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Customer successfully saved.&quot;</span></span> <span class="token operator">+</span> customer<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下是我们在解析输入后的不快乐路径调用的验证函数：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">validateCustomerName</span><span class="token punctuation">(</span>inpName<span class="token operator">:</span> String<span class="token punctuation">)</span><span class="token operator">:</span> Boolean <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>inpName<span class="token punctuation">.</span>length <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token boolean">false</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token boolean">true</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">fun</span> <span class="token function">validateCustomerEmail</span><span class="token punctuation">(</span>inpEmail<span class="token operator">:</span> String<span class="token punctuation">)</span><span class="token operator">:</span> Boolean <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>inpEmail<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;@&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token boolean">true</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token boolean">false</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不快乐路径包括在保存客户对象时处理失败的验证：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> customer <span class="token operator">=</span> <span class="token function">parse</span><span class="token punctuation">(</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token keyword">val</span> validatedCustomerName <span class="token operator">=</span> <span class="token function">validateCustomerName</span><span class="token punctuation">(</span>customer<span class="token punctuation">.</span>name<span class="token punctuation">)</span>\n<span class="token keyword">val</span> validatedCustomerEmail <span class="token operator">=</span> <span class="token function">validateCustomerEmail</span><span class="token punctuation">(</span>customer<span class="token punctuation">.</span>email<span class="token punctuation">)</span>\n\n<span class="token keyword">if</span> <span class="token punctuation">(</span>validatedCustomerName <span class="token operator">&amp;&amp;</span> validatedCustomerEmail<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">save</span><span class="token punctuation">(</span>customer<span class="token punctuation">)</span>\n<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>validatedCustomerName<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Validation Error: invalid name, the name length must be 10 characters or more&quot;</span></span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>validatedCustomerEmail<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Validation Error: invalid email, the email must contain &#39;@&#39; symbol.&quot;</span></span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不快乐路径可以迅速累积，例如，在异常处理的情况下：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>validatedCustomerName <span class="token operator">&amp;&amp;</span> validatedCustomerEmail<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">try</span> <span class="token punctuation">{</span>\n        <span class="token function">save</span><span class="token punctuation">(</span>customer<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span>pe<span class="token operator">:</span> PersistenceException<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Exception while saving the customer DAO into database.&quot;</span></span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>validatedCustomerName<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Validation Error: invalid name, the name length must be 20 characters or more&quot;</span></span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>validatedCustomerEmail<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Validation Error: invalid email, the email must contain &#39;@&#39; symbol.&quot;</span></span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>随着不快乐路径数量的增加，这增加了出现意外状态的可能性。然后，我们需要单元测试来通过详尽地测试快乐和不快乐路径来提高代码的信心。</p><p>ROP 提供了一种处理快乐和不快乐路径的函数式方法。</p><h3 id="_3-kotlin-中的铁路导向编程" tabindex="-1"><a class="header-anchor" href="#_3-kotlin-中的铁路导向编程"><span>3. Kotlin 中的铁路导向编程</span></a></h3><p>ROP 的主要原理是，像铁路岔道一样，每个函数都返回一个成功或失败的 <em>Result</em> 类型。在我们的示例中，<em>parse,</em> <em>validateCustomerName,</em> <em>validateCustomerEmail</em> 和 <em>save(customer)</em> 有 <em>Success</em> 和 <em>Failure</em> 的结果。</p><p>让我们重写 <em>save, error,</em> <em>parse,</em> <em>validateCustomerName</em> 和 <em>validateCustomerEmail</em> 函数：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">parse</span><span class="token punctuation">(</span>inp<span class="token operator">:</span> List```<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>```<span class="token punctuation">)</span><span class="token operator">:</span> Result``<span class="token operator">&lt;</span>Customer<span class="token operator">&gt;</span>`` <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token function">Success</span><span class="token punctuation">(</span><span class="token function">Customer</span><span class="token punctuation">(</span>inp<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span> inp<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">validateCustomerName</span><span class="token punctuation">(</span>customer<span class="token operator">:</span> Customer<span class="token punctuation">)</span><span class="token operator">:</span> Result``<span class="token operator">&lt;</span>Customer<span class="token operator">&gt;</span>`` <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>customer<span class="token punctuation">.</span>name<span class="token punctuation">.</span>length <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token function">Failure</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Name validation failed; name length must be greater than 10 characters&quot;</span></span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token function">Success</span><span class="token punctuation">(</span>customer<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">validateCustomerEmail</span><span class="token punctuation">(</span>customer<span class="token operator">:</span> Customer<span class="token punctuation">)</span><span class="token operator">:</span> Result``<span class="token operator">&lt;</span>Customer<span class="token operator">&gt;</span>`` <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>customer<span class="token punctuation">.</span>emailAddress<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;@&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token function">Success</span><span class="token punctuation">(</span>customer<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token function">Failure</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Email validation failed; email must contain the &#39;@&#39; symbol&quot;</span></span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">saveCustomer</span><span class="token punctuation">(</span>customer<span class="token operator">:</span> Customer<span class="token punctuation">)</span><span class="token operator">:</span> Result```<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>``` <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token function">Success</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Customer successfully saved: &quot;</span></span> <span class="token operator">+</span> customer<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">error</span><span class="token punctuation">(</span>message<span class="token operator">:</span> String<span class="token punctuation">)</span><span class="token operator">:</span> Failure```<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>``` <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token function">Failure</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Error: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token expression">message</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>函数现在返回 <em>Result</em> 类型，定义如下：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">sealed</span> <span class="token keyword">class</span> Result`````````<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span>`````````\n<span class="token keyword">data</span> <span class="token keyword">class</span> Success`````````<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span>`````````<span class="token punctuation">(</span><span class="token keyword">val</span> value<span class="token operator">:</span> T<span class="token punctuation">)</span> <span class="token operator">:</span> Result`````````<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span>`````````<span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token keyword">data</span> <span class="token keyword">class</span> Failure`````````<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span>`````````<span class="token punctuation">(</span><span class="token keyword">val</span> errorMessage<span class="token operator">:</span> String<span class="token punctuation">)</span> <span class="token operator">:</span> Result`````````<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span>`````````<span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n<span class="token keyword">infix</span> <span class="token keyword">fun</span> `<span class="token operator">&lt;</span>T<span class="token punctuation">,</span> U<span class="token operator">&gt;</span>` Result`````````<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span>`````````<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>f<span class="token operator">:</span> <span class="token punctuation">(</span>T<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> Result`<span class="token operator">&lt;</span>U<span class="token operator">&gt;</span>`<span class="token punctuation">)</span> <span class="token operator">=</span>\n    <span class="token keyword">when</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">is</span> Success <span class="token operator">-&gt;</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span>\n        <span class="token keyword">is</span> Failure <span class="token operator">-&gt;</span> <span class="token function">Failure</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>errorMessage<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n\n<span class="token keyword">infix</span> <span class="token keyword">fun</span> `````````<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span>````````` Result`````````<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span>`````````<span class="token punctuation">.</span><span class="token function">otherwise</span><span class="token punctuation">(</span>f<span class="token operator">:</span> <span class="token punctuation">(</span>String<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> Failure`````````<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span>`````````<span class="token punctuation">)</span> <span class="token operator">=</span>\n    <span class="token keyword">when</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">is</span> Success <span class="token operator">-&gt;</span> <span class="token function">Success</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span>\n        <span class="token keyword">is</span> Failure <span class="token operator">-&gt;</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>errorMessage<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>Result</em> 类型是一个带有 <em>Success</em> 和 <em>Failure</em> 两个子类型的参数化类型，它们包装了底层结果。</p><p>在 <em>Result</em> 对象上定义的中缀 <em>then</em> 函数将一系列函数沿着快乐路径串联起来：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">Success</span><span class="token punctuation">(</span>args<span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> then <span class="token operator">::</span>parse then <span class="token operator">::</span>validateCustomerName\n  then <span class="token operator">::</span>validateCustomerEmail then <span class="token operator">::</span>saveCustomer\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们仅在前一个函数返回 <em>Success</em> 时，才将 <em>then</em> 函数应用于当前函数的 <em>Result</em>。</strong></p><p>中缀 <em>otherwise</em> 函数在快乐路径失败时执行上面定义的 <em>error</em> 函数：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">Success</span><span class="token punctuation">(</span>args<span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> then <span class="token operator">::</span>parse then <span class="token operator">::</span>validateCustomerName\n  then <span class="token operator">::</span>validateCustomerEmail then <span class="token operator">::</span>saveCustomer otherwise <span class="token operator">::</span>error\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong><em>otherwise</em> 在快乐路径的任何失败点调用 <em>error</em> 函数并返回错误。</strong></p><h3 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h3><p>在本教程中，我们使用 ROP 展示了如何使用 FP 构建弹性、健壮和容错的应用程序。<em>Result</em> 类型使我们能够避免编写复杂的嵌套 if/else 和 try/catch 语句，同时不损害错误处理。快乐路径清晰可见，同时我们仍然处理不快乐路径的错误。</p><p>如常，本文中使用的所有完整代码示例可在 GitHub 上找到。</p>',32),o=[p];function l(c,i){return a(),s("div",null,o)}const k=n(e,[["render",l],["__file","2024-06-21-Railway Oriented Programming in Kotlin.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-21/2024-06-21-Railway%20Oriented%20Programming%20in%20Kotlin.html","title":"用 Kotlin 实现铁路导向编程","lang":"zh-CN","frontmatter":{"date":"2024-06-22T00:00:00.000Z","category":["Kotlin","编程"],"tag":["函数式编程","Railway Oriented Programming"],"head":[["meta",{"name":"keywords","content":"Kotlin, 函数式编程, Railway Oriented Programming, 错误处理"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-21/2024-06-21-Railway%20Oriented%20Programming%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"用 Kotlin 实现铁路导向编程"}],["meta",{"property":"og:description","content":"用 Kotlin 实现铁路导向编程 在本教程中，我们将实现 Scott Wlaschin 创造的铁路导向编程（ROP），ROP 帮助我们使用函数式编程（FP）编写带有验证、日志记录、网络和服务错误以及其他副作用的代码。 ROP 中的“快乐路径”指的是代码在没有异常和错误的情况下运行的路径。“不快乐或失败路径”是当一些异常和错误由开发人员处理时。我们将解..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T19:49:06.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"函数式编程"}],["meta",{"property":"article:tag","content":"Railway Oriented Programming"}],["meta",{"property":"article:published_time","content":"2024-06-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T19:49:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"用 Kotlin 实现铁路导向编程\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-22T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T19:49:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"用 Kotlin 实现铁路导向编程 在本教程中，我们将实现 Scott Wlaschin 创造的铁路导向编程（ROP），ROP 帮助我们使用函数式编程（FP）编写带有验证、日志记录、网络和服务错误以及其他副作用的代码。 ROP 中的“快乐路径”指的是代码在没有异常和错误的情况下运行的路径。“不快乐或失败路径”是当一些异常和错误由开发人员处理时。我们将解..."},"headers":[{"level":3,"title":"3. Kotlin 中的铁路导向编程","slug":"_3-kotlin-中的铁路导向编程","link":"#_3-kotlin-中的铁路导向编程","children":[]},{"level":3,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1718999346000,"updatedTime":1718999346000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.61,"words":1084},"filePathRelative":"posts/baeldung/2024-06-21/2024-06-21-Railway Oriented Programming in Kotlin.md","localizedDate":"2024年6月22日","excerpt":"\\n<p>在本教程中，我们将实现 Scott Wlaschin 创造的铁路导向编程（ROP），ROP 帮助我们使用函数式编程（FP）编写带有验证、日志记录、网络和服务错误以及其他副作用的代码。</p>\\n<p>ROP 中的“快乐路径”指的是代码在没有异常和错误的情况下运行的路径。“不快乐或失败路径”是当一些异常和错误由开发人员处理时。我们将解释如何在 FP 中使用 ROP 来处理成功和失败的路径。</p>\\n<p>假设我们有一个函数，它从用户那里接收客户详细信息，如姓名和电子邮件地址。然后它创建 <em>Customer</em> 对象以保存到数据库中。</p>\\n<p>让我们看看快乐路径是什么样子的：</p>","autoDesc":true}');export{k as comp,d as data};

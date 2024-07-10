import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BmeLisJw.js";const e={},p=t(`<h1 id="从java-8迁移到java-17-baeldung" tabindex="-1"><a class="header-anchor" href="#从java-8迁移到java-17-baeldung"><span>从Java 8迁移到Java 17 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>我们经常面临是否迁移到Java的新版本或继续使用现有版本的困境。换句话说，我们需要在新特性和增强功能与迁移所需的总工作量之间进行权衡。</p><p>在本教程中，<strong>我们将介绍Java较新版本中一些极其有用的特性</strong>。这些特性不仅易于学习，而且在计划从Java 8迁移到Java 17时，可以快速实施，几乎不需要太多努力。</p><h2 id="_2-使用-string" tabindex="-1"><a class="header-anchor" href="#_2-使用-string"><span>2. 使用 <em>String</em></span></a></h2><p>让我们来看一看_String_ 类的一些有趣增强。</p><h3 id="_2-1-紧凑字符串" tabindex="-1"><a class="header-anchor" href="#_2-1-紧凑字符串"><span>2.1. 紧凑字符串</span></a></h3><p>Java 9引入了紧凑字符串，这是优化_String_ 对象内存消耗的性能增强。</p><p><strong>简单来说，一个_String_ 对象将在内部以_byte[]_ 而不是_char[]_ 表示</strong>。解释一下，由于Java内部使用UTF-16，每个_char_ 由2个字节组成。在大多数情况下，<em>String</em> 对象是可以用单个_byte_ 表示的英文单词，即LANTIN-1表示。</p><p>Java根据_String_ 对象的实际内容内部处理这种表示：对于LANTIN-1字符集使用_byte[]<em>，如果内容包含任何特殊字符（UTF-16）则使用_char[]</em>。因此，这对使用_String_ 对象的开发者来说是完全透明的。</p><p>直到Java 8，<em>String</em> 在内部以_char[]_ 表示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> value<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>从Java 9开始，它将是一个 <em>byte[]</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> value<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-2-文本块" tabindex="-1"><a class="header-anchor" href="#_2-2-文本块"><span>2.2. 文本块</span></a></h3><p>在Java 15之前，嵌入多行代码片段需要显式的行终止符、<em>String</em> 连接和分隔符。为了解决这个问题，<strong>Java 15引入了文本块，它允许我们更或少地按原样嵌入代码片段和文本序列</strong>。这在处理像HTML、JSON和SQL这样的字面量片段时特别有用。</p><p>文本块是_String_ 表示的替代形式，可以在任何可以使用普通双引号_String_ 字面量的地方使用。例如，多行_String_ 字面量可以表示，而无需显式使用行终止符和_String_ 连接：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// 使用文本块</span>
<span class="token class-name">String</span> value <span class="token operator">=</span> <span class="token triple-quoted-string string">&quot;&quot;&quot;
            Multi-line
            Text
            &quot;&quot;&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在此功能之前，多行文本不太易读，并且表示起来比较复杂：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// 使用字面量字符串</span>
<span class="token class-name">String</span> value <span class="token operator">=</span> <span class="token string">&quot;Multi-line&quot;</span>
                <span class="token operator">+</span> <span class="token string">&quot;\\\\n&quot;</span> <span class="token operator">+</span> <span class="token string">&quot;line separator&quot;</span>
                <span class="token operator">+</span> <span class="token string">&quot;Text&quot;</span>
                <span class="token operator">+</span> <span class="token string">&quot;\\\\n&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token string">&quot;Multi-line\\nText\\n&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-新的-string-方法" tabindex="-1"><a class="header-anchor" href="#_2-3-新的-string-方法"><span>2.3. 新的 <em>String</em> 方法</span></a></h3><p>在处理_String_ 对象时，我们经常倾向于使用第三方库，例如Apache Commons，用于常见的_String_ 操作。特别是，这是检查空白/空值和重复、缩进等其他_String_ 操作的实用函数的情况。</p><p>随后，Java 11和Java 12引入了许多这样的便捷功能，以便我们可以依赖内置功能来进行这些常规_String_ 操作：<em>isBlank(), repeat(), indent(), lines(), strip(),</em> 和 <em>transform()</em>。</p><p>让我们看看它们是如何工作的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token string">&quot;  &quot;</span><span class="token punctuation">.</span><span class="token function">isBlank</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token string">&quot;Twinkle &quot;</span><span class="token punctuation">.</span><span class="token function">repeat</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;Twinkle Twinkle &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token string">&quot;Format Line&quot;</span><span class="token punctuation">.</span><span class="token function">indent</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;    Format Line\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token string">&quot;Line 1 \\n Line2&quot;</span><span class="token punctuation">.</span><span class="token function">lines</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token string">&quot; Text with white spaces   &quot;</span><span class="token punctuation">.</span><span class="token function">strip</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;Text with white spaces&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token string">&quot;Car, Bus, Train&quot;</span><span class="token punctuation">.</span><span class="token function">transform</span><span class="token punctuation">(</span>s1 <span class="token operator">-&gt;</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>s1<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;,&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;Car&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-记录" tabindex="-1"><a class="header-anchor" href="#_3-记录"><span>3. 记录</span></a></h2><p>数据传输对象（DTO）在对象之间传递数据时很有用。然而，创建DTO伴随着大量的样板代码，例如字段、构造函数、getter/setter、<em>equals()</em>、<em>hashcode()</em> 和 <em>toString()</em> 方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StudentDTO</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> rollNo<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token comment">// 构造函数</span>
    <span class="token comment">// getters &amp; setters</span>
    <span class="token comment">// equals(), hashcode() &amp; toString() 方法</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>进入记录类，<strong>这是一种特殊类型的类，可以以更紧凑的方式定义不可变数据对象，并且与Project Lombok相同</strong>。最初作为Java 14的预览功能引入，记录类从Java 16开始成为标准特性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">record</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token keyword">int</span> rollNo<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，记录类只需要字段的类型和名称。随后，编译器生成了_equals()_、<em>hashCode()</em> 和 <em>toString()</em> 方法，以及公共构造函数、私有和最终字段：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Student</span> student <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token string">&quot;Priya&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Student</span> student2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token string">&quot;Priya&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">assertThat</span><span class="token punctuation">(</span>student<span class="token punctuation">.</span><span class="token function">rollNo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span>student<span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;Priya&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span>student<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>student2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span>student<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>student2<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-有用的-nullpointerexception-s" tabindex="-1"><a class="header-anchor" href="#_4-有用的-nullpointerexception-s"><span>4. 有用的 <em>NullPointerException</em> s</span></a></h2><p><em>NullPointerException</em> s (NPEs) 是每个开发者都会遇到的非常常见的异常。在大多数情况下，编译器抛出的错误消息对于确定哪个对象是 <em>null</em> 并不有用。此外，最近的趋势是使用函数式编程和方法链来编写表达性和紧凑的代码，这使得调试NPEs更加困难。</p><p>让我们看一个使用方法链的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>student<span class="token punctuation">.</span><span class="token function">getAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getCity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这里，如果在这行抛出NPE，很难确定确切的 <em>null</em> 对象位置，因为有三个可能的对象可以是 <em>null</em>。</p><p>从Java 14开始，<strong>我们现在可以指示编译器使用额外的VM参数来获取有用的NPE消息：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token operator">-</span><span class="token constant">XX</span><span class="token operator">:</span><span class="token operator">+</span><span class="token class-name">ShowCodeDetailsInExceptionMessages</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>启用此选项后，错误消息将更加精确：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Cannot</span> invoke <span class="token string">&quot;String.toLowerCase()&quot;</span> because the <span class="token keyword">return</span> value of <span class="token string">&quot;com.baeldung.java8to17.Address.getCity()&quot;</span> is <span class="token keyword">null</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>请注意，<strong>从Java 15开始，此标志默认启用。</strong></p><h2 id="_5-模式匹配" tabindex="-1"><a class="header-anchor" href="#_5-模式匹配"><span>5. 模式匹配</span></a></h2><p><strong>模式匹配解决了程序中常见的逻辑，即以更简洁、更安全的方式有条件地从对象中提取组件。</strong></p><p>让我们看看支持Java模式匹配的两个特性。</p><h3 id="_5-1-增强的-instanceof-运算符" tabindex="-1"><a class="header-anchor" href="#_5-1-增强的-instanceof-运算符"><span>5.1. 增强的 <em>instanceOf</em> 运算符</span></a></h3><p>每个程序都有的常见逻辑是检查某种类型或结构，将其转换为所需的类型以进行进一步处理。这涉及到大量的样板代码。</p><p>让我们看一个例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>obj <span class="token keyword">instanceof</span> <span class="token class-name">Address</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Address</span> address <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Address</span><span class="token punctuation">)</span> obj<span class="token punctuation">;</span>
    city <span class="token operator">=</span> address<span class="token punctuation">.</span><span class="token function">getCity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们可以看到涉及三个步骤：一个测试（确认类型）、一个转换（转换为特定类型）和一个新局部变量（进一步处理它）。</p><p>自Java 16以来，模式匹配的 <em>instanceof</em> 运算符是一个标准特性，以解决这个问题。现在，我们可以直接以更易读的方式访问目标类型：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>obj <span class="token keyword">instanceof</span> <span class="token class-name">Address</span> address<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    city <span class="token operator">=</span> address<span class="token punctuation">.</span><span class="token function">getCity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-switch表达式" tabindex="-1"><a class="header-anchor" href="#_5-2-switch表达式"><span>5.2. Switch表达式</span></a></h3><p><strong>Switch表达式（Java 14）就像常规表达式一样，它们评估或返回单个值，并且可以用于语句中。</strong> 此外，Java 17允许我们在Switch表达式中使用模式匹配（预览功能）：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">double</span> circumference <span class="token operator">=</span> <span class="token keyword">switch</span><span class="token punctuation">(</span>shape<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token class-name">Rectangle</span> r <span class="token operator">-&gt;</span> <span class="token number">2</span> <span class="token operator">*</span> r<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">2</span> <span class="token operator">*</span> r<span class="token punctuation">.</span><span class="token function">width</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token class-name">Circle</span> c <span class="token operator">-&gt;</span> <span class="token number">2</span> <span class="token operator">*</span> c<span class="token punctuation">.</span><span class="token function">radius</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token constant">PI</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span> <span class="token operator">-&gt;</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;Unknown shape&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所注意到的，有一种新的 <em>case</em> 标签语法。<em>switch</em> 表达式使用 “ <em>case L -&gt;</em>” 标签而不是 “ <em>case</em> <em>L:</em>” 标签。<strong>此外，不需要显式的 <em>break</em> 语句来防止穿透</strong>。<strong>此外，</strong> <em>switch</em> 选择器表达式可以是任何类型。</p><p>在使用传统的 “ <em>case</em> <em>L:</em>” 标签的Switch表达式时，我们必须使用 <em>yield</em> 关键字（而不是 <em>break</em> 语句）来返回值。</p><h2 id="_6-封闭类" tabindex="-1"><a class="header-anchor" href="#_6-封闭类"><span>6. 封闭类</span></a></h2><p>继承的主要目的是代码的可重用性。然而，某些业务领域模型可能只需要预定义的一组类来扩展基类或接口。这在使用领域驱动设计时特别有价值。</p><p>为了增强这种行为，Java 17提供了封闭类作为标准特性。简而言之，<strong>一个封闭的类或接口只能被允许这样做的类和接口扩展或实现。</strong></p><p>让我们看看如何定义一个封闭类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">sealed</span> <span class="token keyword">class</span> <span class="token class-name">Shape</span> <span class="token keyword">permits</span> <span class="token class-name">Circle</span><span class="token punctuation">,</span> <span class="token class-name">Square</span><span class="token punctuation">,</span> <span class="token class-name">Triangle</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，《Shape_ 类只允许继承到一组受限制的类中。此外，**被允许的子类必须定义以下修饰符之一：<em>final</em>、<em>sealed</em> 或 _non-</p>`,63),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-09-Migrate From Java 8 to Java 17.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-09/2024-07-09-Migrate%20From%20Java%208%20to%20Java%2017.html","title":"从Java 8迁移到Java 17 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-07-09T00:00:00.000Z","category":["Java","编程"],"tag":["Java 8","Java 17"],"head":[["meta",{"name":"keywords","content":"Java, 编程, Java 8, Java 17, 迁移指南"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-09/2024-07-09-Migrate%20From%20Java%208%20to%20Java%2017.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"从Java 8迁移到Java 17 | Baeldung"}],["meta",{"property":"og:description","content":"从Java 8迁移到Java 17 | Baeldung 1. 概述 我们经常面临是否迁移到Java的新版本或继续使用现有版本的困境。换句话说，我们需要在新特性和增强功能与迁移所需的总工作量之间进行权衡。 在本教程中，我们将介绍Java较新版本中一些极其有用的特性。这些特性不仅易于学习，而且在计划从Java 8迁移到Java 17时，可以快速实施，几乎..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-09T04:41:33.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 8"}],["meta",{"property":"article:tag","content":"Java 17"}],["meta",{"property":"article:published_time","content":"2024-07-09T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-09T04:41:33.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"从Java 8迁移到Java 17 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-09T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-09T04:41:33.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"从Java 8迁移到Java 17 | Baeldung 1. 概述 我们经常面临是否迁移到Java的新版本或继续使用现有版本的困境。换句话说，我们需要在新特性和增强功能与迁移所需的总工作量之间进行权衡。 在本教程中，我们将介绍Java较新版本中一些极其有用的特性。这些特性不仅易于学习，而且在计划从Java 8迁移到Java 17时，可以快速实施，几乎..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 使用 String","slug":"_2-使用-string","link":"#_2-使用-string","children":[{"level":3,"title":"2.1. 紧凑字符串","slug":"_2-1-紧凑字符串","link":"#_2-1-紧凑字符串","children":[]},{"level":3,"title":"2.2. 文本块","slug":"_2-2-文本块","link":"#_2-2-文本块","children":[]},{"level":3,"title":"2.3. 新的 String 方法","slug":"_2-3-新的-string-方法","link":"#_2-3-新的-string-方法","children":[]}]},{"level":2,"title":"3. 记录","slug":"_3-记录","link":"#_3-记录","children":[]},{"level":2,"title":"4. 有用的 NullPointerException s","slug":"_4-有用的-nullpointerexception-s","link":"#_4-有用的-nullpointerexception-s","children":[]},{"level":2,"title":"5. 模式匹配","slug":"_5-模式匹配","link":"#_5-模式匹配","children":[{"level":3,"title":"5.1. 增强的 instanceOf 运算符","slug":"_5-1-增强的-instanceof-运算符","link":"#_5-1-增强的-instanceof-运算符","children":[]},{"level":3,"title":"5.2. Switch表达式","slug":"_5-2-switch表达式","link":"#_5-2-switch表达式","children":[]}]},{"level":2,"title":"6. 封闭类","slug":"_6-封闭类","link":"#_6-封闭类","children":[]}],"git":{"createdTime":1720500093000,"updatedTime":1720500093000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.28,"words":1883},"filePathRelative":"posts/baeldung/2024-07-09/2024-07-09-Migrate From Java 8 to Java 17.md","localizedDate":"2024年7月9日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>我们经常面临是否迁移到Java的新版本或继续使用现有版本的困境。换句话说，我们需要在新特性和增强功能与迁移所需的总工作量之间进行权衡。</p>\\n<p>在本教程中，<strong>我们将介绍Java较新版本中一些极其有用的特性</strong>。这些特性不仅易于学习，而且在计划从Java 8迁移到Java 17时，可以快速实施，几乎不需要太多努力。</p>\\n<h2>2. 使用 <em>String</em></h2>\\n<p>让我们来看一看_String_ 类的一些有趣增强。</p>\\n<h3>2.1. 紧凑字符串</h3>\\n<p>Java 9引入了紧凑字符串，这是优化_String_ 对象内存消耗的性能增强。</p>","autoDesc":true}');export{d as comp,k as data};

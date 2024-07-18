import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CE5go3V-.js";const e={},p=t('<h1 id="kotlin中将函数作为参数传递给另一个函数的概述" tabindex="-1"><a class="header-anchor" href="#kotlin中将函数作为参数传递给另一个函数的概述"><span>Kotlin中将函数作为参数传递给另一个函数的概述</span></a></h1><p>Kotlin以其简洁的语法和强大的功能，提供了多种实现效率和可读性的方法。其中一项特性是将函数作为参数传递给其他函数的能力，这被称为高阶函数。这种能力允许我们编写更灵活、可重用的代码，使我们能够编写更干净、更富有表现力的程序。</p><p>在本教程中，我们将简要讨论Kotlin的高阶函数，并探索如何将函数作为参数传递给高阶函数。</p><h2 id="_2-关于高阶函数的一些话" tabindex="-1"><a class="header-anchor" href="#_2-关于高阶函数的一些话"><span>2. 关于高阶函数的一些话</span></a></h2><p><strong>在Kotlin中，函数是一等公民，这意味着它们可以被当作值来对待。</strong> 这包括将函数作为参数传递给其他函数、从函数返回函数以及将函数赋值给变量。</p><p><strong>接受其他函数作为参数或返回它们的函数被称为高阶函数。</strong></p><p>接下来，让我们看一个例子：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">joinByOperation</span><span class="token punctuation">(</span>theList<span class="token operator">:</span> List```````<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>```````<span class="token punctuation">,</span> operation<span class="token operator">:</span> <span class="token punctuation">(</span>List```````<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>```````<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> String<span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token function">operation</span><span class="token punctuation">(</span>theList<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>joinByOperation()</em> 函数接受两个参数。第一个是_String_值的列表，另一个是将_String_值列表转换为_String_的函数。</p><p>接下来，让我们看看如何将函数作为参数传递给_joinByOperation()_。</p><h2 id="_3-将lambda表达式作为函数传递" tabindex="-1"><a class="header-anchor" href="#_3-将lambda表达式作为函数传递"><span>3. 将Lambda表达式作为函数传递</span></a></h2><p><strong>Lambda表达式实际上是Kotlin中的匿名函数。</strong> 因此，我们可以像这样将Lambda表达式作为函数传递给_joinByOperation()_：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">joinByOperation</span><span class="token punctuation">(</span>aStringList<span class="token punctuation">,</span> <span class="token punctuation">{</span> lambda expression <span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此外，<strong>当函数的最后一个参数是函数时，Kotlin允许我们将Lambda表达式放在括号外面</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">joinByOperation</span><span class="token punctuation">(</span>aStringList<span class="token punctuation">)</span> <span class="token punctuation">{</span> lambda expression <span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这被称为尾随Lambda。</p><p>接下来，让我们看看如何将Lambda传递给函数：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> input <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a b c&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;d e f&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;x y z&quot;</span></span><span class="token punctuation">)</span>\n<span class="token keyword">val</span> result1 <span class="token operator">=</span> <span class="token function">joinByOperation</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span> <span class="token punctuation">{</span> theList <span class="token operator">-&gt;</span>\n    theList<span class="token punctuation">.</span><span class="token function">joinToString</span><span class="token punctuation">(</span>separator <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot; &quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> str <span class="token operator">-&gt;</span> str<span class="token punctuation">.</span><span class="token function">reversed</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot; &quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;, &quot;</span></span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;c, b, a, f, e, d, z, y, x&quot;</span></span><span class="token punctuation">,</span> result1<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的代码所示，我们传递了一个Lambda来反转列表中的每个_String_，然后将它们连接起来，最后，在每个空格前加上一个逗号。</p><p>高阶函数的一个优点是它们的灵活性。例如，我们可以传递另一个Lambda表达式，要求_joinByOperation()_以相反的顺序连接_String_值列表，并将结果_String_转换为大写：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> result2 <span class="token operator">=</span> <span class="token function">joinByOperation</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span> <span class="token punctuation">{</span> theList <span class="token operator">-&gt;</span>\n    theList<span class="token punctuation">.</span><span class="token function">reversed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">joinToString</span><span class="token punctuation">(</span>separator <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot; &quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> str <span class="token operator">-&gt;</span> str <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">uppercase</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;X Y Z D E F A B C&quot;</span></span><span class="token punctuation">,</span> result2<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，将Lambda表达式作为参数传递给高阶函数是直接且灵活的。</p><h2 id="_4-传递现有函数" tabindex="-1"><a class="header-anchor" href="#_4-传递现有函数"><span>4. 传递现有函数</span></a></h2><p>将Lambda传递给高阶函数非常方便。然而，一个缺点是<strong>这些Lambda不能在高阶函数之外重用</strong>。</p><p>在实践中，我们经常定义函数以重用逻辑。在Kotlin中，函数可以在不同的范围内定义，例如实例函数、顶级函数等，</p><p>接下来，让我们看看如何将现有函数作为参数传递给我们的_joinByOperation()_高阶函数。</p><h3 id="_4-1-传递实例函数" tabindex="-1"><a class="header-anchor" href="#_4-1-传递实例函数"><span>4.1. 传递实例函数</span></a></h3><p>假设我们的应用程序中有一个带有函数的_MessageParser_类：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> MessageParser <span class="token punctuation">{</span>\n    <span class="token keyword">fun</span> <span class="token function">joinWithoutPlaceholder</span><span class="token punctuation">(</span>segments<span class="token operator">:</span> List```````<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>```````<span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> segments<span class="token punctuation">.</span><span class="token function">joinToString</span><span class="token punctuation">(</span>separator <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot; &quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot; [SPACE] &quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot; &quot;</span></span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的代码所示，<strong>_joinWithoutPlaceholder()_是一个典型的实例函数</strong>。它连接_String_值列表并用空格替换“[SPACE]”占位符。</p><p>当我们的输入包含占位符时，我们希望使用_joinWithoutPlaceholder()_来连接_String_段。<strong>我们可以使用_instanceVariable::FunctionName_格式引用实例函数，</strong> 并将函数引用作为参数传递给高阶函数：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> messageParser <span class="token operator">=</span> <span class="token function">MessageParser</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token keyword">val</span> input <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a [SPACE] b [SPACE] c&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;d [SPACE] e [SPACE] f&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;x [SPACE] y [SPACE] z&quot;</span></span><span class="token punctuation">)</span>\n<span class="token keyword">val</span> result <span class="token operator">=</span> <span class="token function">joinByOperation</span><span class="token punctuation">(</span>input<span class="token punctuation">,</span> messageParser<span class="token operator">::</span>joinWithoutPlaceholder<span class="token punctuation">)</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a b c d e f x y z&quot;</span></span><span class="token punctuation">,</span> result<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-在类的伴生对象中传递函数" tabindex="-1"><a class="header-anchor" href="#_4-2-在类的伴生对象中传递函数"><span>4.2. 在类的伴生对象中传递函数</span></a></h3><p>在Kotlin中，没有“static”关键字。然而，我们可以通过在类的<strong>伴生对象</strong>中声明函数来创建**“静态函数”**。</p><p>接下来，让我们向_MessageParser_类添加一个伴生对象函数：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> MessageParser <span class="token punctuation">{</span>\n    <span class="token comment">// ...</span>\n    <span class="token keyword">companion</span> <span class="token keyword">object</span> <span class="token punctuation">{</span>\n        <span class="token keyword">fun</span> <span class="token function">simplyJoin</span><span class="token punctuation">(</span>segments<span class="token operator">:</span> List```````<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>```````<span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> segments<span class="token punctuation">.</span><span class="token function">joinToString</span><span class="token punctuation">(</span>separator <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot; &quot;</span></span><span class="token punctuation">)</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_simpllyJoin()_函数通过空格连接给定_String_列表中的段。当我们将这个伴生对象函数作为参数传递时，<strong>我们使用_ClassName::FunctionName_格式引用它</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> input <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a b c&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;d e f&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;x y z&quot;</span></span><span class="token punctuation">)</span>\n<span class="token keyword">val</span> result <span class="token operator">=</span> <span class="token function">joinByOperation</span><span class="token punctuation">(</span>input<span class="token punctuation">,</span> MessageParser<span class="token operator">::</span>simplyJoin<span class="token punctuation">)</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a b c d e f x y z&quot;</span></span><span class="token punctuation">,</span> result<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-传递对象函数" tabindex="-1"><a class="header-anchor" href="#_4-3-传递对象函数"><span>4.3. 传递对象函数</span></a></h3><p>除了实例函数和伴生对象函数之外，<strong>我们还可以在Kotlin的_object_中声明函数</strong>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">object</span> ParserInObject <span class="token punctuation">{</span>\n    <span class="token keyword">fun</span> <span class="token function">joinWithoutComma</span><span class="token punctuation">(</span>segments<span class="token operator">:</span> List```````<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>```````<span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> segments<span class="token punctuation">.</span><span class="token function">joinToString</span><span class="token punctuation">(</span>separator <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot; &quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;,&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如这个例子所示，_ParserInObject_中的_joinWithoutComma()_函数连接_String_值列表并移除所有的逗号。因此，当我们想要从输入中跳过所有的逗号时，我们可以使用这个函数。</p><p>要将_joinWithoutComma()<em>作为参数传递给_joinByOperation()</em>，<strong>我们使用_ObjectName::FunctionName_格式引用它</strong>。</p><p>接下来，让我们创建一个测试来验证我们是否可以以这种方式获得预期的结果：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> input <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a, b, c&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;d, e, f&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;x, y, z&quot;</span></span><span class="token punctuation">)</span>\n<span class="token keyword">val</span> result <span class="token operator">=</span> <span class="token function">joinByOperation</span><span class="token punctuation">(</span>input<span class="token punctuation">,</span> ParserInObject<span class="token operator">::</span>joinWithoutComma<span class="token punctuation">)</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a b c d e f x y z&quot;</span></span><span class="token punctuation">,</span> result<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4-传递顶级函数" tabindex="-1"><a class="header-anchor" href="#_4-4-传递顶级函数"><span>4.4. 传递顶级函数</span></a></h3><p>最后，在Kotlin中，<strong>函数可以在顶级声明，也称为包级函数</strong>。接下来，让我们创建一个顶级函数：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">decrypt</span><span class="token punctuation">(</span>segments<span class="token operator">:</span> List```````<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>```````<span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> segments<span class="token punctuation">.</span><span class="token function">reversed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">joinToString</span><span class="token punctuation">(</span>separator <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot; &quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> it<span class="token punctuation">.</span><span class="token function">reversed</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>_decrypt()_在类之外定义</strong>。它接受一个_String_段的列表，并通过反转每个段和输入列表中段的顺序来解密输入。</p><p><strong>我们可以按照_::FunctionName_模式将顶级函数作为参数传递</strong>。在我们的例子中，它将是_::decrypt_。</p><p>接下来，让我们传递_decrypt()<em>到_joinByOperation()</em>：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> input <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;z y x&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;f e d&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;c b a&quot;</span></span><span class="token punctuation">)</span>\n<span class="token keyword">val</span> result <span class="token operator">=</span> <span class="token function">joinByOperation</span><span class="token punctuation">(</span>input<span class="token punctuation">,</span> <span class="token operator">::</span>decrypt<span class="token punctuation">)</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a b c d e f x y z&quot;</span></span><span class="token punctuation">,</span> result<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-将函数赋值给变量" tabindex="-1"><a class="header-anchor" href="#_5-将函数赋值给变量"><span>5. 将函数赋值给变量</span></a></h2><p>到目前为止，我们已经探索了在Kotlin中将函数作为参数传递给高阶函数的两种方法：使用Lambda或函数引用。正如之前强调的，函数在Kotlin中被视为一等公民。因此，我们可以<strong>将函数引用或Lambda表达式赋值给变量，允许我们将变量传递给另一个函数</strong>。</p><p>接下来，我们将通过例子深入理解这个概念。</p><p>让我们使用对象函数_joinWithoutComma()_和一个Lambda表达式来演示将现有函数和Lambda赋值给变量。然后，我们将这些变量传递给_joinByOperation()_函数。</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> input <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a, b, c&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;d, e, f&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;x, y, z&quot;</span></span><span class="token punctuation">)</span>\n\n<span class="token keyword">val</span> funRef <span class="token operator">=</span> ParserInObject<span class="token operator">::</span>joinWithoutComma\n<span class="token keyword">val</span> resultFunRef <span class="token operator">=</span> <span class="token function">joinByOperation</span><span class="token punctuation">(</span>input<span class="token punctuation">,</span> funRef<span class="token punctuation">)</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;a b c d e f x y z&quot;</span></span><span class="token punctuation">,</span> resultFunRef<span class="token punctuation">)</span>\n\n<span class="token keyword">val</span> funLambda <span class="token operator">=</span> <span class="token punctuation">{</span> theList<span class="token operator">:</span> List```````<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span>``````` <span class="token operator">-&gt;</span> theList<span class="token punctuation">.</span><span class="token function">reversed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">joinToString</span><span class="token punctuation">(</span>separator <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;, &quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> str <span class="token operator">-&gt;</span> str <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">uppercase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>\n<span class="token keyword">val</span> resultFunLambda <span class="token operator">=</span> <span class="token function">joinByOperation</span><span class="token punctuation">(</span>input<span class="token punctuation">,</span> funLambda<span class="token punctuation">)</span>\n<span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;X, Y, Z, D, E, F, A, B, C&quot;</span></span><span class="token punctuation">,</span> resultFunLambda<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的示例中所示，<strong>Kotlin允许我们将Lambda和函数引用作为常规值来对待。</strong> 例如，<strong>我们可以直接将它们赋值给变量</strong>。当我们将这些变量作为参数传递给其他函数时，我们实际上就是在传递函数作为参数。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们首先探讨了Kotlin中的高阶函数概念。通过采用高阶函数，我们可以提高代码的可重用性、灵活性和可读性，从而实现更易于维护的软件。</p><p>随后，我们通过示例深入研究了如何将函数作为参数传递给高阶函数。我们考察了两种情况：传递Lambda表达式和传递现有函数的引用。</p><p>此外，我们展示了我们可以直接将Lambda表达式和函数引用赋值给变量，使我们能够将这些变量作为参数传递给其他函数。</p><p>如常，示例的完整源代码可在GitHub上获得。</p><p><a href="https://www.baeldung.com/kotlin/function-parameter-high-order" target="_blank" rel="noopener noreferrer">Baeldung Kotlin 教程</a></p><p>OK</p>',65),o=[p];function i(l,c){return a(),s("div",null,o)}const k=n(e,[["render",i],["__file","2024-06-29-Pass a Function as Parameter to Another in Kotlin.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-29/2024-06-29-Pass%20a%20Function%20as%20Parameter%20to%20Another%20in%20Kotlin.html","title":"Kotlin中将函数作为参数传递给另一个函数的概述","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","高阶函数"],"tag":["Kotlin","高阶函数","函数式编程"],"head":[["meta",{"name":"keywords","content":"Kotlin, 高阶函数, 函数式编程"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-29/2024-06-29-Pass%20a%20Function%20as%20Parameter%20to%20Another%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中将函数作为参数传递给另一个函数的概述"}],["meta",{"property":"og:description","content":"Kotlin中将函数作为参数传递给另一个函数的概述 Kotlin以其简洁的语法和强大的功能，提供了多种实现效率和可读性的方法。其中一项特性是将函数作为参数传递给其他函数的能力，这被称为高阶函数。这种能力允许我们编写更灵活、可重用的代码，使我们能够编写更干净、更富有表现力的程序。 在本教程中，我们将简要讨论Kotlin的高阶函数，并探索如何将函数作为参数..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-29T21:53:34.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:tag","content":"高阶函数"}],["meta",{"property":"article:tag","content":"函数式编程"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-29T21:53:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中将函数作为参数传递给另一个函数的概述\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-29T21:53:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中将函数作为参数传递给另一个函数的概述 Kotlin以其简洁的语法和强大的功能，提供了多种实现效率和可读性的方法。其中一项特性是将函数作为参数传递给其他函数的能力，这被称为高阶函数。这种能力允许我们编写更灵活、可重用的代码，使我们能够编写更干净、更富有表现力的程序。 在本教程中，我们将简要讨论Kotlin的高阶函数，并探索如何将函数作为参数..."},"headers":[{"level":2,"title":"2. 关于高阶函数的一些话","slug":"_2-关于高阶函数的一些话","link":"#_2-关于高阶函数的一些话","children":[]},{"level":2,"title":"3. 将Lambda表达式作为函数传递","slug":"_3-将lambda表达式作为函数传递","link":"#_3-将lambda表达式作为函数传递","children":[]},{"level":2,"title":"4. 传递现有函数","slug":"_4-传递现有函数","link":"#_4-传递现有函数","children":[{"level":3,"title":"4.1. 传递实例函数","slug":"_4-1-传递实例函数","link":"#_4-1-传递实例函数","children":[]},{"level":3,"title":"4.2. 在类的伴生对象中传递函数","slug":"_4-2-在类的伴生对象中传递函数","link":"#_4-2-在类的伴生对象中传递函数","children":[]},{"level":3,"title":"4.3. 传递对象函数","slug":"_4-3-传递对象函数","link":"#_4-3-传递对象函数","children":[]},{"level":3,"title":"4.4. 传递顶级函数","slug":"_4-4-传递顶级函数","link":"#_4-4-传递顶级函数","children":[]}]},{"level":2,"title":"5. 将函数赋值给变量","slug":"_5-将函数赋值给变量","link":"#_5-将函数赋值给变量","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719698014000,"updatedTime":1719698014000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.69,"words":2006},"filePathRelative":"posts/baeldung/2024-06-29/2024-06-29-Pass a Function as Parameter to Another in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"\\n<p>Kotlin以其简洁的语法和强大的功能，提供了多种实现效率和可读性的方法。其中一项特性是将函数作为参数传递给其他函数的能力，这被称为高阶函数。这种能力允许我们编写更灵活、可重用的代码，使我们能够编写更干净、更富有表现力的程序。</p>\\n<p>在本教程中，我们将简要讨论Kotlin的高阶函数，并探索如何将函数作为参数传递给高阶函数。</p>\\n<h2>2. 关于高阶函数的一些话</h2>\\n<p><strong>在Kotlin中，函数是一等公民，这意味着它们可以被当作值来对待。</strong> 这包括将函数作为参数传递给其他函数、从函数返回函数以及将函数赋值给变量。</p>\\n<p><strong>接受其他函数作为参数或返回它们的函数被称为高阶函数。</strong></p>","autoDesc":true}');export{k as comp,d as data};

import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-bN4DcMMr.js";const t={},p=e(`<hr><h1 id="java中基于值的类" tabindex="-1"><a class="header-anchor" href="#java中基于值的类"><span>Java中基于值的类</span></a></h1><p>在本教程中，我们将讨论Project Valhalla为Java生态系统带来的一个非常有趣的特性——基于值的类。基于值的类是在Java 8中引入的，并在后续版本中经历了重大的重构和增强。</p><h3 id="_2-1-project-valhalla" tabindex="-1"><a class="header-anchor" href="#_2-1-project-valhalla"><span>2.1. Project Valhalla</span></a></h3><p>Project Valhalla是由OpenJDK的一个实验性项目，旨在为Java添加新特性和能力。该计划的主要目标是添加对值类型、泛型专业化以及在保持完全向后兼容性的同时的性能改进的改进支持。</p><p>基于值的类是由Project Valhalla引入的一个特性，它将原始的、不可变值引入到Java语言中，而没有传统面向对象类带来的额外开销。</p><h3 id="_2-2-原始类型和值类型" tabindex="-1"><a class="header-anchor" href="#_2-2-原始类型和值类型"><span>2.2. 原始类型和值类型</span></a></h3><p>在我们给出基于值的类的正式定义之前，让我们先看看Java中的两个重要语义——原始类型和值类型。</p><p><strong>Java中的原始数据类型，或称为原始类型，是表示单个值的简单数据类型，并且不是对象。Java提供了八种这样的原始数据类型：<em>byte</em>、<em>short</em>、<em>int</em>、<em>long</em>、<em>float</em>、<em>double</em>、<em>char_和_boolean</em>。虽然这些是简单类型，但Java为我们提供了每种原始类型的包装类，以便我们以面向对象的方式与它们交互。</strong></p><p>还重要的是要记住，Java会自动执行装箱和拆箱操作，以高效地在对象和原始类型之间进行转换：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\` list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 这是自动装箱</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>原始类型驻留在栈内存中，而我们在代码中使用的对象驻留在堆内存中。</strong></p><p>Project Valhalla在Java生态系统中引入了一种新类型，它介于对象和原始类型之间，被称为值类型。值类型**是不可变类型，并且没有任何身份。**这些值类型也不支持继承。</p><p>值类型不是通过它们的引用来寻址，而是通过它们的值，就像原始类型一样。</p><h3 id="_2-3-基于值的类" tabindex="-1"><a class="header-anchor" href="#_2-3-基于值的类"><span>2.3. 基于值的类</span></a></h3><p>基于值的类是被设计为在Java中表现得像并封装值类型的类。JVM可以自由地在值类型和它的基于值的类之间切换，就像自动装箱和拆箱一样。因此，基于值的类也是没有身份的。</p><h1 id="_3-基于值的类的特性" tabindex="-1"><a class="header-anchor" href="#_3-基于值的类的特性"><span>3. 基于值的类的特性</span></a></h1><p>基于值的类代表简单的不可变值。一个基于值的类有几个特性，可以归类为一些通用主题。</p><h3 id="_3-1-不可变性" tabindex="-1"><a class="header-anchor" href="#_3-1-不可变性"><span>3.1. 不可变性</span></a></h3><p>基于值的类旨在代表不可变数据，类似于_int_等原始类型，并具有以下特性：</p><ul><li>一个基于值的类始终是_final_</li><li>它只包含_final_字段</li><li>该类可以扩展_Object_类或不声明实例字段的抽象类层次结构</li></ul><h3 id="_3-2-对象创建" tabindex="-1"><a class="header-anchor" href="#_3-2-对象创建"><span>3.2. 对象创建</span></a></h3><p>让我们了解如何创建基于值的类的新对象：</p><ul><li>该类不声明任何可访问的构造函数</li><li>如果有可访问的构造函数，它们应该被标记为弃用以供移除</li><li>该类应该只通过工厂方法进行实例化。从工厂接收到的实例可能是新实例，也可能不是，调用代码不应该对其身份做出任何假设</li></ul><h3 id="_3-3-身份和-equals-、hashcode-、-tostring-方法" tabindex="-1"><a class="header-anchor" href="#_3-3-身份和-equals-、hashcode-、-tostring-方法"><span>3.3. 身份和_equals()_、<em>hashCode()</em>、_toString()_方法</span></a></h3><p>基于值的类没有身份。由于它们仍然是Java中的类，我们需要理解从_Object_类继承的方法是如何发生的：</p><ul><li><em>equals()</em>、_hashCode()_和_toString()_的实现完全基于其实例成员的值，而不是它们的身份，也不是任何其他实例的状态</li><li>我们仅根据对象的_equals()_检查认为两个对象相等，而不是基于引用相等性，即==</li><li>我们可以互换使用两个相等的对象，它们在任何计算或方法调用中应该产生相同的结果</li></ul><h3 id="_3-4-一些额外的注意事项" tabindex="-1"><a class="header-anchor" href="#_3-4-一些额外的注意事项"><span>3.4. 一些额外的注意事项</span></a></h3><p>在使用基于值的类时，我们应该考虑一些额外的限制：</p><ul><li>两个基于_equals()_方法相等的对象，在JVM中可能是不同的对象，也可能是相同的</li><li>我们不能确保监视器的独占所有权，使得实例不适合同步</li></ul><h1 id="_4-基于值的类的示例" tabindex="-1"><a class="header-anchor" href="#_4-基于值的类的示例"><span>4. 基于值的类的示例</span></a></h1><h3 id="_4-1-jdk中的基于值的类" tabindex="-1"><a class="header-anchor" href="#_4-1-jdk中的基于值的类"><span>4.1. JDK中的基于值的类</span></a></h3><p>JDK中有几个类遵循基于值的类规范。</p><p>当它首次引入时，<em>java.util.Optional_和DateTime API（<em>java.time.LocalDateTime</em>）是基于值的类。从Java 16及更高版本开始，Java已经将所有原始类型的包装类定义为基于值的，例如_Integer_和_Long</em>。</p><p>这些类有来自_jdk.internal_包的_@ValueBased_注解：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@jdk.internal.ValueBased</span>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">Integer</span> <span class="token keyword">extends</span> <span class="token class-name">Number</span> <span class="token keyword">implements</span> <span class="token class-name">Comparable</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\`<span class="token punctuation">,</span> <span class="token class-name">Constable</span><span class="token punctuation">,</span> <span class="token class-name">ConstantDesc</span> <span class="token punctuation">{</span>
    <span class="token comment">// JDK中的Integer类</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-自定义基于值的类" tabindex="-1"><a class="header-anchor" href="#_4-2-自定义基于值的类"><span>4.2. 自定义基于值的类</span></a></h3><p>让我们创建一个遵循上面定义的基于值的类规范的自定义类。以我们的示例来说，我们采用一个_Point_类，它标识3D空间中的一个点。该类有3个整型字段_x_、<em>y_和_z</em>。</p><p>我们可以认为_Point_定义是一个很好的基于值的类候选，因为空间中的一个特定点是唯一的，只能通过它的值来引用。它是恒定的且明确的，就像值为302的整数一样。</p><p>我们将通过将类定义为_final_，并将属性_x_、_y_和_z_定义为final来开始：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">Point</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">int</span> x<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">int</span> y<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">int</span> z<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>    <span class="token comment">// 不可访问的构造函数</span>
    <span class="token keyword">private</span> <span class="token class-name">Point</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">,</span> <span class="token keyword">int</span> y<span class="token punctuation">,</span> <span class="token keyword">int</span> z<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>x <span class="token operator">=</span> x<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>y <span class="token operator">=</span> y<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>z <span class="token operator">=</span> z<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们事先创建一个_origin(0, 0, 0)<em>实例，并在每次调用创建点时返回相同的实例，如果_x = 0</em>、<em>y = 0_和_z = 0</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Point</span> <span class="token constant">ORIGIN</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Point</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们现在需要以工厂方法的形式提供一种对象创建机制：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Point</span> <span class="token function">valueOfPoint</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">,</span> <span class="token keyword">int</span> y<span class="token punctuation">,</span> <span class="token keyword">int</span> z<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果是原点，则返回缓存的实例，或者是新实例</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isOrigin</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> z<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token constant">ORIGIN</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Point</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> z<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 检查一个点是否是原点</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isOrigin</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">,</span> <span class="token keyword">int</span> y<span class="token punctuation">,</span> <span class="token keyword">int</span> z<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> x <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> y <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> z <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>工厂方法_valueOfPoint()_可以根据参数返回新实例或缓存的实例。<strong>这迫使调用代码不对对象的状态做出任何假设或比较两个实例的引用。</strong></p><p>最后，我们应该基于实例字段的值定义_equals()_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">Object</span> other<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>other <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> other<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">Point</span> point <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Point</span><span class="token punctuation">)</span> other<span class="token punctuation">;</span>
    <span class="token keyword">return</span> x <span class="token operator">==</span> point<span class="token punctuation">.</span>x <span class="token operator">&amp;&amp;</span> y <span class="token operator">==</span> point<span class="token punctuation">.</span>y <span class="token operator">&amp;&amp;</span> z <span class="token operator">==</span> point<span class="token punctuation">.</span>z<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">hash</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> z<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们现在有一个可以表现为基于值的类的_Point_类。我们可以在从_jdk.internal_包导入后将_@ValueBased_注解放到类上。然而，这在我们的案例中并不是必需的。</p><p>现在让我们测试两个表示同一空间点(1,2,3)的实例是否相等：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenValueBasedPoint_whenCompared_thenReturnEquals</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Point</span> p1 <span class="token operator">=</span> <span class="token class-name">Point</span><span class="token punctuation">.</span><span class="token function">valueOfPoint</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Point</span> p2 <span class="token operator">=</span> <span class="token class-name">Point</span><span class="token punctuation">.</span><span class="token function">valueOfPoint</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span>p1<span class="token punctuation">,</span> p2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，为了这个练习，让我们也看看当创建两个原点实例时，如果按引用比较，两个实例是否相同：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenValueBasedPoint_whenOrigin_thenReturnCachedInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Point</span> p1 <span class="token operator">=</span> <span class="token class-name">Point</span><span class="token punctuation">.</span><span class="token function">valueOfPoint</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Point</span> p2 <span class="token operator">=</span> <span class="token class-name">Point</span><span class="token punctuation">.</span><span class="token function">valueOfPoint</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 对于基于值的类，以下不应该被假设</span>
    <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span>p1 <span class="token operator">==</span> p2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_5-基于值的类的优势" tabindex="-1"><a class="header-anchor" href="#_5-基于值的类的优势"><span>5. 基于值的类的优势</span></a></h1><p>现在我们知道了基于值的类是什么以及如何定义一个，让我们理解为什么我们可能需要基于值的类。</p><p>作为Valhalla规范的一部分，基于值的类仍然处于实验阶段并持续发展。因此，这类类的好处可能会随着时间而变化。</p><p>截至目前，使用基于值的类最重要的好处是内存利用。由于它们没有基于引用的身份，基于值的类在内存效率上更高。<strong>此外，JVM可以重用现有实例或根据需要创建新实例，从而减少内存占用</strong>此外，JVM可以重用现有实例或根据需要创建新实例，从而减少内存占用。** 另外，它们不需要同步，这提高了整体性能，尤其是在多线程应用程序中。</p><h2 id="_6-基于值的类与其他类型的不同" tabindex="-1"><a class="header-anchor" href="#_6-基于值的类与其他类型的不同"><span>6. 基于值的类与其他类型的不同</span></a></h2><h3 id="_6-1-不可变类" tabindex="-1"><a class="header-anchor" href="#_6-1-不可变类"><span>6.1. 不可变类</span></a></h3><p>Java中的不可变类与基于值的类有很多共同之处。因此，理解它们之间的区别非常重要。</p><p>虽然基于值的类是新的并且是正在进行的实验特性的一部分，但不可变类一直是Java生态系统的核心和重要组成部分已经有很长时间了。<strong>String类、枚举以及Java中的包装类，如Integer类，都是不可变类的例子。</strong></p><p><strong>不可变类不像基于值的类那样没有身份。</strong> 具有相同状态的不可变类实例是不同的，我们可以根据引用等式来比较它们。<strong>基于值的类的实例没有基于引用等式的概念：</strong></p><p><strong>不可变类可以自由地提供可访问的构造函数，并且可以具有多个属性和复杂的行为。</strong> 然而，基于值的类代表简单值，并且不定义具有依赖属性的复杂行为。</p><p><strong>最后，我们应该注意到，根据定义，基于值的类是不可变的，但反之则不然。</strong></p><h3 id="_6-2-记录" tabindex="-1"><a class="header-anchor" href="#_6-2-记录"><span>6.2. 记录</span></a></h3><p>Java在Java 14中引入了记录的概念，作为传递不可变数据对象的简便方式。记录和基于值的类实现了不同的目的，即使它们在行为和语义上看起来相似。</p><p><strong>记录和基于值的类之间最明显的区别是记录具有公共构造函数，而基于值的类则没有。</strong></p><h1 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h1><p>在本文中，我们讨论了Java中的基于值的类和值类型的概念。我们触及了基于值的类必须遵守的重要特性以及它们带来的好处。我们还讨论了基于值的类与Java中的类似概念，如不可变类和记录之间的差异。</p><p>如往常一样，本文中使用的所有代码片段都可以在GitHub上找到。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/0f08492941896785c081f90c7a231caa?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png" alt="img" loading="lazy"></p><p>OK</p>`,73),o=[p];function l(c,i){return s(),n("div",null,o)}const d=a(t,[["render",l],["__file","2024-06-30-Value Based Classes in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-30/2024-06-30-Value%20Based%20Classes%20in%20Java.html","title":"Java中基于值的类","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Programming"],"tag":["Java","Value-Based Classes","Project Valhalla"],"head":[["meta",{"name":"keywords","content":"Java, Value-Based Classes, Project Valhalla, Immutable"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-30/2024-06-30-Value%20Based%20Classes%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中基于值的类"}],["meta",{"property":"og:description","content":"Java中基于值的类 在本教程中，我们将讨论Project Valhalla为Java生态系统带来的一个非常有趣的特性——基于值的类。基于值的类是在Java 8中引入的，并在后续版本中经历了重大的重构和增强。 2.1. Project Valhalla Project Valhalla是由OpenJDK的一个实验性项目，旨在为Java添加新特性和能力。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-30T04:33:28.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Value-Based Classes"}],["meta",{"property":"article:tag","content":"Project Valhalla"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-30T04:33:28.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中基于值的类\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/0f08492941896785c081f90c7a231caa?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-30T04:33:28.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中基于值的类 在本教程中，我们将讨论Project Valhalla为Java生态系统带来的一个非常有趣的特性——基于值的类。基于值的类是在Java 8中引入的，并在后续版本中经历了重大的重构和增强。 2.1. Project Valhalla Project Valhalla是由OpenJDK的一个实验性项目，旨在为Java添加新特性和能力。..."},"headers":[{"level":3,"title":"2.1. Project Valhalla","slug":"_2-1-project-valhalla","link":"#_2-1-project-valhalla","children":[]},{"level":3,"title":"2.2. 原始类型和值类型","slug":"_2-2-原始类型和值类型","link":"#_2-2-原始类型和值类型","children":[]},{"level":3,"title":"2.3. 基于值的类","slug":"_2-3-基于值的类","link":"#_2-3-基于值的类","children":[]},{"level":3,"title":"3.1. 不可变性","slug":"_3-1-不可变性","link":"#_3-1-不可变性","children":[]},{"level":3,"title":"3.2. 对象创建","slug":"_3-2-对象创建","link":"#_3-2-对象创建","children":[]},{"level":3,"title":"3.3. 身份和_equals()_、hashCode()、_toString()_方法","slug":"_3-3-身份和-equals-、hashcode-、-tostring-方法","link":"#_3-3-身份和-equals-、hashcode-、-tostring-方法","children":[]},{"level":3,"title":"3.4. 一些额外的注意事项","slug":"_3-4-一些额外的注意事项","link":"#_3-4-一些额外的注意事项","children":[]},{"level":3,"title":"4.1. JDK中的基于值的类","slug":"_4-1-jdk中的基于值的类","link":"#_4-1-jdk中的基于值的类","children":[]},{"level":3,"title":"4.2. 自定义基于值的类","slug":"_4-2-自定义基于值的类","link":"#_4-2-自定义基于值的类","children":[]},{"level":2,"title":"6. 基于值的类与其他类型的不同","slug":"_6-基于值的类与其他类型的不同","link":"#_6-基于值的类与其他类型的不同","children":[{"level":3,"title":"6.1. 不可变类","slug":"_6-1-不可变类","link":"#_6-1-不可变类","children":[]},{"level":3,"title":"6.2. 记录","slug":"_6-2-记录","link":"#_6-2-记录","children":[]}]}],"git":{"createdTime":1719722008000,"updatedTime":1719722008000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":8.86,"words":2658},"filePathRelative":"posts/baeldung/2024-06-30/2024-06-30-Value Based Classes in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java中基于值的类</h1>\\n<p>在本教程中，我们将讨论Project Valhalla为Java生态系统带来的一个非常有趣的特性——基于值的类。基于值的类是在Java 8中引入的，并在后续版本中经历了重大的重构和增强。</p>\\n<h3>2.1. Project Valhalla</h3>\\n<p>Project Valhalla是由OpenJDK的一个实验性项目，旨在为Java添加新特性和能力。该计划的主要目标是添加对值类型、泛型专业化以及在保持完全向后兼容性的同时的性能改进的改进支持。</p>\\n<p>基于值的类是由Project Valhalla引入的一个特性，它将原始的、不可变值引入到Java语言中，而没有传统面向对象类带来的额外开销。</p>","autoDesc":true}');export{d as comp,k as data};

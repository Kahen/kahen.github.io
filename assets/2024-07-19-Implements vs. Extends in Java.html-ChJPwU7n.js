import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-C4eFoh0f.js";const t={},p=e(`<hr><h1 id="java-中的-implements-与-extends" tabindex="-1"><a class="header-anchor" href="#java-中的-implements-与-extends"><span>Java 中的 implements 与 extends</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将讨论面向对象编程的关键概念之一——继承。在 Java 中，用于继承的两个主要关键字是 <strong><em>extends</em></strong> 和 <strong><em>implements</em></strong>。</p><p>让我们讨论这两个关键字之间的区别。</p><p><strong>我们使用 <em>extends</em> 关键字来继承一个类的属性和方法。</strong> 作为父类的类被称为基类，从这个基类继承的类被称为派生类或子类。主要来说，<em>extends</em> 关键字用于将父类的功能性扩展到派生类。此外，一个基类可以有多个派生类，但一个派生类只能有一个基类，因为 Java 不支持多重继承。</p><p>另一方面，<strong>我们使用 <em>implements</em> 关键字来实现一个接口。</strong> 一个接口只包含抽象方法。一个类将实现该接口，并根据所需的功能定义这些抽象方法。<strong>与 <em>extends</em> 不同，任何类都可以实现多个接口。</strong></p><p>尽管这两个关键字都与继承的概念一致，但 <em>implements</em> 关键字主要与抽象相关，并用于定义一个契约，而 <em>extends</em> 用于扩展一个类现有的功能。</p><h2 id="_3-实现" tabindex="-1"><a class="header-anchor" href="#_3-实现"><span>3. 实现</span></a></h2><p>让我们进入实现，并详细查看 <em>extends</em>、<em>implements</em> 以及多重继承。</p><h3 id="_3-1-extends" tabindex="-1"><a class="header-anchor" href="#_3-1-extends"><span>3.1. <em>extends</em></span></a></h3><p>让我们从创建一个名为 <em>Media</em> 的类开始，它有 <em>id</em>、<em>title</em> 和 <em>artist</em>。这个类将作为基类。<em>VideoMedia</em> 和 <em>AudioMedia</em> 将扩展这个类的功能：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Media</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> artist<span class="token punctuation">;</span>
    <span class="token comment">// 标准 getter 和 setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们创建另一个名为 <em>VideoMedia</em> 的类，它 <em>extends</em> 类 <em>Media</em>，继承其属性。此外，它还有自己的属性，如 <em>resolution</em> 和 <em>aspectRatio</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">VideoMedia</span> <span class="token keyword">extends</span> <span class="token class-name">Media</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> resolution<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> aspectRatio<span class="token punctuation">;</span>
    <span class="token comment">// 标准 getter 和 setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，类 <em>AudioMedia</em> 也 <em>extends</em> 类 <em>Media</em>，并将有自己的额外属性，如 <em>bitrate</em> 和 <em>frequency</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AudioMedia</span> <span class="token keyword">extends</span> <span class="token class-name">Media</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> bitrate<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> frequency<span class="token punctuation">;</span>
    <span class="token comment">// 标准 getter 和 setter</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">printTitle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;AudioMedia Title&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们为基类和派生类创建对象，看看继承的属性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Media</span> media <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Media</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
media<span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span><span class="token number">001</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
media<span class="token punctuation">.</span><span class="token function">setTitle</span><span class="token punctuation">(</span><span class="token string">&quot;Media1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
media<span class="token punctuation">.</span><span class="token function">setArtist</span><span class="token punctuation">(</span><span class="token string">&quot;Artist001&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">AudioMedia</span> audioMedia <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AudioMedia</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
audioMedia<span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span><span class="token number">101</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
audioMedia<span class="token punctuation">.</span><span class="token function">setTitle</span><span class="token punctuation">(</span><span class="token string">&quot;Audio1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
audioMedia<span class="token punctuation">.</span><span class="token function">setArtist</span><span class="token punctuation">(</span><span class="token string">&quot;Artist101&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
audioMedia<span class="token punctuation">.</span><span class="token function">setBitrate</span><span class="token punctuation">(</span><span class="token number">3500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
audioMedia<span class="token punctuation">.</span><span class="token function">setFrequency</span><span class="token punctuation">(</span><span class="token string">&quot;256kbps&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">VideoMedia</span> videoMedia <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VideoMedia</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
videoMedia<span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span><span class="token number">201</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
videoMedia<span class="token punctuation">.</span><span class="token function">setTitle</span><span class="token punctuation">(</span><span class="token string">&quot;Video1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
videoMedia<span class="token punctuation">.</span><span class="token function">setArtist</span><span class="token punctuation">(</span><span class="token string">&quot;Artist201&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
videoMedia<span class="token punctuation">.</span><span class="token function">setResolution</span><span class="token punctuation">(</span><span class="token string">&quot;1024x768&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
videoMedia<span class="token punctuation">.</span><span class="token function">setAspectRatio</span><span class="token punctuation">(</span><span class="token string">&quot;16:9&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>media<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>audioMedia<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>videoMedia<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所有三个类都打印了相关的属性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Media{id=1, title=&#39;Media1&#39;, artist=&#39;Artist001&#39;}
AudioMedia{id=101, title=&#39;Audio1&#39;, artist=&#39;Artist101&#39;, bitrate=3500, frequency=&#39;256kbps&#39;}
VideoMedia{id=201, title=&#39;Video1&#39;, artist=&#39;Artist201&#39;resolution=&#39;1024x768&#39;, aspectRatio=&#39;16:9&#39;}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-implements" tabindex="-1"><a class="header-anchor" href="#_3-2-implements"><span>3.2. <em>implements</em></span></a></h3><p>为了理解抽象和接口，我们将创建一个名为 <em>MediaPlayer</em> 的接口，它有两个名为 <em>play</em> 和 <em>pause</em> 的方法。正如之前提到的，这个接口中的所有方法都是抽象的。换句话说，接口只包含方法声明。</p><p><strong>在 Java 中，接口不需要显式声明一个方法为 <em>abstract</em> 或 <em>public</em>。</strong> 实现接口 <em>MediaPlayer</em> 的类将定义这些方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">MediaPlayer</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">void</span> <span class="token function">pause</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类 <em>AudioMediaPlayer</em> <em>implements</em> <em>MediaPlayer</em>，并为音频媒体定义 <em>play</em> 和 <em>pause</em> 方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AudioMediaPlayer</span> <span class="token keyword">implements</span> <span class="token class-name">MediaPlayer</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;AudioMediaPlayer is Playing&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">pause</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;AudioMediaPlayer is Paused&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，<em>VideoMediaPlayer</em> 实现 <em>MediaPlayer</em> 并为视频媒体提供 <em>play</em> 和 <em>pause</em> 方法定义：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">VideoMediaPlayer</span> <span class="token keyword">implements</span> <span class="token class-name">MediaPlayer</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;VideoMediaPlayer is Playing&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">pause</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;VideoMediaPlayer is Paused&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>进一步，让我们创建 <em>AudioMediaPlayer</em> 和 <em>VideoMediaPlayer</em> 的实例，并为它们调用 <em>play</em> 和 <em>pause</em> 方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">AudioMediaPlayer</span> audioMediaPlayer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AudioMediaPlayer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
audioMediaPlayer<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
audioMediaPlayer<span class="token punctuation">.</span><span class="token function">pause</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">VideoMediaPlayer</span> videoMediaPlayer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VideoMediaPlayer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
videoMediaPlayer<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
videoMediaPlayer<span class="token punctuation">.</span><span class="token function">pause</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>AudioMediaPlayer</em> 和 <em>VideoMediaPlayer</em> 调用它们各自的 <em>play</em> 和 <em>pause</em> 实现：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>AudioMediaPlayer is Playing
AudioMediaPlayer is Paused

VideoMediaPlayer is Playing
VideoMediaPlayer is Paused
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-多重继承" tabindex="-1"><a class="header-anchor" href="#_3-3-多重继承"><span>3.3. 多重继承</span></a></h3><p><strong>由于歧义问题，Java 不直接支持多重继承。</strong> 当一个类从多个父类继承，并且这两个父类都有一个同名的方法或属性时，会发生歧义问题。因此，子类无法解决要继承的方法或属性的冲突。<strong>然而，一个类可以从多个接口继承。</strong> 让我们创建一个名为 <em>AdvancedPlayerOptions</em> 的接口：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">AdvancedPlayerOptions</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">seek</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">void</span> <span class="token function">fastForward</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类 <em>MultiMediaPlayer</em> <em>implements</em> <em>MediaPlayer</em> 和 <em>AdvancedPlayerOptions</em> 并定义这两个接口中声明的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MultiMediaPlayer</span> <span class="token keyword">implements</span> <span class="token class-name">MediaPlayer</span><span class="token punctuation">,</span> <span class="token class-name">AdvancedPlayerOptions</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;MultiMediaPlayer is Playing&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">pause</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;MultiMediaPlayer is Paused&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">seek</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;MultiMediaPlayer is being seeked&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">fastForward</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;MultiMediaPlayer is being fast forwarded&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们将创建 <em>MultiMediaPlayer</em> 类的实例并调用所有实现的方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">MultiMediaPlayer</span> multiMediaPlayer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MultiMediaPlayer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
multiMediaPlayer<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
multiMediaPlayer<span class="token punctuation">.</span><span class="token function">pause</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
multiMediaPlayer<span class="token punctuation">.</span><span class="token function">seek</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
multiMediaPlayer<span class="token punctuation">.</span><span class="token function">fastForward</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如预期的那样，<em>MultiMediaPlayer</em> 调用它的 <em>play</em> 和 <em>pause</em> 实现：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>MultiMediaPlayer is Playing
MultiMediaPlayer is Paused
MultiMediaPlayer is being seeked
MultiMediaPlayer is being fast forwarded
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本教程中，我们讨论了 <em>extends</em> 和 <em>implements</em> 之间的显著差异。此外，我们创建了类和接口来演示 <em>extends</em> 和 <em>implements</em> 的概念。<strong>我们还讨论了多重继承以及如何通过接口实现它。</strong></p><p>此实现可在 GitHub 上获取。</p>`,45),i=[p];function o(l,c){return s(),a("div",null,i)}const r=n(t,[["render",o],["__file","2024-07-19-Implements vs. Extends in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-19/2024-07-19-Implements%20vs.%20Extends%20in%20Java.html","title":"Java 中的 implements 与 extends","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Object-Oriented Programming"],"tag":["Java","Inheritance","Interfaces"],"head":[["meta",{"name":"keywords","content":"Java, Inheritance, Interfaces, Extends, Implements"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-19/2024-07-19-Implements%20vs.%20Extends%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 中的 implements 与 extends"}],["meta",{"property":"og:description","content":"Java 中的 implements 与 extends 1. 概述 在本教程中，我们将讨论面向对象编程的关键概念之一——继承。在 Java 中，用于继承的两个主要关键字是 extends 和 implements。 让我们讨论这两个关键字之间的区别。 我们使用 extends 关键字来继承一个类的属性和方法。 作为父类的类被称为基类，从这个基类继承的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-19T20:11:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Inheritance"}],["meta",{"property":"article:tag","content":"Interfaces"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-19T20:11:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 中的 implements 与 extends\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-19T20:11:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 中的 implements 与 extends 1. 概述 在本教程中，我们将讨论面向对象编程的关键概念之一——继承。在 Java 中，用于继承的两个主要关键字是 extends 和 implements。 让我们讨论这两个关键字之间的区别。 我们使用 extends 关键字来继承一个类的属性和方法。 作为父类的类被称为基类，从这个基类继承的..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"3. 实现","slug":"_3-实现","link":"#_3-实现","children":[{"level":3,"title":"3.1. extends","slug":"_3-1-extends","link":"#_3-1-extends","children":[]},{"level":3,"title":"3.2. implements","slug":"_3-2-implements","link":"#_3-2-implements","children":[]},{"level":3,"title":"3.3. 多重继承","slug":"_3-3-多重继承","link":"#_3-3-多重继承","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721419916000,"updatedTime":1721419916000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.98,"words":1195},"filePathRelative":"posts/baeldung/2024-07-19/2024-07-19-Implements vs. Extends in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java 中的 implements 与 extends</h1>\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将讨论面向对象编程的关键概念之一——继承。在 Java 中，用于继承的两个主要关键字是 <strong><em>extends</em></strong> 和 <strong><em>implements</em></strong>。</p>\\n<p>让我们讨论这两个关键字之间的区别。</p>\\n<p><strong>我们使用 <em>extends</em> 关键字来继承一个类的属性和方法。</strong> 作为父类的类被称为基类，从这个基类继承的类被称为派生类或子类。主要来说，<em>extends</em> 关键字用于将父类的功能性扩展到派生类。此外，一个基类可以有多个派生类，但一个派生类只能有一个基类，因为 Java 不支持多重继承。</p>","autoDesc":true}');export{r as comp,k as data};

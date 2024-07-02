import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BBuWtJOD.js";const e={},p=t(`<h1 id="kotlin中的组合模式" tabindex="-1"><a class="header-anchor" href="#kotlin中的组合模式"><span>Kotlin中的组合模式</span></a></h1><p>设计模式是一组经过测试的解决方案，用于解决软件设计中反复出现的问题。组合模式是一种常见的设计模式。这种模式帮助我们无论是逐个处理还是整体处理，都能处理复杂的结构。</p><p>在本教程中，我们将更深入地了解组合模式。我们将查看它的定义，它解决的问题，演示一个简单的实现，并以它的优缺点作为结论。</p><h2 id="组合模式概览" tabindex="-1"><a class="header-anchor" href="#组合模式概览"><span>组合模式概览</span></a></h2><p>现在，让我们深入组合模式的理论。</p><h3 id="_2-1-定义" tabindex="-1"><a class="header-anchor" href="#_2-1-定义"><span>2.1. 定义</span></a></h3><p>组合模式是一种结构模式，允许我们统一地对待一组对象。当我们有像树这样的对象层次结构，并希望像对待单个对象一样对整个结构执行操作时，这种模式就非常有用。</p><p>这种模式的关键思想是我们有不同类型的对象：叶子或单独的对象和组合对象。这些不同类型的对象需要实现一个公共的超类型，例如接口或抽象类。<strong>公共接口或组件定义了可以在我们对象层次结构中不同类型的对象上执行的操作</strong>。</p><p>叶子对象代表不包含子对象的单个对象，而组合对象可以包含任意数量的子组件。因此，组合对象可以包含叶子对象以及其他组合对象。</p><h3 id="_2-2-它解决的问题" tabindex="-1"><a class="header-anchor" href="#_2-2-它解决的问题"><span>2.2. 它解决的问题</span></a></h3><p>简单来说，组合模式允许我们设计一个客户端，可以通过组件接口与我们的层次结构的任何部分进行交互，无论具体类型如何。<strong>它使我们能够一致地使用单个对象和对象组</strong>。如果不使用这种模式，尝试对我们的对象层次结构执行某些操作可能会迫使我们使用嵌套循环或if-else语句，使我们的代码变得笨重且难以管理。</p><p>在下一节中，我们将看到如何使用这种模式构建一个简单的电影播放器应用程序。</p><h2 id="_3-演示-简单的电影播放器应用程序" tabindex="-1"><a class="header-anchor" href="#_3-演示-简单的电影播放器应用程序"><span>3. 演示：简单的电影播放器应用程序</span></a></h2><p>我们的电影播放器应用程序允许用户创建他们最喜欢的电影播放列表。每个播放列表可以包含单独的电影以及其他播放列表。<strong>因此，《Playlist》和《Movie》类构成了我们的对象层次结构</strong>。</p><p>首先，我们将定义我们的_MovieComponent_接口，它代表我们将为所有对象类型实现的组件：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">interface</span> MovieComponent <span class="token punctuation">{</span>
    <span class="token keyword">fun</span> <span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String
    <span class="token keyword">fun</span> <span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将实现_Movie_类，它代表模式中的单个叶子：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> <span class="token function">Movie</span><span class="token punctuation">(</span><span class="token keyword">private</span> <span class="token keyword">val</span> name<span class="token operator">:</span> String<span class="token punctuation">)</span> <span class="token operator">:</span> MovieComponent <span class="token punctuation">{</span>
    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string-literal singleline"><span class="token string">&quot;Playing movie: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">name</span></span><span class="token string">\\n&quot;</span></span>
    <span class="token punctuation">}</span>

    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string-literal singleline"><span class="token string">&quot;Stopping movie: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">name</span></span><span class="token string">\\n&quot;</span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们需要定义_Playlist_类，它代表我们的组合组件：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> <span class="token function">Playlist</span><span class="token punctuation">(</span><span class="token keyword">private</span> <span class="token keyword">val</span> name<span class="token operator">:</span> String<span class="token punctuation">)</span> <span class="token operator">:</span> MovieComponent <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">val</span> movieComponents <span class="token operator">=</span> mutableListOf<span class="token function">\`&lt;MovieComponent&gt;\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">fun</span> <span class="token function">add</span><span class="token punctuation">(</span>movieComponent<span class="token operator">:</span> MovieComponent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        movieComponents<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>movieComponent<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span>
        <span class="token keyword">val</span> result <span class="token operator">=</span> <span class="token function">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        result<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Playing playlist: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">name</span></span><span class="token string">\\n&quot;</span></span><span class="token punctuation">)</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span>movieComponent <span class="token keyword">in</span> movieComponents<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            result<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>movieComponent<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> result<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span>
        <span class="token keyword">val</span> result <span class="token operator">=</span> <span class="token function">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        result<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Stopping playlist: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">name</span></span><span class="token string">\\n&quot;</span></span><span class="token punctuation">)</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span>movieComponent <span class="token keyword">in</span> movieComponents<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            result<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>movieComponent<span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> result<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>_Playlist_类维护一个_MovieComponent_对象列表，以保存电影或其他播放列表</strong>。它实现了_play()_方法，该方法迭代_MovieComponent_对象列表，并迭代调用每个对象上的_play()_方法。它对_stop()_方法也做同样的事情。</p><h3 id="_3-1-测试" tabindex="-1"><a class="header-anchor" href="#_3-1-测试"><span>3.1. 测试</span></a></h3><p>在本节中，我们将查看我们的应用程序可能的客户端的外观，以及对我们的系统进行单元测试以确保正确性：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> actionMoviesPlayList <span class="token operator">=</span> <span class="token function">Playlist</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Action Movies&quot;</span></span><span class="token punctuation">)</span>
    actionMoviesPlayList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token function">Movie</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;The Matrix&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    actionMoviesPlayList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token function">Movie</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Die Hard&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token keyword">val</span> comicMoviesPlayList <span class="token operator">=</span> <span class="token function">Playlist</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Comic Movies&quot;</span></span><span class="token punctuation">)</span>
    comicMoviesPlayList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token function">Movie</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;The Hangover&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    comicMoviesPlayList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token function">Movie</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Bridesmaids&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token keyword">val</span> allPlaylists <span class="token operator">=</span> <span class="token function">Playlist</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;All Playlists&quot;</span></span><span class="token punctuation">)</span>
    allPlaylists<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>actionMoviesPlayList<span class="token punctuation">)</span>
    allPlaylists<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>comicMoviesPlayList<span class="token punctuation">)</span>

    <span class="token keyword">val</span> playResult <span class="token operator">=</span> allPlaylists<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">val</span> stopResult <span class="token operator">=</span> allPlaylists<span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个客户端中，我们创建了三个播放列表并向它们添加了电影。接下来，我们可以使用_play()_方法播放电影/播放列表，或者使用_stop()_方法停止播放它。</p><p>注意，_play()_和_stop()_方法都会产生结果，我们将在单元测试中调查它们是否正确：</p><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> MovieApplicationUnitTest <span class="token punctuation">{</span>
    <span class="token annotation builtin">@Test</span>
    <span class="token keyword">fun</span> <span class="token function">\`should play movie\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">val</span> movie <span class="token operator">=</span> <span class="token function">Movie</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;The Matrix&quot;</span></span><span class="token punctuation">)</span>
        <span class="token keyword">val</span> result <span class="token operator">=</span> movie<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Playing movie: The Matrix\\n&quot;</span></span><span class="token punctuation">,</span> result<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token annotation builtin">@Test</span>
    <span class="token keyword">fun</span> <span class="token function">\`should stop movie\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">val</span> movie <span class="token operator">=</span> <span class="token function">Movie</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Die Hard&quot;</span></span><span class="token punctuation">)</span>
        <span class="token keyword">val</span> result <span class="token operator">=</span> movie<span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Stopping movie: Die Hard\\n&quot;</span></span><span class="token punctuation">,</span> result<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token annotation builtin">@Test</span>
    <span class="token keyword">fun</span> <span class="token function">\`should play and stop playlist\`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">val</span> playResult <span class="token operator">=</span> allPlaylists<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">val</span> stopResult <span class="token operator">=</span> allPlaylists<span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Playing playlist: All Playlists\\n&quot;</span></span> <span class="token operator">+</span>
            <span class="token string-literal singleline"><span class="token string">&quot;Playing playlist: Action Movies\\n&quot;</span></span> <span class="token operator">+</span>
            <span class="token string-literal singleline"><span class="token string">&quot;Playing movie: The Matrix\\n&quot;</span></span> <span class="token operator">+</span>
            <span class="token string-literal singleline"><span class="token string">&quot;Playing movie: Die Hard\\n&quot;</span></span> <span class="token operator">+</span>
            <span class="token string-literal singleline"><span class="token string">&quot;Playing playlist: Comic Movies\\n&quot;</span></span> <span class="token operator">+</span>
            <span class="token string-literal singleline"><span class="token string">&quot;Playing movie: The Hangover\\n&quot;</span></span> <span class="token operator">+</span>
            <span class="token string-literal singleline"><span class="token string">&quot;Playing movie: Bridesmaids\\n&quot;</span></span><span class="token punctuation">,</span> playResult<span class="token punctuation">)</span>

        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Stopping playlist: All Playlists\\n&quot;</span></span> <span class="token operator">+</span>
            <span class="token string-literal singleline"><span class="token string">&quot;Stopping playlist: Action Movies\\n&quot;</span></span> <span class="token operator">+</span>
            <span class="token string-literal singleline"><span class="token string">&quot;Stopping movie: The Matrix\\n&quot;</span></span> <span class="token operator">+</span>
            <span class="token string-literal singleline"><span class="token string">&quot;Stopping movie: Die Hard\\n&quot;</span></span> <span class="token operator">+</span>
            <span class="token string-literal singleline"><span class="token string">&quot;Stopping playlist: Comic Movies\\n&quot;</span></span> <span class="token operator">+</span>
            <span class="token string-literal singleline"><span class="token string">&quot;Stopping movie: The Hangover\\n&quot;</span></span> <span class="token operator">+</span>
            <span class="token string-literal singleline"><span class="token string">&quot;Stopping movie: Bridesmaids\\n&quot;</span></span><span class="token punctuation">,</span> stopResult<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>具体来说，我们有两个测试用例：一个确保我们的_Movie_类正确播放电影，另一个创建播放列表的播放列表，并递归播放每个子播放列表中的所有电影。</p><h2 id="_4-优缺点" tabindex="-1"><a class="header-anchor" href="#_4-优缺点"><span>4. 优缺点</span></a></h2><p>和其他设计模式一样，组合模式在设计我们的软件系统时也有若干好处和陷阱。</p><p><strong>这些模式的一些好处包括</strong>：</p><ul><li>它允许我们统一对待叶子和组合对象。我们将使我们的代码更简单、更清晰，因为我们不需要以不同的方式处理每种对象类型。</li><li>它提供了一种灵活的方式来表示层次结构。</li><li>它通过提供一种在不修改现有代码的情况下轻松向层次结构中添加新类型的对象（<strong>叶子</strong>或<strong>组合</strong>）的方式，提高了我们系统的可扩展性。</li></ul><p><strong>另一方面，这种模式也有一些限制</strong>：</p><ul><li>在某些情况下，这种模式可能很难实现，特别是当处理大型层次结构时</li><li>在修改层次结构中的单个组件时灵活性有限，因为它统一对待组合和叶子对象。</li></ul><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了组合模式背后的概念以及如何在Kotlin中实现它。通过以相同的方式对待叶子和组合对象，我们可以简化客户端代码并创建更灵活的系统。然而，在决定在我们的项目中使用这种模式之前，权衡利弊是很重要的。</p><p>和往常一样，本文的代码示例和相关测试用例可以在GitHub上找到。</p>`,37),o=[p];function i(l,c){return a(),s("div",null,o)}const k=n(e,[["render",i],["__file","2024-07-01-The Composite Pattern in Kotlin.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-01/2024-07-01-The%20Composite%20Pattern%20in%20Kotlin.html","title":"Kotlin中的组合模式","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","Design Pattern"],"tag":["Composite Pattern","Kotlin"],"head":[["meta",{"name":"keywords","content":"Kotlin, Composite Pattern, Design Pattern"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-01/2024-07-01-The%20Composite%20Pattern%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中的组合模式"}],["meta",{"property":"og:description","content":"Kotlin中的组合模式 设计模式是一组经过测试的解决方案，用于解决软件设计中反复出现的问题。组合模式是一种常见的设计模式。这种模式帮助我们无论是逐个处理还是整体处理，都能处理复杂的结构。 在本教程中，我们将更深入地了解组合模式。我们将查看它的定义，它解决的问题，演示一个简单的实现，并以它的优缺点作为结论。 组合模式概览 现在，让我们深入组合模式的理论..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-01T23:57:00.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Composite Pattern"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-01T23:57:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中的组合模式\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-01T23:57:00.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中的组合模式 设计模式是一组经过测试的解决方案，用于解决软件设计中反复出现的问题。组合模式是一种常见的设计模式。这种模式帮助我们无论是逐个处理还是整体处理，都能处理复杂的结构。 在本教程中，我们将更深入地了解组合模式。我们将查看它的定义，它解决的问题，演示一个简单的实现，并以它的优缺点作为结论。 组合模式概览 现在，让我们深入组合模式的理论..."},"headers":[{"level":2,"title":"组合模式概览","slug":"组合模式概览","link":"#组合模式概览","children":[{"level":3,"title":"2.1. 定义","slug":"_2-1-定义","link":"#_2-1-定义","children":[]},{"level":3,"title":"2.2. 它解决的问题","slug":"_2-2-它解决的问题","link":"#_2-2-它解决的问题","children":[]}]},{"level":2,"title":"3. 演示：简单的电影播放器应用程序","slug":"_3-演示-简单的电影播放器应用程序","link":"#_3-演示-简单的电影播放器应用程序","children":[{"level":3,"title":"3.1. 测试","slug":"_3-1-测试","link":"#_3-1-测试","children":[]}]},{"level":2,"title":"4. 优缺点","slug":"_4-优缺点","link":"#_4-优缺点","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719878220000,"updatedTime":1719878220000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.48,"words":1643},"filePathRelative":"posts/baeldung/2024-07-01/2024-07-01-The Composite Pattern in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"\\n<p>设计模式是一组经过测试的解决方案，用于解决软件设计中反复出现的问题。组合模式是一种常见的设计模式。这种模式帮助我们无论是逐个处理还是整体处理，都能处理复杂的结构。</p>\\n<p>在本教程中，我们将更深入地了解组合模式。我们将查看它的定义，它解决的问题，演示一个简单的实现，并以它的优缺点作为结论。</p>\\n<h2>组合模式概览</h2>\\n<p>现在，让我们深入组合模式的理论。</p>\\n<h3>2.1. 定义</h3>\\n<p>组合模式是一种结构模式，允许我们统一地对待一组对象。当我们有像树这样的对象层次结构，并希望像对待单个对象一样对整个结构执行操作时，这种模式就非常有用。</p>\\n<p>这种模式的关键思想是我们有不同类型的对象：叶子或单独的对象和组合对象。这些不同类型的对象需要实现一个公共的超类型，例如接口或抽象类。<strong>公共接口或组件定义了可以在我们对象层次结构中不同类型的对象上执行的操作</strong>。</p>","autoDesc":true}');export{k as comp,d as data};

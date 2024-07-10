import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BmeLisJw.js";const e={},p=t(`<hr><h1 id="从队列中使用循环删除元素" tabindex="-1"><a class="header-anchor" href="#从队列中使用循环删除元素"><span>从队列中使用循环删除元素</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>计算机科学中的一种基本数据结构称为队列，它遵循先进先出（FIFO）的原则。此外，队列过程涉及将项目添加到尾部并在头部删除它们，这在Java的_Queue_接口中提供。</p><p>然而，在某些情况下，根据特定条件从队列中删除一些元素将是必需的。</p><p><strong>在本教程中，我们将讨论使用Java中的循环从队列中删除元素。</strong></p><h2 id="_2-从队列中删除偶数" tabindex="-1"><a class="header-anchor" href="#_2-从队列中删除偶数"><span>2. 从队列中删除偶数</span></a></h2><p>在删除元素时，可以根据自定义条件从队列中删除元素。如果它是一个只包含偶数值的整数队列，让我们尝试根除们。为此，我们将使用循环遍历队列并删除所有偶数，如下所示：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenQueueWithEvenAndOddNumbers_whenRemovingEvenNumbers_thenOddNumbersRemain</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Queue</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\` queue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Queue</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span>\`\` oddElementsQueue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span>queue<span class="token punctuation">.</span><span class="token function">peek</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> element <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>element <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            oddElementsQueue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> oddElementsQueue<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>oddElementsQueue<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>oddElementsQueue<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>oddElementsQueue<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的测试方法中，我们首先初始化一个包含数字（1、2、3、4和5）的新队列和一个名为_oddElementsQueue_的空队列。**此外，我们使用一个_while_循环一次一个地从队列中删除元素，直到它变空。如果元素是奇数，它将被添加到_oddElementsQueue_。**最后，测试_asserts_使用_assertTrue_方法断言_oddElementsQueue_包含三个元素，即奇数1、3和5。</p><h2 id="_3-删除以特定字母开头的字符串" tabindex="-1"><a class="header-anchor" href="#_3-删除以特定字母开头的字符串"><span>3. 删除以特定字母开头的字符串</span></a></h2><p>假设我们有一个字符串队列，我们希望删除以特定字母开头的字符串。让我们以以下示例为例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenStringQueue_whenRemovingStringsThatStartWithA_thenStringElementsRemain</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Queue</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` queue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Apple&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Banana&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Orange&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Grape&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;Mango&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Queue</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` stringElementsQueue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span>queue<span class="token punctuation">.</span><span class="token function">peek</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> element <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>element<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            stringElementsQueue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> stringElementsQueue<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>stringElementsQueue<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;Banana&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>stringElementsQueue<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;Orange&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>stringElementsQueue<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;Grape&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>stringElementsQueue<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;Mango&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中，我们遍历队列中的元素，直到它变空。我们还检查如果此元素不以字母“A”开头，它将被添加到_stringElementsQueue_队列中。最后，我们使用_asserts_来验证_stringElementsQueue_包含四个元素，特别是字符串（<em>“Apple”</em>、<em>“Banana”</em>、<em>“Orange”</em>、<em>“Grape”<em>和</em>“Mango”</em>）使用_assertTrue_方法。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本教程中，我们通过while循环在Java中查看了如何从队列中删除元素。我们讨论了两种情况：如何在队列中取出偶数，以及另一种情况，即可以选择性地删除以特定字母开头的字符串。</p><p>学习如何操作队列在Java中非常重要，因为它是您整体编程知识的一部分。</p><p>如常，本文的完整代码示例可以在GitHub上找到。</p>`,18),o=[p];function c(u,l){return a(),s("div",null,o)}const r=n(e,[["render",c],["__file","2024-06-28-Remove Elements From a Queue Using Loop.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-28/2024-06-28-Remove%20Elements%20From%20a%20Queue%20Using%20Loop.html","title":"从队列中使用循环删除元素","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Tutorials"],"tag":["Queue","Java"],"head":[["meta",{"name":"keywords","content":"Java, Queue, remove elements, loop"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-28/2024-06-28-Remove%20Elements%20From%20a%20Queue%20Using%20Loop.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"从队列中使用循环删除元素"}],["meta",{"property":"og:description","content":"从队列中使用循环删除元素 1. 引言 计算机科学中的一种基本数据结构称为队列，它遵循先进先出（FIFO）的原则。此外，队列过程涉及将项目添加到尾部并在头部删除它们，这在Java的_Queue_接口中提供。 然而，在某些情况下，根据特定条件从队列中删除一些元素将是必需的。 在本教程中，我们将讨论使用Java中的循环从队列中删除元素。 2. 从队列中删除偶..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-28T16:52:15.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Queue"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-28T16:52:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"从队列中使用循环删除元素\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-28T16:52:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"从队列中使用循环删除元素 1. 引言 计算机科学中的一种基本数据结构称为队列，它遵循先进先出（FIFO）的原则。此外，队列过程涉及将项目添加到尾部并在头部删除它们，这在Java的_Queue_接口中提供。 然而，在某些情况下，根据特定条件从队列中删除一些元素将是必需的。 在本教程中，我们将讨论使用Java中的循环从队列中删除元素。 2. 从队列中删除偶..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 从队列中删除偶数","slug":"_2-从队列中删除偶数","link":"#_2-从队列中删除偶数","children":[]},{"level":2,"title":"3. 删除以特定字母开头的字符串","slug":"_3-删除以特定字母开头的字符串","link":"#_3-删除以特定字母开头的字符串","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719593535000,"updatedTime":1719593535000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.38,"words":715},"filePathRelative":"posts/baeldung/2024-06-28/2024-06-28-Remove Elements From a Queue Using Loop.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>从队列中使用循环删除元素</h1>\\n<h2>1. 引言</h2>\\n<p>计算机科学中的一种基本数据结构称为队列，它遵循先进先出（FIFO）的原则。此外，队列过程涉及将项目添加到尾部并在头部删除它们，这在Java的_Queue_接口中提供。</p>\\n<p>然而，在某些情况下，根据特定条件从队列中删除一些元素将是必需的。</p>\\n<p><strong>在本教程中，我们将讨论使用Java中的循环从队列中删除元素。</strong></p>\\n<h2>2. 从队列中删除偶数</h2>\\n<p>在删除元素时，可以根据自定义条件从队列中删除元素。如果它是一个只包含偶数值的整数队列，让我们尝试根除们。为此，我们将使用循环遍历队列并删除所有偶数，如下所示：</p>","autoDesc":true}');export{r as comp,d as data};

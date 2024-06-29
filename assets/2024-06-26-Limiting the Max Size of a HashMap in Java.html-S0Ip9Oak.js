import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as i,a as n}from"./app-rQW_0qJC.js";const s={},t=n(`<h1 id="java中限制hashmap最大大小的方法" tabindex="-1"><a class="header-anchor" href="#java中限制hashmap最大大小的方法"><span>Java中限制HashMap最大大小的方法</span></a></h1><p>HashMap是Java Collections库中众所周知的类。它实现了Map接口，并允许存储键值对。<strong>HashMap的一个实例在其条目数量上没有限制</strong>。在某些特定场景中，我们可能想要改变这种行为。在本教程中，我们将探讨几种强制对HashMap进行大小限制的可能方法。</p><h2 id="_2-java-hashmap的概念" tabindex="-1"><a class="header-anchor" href="#_2-java-hashmap的概念"><span>2. Java HashMap的概念</span></a></h2><p>HashMap的核心本质上是一个哈希表。哈希表是一种基于数组和链表这两种基本结构的数据结构。</p><h3 id="_2-1-内部结构" tabindex="-1"><a class="header-anchor" href="#_2-1-内部结构"><span>2.1 内部结构</span></a></h3><p>数组是HashMap的基本存储实体。数组的每个位置包含一个对链表的引用。链表可以包含一组由键和值组成的条目。键和值都是Java对象，不是基本类型，并且键是唯一的。HashMap接口定义了一个put方法如下：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>V put(K key, V value)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>它使用所谓的“哈希函数”，根据输入的键计算一个称为“哈希”的数字。然后，从哈希开始，基于数组的当前大小，计算插入条目的索引。</p><p>不同的键值可能具有相同的哈希值，因此具有相同的索引。这导致冲突，当这种情况发生时，条目被插入到该索引的链表的下一个位置。</p><p>如果链表中的条目数量大于由TREEIFY_THRESHOLD常量定义的特定阈值，HashMap将链表替换为树，将运行时性能从O(n)提高到O(log(n))。</p><h3 id="_2-2-调整大小、重新哈希和负载因子" tabindex="-1"><a class="header-anchor" href="#_2-2-调整大小、重新哈希和负载因子"><span>2.2 调整大小、重新哈希和负载因子</span></a></h3><p>从性能的角度来看，理想的情况是条目分布在整个数组上，每个位置最多有一个条目。然而，随着条目数量的增长，冲突数量上升，每个位置的链表大小也随之增加。</p><p>为了尽可能保持接近理想状态，当条目数量达到某个限制时，HashMap会调整自己的大小，然后重新计算哈希和索引。</p><p>HashMap根据“负载因子”来调整自己的大小。我们可以将负载因子定义为在需要调整大小和重新哈希之前的条目数量除以可用位置的分数的最大值。HashMap的默认负载因子是0.75f。</p><h2 id="_3-需要对hashmap的最大大小设置限制的场景" tabindex="-1"><a class="header-anchor" href="#_3-需要对hashmap的最大大小设置限制的场景"><span>3. 需要对HashMap的最大大小设置限制的场景</span></a></h2><p><strong>HashMap的大小仅受Java虚拟机可用内存的限制</strong>。这是类的设计方式，并且与哈希表数据结构的常规用例一致。</p><p>然而，可能有一些特定场景，我们需要施加自定义限制。例如：</p><ul><li>实现缓存</li><li>在良好定义的条件下收集HashMap的指标，避免其自动调整大小阶段</li></ul><p>正如我们在以下部分中看到的，对于第一种情况，我们可以使用LinkedHashMap扩展及其removeEldestEntry方法。对于第二种情况，我们必须实现HashMap的自定义扩展。</p><p>这些场景远远超出了HashMap设计的原始目的。缓存是一个比简单映射更广泛的概念，扩展原始类的需求使其无法作为一个纯粹的黑盒进行测试。</p><h2 id="_4-使用linkedhashmap限制最大大小" tabindex="-1"><a class="header-anchor" href="#_4-使用linkedhashmap限制最大大小"><span>4. 使用LinkedHashMap限制最大大小</span></a></h2><p>限制最大大小的一种可能方法是使用LinkedHashMap，它是HashMap的一个子类。LinkedHashMap是HashMap和LinkedList的组合：它存储对前一个和后一个条目的指针。因此，它可以维护其条目的插入顺序，而HashMap不支持。</p><h3 id="_4-1-使用linkedhashmap的示例" tabindex="-1"><a class="header-anchor" href="#_4-1-使用linkedhashmap的示例"><span>4.1 使用LinkedHashMap的示例</span></a></h3><p><strong>我们可以通过覆盖removeEldestEntry()方法来限制最大大小</strong>。此方法返回一个布尔值，并且在内部调用以决定在新插入后是否应该删除最老的条目。</p><p>最老的条目将是最近最少插入的键或最少最近访问的条目，这取决于我们是使用false（默认值）还是true作为accessOrder参数来创建LinkedHashMap实例。</p><p>通过覆盖removeEldestEntry()方法，我们定义了自己的规则：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void givenLinkedHashMapObject_whenAddingNewEntry_thenEldestEntryIsRemoved() {
    final int MAX_SIZE = 4;
    LinkedHashMap\`\`\`\`&lt;Integer, String&gt;\`\`\`\` linkedHashMap;
    linkedHashMap = new LinkedHashMap\`\`\`\`&lt;Integer, String&gt;\`\`\`\`() {
        @Override
        protected boolean removeEldestEntry(Map.Entry\`\`\`\`&lt;Integer, String&gt;\`\`\`\` eldest) {
            return size() &gt; MAX_SIZE;
        }
    };
    linkedHashMap.put(1, &quot;One&quot;);
    linkedHashMap.put(2, &quot;Two&quot;);
    linkedHashMap.put(3, &quot;Three&quot;);
    linkedHashMap.put(4, &quot;Four&quot;);
    linkedHashMap.put(5, &quot;Five&quot;);
    String[] expectedArrayAfterFive = { &quot;Two&quot;, &quot;Three&quot;, &quot;Four&quot;, &quot;Five&quot; };
    assertArrayEquals(expectedArrayAfterFive, linkedHashMap.values().toArray());
    linkedHashMap.put(6, &quot;Six&quot;);
    String[] expectedArrayAfterSix = { &quot;Three&quot;, &quot;Four&quot;, &quot;Five&quot;, &quot;Six&quot; };
    assertArrayEquals(expectedArrayAfterSix, linkedHashMap.values().toArray());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的示例中，我们创建了一个LinkedHashMap实例，覆盖了它的removeEldestEntry方法。然后，<strong>当条目集的大小在添加新条目后超过给定限制时，实例本身将在插入新条目之前删除其最老的键</strong>。</p><p>在测试用例中，我们在setUp方法中预先设置了最大大小为4，并用四个条目填充了LinkedHashMap对象。我们可以看到，对于每个进一步的插入，条目数量始终为4，并且LinkedHashMap实例每次都删除其最老的条目。</p><p>我们必须注意，这不是限制最大大小要求的严格解释，因为插入操作仍然被允许：通过删除最老的键来保持最大大小。</p><p>我们可以通过使用适当的构造函数，将accessOrder参数设置为true来创建LinkedHashMap，从而实现所谓的LRU（最近最少使用）缓存。</p><h3 id="_4-2-性能考虑" tabindex="-1"><a class="header-anchor" href="#_4-2-性能考虑"><span>4.2 性能考虑</span></a></h3><p>常规HashMap具有我们期望的哈希表数据结构的性能。另一方面，LinkedHashMap必须保持其条目的顺序，这使得其插入和删除操作变慢。除非我们将accessOrder标志设置为true，否则访问操作的性能不会改变。</p><h2 id="_5-使用自定义hashmap限制最大大小" tabindex="-1"><a class="header-anchor" href="#_5-使用自定义hashmap限制最大大小"><span>5. 使用自定义HashMap限制最大大小</span></a></h2><p>另一种可能的策略是通过自定义实现put方法来扩展HashMap。我们可以在实现中增加一个检查，当HashMap实例达到强加的限制时抛出异常。</p><h3 id="_5-1-实现自定义hashmap" tabindex="-1"><a class="header-anchor" href="#_5-1-实现自定义hashmap"><span>5.1 实现自定义HashMap</span></a></h3><p>对于这种方法，我们必须覆盖put方法，进行初步检查：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class HashMapWithMaxSizeLimit\`\`&lt;K, V&gt;\`\` extends HashMap\`\`&lt;K, V&gt;\`\` {
    private int maxSize = -1;

    public HashMapWithMaxSizeLimit(int maxSize) {
        super();
        this.maxSize = maxSize;
    }

    @Override
    public V put(K key, V value) {
        if (this.maxSize == -1 || this.containsKey(key) || this.size() \`&lt; this.maxSize) {
            return super.put(key, value);
        }
        throw new RuntimeException(&quot;Max size exceeded!&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的示例中，我们有一个HashMap的扩展。<strong>它有一个maxSize属性，默认值为-1，这隐含地意味着“无限制”</strong>。我们可以通过特定的构造函数修改这个属性。在put实现中，如果maxSize等于默认值，键已经存在，或者条目数量低于指定的maxSize，扩展调用超类相应的方法。</p><p>如果扩展不符合上述条件，它将引发一个未检查的异常。我们不能使用已检查的异常，因为put方法没有明确抛出任何异常，我们不能重新定义其签名。<strong>在我们的示例中，这个限制可以通过使用putAll来规避。为了避免这种情况，我们可能还想通过覆盖putAll，使用相同的逻辑来改进示例。</strong></p><p>为了保持示例的简单性，我们没有重新定义超类的所有构造函数。然而，在真实用例中，我们应该这样做，以保持HashMap的原始设计。在这种情况下，我们还应该在HashMap(Map&lt;? extends K, ? extends V&gt;\` m)构造函数中使用最大大小逻辑，因为它在不使用putAll的情况下添加了所有条目的映射参数。</p><p>这个解决方案比前一节中描述的解决方案更严格地遵循要求。<strong>在这种情况下，HashMap禁止任何超出限制的插入操作，而不会删除任何现有元素</strong>。</p><h3 id="_5-2-测试自定义hashmap" tabindex="-1"><a class="header-anchor" href="#_5-2-测试自定义hashmap"><span>5.2 测试自定义HashMap</span></a></h3><p>作为一个示例，我们可以测试上述自定义类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private final int MAX_SIZE = 4;
private HashMapWithMaxSizeLimit\`\`\`\`&lt;Integer, String&gt;\`\`\`\` hashMapWithMaxSizeLimit;

@Test
void givenCustomHashMapObject_whenThereIsNoLimit_thenDoesNotThrowException() {
    hashMapWithMaxSizeLimit = new HashMapWithMaxSizeLimit&lt;&gt;();
    assertDoesNotThrow(() -&gt; {
        for (int i = 0; i \`&lt; 10000; i++) {
            hashMapWithMaxSizeLimit.put(i, i + &quot;&quot;);
        }
    });
}

@Test
void givenCustomHashMapObject_whenLimitNotReached_thenDoesNotThrowException() {
    hashMapWithMaxSizeLimit = new HashMapWithMaxSizeLimit(MAX_SIZE);
    assertDoesNotThrow(() -&gt;\` {
        for (int i = 0; i \`&lt; 4; i++) {
            hashMapWithMaxSizeLimit.put(i, i + &quot;&quot;);
        }
    });
}

@Test
void givenCustomHashMapObject_whenReplacingValueWhenLimitIsReached_thenDoesNotThrowException() {
    hashMapWithMaxSizeLimit = new HashMapWithMaxSizeLimit(MAX_SIZE);
    assertDoesNotThrow(() -&gt;\` {
        hashMapWithMaxSizeLimit.put(1, &quot;One\\&quot;);
        hashMapWithMaxSizeLimit.put(2, &quot;Two&quot;);
        hashMapWithMaxSizeLimit.put(3, &quot;Three&quot;);
        hashMapWithMaxSizeLimit.put(4, &quot;Four&quot;);
        hashMapWithMaxSizeLimit.put(4, &quot;4&quot;);
    });
}

@Test
void givenCustomHashMapObject_whenLimitExceeded_thenThrowsException() {
    hashMapWithMaxSizeLimit = new HashMapWithMaxSizeLimit(MAX_SIZE);
    Exception exception = assertThrows(RuntimeException.class, () -&gt; {
        for (int i = 0; i &lt; 5; i++) {
            hashMapWithMaxSizeLimit.put(i, i + &quot;&quot;);
        }
    });

    String messageThrownWhenSizeExceedsLimit = &quot;Max size exceeded!&quot;;
    String actualMessage = exception.getMessage();
    assertTrue(actualMessage.equals(messageThrownWhenSizeExceedsLimit));
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们有四个测试用例：</p><ul><li>我们使用默认的无限制行为实例化类。即使我们添加了大量条目，我们也不期望有任何异常。</li><li>我们使用maxSize为4实例化类。如果我们没有达到限制，我们不期望有任何异常。</li><li>我们使用maxSize为4实例化类。如果我们已经达到限制并且我们替换一个值，我们不期望有任何异常。</li><li>我们使用maxSize为4实例化类。如果我们超出限制，我们期望抛出一个RuntimeException，并带有特定消息。</li></ul><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>强制对HashMap的最大大小设置限制的需求可能在某些特定场景中出现。在本文中，我们已经看到了一些解决这一需求的示例。</p><p>扩展LinkedHashMap并覆盖其removeEldestEntry()方法在我们要快速实现LRU缓存或类似东西时非常有用。如果我们想要强制执行更严格的限制，我们可以扩展HashMap并覆盖其插入方法以满足我们的需求。</p><h2 id="像往常一样-示例代码可以在github上找到。" tabindex="-1"><a class="header-anchor" href="#像往常一样-示例代码可以在github上找到。"><span>像往常一样，示例代码可以在GitHub上找到。</span></a></h2><p>OK</p>`,52),l=[t];function d(h,p){return i(),e("div",null,l)}const u=a(s,[["render",d],["__file","2024-06-26-Limiting the Max Size of a HashMap in Java.html.vue"]]),o=JSON.parse('{"path":"/posts/baeldung/2024-06-26/2024-06-26-Limiting%20the%20Max%20Size%20of%20a%20HashMap%20in%20Java.html","title":"Java中限制HashMap最大大小的方法","lang":"zh-CN","frontmatter":{"date":"2024-06-27T00:00:00.000Z","category":["Java","集合框架"],"tag":["HashMap","LinkedHashMap"],"head":[["meta",{"name":"keywords","content":"Java, HashMap, LinkedHashMap, 缓存, 集合框架"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-26/2024-06-26-Limiting%20the%20Max%20Size%20of%20a%20HashMap%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中限制HashMap最大大小的方法"}],["meta",{"property":"og:description","content":"Java中限制HashMap最大大小的方法 HashMap是Java Collections库中众所周知的类。它实现了Map接口，并允许存储键值对。HashMap的一个实例在其条目数量上没有限制。在某些特定场景中，我们可能想要改变这种行为。在本教程中，我们将探讨几种强制对HashMap进行大小限制的可能方法。 2. Java HashMap的概念 Ha..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-26T22:52:22.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"HashMap"}],["meta",{"property":"article:tag","content":"LinkedHashMap"}],["meta",{"property":"article:published_time","content":"2024-06-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-26T22:52:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中限制HashMap最大大小的方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-26T22:52:22.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中限制HashMap最大大小的方法 HashMap是Java Collections库中众所周知的类。它实现了Map接口，并允许存储键值对。HashMap的一个实例在其条目数量上没有限制。在某些特定场景中，我们可能想要改变这种行为。在本教程中，我们将探讨几种强制对HashMap进行大小限制的可能方法。 2. Java HashMap的概念 Ha..."},"headers":[{"level":2,"title":"2. Java HashMap的概念","slug":"_2-java-hashmap的概念","link":"#_2-java-hashmap的概念","children":[{"level":3,"title":"2.1 内部结构","slug":"_2-1-内部结构","link":"#_2-1-内部结构","children":[]},{"level":3,"title":"2.2 调整大小、重新哈希和负载因子","slug":"_2-2-调整大小、重新哈希和负载因子","link":"#_2-2-调整大小、重新哈希和负载因子","children":[]}]},{"level":2,"title":"3. 需要对HashMap的最大大小设置限制的场景","slug":"_3-需要对hashmap的最大大小设置限制的场景","link":"#_3-需要对hashmap的最大大小设置限制的场景","children":[]},{"level":2,"title":"4. 使用LinkedHashMap限制最大大小","slug":"_4-使用linkedhashmap限制最大大小","link":"#_4-使用linkedhashmap限制最大大小","children":[{"level":3,"title":"4.1 使用LinkedHashMap的示例","slug":"_4-1-使用linkedhashmap的示例","link":"#_4-1-使用linkedhashmap的示例","children":[]},{"level":3,"title":"4.2 性能考虑","slug":"_4-2-性能考虑","link":"#_4-2-性能考虑","children":[]}]},{"level":2,"title":"5. 使用自定义HashMap限制最大大小","slug":"_5-使用自定义hashmap限制最大大小","link":"#_5-使用自定义hashmap限制最大大小","children":[{"level":3,"title":"5.1 实现自定义HashMap","slug":"_5-1-实现自定义hashmap","link":"#_5-1-实现自定义hashmap","children":[]},{"level":3,"title":"5.2 测试自定义HashMap","slug":"_5-2-测试自定义hashmap","link":"#_5-2-测试自定义hashmap","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]},{"level":2,"title":"像往常一样，示例代码可以在GitHub上找到。","slug":"像往常一样-示例代码可以在github上找到。","link":"#像往常一样-示例代码可以在github上找到。","children":[]}],"git":{"createdTime":1719442342000,"updatedTime":1719442342000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.87,"words":2362},"filePathRelative":"posts/baeldung/2024-06-26/2024-06-26-Limiting the Max Size of a HashMap in Java.md","localizedDate":"2024年6月27日","excerpt":"\\n<p>HashMap是Java Collections库中众所周知的类。它实现了Map接口，并允许存储键值对。<strong>HashMap的一个实例在其条目数量上没有限制</strong>。在某些特定场景中，我们可能想要改变这种行为。在本教程中，我们将探讨几种强制对HashMap进行大小限制的可能方法。</p>\\n<h2>2. Java HashMap的概念</h2>\\n<p>HashMap的核心本质上是一个哈希表。哈希表是一种基于数组和链表这两种基本结构的数据结构。</p>\\n<h3>2.1 内部结构</h3>\\n<p>数组是HashMap的基本存储实体。数组的每个位置包含一个对链表的引用。链表可以包含一组由键和值组成的条目。键和值都是Java对象，不是基本类型，并且键是唯一的。HashMap接口定义了一个put方法如下：</p>","autoDesc":true}');export{u as comp,o as data};

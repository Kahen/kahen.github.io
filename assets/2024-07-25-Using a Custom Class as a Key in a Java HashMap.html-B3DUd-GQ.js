import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as n,a as i}from"./app-DNwYcgl6.js";const s={},t=i(`<h3 id="概述" tabindex="-1"><a class="header-anchor" href="#概述"><span>概述</span></a></h3><p>在本文中，我们将学习HashMap如何内部管理键值对以及如何编写自定义键实现。</p><h3 id="键管理" tabindex="-1"><a class="header-anchor" href="#键管理"><span>键管理</span></a></h3><h4 id="_2-1-内部结构" tabindex="-1"><a class="header-anchor" href="#_2-1-内部结构"><span>2.1 内部结构</span></a></h4><p>映射用于存储分配给键的值。键用于在Map中标识值并检测重复项。 尽管TreeMap使用Comparable#compareTo(Object)方法对键进行排序（也用于识别相等性），但HashMap使用基于哈希的结构，可以通过以下草图更容易地解释： <img src="https://www.baeldung.com/wp-content/uploads/2021/10/hashtable.svg" alt="img" loading="lazy"></p><p>Map不允许重复键，因此使用Object#equals(Object)方法相互比较键。由于此方法性能较差，应尽可能避免调用。这是通过Object#hashCode()方法实现的。此方法允许按哈希值对对象进行排序，然后只有在对象共享相同的哈希值时才需要调用Object#equals方法。 这种键管理也应用于HashSet类，其内部实现使用HashMap。</p><h4 id="_2-2-插入和查找键值对" tabindex="-1"><a class="header-anchor" href="#_2-2-插入和查找键值对"><span>2.2 插入和查找键值对</span></a></h4><p>让我们创建一个HashMap的简单商店示例，该商店通过文章ID（String）管理库存项（Integer）的数量。在那里，我们放入一个示例值：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Map\`&lt;String, Integer&gt;\` items = new HashMap&lt;&gt;();
// 插入
items.put(&quot;158-865-A&quot;, 56);
// 查找
Integer count = items.get(&quot;158-865-A&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>插入键值对的算法：</p><ol><li>调用&quot;158-865-A&quot;.hashCode()获取哈希值</li><li>查找共享相同哈希值的现有键列表</li><li>将列表中的任何键与&quot;158-865-A&quot;.equals(key)进行比较 <ol><li>首次等式被识别为已存在，新键将替换分配的值。</li><li>如果没有发生等式，则将键值对作为新条目插入。</li></ol></li></ol><p>查找值时，算法相同，只是不替换或插入任何值。</p><h3 id="自定义键类" tabindex="-1"><a class="header-anchor" href="#自定义键类"><span>自定义键类</span></a></h3><p>我们可以得出结论，要使用自定义类作为键，必须正确实现hashCode()和equals()。简单来说，我们必须确保hashCode()方法返回：</p><ul><li>只要状态不改变，对象就返回相同的值（内部一致性）</li><li>对于相等的对象返回相同的值（等式一致性）</li><li>对于不相等的对象尽可能多的不同值。</li></ul><p>我们通常可以说hashCode()和equals()应该在它们的计算中考虑相同的字段，我们必须重写两者或两者都不重写。我们可以通过使用Lombok或我们的IDE生成器轻松实现这一点。</p><p>另一个重要的点是：在使用对象作为键时不要更改对象的哈希码。一个简单的解决方案是设计键类为不可变的，但这并不必要，只要我们能确保在键上不能进行操作即可。</p><p>不可变性在这里有一个优势：可以在对象实例化时一次性计算哈希值，这可以提高性能，特别是对于复杂对象。</p><h3 id="_3-1-好例子" tabindex="-1"><a class="header-anchor" href="#_3-1-好例子"><span>3.1 好例子</span></a></h3><p>作为示例，我们将设计一个由x和y值组成的Coordinate类，并将其用作HashMap中的键：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Map\`\`&lt;Coordinate, Color&gt;\`\` pixels = new HashMap&lt;&gt;();
Coordinate coord = new Coordinate(1, 2);
pixels.put(coord, Color.CYAN);
// 读取颜色
Color color = pixels.get(new Coordinate(1, 2));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们实现我们的Coordinate类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class Coordinate {
    private final int x;
    private final int y;
    private int hashCode;

    public Coordinate(int x, int y) {
        this.x = x;
        this.y = y;
        this.hashCode = Objects.hash(x, y);
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Coordinate that = (Coordinate) o;
        return x == that.x &amp;&amp; y == that.y;
    }

    @Override
    public int hashCode() {
        return this.hashCode;
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>作为替代，我们可以使用Lombok使我们的类更短：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@RequiredArgsConstructor
@Getter
// 构造函数中不进行计算，但是
// 自Lombok 1.18.16起，我们可以缓存哈希码
@EqualsAndHashCode(cacheStrategy = CacheStrategy.LAZY)
public class Coordinate {
    private final int x;
    private final int y;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最优的内部结构将是： <img src="https://www.baeldung.com/wp-content/uploads/2021/10/hashtable_optimal.svg" alt="img" loading="lazy"></p><h3 id="_3-2-坏例子-静态哈希值" tabindex="-1"><a class="header-anchor" href="#_3-2-坏例子-静态哈希值"><span>3.2 坏例子：静态哈希值</span></a></h3><p>如果我们通过为所有实例使用静态哈希值来实现Coordinate类，HashMap将正常工作，但性能将显著下降：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class Coordinate {

    ...

    @Override
    public int hashCode() {
        return 1; // 为所有实例返回相同的哈希值
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后哈希结构看起来像这样： <img src="https://www.baeldung.com/wp-content/uploads/2021/10/hashtable_worst.svg" alt="img" loading="lazy"></p><p>这完全抵消了哈希值的优势。</p><h3 id="_3-3-坏例子-可修改的哈希值" tabindex="-1"><a class="header-anchor" href="#_3-3-坏例子-可修改的哈希值"><span>3.3 坏例子：可修改的哈希值</span></a></h3><p>如果我们使键类可变，我们应该确保在使用它作为键时实例的状态永远不会改变：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Map\`\`&lt;Coordinate, Color&gt;\`\` pixels = new HashMap&lt;&gt;();
Coordinate coord = new Coordinate(1, 2); // x=1, y=2
pixels.put(coord, Color.CYAN);
coord.setX(3); // x=3, y=2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为Coordinate是根据旧的哈希值存储的，所以它不能在新的哈希值下找到。所以下面的行将导致null值：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Color color = pixels.get(coord);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>下面的行将导致对象在Map中被存储两次：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>pixels.put(coord, Color.CYAN);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h3><p>在本文中，我们已经阐明了为HashMap实现自定义键类是正确实现equals()和hashCode()的问题。我们已经看到了哈希值是如何内部使用的，以及这将如何以好和坏的方式受到影响。</p><p>如往常一样，示例代码可在GitHub上找到。 <img src="https://www.baeldung.com/wp-content/uploads/2021/10/hashtable.svg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2021/10/hashtable_optimal.svg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2021/10/hashtable_worst.svg" alt="img" loading="lazy"></p><p>OK</p>`,42),l=[t];function d(r,o){return n(),a("div",null,l)}const u=e(s,[["render",d],["__file","2024-07-25-Using a Custom Class as a Key in a Java HashMap.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-25/2024-07-25-Using%20a%20Custom%20Class%20as%20a%20Key%20in%20a%20Java%20HashMap.html","title":"","lang":"zh-CN","frontmatter":{"description":"概述 在本文中，我们将学习HashMap如何内部管理键值对以及如何编写自定义键实现。 键管理 2.1 内部结构 映射用于存储分配给键的值。键用于在Map中标识值并检测重复项。 尽管TreeMap使用Comparable#compareTo(Object)方法对键进行排序（也用于识别相等性），但HashMap使用基于哈希的结构，可以通过以下草图更容易地解...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-25/2024-07-25-Using%20a%20Custom%20Class%20as%20a%20Key%20in%20a%20Java%20HashMap.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:description","content":"概述 在本文中，我们将学习HashMap如何内部管理键值对以及如何编写自定义键实现。 键管理 2.1 内部结构 映射用于存储分配给键的值。键用于在Map中标识值并检测重复项。 尽管TreeMap使用Comparable#compareTo(Object)方法对键进行排序（也用于识别相等性），但HashMap使用基于哈希的结构，可以通过以下草图更容易地解..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2021/10/hashtable.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-25T15:56:27.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:modified_time","content":"2024-07-25T15:56:27.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2021/10/hashtable.svg\\",\\"https://www.baeldung.com/wp-content/uploads/2021/10/hashtable_optimal.svg\\",\\"https://www.baeldung.com/wp-content/uploads/2021/10/hashtable_worst.svg\\",\\"https://www.baeldung.com/wp-content/uploads/2021/10/hashtable.svg\\",\\"https://www.baeldung.com/wp-content/uploads/2021/10/hashtable_optimal.svg\\",\\"https://www.baeldung.com/wp-content/uploads/2021/10/hashtable_worst.svg\\"],\\"dateModified\\":\\"2024-07-25T15:56:27.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":3,"title":"概述","slug":"概述","link":"#概述","children":[]},{"level":3,"title":"键管理","slug":"键管理","link":"#键管理","children":[]},{"level":3,"title":"自定义键类","slug":"自定义键类","link":"#自定义键类","children":[]},{"level":3,"title":"3.1 好例子","slug":"_3-1-好例子","link":"#_3-1-好例子","children":[]},{"level":3,"title":"3.2 坏例子：静态哈希值","slug":"_3-2-坏例子-静态哈希值","link":"#_3-2-坏例子-静态哈希值","children":[]},{"level":3,"title":"3.3 坏例子：可修改的哈希值","slug":"_3-3-坏例子-可修改的哈希值","link":"#_3-3-坏例子-可修改的哈希值","children":[]},{"level":3,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1721922987000,"updatedTime":1721922987000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.17,"words":1250},"filePathRelative":"posts/baeldung/2024-07-25/2024-07-25-Using a Custom Class as a Key in a Java HashMap.md","localizedDate":"2024年7月25日","excerpt":"<h3>概述</h3>\\n<p>在本文中，我们将学习HashMap如何内部管理键值对以及如何编写自定义键实现。</p>\\n<h3>键管理</h3>\\n<h4>2.1 内部结构</h4>\\n<p>映射用于存储分配给键的值。键用于在Map中标识值并检测重复项。\\n尽管TreeMap使用Comparable#compareTo(Object)方法对键进行排序（也用于识别相等性），但HashMap使用基于哈希的结构，可以通过以下草图更容易地解释：\\n<img src=\\"https://www.baeldung.com/wp-content/uploads/2021/10/hashtable.svg\\" alt=\\"img\\" loading=\\"lazy\\"></p>","autoDesc":true}');export{u as comp,v as data};

import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as i,a as t}from"./app-CiQyLZlG.js";const a={},l=t(`<h1 id="实现java版的connect-4游戏-baeldung" tabindex="-1"><a class="header-anchor" href="#实现java版的connect-4游戏-baeldung"><span>实现Java版的Connect 4游戏 | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span><strong>1. 引言</strong></span></a></h2><p>在本文中，我们将看到如何在Java中实现Connect 4游戏。我们将了解游戏的外观和玩法，然后探讨如何实现这些规则。</p><h2 id="_2-什么是connect-4" tabindex="-1"><a class="header-anchor" href="#_2-什么是connect-4"><span><strong>2. 什么是Connect 4？</strong></span></a></h2><p>在我们能够实现游戏之前，我们需要理解游戏的规则。</p><p>Connect 4是一个相对简单的游戏。玩家轮流将棋子放入一堆堆的顶部。每回合结束后，如果任何玩家的棋子在任何直线方向上——水平、垂直或对角线——形成了四连线，那么该玩家就是赢家：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/10/Screenshot-2023-10-23-at-07.26.48-300x230.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>如果没有，下一个玩家就可以接着玩。然后这个过程会重复，直到一个玩家获胜或者游戏变得无法获胜。</p><p>值得注意的是，玩家可以自由选择哪一列放置他们的棋子，但那个棋子必须放在这列的顶部。他们不能自由选择棋子在列内的哪一行。</p><p>为了将其构建为计算机游戏，我们需要考虑几个不同的组件：游戏棋盘本身、玩家放置令牌的能力，以及检查游戏是否获胜的能力。我们将依次查看这些。</p><h2 id="_3-定义游戏棋盘" tabindex="-1"><a class="header-anchor" href="#_3-定义游戏棋盘"><span><strong>3. 定义游戏棋盘</strong></span></a></h2><p>在我们能够玩游戏之前，我们首先需要一个可以玩的地方。这就是游戏棋盘，它包含了所有玩家可以下棋的单元格，并指示玩家已经放置了他们的棋子。</p><p>我们将首先编写一个枚举，表示玩家在游戏中可以使用的棋子：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public enum Piece {
    PLAYER_1,
    PLAYER_2
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这假设游戏中只有两个玩家，这是Connect 4的典型情况。</p><p>现在，我们将创建一个代表游戏棋盘的类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class GameBoard {
    private final List\`&lt;List&lt;Piece&gt;\`&gt; columns;

    private final int rows;

    public GameBoard(int columns, int rows) {
        this.rows = rows;
        this.columns = new ArrayList&lt;&gt;();
        for (int i = 0; i \`&lt; columns; ++i) {
            this.columns.add(new ArrayList&lt;&gt;\`());
        }
    }

    public int getRows() {
        return rows;
    }

    public int getColumns() {
        return columns.size();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用列表的列表来表示游戏棋盘。这些列表中的每一个都代表游戏中的一整列，列表中的每个条目代表该列内的棋子。</p><p>棋子必须从底部开始堆叠，所以我们不需要考虑空隙。相反，所有空隙都在插入棋子的列的顶部。因此，我们实际上是按照它们被添加到列中的顺序存储棋子的。</p><p>接下来，我们将添加一个助手来获取棋盘上任何给定单元格中当前的棋子：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public Piece getCell(int x, int y) {
    assert(x &gt;= 0 &amp;&amp; x \`&lt; getColumns());
    assert(y &gt;\`= 0 &amp;&amp; y \`&lt; getRows());

    List&lt;Piece&gt;\` column = columns.get(x);

    if (column.size() &gt; y) {
        return column.get(y);
    } else {
        return null;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这需要一个从第一列开始的X坐标和一个从底部行开始的Y坐标。然后我们将返回该单元格的正确_Piece_或如果该单元格中还没有任何东西则返回_null_。</p><h2 id="_4-进行移动" tabindex="-1"><a class="header-anchor" href="#_4-进行移动"><span><strong>4. 进行移动</strong></span></a></h2><p>现在我们有了游戏棋盘，我们需要能够在它上面进行移动。玩家通过将他们的棋子添加到给定列的顶部来进行移动。因此，我们可以通过添加一个新方法来实现这一点，该方法接受列和进行移动的玩家：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public void move(int x, Piece player) {
    assert(x &gt;= 0 &amp;&amp; x \`&lt; getColumns());

    List&lt;Piece&gt;\` column = columns.get(x);

    if (column.size() &gt;= this.rows) {
        throw new IllegalArgumentException(&quot;That column is full&quot;);
    }

    column.add(player);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还在这里添加了额外的检查。如果所讨论的列已经有太多的棋子，那么这将抛出异常而不是允许玩家移动。</p><h2 id="_5-检查获胜条件" tabindex="-1"><a class="header-anchor" href="#_5-检查获胜条件"><span><strong>5. 检查获胜条件</strong></span></a></h2><p>一旦玩家移动了，下一步就是检查他们是否获胜。这意味着在棋盘上寻找任何地方，我们有四个来自同一玩家的棋子在水平、垂直或对角线上。</p><p>然而，我们可以做得更好。我们知道一些事实，因为游戏的玩法允许我们简化搜索。</p><p>首先，因为游戏在获胜的移动被玩出时结束，只有刚刚移动的玩家才能获胜。这意味着我们只需要检查该玩的棋子形成的线。</p><p>其次，获胜线必须包含刚刚放置的棋子。这意味着我们不需要搜索整个棋盘，而只需要搜索包含被玩棋子的子集。</p><p>第三，由于游戏的列性质，我们可以忽略某些不可能的情况。例如，我们只有在最新棋子至少在第4行时才能有垂直线。低于此行，就不可能形成四连线。</p><p>最终，这意味着我们有以下几组要搜索的：</p><ul><li>从最新棋子开始，向下三行的单个垂直线</li><li>四种可能的水平线——其中第一个从我们最新棋子左边三列开始，以最新棋子结束，最后一个从我们最新棋子开始，向右三列结束</li><li>四种可能的前对角线——其中第一个从我们最新棋子左边三列和上边三行开始，最后一个从我们最新棋子开始，向右三列和下边三行结束</li><li>四种可能的后对角线——其中第一个从我们最新棋子左边三列和下边三行开始，最后一个从我们最新棋子开始，向右三列和上边三行结束</li></ul><p><strong>这意味着在每次移动后，我们必须检查最多13条可能的线——其中一些可能由于棋盘的大小而是不可能的：</strong></p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/10/Screenshot-2023-10-25-at-07.51.18-1024x789.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>例如，这里我们可以看到有几条线超出了游戏区域，因此永远不可能是获胜线。</p><h3 id="_5-1-检查获胜线" tabindex="-1"><a class="header-anchor" href="#_5-1-检查获胜线"><span><strong>5.1. 检查获胜线</strong></span></a></h3><p><strong>首先，我们需要一个方法来检查给定的线。这将需要起始点和线的方向，并检查该线上的每个单元格是否都是当前玩家的：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private boolean checkLine(int x1, int y1, int xDiff, int yDiff, Piece player) {
    for (int i = 0; i \`&lt; 4; ++i) {
        int x = x1 + (xDiff * i);
        int y = y1 + (yDiff * i);

        if (x &lt; 0 || x &gt;\` columns.size() - 1) {
            return false;
        }

        if (y \`&lt; 0 || y &gt;\` rows - 1) {
            return false;
        }

        if (player != getCell(x, y)) {
            return false;
        }
    }

    return true;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还在检查单元格是否存在，如果我们检查到一个不存在的单元格，我们会立即返回这不是一个获胜线。我们可以在循环之前这样做，但在这个情况下，我们只检查四个单元格，而且额外的复杂性去确定线的起点和终点在这种情况下并不有益。</p><h3 id="_5-2-检查所有可能的线" tabindex="-1"><a class="header-anchor" href="#_5-2-检查所有可能的线"><span><strong>5.2. 检查所有可能的线</strong></span></a></h3><p>**接下来，我们需要检查所有可能的线。如果任何一个返回_true_，那么我们可以立即停止并宣布玩家获胜。**毕竟，如果他们在同一个移动中设法获得多条获胜线，这并不重要：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private boolean checkWin(int x, int y, Piece player) {
    // 垂直线
    if (checkLine(x, y, 0, -1, player)) {
        return true;
    }

    for (int offset = 0; offset &lt; 4; ++offset) {
        // 水平线
        if (checkLine(x - 3 + offset, y, 1, 0, player)) {
            return true;
        }

        // 前对角线
        if (checkLine(x - 3 + offset, y + 3 - offset, 1, -1, player)) {
            return true;
        }

        // 后对角线
        if (checkLine(x - 3 + offset, y - 3 + offset, 1, 1, player)) {
            return true;
        }
    }

    return false;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这使用从左到右的滑动偏移，并使用它来确定我们在每条线上的起始位置。线条通过向左滑动三个单元格开始，因为第四个单元格是我们目前正在玩的，必须被包含在内。最后检查的线从刚刚被玩的单元格开始，向右三个单元格结束。</p><p>最后，我们更新我们的_move()<em>函数来检查获胜状态，并相应地返回_true_或_false</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public boolean move(int x, Piece player) {
    // 与之前相同。

    return checkWin(x, column.size() - 1, player);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-玩游戏" tabindex="-1"><a class="header-anchor" href="#_5-3-玩游戏"><span><strong>5.3. 玩游戏</strong></span></a></h3><p>**到这一点，我们有一个可以玩的游戏。**我们可以创建一个新的游戏棋盘，并轮流放置棋子，直到我们</p>`,49),s=[l];function d(r,c){return i(),n("div",null,s)}const u=e(a,[["render",d],["__file","2024-06-28-Implement Connect 4 Game with Java.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-06-28/2024-06-28-Implement%20Connect%204%20Game%20with%20Java.html","title":"实现Java版的Connect 4游戏 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2023-10-23T00:00:00.000Z","category":["Java","游戏开发"],"tag":["Connect 4","Java","游戏实现"],"head":[["meta",{"name":"keywords","content":"Java, Connect 4, 游戏开发, 游戏实现"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-28/2024-06-28-Implement%20Connect%204%20Game%20with%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"实现Java版的Connect 4游戏 | Baeldung"}],["meta",{"property":"og:description","content":"实现Java版的Connect 4游戏 | Baeldung 1. 引言 在本文中，我们将看到如何在Java中实现Connect 4游戏。我们将了解游戏的外观和玩法，然后探讨如何实现这些规则。 2. 什么是Connect 4？ 在我们能够实现游戏之前，我们需要理解游戏的规则。 Connect 4是一个相对简单的游戏。玩家轮流将棋子放入一堆堆的顶部。每回..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/10/Screenshot-2023-10-23-at-07.26.48-300x230.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-28T07:53:03.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Connect 4"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"游戏实现"}],["meta",{"property":"article:published_time","content":"2023-10-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-28T07:53:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"实现Java版的Connect 4游戏 | Baeldung\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/10/Screenshot-2023-10-23-at-07.26.48-300x230.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/10/Screenshot-2023-10-25-at-07.51.18-1024x789.png\\"],\\"datePublished\\":\\"2023-10-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-28T07:53:03.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"实现Java版的Connect 4游戏 | Baeldung 1. 引言 在本文中，我们将看到如何在Java中实现Connect 4游戏。我们将了解游戏的外观和玩法，然后探讨如何实现这些规则。 2. 什么是Connect 4？ 在我们能够实现游戏之前，我们需要理解游戏的规则。 Connect 4是一个相对简单的游戏。玩家轮流将棋子放入一堆堆的顶部。每回..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 什么是Connect 4？","slug":"_2-什么是connect-4","link":"#_2-什么是connect-4","children":[]},{"level":2,"title":"3. 定义游戏棋盘","slug":"_3-定义游戏棋盘","link":"#_3-定义游戏棋盘","children":[]},{"level":2,"title":"4. 进行移动","slug":"_4-进行移动","link":"#_4-进行移动","children":[]},{"level":2,"title":"5. 检查获胜条件","slug":"_5-检查获胜条件","link":"#_5-检查获胜条件","children":[{"level":3,"title":"5.1. 检查获胜线","slug":"_5-1-检查获胜线","link":"#_5-1-检查获胜线","children":[]},{"level":3,"title":"5.2. 检查所有可能的线","slug":"_5-2-检查所有可能的线","link":"#_5-2-检查所有可能的线","children":[]},{"level":3,"title":"5.3. 玩游戏","slug":"_5-3-玩游戏","link":"#_5-3-玩游戏","children":[]}]}],"git":{"createdTime":1719561183000,"updatedTime":1719561183000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.83,"words":2048},"filePathRelative":"posts/baeldung/2024-06-28/2024-06-28-Implement Connect 4 Game with Java.md","localizedDate":"2023年10月23日","excerpt":"\\n<h2><strong>1. 引言</strong></h2>\\n<p>在本文中，我们将看到如何在Java中实现Connect 4游戏。我们将了解游戏的外观和玩法，然后探讨如何实现这些规则。</p>\\n<h2><strong>2. 什么是Connect 4？</strong></h2>\\n<p>在我们能够实现游戏之前，我们需要理解游戏的规则。</p>\\n<p>Connect 4是一个相对简单的游戏。玩家轮流将棋子放入一堆堆的顶部。每回合结束后，如果任何玩家的棋子在任何直线方向上——水平、垂直或对角线——形成了四连线，那么该玩家就是赢家：</p>\\n<figure><img src=\\"https://www.baeldung.com/wp-content/uploads/2023/10/Screenshot-2023-10-23-at-07.26.48-300x230.png\\" alt=\\"img\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>img</figcaption></figure>","autoDesc":true}');export{u as comp,m as data};

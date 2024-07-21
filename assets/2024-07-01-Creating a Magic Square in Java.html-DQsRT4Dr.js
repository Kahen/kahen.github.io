import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as i,a}from"./app-C8rdvVqV.js";const l={},t=a(`<hr><h1 id="在java中创建魔方" tabindex="-1"><a class="header-anchor" href="#在java中创建魔方"><span>在Java中创建魔方</span></a></h1><p>在这篇文章中，我们将探讨如何创建魔方。<strong>我们将了解什么是魔方，创建它们的算法是什么，以及如何在Java中实现它们。</strong></p><h2 id="_2-什么是魔方" tabindex="-1"><a class="header-anchor" href="#_2-什么是魔方"><span>2. 什么是魔方？</span></a></h2><p>魔方是一种数学谜题。我们从一个大小为 <em>n×n</em> 的正方形开始，需要用数字填充，使得每个数字在1到 <em>n²</em> 之间恰好出现一次，并且每一行、每一列和对角线的和都相同。</p><p>例如，一个3×3的魔方可能是这样的：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/08/Screenshot-2023-08-08-at-15.25.21-300x291.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在这里我们可以看到每个单元格都有不同的数字，介于1和9之间。我们还可以看到每一行、每一列和对角线的和都是15。</p><p>实际上，这里有一个额外的检查。每一行、每一列和对角线的和也等于一个可以通过仅知道 <em>n</em> 来计算的值。具体来说：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/08/Screenshot-2023-08-08-at-15.59.23.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>所以，对于我们的3×3正方形，这个值是 (3³ + 3)/2 = 15。</p><p>事实上，有三种相对简单的算法可以用来生成这些魔方，这取决于正方形的大小：</p><ul><li>奇数边长</li><li>双倍：边长为偶数。这是当每边是4的倍数时。</li><li>单倍：边长为偶数。这是当每边是2的倍数但不是4的倍数时。</li></ul><p>我们将逐一查看这些算法以及如何在Java中生成它们。</p><h2 id="_3-验证魔方" tabindex="-1"><a class="header-anchor" href="#_3-验证魔方"><span>3. 验证魔方</span></a></h2><p>在我们能够生成我们的魔方之前，我们首先需要能够证明给定的正方形确实符合要求。也就是说，每一行、每一列和对角线的和都是相同的值。</p><p>在我们开始之前，让我们定义一个类来表示我们的正方形：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class MagicSquare {
    private int[][] cells;

    public MagicSquare(int n) {
        this.cells = new int[n][];

        for (int i = 0; i \`&lt; n; ++i) {
            this.cells[i] = new int[n];
        }
    }

    public int getN() {
        return cells.length;
    }

    public int getCell(int x, int y) {
        return cells[x][y];
    }

    public void setCell(int x, int y, int value) {
        cells[x][y] = value;
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这只是一个围绕二维整数数组的包装器。然后我们确保数组的大小正确，并且我们可以轻松地访问数组中的单个单元格。</p><p><strong>现在我们有了这个，让我们写一个方法来验证正方形确实是一个魔方。</strong></p><p>首先，我们将计算我们期望的行、列和对角线的和值：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>int n = getN();
int expectedValue = ((n * n * n) + n) / 2;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将开始求和并检查它们是否符合预期。我们先从对角线开始：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>// 对角线
if (IntStream.range(0, n).map(i -&gt;\` getCell(i, i)).sum() != expectedValue) {
    throw new IllegalStateException(&quot;主对角线不是预期的值&quot;);
}
if (IntStream.range(0, n).map(i -&gt; getCell(i, n - i - 1)).sum() != expectedValue) {
    throw new IllegalStateException(&quot;副对角线不是预期的值&quot;);
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这只是从0到 <em>n</em> 迭代，抓住每个点上的对角线上的每个单元格并求和。</p><p>接下来，行和列：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>// 行
IntStream.range(0, n).forEach(y -&gt; {
    if (IntStream.range(0, n).map(x -&gt; getCell(x, y)).sum() != expectedValue) {
        throw new IllegalStateException(&quot;行不是预期的值&quot;);
    }
});

// 列
IntStream.range(0, n).forEach(x -&gt; {
    if (IntStream.range(0, n).map(y -&gt; getCell(x, y)).sum() != expectedValue) {
        throw new IllegalStateException(&quot;列不是预期的值&quot;);
    }
});

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们适当地迭代每一行或列的所有单元格，并求和所有这些值。如果在这些情况下任何一个的值与我们预期的不同，我们将抛出一个异常，表明出了问题。</p><h2 id="_4-生成魔方" tabindex="-1"><a class="header-anchor" href="#_4-生成魔方"><span>4. 生成魔方</span></a></h2><p><strong>现在我们可以正确验证任何给定的正方形是否是魔方。所以我们现在需要能够生成它们。</strong></p><p>我们之前看到，根据正方形的大小，这里可以使用三种不同的算法。我们将依次查看每一种。</p><h3 id="_4-1-奇数大小正方形的算法" tabindex="-1"><a class="header-anchor" href="#_4-1-奇数大小正方形的算法"><span>4.1. 奇数大小正方形的算法</span></a></h3><p><strong>我们将首先看到的算法是用于每边有奇数个单元格的正方形。</strong></p><p>当生成这种大小的魔方时，我们总是首先将第一个数字放在第一行中间的单元格中。然后我们按照以下方式放置每一个后续的数字：</p><ul><li>首先，我们尝试将其放在上一个单元格的正上方和右侧的单元格中。在这样做时，我们在边缘处进行包装，例如，在第一行之后，我们会移动到底部行。</li><li>如果这个期望的单元格已经被占据，我们则将下一个数字放在上一个单元格的正下方。同样，在这样做时，我们在边缘处进行包装。</li></ul><p>例如，在我们的3×3正方形中，我们从第一行中间的单元格开始。然后我们向上和向右移动，包装到找到右下角的单元格：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/08/Screenshot-2023-08-09-at-07.29.54-256x300.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>从这里，我们向上和向右移动以填充中间左侧的单元格。在这之后，向上和向右移动会回到第一个单元格，所以我们必须向下移动到左下角的单元格：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/08/Screenshot-2023-08-09-at-07.33.36-294x300.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>如果我们继续这样做，我们最终会用有效的魔方填充每一个正方形。</p><h3 id="_4-2-奇数大小正方形的实现" tabindex="-1"><a class="header-anchor" href="#_4-2-奇数大小正方形的实现"><span>4.2. 奇数大小正方形的实现</span></a></h3><p>那么我们在Java中如何实现这一点呢？</p><p>首先，让我们放置我们的第一个数字。这在第一行的中心单元格中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>int y = 0;
int x = (n - 1) / 2;
setCell(x, y, 1);

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完成这个之后，我们将循环遍历所有其他的数字，依次放置每一个：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>for (int number = 2; number \`&lt;= n * n; ++number) {
    int nextX = ...;
    int nextY = ...;

    setCell(nextX, nextY, number);

    x = nextX;
    y = nextY;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们只需要确定要使用什么值作为 <em>nextX</em> 和 <em>nextY</em>。</p><p>首先，我们将尝试向上和向右移动，必要时进行包装：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>int nextX = x + 1;
if (nextX == n) {
    nextX = 0;
}

int nextY = y - 1;
if (nextY == -1) {
    nextY = n - 1;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，我们还需要处理下一个单元格已经被占据的情况：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>if (getCell(nextX, nextY) != 0) {
    nextX = x;

    nextY = y + 1;
    if (nextY == n) {
        nextY = 0;
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>将所有这些放在一起，我们就实现了生成任何奇数大小魔方的实现。</strong> 例如，使用此方法生成的9×9正方形如下所示：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/08/Screenshot-2023-08-09-at-08.00.46-300x215.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="_4-3-双倍偶数大小正方形的算法" tabindex="-1"><a class="header-anchor" href="#_4-3-双倍偶数大小正方形的算法"><span>4.3. 双倍偶数大小正方形的算法</span></a></h3><p><strong>上述算法适用于奇数大小的正方形，但不适用于偶数大小的正方形。</strong> 实际上，对于这些，我们需要根据确切的大小使用两种算法之一。</p><p><strong>双倍偶数正方形是指边长是4的倍数的正方形——例如4×4、8×8、12×12等。</strong> 为了生成这些，我们需要在我们的正方形中分离出4个特殊区域。这些区域是每个边缘 <em>n/4</em> 的单元格，同时距离角落超过 <em>n/4</em>：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/08/Screenshot-2023-08-10-at-07.48.53-300x300.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>完成这个之后，我们现在填充数字。这是通过两次传递完成的。第一次传递从左到右开始，每次我们在未突出显示的单元格上时，我们都会添加序列中的下一个数字：</p><p>第二次传递与第一次完全相同，但是从右下角开始，向右向左运行，并且只向突出显示的单元格加数字：</p><p>此时，我们已经得到了有效的魔方。</p><h3 id="_4-4-双倍偶数大小正方形的实现" tabindex="-1"><a class="header-anchor" href="#_4-4-双倍偶数大小正方形的实现"><span>4.4. 双倍偶数大小正方形的实现</span></a></h3><p>为了在Java中实现这一点，我们需要使用两种技术。</p><p>首先，我们实际上可以在一次传递中添加所有的数字。如果我们在未突出显示的单元格上，那么我们就如前所述，但如果我们在突出显示的单元格上，那么我们就会从 n² 开始倒数：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>int number = 1;

for (int y = 0; y &lt; n; ++y) {
    for (int x = 0; x &lt; n; ++x) {
        boolean highlighted = ...;

        if (highlighted) {
            setCell(x, y, (n * n) - number + 1);
        } else {
            setCell(x, y, number);
        }

        number += 1;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们只需要弄清楚我们认为哪些是突出显示的正方形。我们可以通过检查我们的 x 和 y 坐标是否在范围内来做到这一点：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>if ((y &lt; n/4 || y &gt;\`= 3*n/4) &amp;&amp; (x &gt;= n/4 &amp;&amp; x \`&lt; 3*n/4)) {
    highlighted = true;
} else if ((x &lt; n/4 || x &gt;\`= 3*n/4) &amp;&amp; (y &gt;= n/4 &amp;&amp; y &lt; 3*n/4)) {
    highlighted = true;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的第一条件是正方形顶部和底部的突出显示区域，而我们的第二个条件是正方形左侧和右侧的突出显示区域。我们可以看到它们实际上是相同的，只是在检查中交换了 x 和 y。在这两种情况下，都是我们在该侧的正方形的 1/4 之内，并且在相邻角落之间 1/4 和 3/4 的距离之内。</p><p><strong>将所有这些放在一起，我们就实现了生成任何双倍偶数大小魔方的实现。</strong> 例如，我们使用此方法生成的8×8正方形如下所示：</p><h3 id="_4-5-单倍偶数大小正方形的算法" tabindex="-1"><a class="header-anchor" href="#_4-5-单倍偶数大小正方形的算法"><span>4.5. 单倍偶数大小正方形的算法</span></a></h3><p>我们最后的正方形大小是倍偶数正方形。也就是说，边长可以被2整除但不能被4整除。这也要求边长至少是6个单元格长——没有2×2魔方的解决方案，所以6×6是我们可以解决的最小的单倍偶数魔方。</p><p>我们首先将它们分成四分之一——每个都是奇数大小的正方形。然后使用与奇数大小魔方相同的算法进行填充，只是为每个象限分配不同的数字范围——从左上象限开始，然后是右下、左上和最后左下：</p><p><strong>一旦我们使用我们的奇数大小算法填充了所有的正方形，我们仍然没有得到一个有效的魔方。</strong> 此时我们会注意到所有的列加起来都是正确的数字，但行和对角线不是。然而，我们也会注意到上半部分的所有行加起来都是同一个数字，下半部分的行也是如此：</p><p>我们可以通过在上下两半之间执行一些交换来解决这个问题，如下所示：</p><ul><li>我们左上象限的顶行中，中心左侧的每个单元格。</li><li>我们左上象限的底行中，中心左侧的每个单元格。</li><li>这两行之间的每一行中的相同数量的单元格，但开始时向右一个单元格。</li><li>右上象限的每一行中比这些少一个单元格，但从右侧开始。</li></ul><p>然后看起来像这样：</p><p><strong>现在这是一个有效的魔方，每一行、每一列和对角线都加起来得到相同的值——在这种情况下是505。</strong></p><h3 id="_4-6-单倍偶数大小正方形的实现" tabindex="-1"><a class="header-anchor" href="#_4-6-单倍偶数大小正方形的实现"><span>4.6. 单倍偶数大小正方形的实现</span></a></h3><p><strong>这个的实现将建立在我们为奇数大小正方形所做的事情上。</strong> 首先我们需要计算一些用于生成的值：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>int halfN = n/2;
int swapSize = n/4;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意我们是如何将 <em>swapSize</em> 计算为 <em>n/4</em> 并将其存储到一个int中的。这有效地进行了向下取整，所以对于 <em>n=10</em>，我们将得到一个 <em>swapSize</em> 值为2。</p><p>接下来，我们需要填充我们的网格。我们将假设我们已经有一个函数来执行奇数大小的正方形算法，只是适当地偏移：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>populateOddArea(0,     0,     halfN, 0);
populateOddArea(halfN, halfN, halfN, halfN * halfN);
populateOddArea(halfN, 0,     halfN, (halfN * halfN) * 2);
populateOddArea(0,     halfN, halfN, (halfN * halfN) * 3);

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们只需要执行我们的交换。同样，我们将假设我们有一个函数来交换我们正方形中的单元格。</p><p>在左象限中交换单元格是通过从左侧开始迭代 <em>swapSize</em> 并执行交换来完成的：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>for (int x = 0; x &lt; swapSize; ++x) {
    swapCells(x, 0, x, halfN); // 顶行
    swapCells(x, halfN - 1, x, n - 1); // 底行

    // 所有中间行。
    for (int y = 1; y &lt; halfN - 1; ++y) {
        swapCells(x + 1, y, x + 1, y + halfN);
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们交换右象限中的单元格。这是通过从右侧开始迭代 <em>swapSize – 1</em> 并执行交换来完成的：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>for (int x = 0; x &lt; swapSize - 1; ++x) {
    for (int y = 0; y &lt; halfN; ++y) {
        swapCells(n - x - 1, y, n - x - 1, y + halfN);
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>将所有这些放在一起，我们就实现了生成任何单倍偶数大小魔方的实现。</strong> 例如，我们使用此方法生成的10×10正方形如下所示：</p><h2 id="_5-总结" tabindex="-1"><a class="header-anchor" href="#_5-总结"><span>5. 总结</span></a></h2><p><strong>在这里，我们研究了用于创建魔方的算法，并看到了我们如何在Java中实现它们。</strong></p><p>和往常一样，我们可以在GitHub上找到本文的所有代码。 OK</p>`,91),s=[t];function d(r,c){return i(),n("div",null,s)}const u=e(l,[["render",d],["__file","2024-07-01-Creating a Magic Square in Java.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-01/2024-07-01-Creating%20a%20Magic%20Square%20in%20Java.html","title":"在Java中创建魔方","lang":"zh-CN","frontmatter":{"date":"2023-08-08T00:00:00.000Z","category":["Java","Algorithms"],"tag":["Magic Square","Java"],"head":[["meta",{"name":"keywords","content":"Java, Magic Square, Algorithms, Programming"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-01/2024-07-01-Creating%20a%20Magic%20Square%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中创建魔方"}],["meta",{"property":"og:description","content":"在Java中创建魔方 在这篇文章中，我们将探讨如何创建魔方。我们将了解什么是魔方，创建它们的算法是什么，以及如何在Java中实现它们。 2. 什么是魔方？ 魔方是一种数学谜题。我们从一个大小为 n×n 的正方形开始，需要用数字填充，使得每个数字在1到 n² 之间恰好出现一次，并且每一行、每一列和对角线的和都相同。 例如，一个3×3的魔方可能是这样的： ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/08/Screenshot-2023-08-08-at-15.25.21-300x291.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-01T19:55:19.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Magic Square"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2023-08-08T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-01T19:55:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中创建魔方\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/08/Screenshot-2023-08-08-at-15.25.21-300x291.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/08/Screenshot-2023-08-08-at-15.59.23.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/08/Screenshot-2023-08-09-at-07.29.54-256x300.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/08/Screenshot-2023-08-09-at-07.33.36-294x300.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/08/Screenshot-2023-08-09-at-08.00.46-300x215.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/08/Screenshot-2023-08-10-at-07.48.53-300x300.png\\"],\\"datePublished\\":\\"2023-08-08T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-01T19:55:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中创建魔方 在这篇文章中，我们将探讨如何创建魔方。我们将了解什么是魔方，创建它们的算法是什么，以及如何在Java中实现它们。 2. 什么是魔方？ 魔方是一种数学谜题。我们从一个大小为 n×n 的正方形开始，需要用数字填充，使得每个数字在1到 n² 之间恰好出现一次，并且每一行、每一列和对角线的和都相同。 例如，一个3×3的魔方可能是这样的： ..."},"headers":[{"level":2,"title":"2. 什么是魔方？","slug":"_2-什么是魔方","link":"#_2-什么是魔方","children":[]},{"level":2,"title":"3. 验证魔方","slug":"_3-验证魔方","link":"#_3-验证魔方","children":[]},{"level":2,"title":"4. 生成魔方","slug":"_4-生成魔方","link":"#_4-生成魔方","children":[{"level":3,"title":"4.1. 奇数大小正方形的算法","slug":"_4-1-奇数大小正方形的算法","link":"#_4-1-奇数大小正方形的算法","children":[]},{"level":3,"title":"4.2. 奇数大小正方形的实现","slug":"_4-2-奇数大小正方形的实现","link":"#_4-2-奇数大小正方形的实现","children":[]},{"level":3,"title":"4.3. 双倍偶数大小正方形的算法","slug":"_4-3-双倍偶数大小正方形的算法","link":"#_4-3-双倍偶数大小正方形的算法","children":[]},{"level":3,"title":"4.4. 双倍偶数大小正方形的实现","slug":"_4-4-双倍偶数大小正方形的实现","link":"#_4-4-双倍偶数大小正方形的实现","children":[]},{"level":3,"title":"4.5. 单倍偶数大小正方形的算法","slug":"_4-5-单倍偶数大小正方形的算法","link":"#_4-5-单倍偶数大小正方形的算法","children":[]},{"level":3,"title":"4.6. 单倍偶数大小正方形的实现","slug":"_4-6-单倍偶数大小正方形的实现","link":"#_4-6-单倍偶数大小正方形的实现","children":[]}]},{"level":2,"title":"5. 总结","slug":"_5-总结","link":"#_5-总结","children":[]}],"git":{"createdTime":1719863719000,"updatedTime":1719863719000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":10.63,"words":3188},"filePathRelative":"posts/baeldung/2024-07-01/2024-07-01-Creating a Magic Square in Java.md","localizedDate":"2023年8月8日","excerpt":"<hr>\\n<h1>在Java中创建魔方</h1>\\n<p>在这篇文章中，我们将探讨如何创建魔方。<strong>我们将了解什么是魔方，创建它们的算法是什么，以及如何在Java中实现它们。</strong></p>\\n<h2>2. 什么是魔方？</h2>\\n<p>魔方是一种数学谜题。我们从一个大小为 <em>n×n</em> 的正方形开始，需要用数字填充，使得每个数字在1到 <em>n²</em> 之间恰好出现一次，并且每一行、每一列和对角线的和都相同。</p>\\n<p>例如，一个3×3的魔方可能是这样的：</p>\\n<figure><img src=\\"https://www.baeldung.com/wp-content/uploads/2023/08/Screenshot-2023-08-08-at-15.25.21-300x291.png\\" alt=\\"img\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>img</figcaption></figure>","autoDesc":true}');export{u as comp,m as data};

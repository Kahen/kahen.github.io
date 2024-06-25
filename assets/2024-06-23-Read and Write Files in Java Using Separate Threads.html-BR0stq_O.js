import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-CLTJixKm.js";const t={},p=e(`<h1 id="java中使用不同线程读写文件" tabindex="-1"><a class="header-anchor" href="#java中使用不同线程读写文件"><span>Java中使用不同线程读写文件</span></a></h1><ol><li>引言</li></ol><p>在Java中处理文件时，如果不引起性能问题地管理大文件可能会是一个挑战。这正是使用单独线程的概念发挥作用的地方。<strong>通过使用单独的线程，我们可以有效地读写文件而不阻塞主线程。</strong> 在本教程中，我们将探讨如何使用单独的线程来读写文件。</p><ol start="2"><li>为什么使用单独的线程</li></ol><p>使用单独的线程进行文件操作可以通过允许任务的并发执行来提高性能。在单线程程序中，文件操作是顺序执行的。例如，我们首先读取整个文件，然后写入另一个文件。这可能特别耗时，尤其是对于大文件。</p><p><strong>通过使用单独的线程，可以同时执行多个文件操作，利用多核处理器和计算与I/O操作的重叠。</strong> 这种并发性可以导致更好的系统资源利用和减少整体执行时间。然而，需要注意的是，使用单独线程的有效性取决于任务的性质和涉及的I/O操作。</p><ol start="3"><li>使用线程实现文件操作</li></ol><p>可以使用单独的线程来读写文件以提高性能。在本节中，我们将讨论如何使用线程执行文件操作。</p><h3 id="_3-1-在单独的线程中读取文件" tabindex="-1"><a class="header-anchor" href="#_3-1-在单独的线程中读取文件"><span>3.1. 在单独的线程中读取文件</span></a></h3><p>要在单独的线程中读取文件，我们可以创建一个新线程并传递一个读取文件的_Runnable_对象。<em>Reader_类用于读取文件。此外，为了提高文件读取过程的效率，我们使用_BufferedReader</em>，它允许我们高效地逐行读取文件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Thread</span> thread <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Runnable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">BufferedReader</span> bufferedReader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span>filePath<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">String</span> line<span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>line <span class="token operator">=</span> bufferedReader<span class="token punctuation">.</span><span class="token function">readLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>line<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

thread<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-在单独的线程中写入文件" tabindex="-1"><a class="header-anchor" href="#_3-2-在单独的线程中写入文件"><span>3.2. 在单独的线程中写入文件</span></a></h3><p>我们创建另一个新线程，并使用_FileWriter_类将数据写入文件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Thread</span> thread <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Runnable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">FileWriter</span> fileWriter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileWriter</span><span class="token punctuation">(</span>filePath<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            fileWriter<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, world!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

thread<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法允许读写操作同时运行，这意味着它们可以在单独的线程中同时发生。<strong>这在其中一个操作不依赖于另一个操作的完成时特别有益。</strong></p><ol start="4"><li>处理并发</li></ol><p>多个线程对文件的并发访问需要仔细注意，以避免数据损坏和意外行为。在前面的代码中，两个线程是同时启动的。这意味着它们可以同时执行，没有保证它们的操作将以何种顺序交错执行。<strong>如果一个读取线程在写操作仍在进行时尝试访问文件，它可能会读取到不完整或部分写入的数据。</strong> 这可能导致处理过程中的误导信息或错误，可能影响依赖于准确数据的下游操作。</p><p>此外，如果两个写入线程同时尝试向文件写入数据，它们的写入可能会交错并覆盖彼此的数据部分。如果没有适当的同步处理，这可能导致数据损坏或不一致。</p><p>为了解决这个问题，一种常见的方法是使用生产者-消费者模型。<strong>一个或多个生产者线程读取文件并将它们添加到队列中，一个或多个消费者线程从队列中处理文件。</strong> 这种方法允许我们通过根据需要添加更多的生产者或消费者来轻松扩展我们的应用程序。</p><ol start="5"><li>使用_BlockingQueue_进行并发文件处理</li></ol><p>带有队列的生产者-消费者模型协调操作，确保读写的一致顺序。要实现这个模型，我们可以使用线程安全的队列数据结构，如_BlockingQueue_。生产者可以使用_offer()_方法将文件加到队列中，消费者可以使用_poll()_方法检索文件。</p><p><strong>每个_BlockingQueue_实例都有一个内部锁，管理对其内部数据结构（链表、数组等）的访问。</strong> 当一个线程尝试执行像_offer()_或_poll()_这样的操作时，它首先获取这个锁。这确保了一次只有一个线程可以访问队列，防止了同时修改和数据损坏。</p><p>通过使用_BlockingQueue_，我们解耦了生产者和消费者，允许它们以自己的节奏工作，而不必直接等待彼此。这可以提高整体性能。</p><h3 id="_5-1-创建-fileproducer" tabindex="-1"><a class="header-anchor" href="#_5-1-创建-fileproducer"><span>5.1. 创建_FileProducer_</span></a></h3><p>我们首先创建_FileProducer_类，表示负责从输入文件读取行并将其添加到共享队列的生产者线程。这个类使用_BlockingQueue_来协调生产者和消费者线程之间的操作。它接受一个_BlockingQueue_作为行的同步存储，确保消费者线程可以访问它们。</p><p>这是一个_FileProducer_类的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">FileProducer</span> <span class="token keyword">implements</span> <span class="token class-name">Runnable</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">BlockingQueue</span>\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\`\` queue<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> inputFileName<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">FileProducer</span><span class="token punctuation">(</span><span class="token class-name">BlockingQueue</span>\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\`\` queue<span class="token punctuation">,</span> <span class="token class-name">String</span> inputFileName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>queue <span class="token operator">=</span> queue<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>inputFileName <span class="token operator">=</span> inputFileName<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，在_run()_方法中，我们使用_BufferedReader_高效地逐行读取文件。我们还包括了可能在文件操作期间发生的_IOException_的异常处理。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">BufferedReader</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span>inputFileName<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> line<span class="token punctuation">;</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>打开文件后，代码进入一个循环，从文件中读取行，并同时使用_offer()_方法将它们添加到队列中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>line <span class="token operator">=</span> reader<span class="token punctuation">.</span><span class="token function">readLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    queue<span class="token punctuation">.</span><span class="token function">offer</span><span class="token punctuation">(</span>line<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-创建-fileconsumer" tabindex="-1"><a class="header-anchor" href="#_5-2-创建-fileconsumer"><span>5.2. 创建_FileConsumer_</span></a></h3><p>接着，我们引入_FileConsumer_类，它表示消费者线程，负责从队列中检索行并将它们写入输出文件。这个类接受一个_BlockingQueue_作为输入，用于从生产者线程接收行：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">FileConsumer</span> <span class="token keyword">implements</span> <span class="token class-name">Runnable</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">BlockingQueue</span>\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\`\` queue<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> outputFileName<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">FileConsumer</span><span class="token punctuation">(</span><span class="token class-name">BlockingQueue</span>\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\`\` queue<span class="token punctuation">,</span> <span class="token class-name">String</span> outputFileName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>queue <span class="token operator">=</span> queue<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>outputFileName <span class="token operator">=</span> outputFileName<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，在_run()_方法中，我们使用_BufferedWriter_来促进高效地写入输出文件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">BufferedWriter</span> writer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedWriter</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileWriter</span><span class="token punctuation">(</span>outputFileName<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> line<span class="token punctuation">;</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>打开输出文件后，代码进入一个持续循环，使用_poll()_方法从队列中检索行。如果有行可用，它将该行写入文件。当_poll()_返回_null_时，循环终止，表示生产者已完成写入行，没有更多的行需要处理：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>line <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    writer<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>line<span class="token punctuation">)</span><span class="token punctuation">;</span>
    writer<span class="token punctuation">.</span><span class="token function">newLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-线程的协调器" tabindex="-1"><a class="header-anchor" href="#_5-3-线程的协调器"><span>5.3. <strong>线程的协调器</strong></span></a></h3><p>最后，我们将所有内容包装在主程序中。首先，我们创建一个_LinkedBlockingQueue_实例，作为生产者和消费者线程之间行的中介。这个队列建立了一个同步的通信和协调通道。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">BlockingQueue</span>\`\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\`\`\` queue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedBlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，我们创建两个线程：一个_FileProducer_线程负责从输入文件读取行并添加到队列中。我们还创建了一个_FileConsumer_线程，负责从队列中检索行并专业地处理它们的处理和输出到指定的输出文件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> fileName <span class="token operator">=</span> <span class="token string">&quot;input.txt&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> outputFileName <span class="token operator">=</span> <span class="token string">&quot;output.txt&quot;</span><span class="token punctuation">;</span>

<span class="token class-name">Thread</span> producerThread <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileProducer</span><span class="token punctuation">(</span>queue<span class="token punctuation">,</span> fileName<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Thread</span> consumerThread <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileConsumer</span><span class="token punctuation">(</span>queue<span class="token punctuation">,</span> outputFileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>随后，我们使用start()方法启动它们的执行。我们使用_join()_方法确保两个线程在程序退出前优雅地完成它们的工作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>producerThread<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
consumerThread<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">try</span> <span class="token punctuation">{</span>
    producerThread<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    consumerThread1<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们创建一个输入文件，然后运行程序：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Hello</span><span class="token punctuation">,</span>
<span class="token class-name">Baeldung</span><span class="token operator">!</span>
<span class="token class-name">Nice</span> <span class="token keyword">to</span> <span class="token namespace">meet</span> you<span class="token operator">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行程序后，我们可以检查输出文件。我们应该看到输出文件包含与输入文件相同的行：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Hello</span><span class="token punctuation">,</span>
<span class="token class-name">Baeldung</span><span class="token operator">!</span>
<span class="token class-name">Nice</span> <span class="token keyword">to</span> <span class="token namespace">meet</span> you<span class="token operator">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在提供的示例中，生产者正在循环中向队列添加行，消费者正在循环中从队列检索行。这意味着可以同时在队列中有多个行，即使生产者仍在添加更多行，消费者也可能处理队列中的行。</p><ol start="6"><li>结论</li></ol><p>在本文中，我们探讨了在Java中使用单独线程进行高效文件处理的利用。我们还演示了使用_BlockingQueue_实现同步和高效的逐行文件处理。</p><p>如往常一样，示例的源代码可在GitHub上找到。 OK</p>`,53),c=[p];function o(l,i){return s(),a("div",null,c)}const d=n(t,[["render",o],["__file","2024-06-23-Read and Write Files in Java Using Separate Threads.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-23/2024-06-23-Read%20and%20Write%20Files%20in%20Java%20Using%20Separate%20Threads.html","title":"Java中使用不同线程读写文件","lang":"zh-CN","frontmatter":{"date":"2024-06-23T00:00:00.000Z","category":["Java","多线程"],"tag":["Java","多线程","文件读写"],"head":[["meta",{"name":"keywords","content":"Java, 多线程, 文件读写, 性能优化"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-23/2024-06-23-Read%20and%20Write%20Files%20in%20Java%20Using%20Separate%20Threads.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中使用不同线程读写文件"}],["meta",{"property":"og:description","content":"Java中使用不同线程读写文件 引言 在Java中处理文件时，如果不引起性能问题地管理大文件可能会是一个挑战。这正是使用单独线程的概念发挥作用的地方。通过使用单独的线程，我们可以有效地读写文件而不阻塞主线程。 在本教程中，我们将探讨如何使用单独的线程来读写文件。 为什么使用单独的线程 使用单独的线程进行文件操作可以通过允许任务的并发执行来提高性能。在单..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-23T04:50:22.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"多线程"}],["meta",{"property":"article:tag","content":"文件读写"}],["meta",{"property":"article:published_time","content":"2024-06-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-23T04:50:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中使用不同线程读写文件\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-23T04:50:22.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中使用不同线程读写文件 引言 在Java中处理文件时，如果不引起性能问题地管理大文件可能会是一个挑战。这正是使用单独线程的概念发挥作用的地方。通过使用单独的线程，我们可以有效地读写文件而不阻塞主线程。 在本教程中，我们将探讨如何使用单独的线程来读写文件。 为什么使用单独的线程 使用单独的线程进行文件操作可以通过允许任务的并发执行来提高性能。在单..."},"headers":[{"level":3,"title":"3.1. 在单独的线程中读取文件","slug":"_3-1-在单独的线程中读取文件","link":"#_3-1-在单独的线程中读取文件","children":[]},{"level":3,"title":"3.2. 在单独的线程中写入文件","slug":"_3-2-在单独的线程中写入文件","link":"#_3-2-在单独的线程中写入文件","children":[]},{"level":3,"title":"5.1. 创建_FileProducer_","slug":"_5-1-创建-fileproducer","link":"#_5-1-创建-fileproducer","children":[]},{"level":3,"title":"5.2. 创建_FileConsumer_","slug":"_5-2-创建-fileconsumer","link":"#_5-2-创建-fileconsumer","children":[]},{"level":3,"title":"5.3. 线程的协调器","slug":"_5-3-线程的协调器","link":"#_5-3-线程的协调器","children":[]}],"git":{"createdTime":1719118222000,"updatedTime":1719118222000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.01,"words":2104},"filePathRelative":"posts/baeldung/2024-06-23/2024-06-23-Read and Write Files in Java Using Separate Threads.md","localizedDate":"2024年6月23日","excerpt":"\\n<ol>\\n<li>引言</li>\\n</ol>\\n<p>在Java中处理文件时，如果不引起性能问题地管理大文件可能会是一个挑战。这正是使用单独线程的概念发挥作用的地方。<strong>通过使用单独的线程，我们可以有效地读写文件而不阻塞主线程。</strong> 在本教程中，我们将探讨如何使用单独的线程来读写文件。</p>\\n<ol start=\\"2\\">\\n<li>为什么使用单独的线程</li>\\n</ol>\\n<p>使用单独的线程进行文件操作可以通过允许任务的并发执行来提高性能。在单线程程序中，文件操作是顺序执行的。例如，我们首先读取整个文件，然后写入另一个文件。这可能特别耗时，尤其是对于大文件。</p>","autoDesc":true}');export{d as comp,k as data};

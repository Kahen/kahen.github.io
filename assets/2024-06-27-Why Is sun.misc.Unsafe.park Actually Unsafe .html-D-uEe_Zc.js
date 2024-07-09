import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as i,a}from"./app-BOkVFFfT.js";const d={},r=a(`<h1 id="sun-misc-unsafe-park-为何实际上不安全-baeldung" tabindex="-1"><a class="header-anchor" href="#sun-misc-unsafe-park-为何实际上不安全-baeldung"><span>sun.misc.Unsafe.park 为何实际上不安全？ | Baeldung</span></a></h1><p>Java提供了一些仅供内部使用的API，并在其他情况下不鼓励不必要地使用。JVM开发者给包和类命名时使用了_Unsafe_这样的名称，以警告开发者。然而，这通常并不能阻止开发者使用这些类。</p><p>在本教程中，我们将学习为什么_Unsafe.park()_实际上不安全。目标不是吓唬人，而是教育并提供对_park()_和_unpark(Thread)_方法内部工作原理的更好理解。</p><p>_Unsafe_类包含一个低级API，旨在仅供内部库使用。然而，即使在引入JPMS之后，_sun.misc.Unsafe_仍然可以访问。这是为了保持向后兼容性并支持可能使用此API的所有库和框架。JEP 260中更详细地解释了原因。</p><p>在本文中，我们不会直接使用_Unsafe_，而是使用来自_java.util.concurrent.locks_包中的_LockSupport_类，该类包装了对_Unsafe_的调用：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public static void park() {
    UNSAFE.park(false, 0L);
}

public static void unpark(Thread thread) {
    if (thread != null)
        UNSAFE.unpark(thread);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-park-与-wait" tabindex="-1"><a class="header-anchor" href="#_3-park-与-wait"><span>3. <em>park()</em> 与 <em>wait()</em></span></a></h2><p><em>park()</em> 和 <em>unpark(Thread)</em> 的功能类似于 <em>wait()</em> 和 <em>notify()</em>。让我们回顾它们的区别，并理解使用前者而不是后者的危险。</p><h3 id="_3-1-缺乏监视器" tabindex="-1"><a class="header-anchor" href="#_3-1-缺乏监视器"><span>3.1. 缺乏监视器</span></a></h3><p>与_wait()_ 和 <em>notify()</em> 不同，<em>park()</em> 和 <em>unpark(Thread)</em> 不需要监视器。任何可以获得停放线程引用的代码都可以将其解除停放。<strong>这在低级代码中可能很有用，但可能会引入额外的复杂性和难以调试的问题。</strong></p><p>监视器被设计为Java的一部分，以便线程如果一开始就没有获得它，就不能使用它。这是为了防止竞争条件并简化同步过程。让我们尝试在没有获得监视器的情况下通知线程：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
@Timeout(3)
void giveThreadWhenNotifyWithoutAcquiringMonitorThrowsException() {
    Thread thread = new Thread() {
        @Override
        public void run() {
            synchronized (this) {
                try {
                    this.wait();
                } catch (InterruptedException e) {
                    // 线程被中断
                }
            }
        }
    };

    assertThrows(IllegalMonitorStateException.class, () -&gt; {
        thread.start();
        Thread.sleep(TimeUnit.SECONDS.toMillis(1));
        thread.notify();
        thread.join();
    });
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>尝试在没有获得监视器的情况下通知线程会导致_IllegalMonitorStateException_。这种机制强制执行更好的编码标准，并防止可能的难以调试的问题。</p><p>现在，让我们检查_park()_ 和 <em>unpark(Thread)</em> 的行为：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
@Timeout(3)
void giveThreadWhenUnparkWithoutAcquiringMonitor() {
    Thread thread = new Thread(LockSupport::park);
    assertTimeoutPreemptively(Duration.of(2, ChronoUnit.SECONDS), () -&gt; {
        thread.start();
        LockSupport.unpark(thread);
    });
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以轻松地控制线程。唯一需要的是线程的引用。<strong>这为我们提供了更多的锁定控制权，但同时使我们面临更多的问题。</strong></p><p>很明显，<em>park()</em> 和 <em>unpark(Thread)</em> 对于低级代码可能很有帮助，但我们应该避免在通常的应用程序代码中使用它，因为它可能会引入太多的复杂性和不清晰的代码。</p><h3 id="_3-2-上下文信息" tabindex="-1"><a class="header-anchor" href="#_3-2-上下文信息"><span>3.2. 上下文信息</span></a></h3><p>不涉及监视器的事实也可能减少了上下文信息。换句话说，线程被停放了，但不清楚为什么、何时以及是否有其他线程因相同原因被停放。让我们运行两个线程：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class ThreadMonitorInfo {
    private static final Object MONITOR = new Object();
    public static void main(String[] args) throws InterruptedException {
        Thread waitingThread = new Thread(() -&gt; {
            try {
                synchronized (MONITOR) {
                    MONITOR.wait();
                }
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }, &quot;Waiting Thread&quot;);
        Thread parkedThread = new Thread(LockSupport::park, &quot;Parked Thread&quot;);

        waitingThread.start();
        parkedThread.start();

        waitingThread.join();
        parkedThread.join();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们使用_jstack_检查线程转储：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&quot;Parked Thread&quot; #12 prio=5 os_prio=31 tid=0x000000013b9c5000 nid=0x5803 waiting on condition [0x000000016e2ee000]
   java.lang.Thread.State: WAITING (parking)
        at sun.misc.Unsafe.park(Native Method)
        at java.util.concurrent.locks.LockSupport.park(LockSupport.java:304)
        at com.baeldung.park.ThreadMonitorInfo$$Lambda$2/284720968.run(Unknown Source)
        at java.lang.Thread.run(Thread.java:750)

&quot;Waiting Thread&quot; #11 prio=5 os_prio=31 tid=0x000000013b9c4000 nid=0xa903 in Object.wait() [0x000000016e0e2000]
   java.lang.Thread.State: WAITING (on object monitor)
        at java.lang.Object.wait(Native Method)
        - waiting on \`\`&lt;0x00000007401811d8&gt;\`\` (a java.lang.Object)
        at java.lang.Object.wait(Object.java:502)
        at com.baeldung.park.ThreadMonitorInfo.lambda$main$0(ThreadMonitorInfo.java:12)
        - locked \`\`&lt;0x00000007401811d8&gt;\`\` (a java.lang.Object)
        at com.baeldung.park.ThreadMonitorInfo$$Lambda$1/1595428806.run(Unknown Source)
        at java.lang.Thread.run(Thread.java:750)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在分析线程转储时，很明显停放的线程包含的信息较少。因此，即使有线程转储，某个线程问题也可能很难调试。</p><p>**使用特定的并发结构或特定锁的额外好处是在线程转储中提供更多的上下文信息，提供有关应用程序状态的更多信息。**许多JVM并发机制在内部使用park()。然而，如果线程转储解释说线程在等待，例如，一个_CyclicBarrier_，它正在等待其他线程。</p><h3 id="_3-3-中断标志" tabindex="-1"><a class="header-anchor" href="#_3-3-中断标志"><span>3.3. 中断标志</span></a></h3><p>处理中断的另一个有趣的事情是_wait()_和_park()_的不同行为。让我们回顾一下等待线程的行为：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
@Timeout(3)
void givenWaitingThreadWhenNotInterruptedShouldNotHaveInterruptedFlag() throws InterruptedException {

    Thread thread = new Thread() {
        @Override
        public void run() {
            synchronized (this) {
                try {
                    this.wait();
                } catch (InterruptedException e) {
                    // 线程被中断
                }
            }
        }
    };

    thread.start();
    Thread.sleep(TimeUnit.SECONDS.toMillis(1));
    thread.interrupt();
    thread.join();
    assertFalse(thread.isInterrupted(), &quot;The thread shouldn&#39;t have the interrupted flag&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们从等待状态中断一个线程，_wait()_方法会立即抛出_InterruptedException_并清除中断标志。这就是为什么最佳实践是使用检查等待条件的_while_循环而不是中断标志。</p><p>相比之下，停放的线程不会立即中断，而是按照自己的条件进行中断。此外，中断不会导致异常，线程只是从_park()_方法返回。<strong>随后，中断标志不会被重置，就像在中断等待线程时发生的那样：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
@Timeout(3)
void givenParkedThreadWhenInterruptedShouldNotResetInterruptedFlag() throws InterruptedException {
    Thread thread = new Thread(LockSupport::park);
    thread.start();
    thread.interrupt();
    assertTrue(thread.isInterrupted(), &quot;The thread should have the interrupted flag&quot;);
    thread.join();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不考虑这种行为可能会导致处理中断时出现问题。例如，如果我们在停放线程上中断后没有重置标志，它可能会导致微妙的错误。</p><h3 id="_3-4-抢占许可证" tabindex="-1"><a class="header-anchor" href="#_3-4-抢占许可证"><span>3.4. 抢占许可证</span></a></h3><p>停车和解除停放基于二进制信号灯的概念。因此，我们可以为线程提供抢占许可证。<strong>例如，我们可以解除停放一个线程，这将给它一个许可证，随后的park不会挂起它，而是会拿走许可证并继续：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private final Thread parkedThread = new Thread() {
    @Override
    public void run() {
        LockSupport.unpark(this);
        LockSupport.park();
    }
};

@Test
void givenThreadWhenPreemptivePermitShouldNotPark()  {
    assertTimeoutPreemptively(Duration.of(1, ChronoUnit.SECONDS), () -&gt; {
        parkedThread.start();
        parkedThread.join();
    });
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种技术可以用于一些复杂的同步场景。由于停车使用二进制信号灯，我们不能累积许可证，两个unpark调用不会产生两个许可证：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private final Thread parkedThread = new Thread() {
    @Override
    public void run() {
        LockSupport.unpark(this);
        LockSupport.unpark(this);
        LockSupport.park();
        LockSupport.park();
    }
};

@Test
void givenThread继续翻译：

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>void givenThreadWhenRepeatedPreemptivePermitShouldPark() { Callable<code>&lt;Boolean&gt;</code> callable = () -&gt; { parkedThread.start(); parkedThread.join(); return true; };</p><pre><code>boolean result = false;
Future\`\`&lt;Boolean&gt;\`\` future = Executors.newSingleThreadExecutor().submit(callable);
try {
    result = future.get(1, TimeUnit.SECONDS);
} catch (InterruptedException | ExecutionException | TimeoutException e) {
    // 预期线程会被停放
}
assertFalse(result, &quot;The thread should be parked&quot;);
</code></pre><p>}</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>
在这种情况下，线程只有一个许可证，对_park()_方法的第二次调用将会停放线程。如果处理不当，这可能会产生一些不期望的行为。

## 4. 结论

在本文中，我们了解到为什么_park()_方法被认为是不安全的。JVM开发者隐藏或建议不要使用内部API有特定的原因。这不仅是因为它可能在当前时刻是危险的，并产生意想不到的结果，而且这些API在未来可能会发生变化，它们的支持不是保证的。

此外，这些API需要对底层系统和技术有广泛的了解，这些可能因平台而异。不遵循这一点可能会导致脆弱的代码和难以调试的问题。

如往常一样，本文中的代码可以在GitHub上找到。</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,40),t=[r];function s(l,v){return i(),n("div",null,t)}const o=e(d,[["render",s],["__file","2024-06-27-Why Is sun.misc.Unsafe.park Actually Unsafe .html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/2024-06-27/2024-06-27-Why%20Is%20sun.misc.Unsafe.park%20Actually%20Unsafe%20.html","title":"sun.misc.Unsafe.park 为何实际上不安全？ | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-27T00:00:00.000Z","category":["Java","Concurrency"],"tag":["Java","Unsafe","park","unpark"],"head":[["meta",{"name":"keywords","content":"Java, Unsafe, park, unpark, 线程同步"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-27/2024-06-27-Why%20Is%20sun.misc.Unsafe.park%20Actually%20Unsafe%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"sun.misc.Unsafe.park 为何实际上不安全？ | Baeldung"}],["meta",{"property":"og:description","content":"sun.misc.Unsafe.park 为何实际上不安全？ | Baeldung Java提供了一些仅供内部使用的API，并在其他情况下不鼓励不必要地使用。JVM开发者给包和类命名时使用了_Unsafe_这样的名称，以警告开发者。然而，这通常并不能阻止开发者使用这些类。 在本教程中，我们将学习为什么_Unsafe.park()_实际上不安全。目标不是..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-27T14:32:25.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Unsafe"}],["meta",{"property":"article:tag","content":"park"}],["meta",{"property":"article:tag","content":"unpark"}],["meta",{"property":"article:published_time","content":"2024-06-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-27T14:32:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"sun.misc.Unsafe.park 为何实际上不安全？ | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-27T14:32:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"sun.misc.Unsafe.park 为何实际上不安全？ | Baeldung Java提供了一些仅供内部使用的API，并在其他情况下不鼓励不必要地使用。JVM开发者给包和类命名时使用了_Unsafe_这样的名称，以警告开发者。然而，这通常并不能阻止开发者使用这些类。 在本教程中，我们将学习为什么_Unsafe.park()_实际上不安全。目标不是..."},"headers":[{"level":2,"title":"3. park() 与 wait()","slug":"_3-park-与-wait","link":"#_3-park-与-wait","children":[{"level":3,"title":"3.1. 缺乏监视器","slug":"_3-1-缺乏监视器","link":"#_3-1-缺乏监视器","children":[]},{"level":3,"title":"3.2. 上下文信息","slug":"_3-2-上下文信息","link":"#_3-2-上下文信息","children":[]},{"level":3,"title":"3.3. 中断标志","slug":"_3-3-中断标志","link":"#_3-3-中断标志","children":[]},{"level":3,"title":"3.4. 抢占许可证","slug":"_3-4-抢占许可证","link":"#_3-4-抢占许可证","children":[]}]}],"git":{"createdTime":1719498745000,"updatedTime":1719498745000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.1,"words":1831},"filePathRelative":"posts/baeldung/2024-06-27/2024-06-27-Why Is sun.misc.Unsafe.park Actually Unsafe .md","localizedDate":"2024年6月27日","excerpt":"\\n<p>Java提供了一些仅供内部使用的API，并在其他情况下不鼓励不必要地使用。JVM开发者给包和类命名时使用了_Unsafe_这样的名称，以警告开发者。然而，这通常并不能阻止开发者使用这些类。</p>\\n<p>在本教程中，我们将学习为什么_Unsafe.park()_实际上不安全。目标不是吓唬人，而是教育并提供对_park()_和_unpark(Thread)_方法内部工作原理的更好理解。</p>\\n<p>_Unsafe_类包含一个低级API，旨在仅供内部库使用。然而，即使在引入JPMS之后，_sun.misc.Unsafe_仍然可以访问。这是为了保持向后兼容性并支持可能使用此API的所有库和框架。JEP 260中更详细地解释了原因。</p>","autoDesc":true}');export{o as comp,p as data};

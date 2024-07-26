import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-8nJ1rqSf.js";const p={},e=t(`<hr><h1 id="如何使用java播放声音-baeldung" tabindex="-1"><a class="header-anchor" href="#如何使用java播放声音-baeldung"><span>如何使用Java播放声音 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span><strong>1. 概述</strong></span></a></h2><p>在本教程中，我们将学习如何使用Java播放声音。Java声音API旨在平滑且连续地播放声音，甚至是非常长的声音。</p><p>作为本教程的一部分，我们将使用Java提供的_Clip_和_SourceDataLine_声音API来播放音频文件。我们还将播放不同音频格式的文件。</p><p>此外，我们将讨论每种API的优缺点。进一步地，我们将看到一些第三方Java库也可以播放声音。</p><p>一般来说，存在于_javax.sound_包中的Java声音API提供了两种播放音频的方式。在这两种方法之间，声音文件数据的指定方式有所不同。Java声音API可以以流式传输、缓冲的方式处理音频传输，也可以以内存中、非缓冲的方式处理。</p><p>Java最知名的两个声音API是_Clip_和_SourceDataLine_。</p><h3 id="_2-1-clip-api" tabindex="-1"><a class="header-anchor" href="#_2-1-clip-api"><span><strong>2.1. <em>Clip</em> API</strong></span></a></h3><p><em>Clip</em> API是Java的非缓冲或内存中的声音API。_Clip_类是_javax.sound.sampled_包的一部分，<strong>它在读取和播放短声音文件时非常有用</strong>。在播放之前，整个音频文件被加载到内存中，用户对播放有完全的控制。</p><p>除了循环声音外，它还允许用户从随机位置开始播放。</p><p>让我们首先创建一个示例类，<em>SoundPlayerWithClip</em>，它实现了_LineListener_接口，以便接收播放的线路事件（<em>OPEN</em>、<em>CLOSE</em>、<em>START_和_STOP</em>）。我们将实现_LineListener_中的_update()_方法来检查播放状态：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SoundPlayerUsingClip</span> <span class="token keyword">implements</span> <span class="token class-name">LineListener</span> <span class="token punctuation">{</span>

    <span class="token keyword">boolean</span> isPlaybackCompleted<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token class-name">LineEvent</span> event<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">LineEvent<span class="token punctuation">.</span>Type</span><span class="token punctuation">.</span><span class="token constant">START</span> <span class="token operator">==</span> event<span class="token punctuation">.</span><span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;播放开始。&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">LineEvent<span class="token punctuation">.</span>Type</span><span class="token punctuation">.</span><span class="token constant">STOP</span> <span class="token operator">==</span> event<span class="token punctuation">.</span><span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            isPlaybackCompleted <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;播放完成。&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其次，让我们从我们项目的资源文件夹中读取音频文件。我们的资源文件夹包含三种不同格式的音频文件——即WAV、MP3和MPEG：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">InputStream</span> inputStream <span class="token operator">=</span> <span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getResourceAsStream</span><span class="token punctuation">(</span>audioFilePath<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>第三，从文件流中，我们将创建一个_AudioInputStream_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">AudioInputStream</span> audioStream <span class="token operator">=</span> <span class="token class-name">AudioSystem</span><span class="token punctuation">.</span><span class="token function">getAudioInputStream</span><span class="token punctuation">(</span>inputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，我们将创建一个_DataLine.Info_对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">AudioFormat</span> audioFormat <span class="token operator">=</span> audioStream<span class="token punctuation">.</span><span class="token function">getFormat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">DataLine<span class="token punctuation">.</span>Info</span> info <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DataLine<span class="token punctuation">.</span>Info</span><span class="token punctuation">(</span><span class="token class-name">SourceDataLine</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> audioFormat<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们从这个_DataLine.Info_创建一个_Clip_对象，打开流，然后调用_start_开始播放音频：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Clip</span> audioClip <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Clip</span><span class="token punctuation">)</span> <span class="token class-name">AudioSystem</span><span class="token punctuation">.</span><span class="token function">getLine</span><span class="token punctuation">(</span>info<span class="token punctuation">)</span><span class="token punctuation">;</span>
audioClip<span class="token punctuation">.</span><span class="token function">addLineListener</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
audioClip<span class="token punctuation">.</span><span class="token keyword">open</span><span class="token punctuation">(</span>audioStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
audioClip<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们需要关闭任何打开的资源：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>audioClip<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
audioStream<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦代码运行，音频文件将播放。</p><p><strong>由于音频是预加载到内存中的，我们可以从许多其他有用的API中受益。</strong></p><p>我们可以使用_Clip.loop_方法来循环播放音频剪辑。</p><p>例如，我们可以将其设置为播放音频五次：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>audioClip<span class="token punctuation">.</span><span class="token function">loop</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者，我们可以将其设置为无限时间播放（或直到被中断）：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>audioClip<span class="token punctuation">.</span><span class="token function">loop</span><span class="token punctuation">(</span><span class="token class-name">Clip</span><span class="token punctuation">.</span><span class="token constant">LOOP_CONTINUOUSLY</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>_Clip.setMicrosecondPosition_设置媒体位置。当剪辑下次开始播放时，它将从这个位置开始。例如，要从第30秒开始，我们可以这样设置：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>audioClip<span class="token punctuation">.</span><span class="token function">setMicrosecondPosition</span><span class="token punctuation">(</span><span class="token number">30_000_000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-2-sourcedataline-api" tabindex="-1"><a class="header-anchor" href="#_2-2-sourcedataline-api"><span><strong>2.2. <em>SourceDataLine</em> API</strong></span></a></h3><p><em>SourceDataLine</em> API是Java的缓冲或流式声音API。_SourceDataLine_类是_javax.sound.sampled_包的一部分，它可以播放不能预加载到内存中的长声音文件。</p><p><strong>使用_SourceDataLine_更有效，当我们希望为大音频文件优化内存或当我们希望流式传输实时音频数据时。</strong> 它也很有用，如果我们事先不知道声音有多长以及何时结束。</p><p>让我们首先创建一个示例类，并从我们项目的资源文件夹中读取音频文件。我们的资源文件夹包含三种不同格式的音频文件——即WAV、MP3和MPEG：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">InputStream</span> inputStream <span class="token operator">=</span> <span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getResourceAsStream</span><span class="token punctuation">(</span>audioFilePath<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其次，从文件输入流中，我们将创建一个_AudioInputStream_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">AudioInputStream</span> audioStream <span class="token operator">=</span> <span class="token class-name">AudioSystem</span><span class="token punctuation">.</span><span class="token function">getAudioInputStream</span><span class="token punctuation">(</span>inputStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，我们将创建一个_DataLine.Info_对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">AudioFormat</span> audioFormat <span class="token operator">=</span> audioStream<span class="token punctuation">.</span><span class="token function">getFormat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">DataLine<span class="token punctuation">.</span>Info</span> info <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DataLine<span class="token punctuation">.</span>Info</span><span class="token punctuation">(</span><span class="token class-name">Clip</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> audioFormat<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们从这个_DataLine.Info_创建一个_SourceDataLine_对象，打开流，并调用_start_开始播放音频：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">SourceDataLine</span> sourceDataLine <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">SourceDataLine</span><span class="token punctuation">)</span> <span class="token class-name">AudioSystem</span><span class="token punctuation">.</span><span class="token function">getLine</span><span class="token punctuation">(</span>info<span class="token punctuation">)</span><span class="token punctuation">;</span>
sourceDataLine<span class="token punctuation">.</span><span class="token keyword">open</span><span class="token punctuation">(</span>audioFormat<span class="token punctuation">)</span><span class="token punctuation">;</span>
sourceDataLine<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，在_SourceDataLine_的情况下，<strong>音频数据是分块加载的，我们需要提供缓冲区大小</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">BUFFER_SIZE</span> <span class="token operator">=</span> <span class="token number">4096</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，让我们从_AudioInputStream_读取音频数据并将其发送到_SourceDataLine_的播放缓冲区，直到它到达流的末尾：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bufferBytes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token constant">BUFFER_SIZE</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> readBytes <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>readBytes <span class="token operator">=</span> audioStream<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>bufferBytes<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    sourceDataLine<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>bufferBytes<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> readBytes<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们关闭任何打开的资源：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>sourceDataLine<span class="token punctuation">.</span><span class="token function">drain</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
sourceDataLine<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
audioStream<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦代码运行，音频文件将播放。</p><p>在这里，我们不需要实现任何_LineListener_接口。</p><h3 id="_2-3-clip-和-sourcedataline-的比较" tabindex="-1"><a class="header-anchor" href="#_2-3-clip-和-sourcedataline-的比较"><span><strong>2.3. _Clip_和_SourceDataLine_的比较</strong></span></a></h3><p>让我们讨论一下两者的优缺点：</p><table><thead><tr><th>Clip</th><th>SourceDataLine</th></tr></thead><tbody><tr><td>支持从音频的任何位置播放。见_setMicrosecondPosition(long)<em>或_setFramePosition(int)</em>。</td><td>不能从声音的任意位置开始播放。</td></tr><tr><td>支持循环播放（全部或部分声音）。见_setLoopPoints(int, int)<em>和_loop(int)</em>。</td><td>不能播放（循环）全部或部分声音。</td></tr><tr><td>可以在播放之前知道声音的持续时间。见_getFrameLength()<em>或_getMicrosecondLength()</em>。</td><td>不能在播放之前知道声音的持续时间。</td></tr><tr><td>可以在当前位置停止播放，并稍后恢复播放。见_stop()<em>和_start()</em></td><td>不能在中间停止和恢复播放。</td></tr><tr><td>不适合且效率低下地播放大音频文件，因为它是内存中的。</td><td>适合且高效地播放长声音文件或实时流式传输声音。</td></tr><tr><td>_Clip’s start()_方法确实播放声音，但它不会阻塞当前线程（它立即返回），因此需要实现_LineListener_接口以了解播放状态。</td><td>与_Clip_不同，我们不需要实现_LineListener_接口以知道何时播放完成。</td></tr><tr><td>不能控制要写入音频线播放缓冲区的声音数据。</td><td>可以控制要写入音频线播放缓冲区的声音数据。</td></tr></tbody></table><h3 id="_2-4-java-api对mp3格式的支持" tabindex="-1"><a class="header-anchor" href="#_2-4-java-api对mp3格式的支持"><span><strong>2.4. Java API对MP3格式的支持</strong></span></a></h3><p>目前，_Clip_和_SourceDataLine_可以播放AIFC、AIFF、AU、SND和WAV格式的音频文件。</p><p>我们可以使用_AudioSystem_检查支持的音频格式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Type</span><span class="token punctuation">[</span><span class="token punctuation">]</span> list <span class="token operator">=</span> <span class="token class-name">AudioSystem</span><span class="token punctuation">.</span><span class="token function">getAudioFileTypes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">StringBuilder</span> supportedFormat <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token string">&quot;支持的格式：&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Type</span> type <span class="token operator">:</span> list<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    supportedFormat<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;, &quot;</span> <span class="token operator">+</span> type<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>supportedFormat<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>然而，我们不能使用Java声音API _Clip_和_SourceDataLine_播放流行的MP3/MPEG音频格式。</strong> 我们需要寻找一些第三方库来播放MP3格式。</p><p>如果我们向_Clip_或_SourceDataLine_ API提供MP3格式文件，我们将得到_UnsupportedAudioFileException_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name"><span class="token namespace">javax<span class="token punctuation">.</span>sound<span class="token punctuation">.</span>sampled<span class="token punctuation">.</span></span>UnsupportedAudioFileException</span><span class="token operator">:</span> could not get audio input stream from input file
    at <span class="token class-name"><span class="token namespace">javax<span class="token punctuation">.</span>sound<span class="token punctuation">.</span>sampled<span class="token punctuation">.</span></span>AudioSystem</span><span class="token punctuation">.</span><span class="token function">getAudioInputStream</span><span class="token punctuation">(</span><span class="token class-name">AudioSystem</span><span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token number">1189</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-第三方java-api播放声音" tabindex="-1"><a class="header-anchor" href="#_3-第三方java-api播放声音"><span><strong>3. 第三方Java API播放声音</strong></span></a></h2><p>让我们看看一些也可以播放不同音频格式文件的第三方库。</p><h3 id="_3-1-javafx库" tabindex="-1"><a class="header-anchor" href="#_3-1-javafx库"><span>3.1. JavaFX库</span></a></h3><p>JavaFX有_Media_和_MediaPlayer_类，可以播放MP3文件。它也可以播放其他音频格式，如WAV。</p><p>让我们创建一个示例类，并使用_Media_和_MediaPlayer_类来播放我们的MP3文件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> audioFilePath <span class="token operator">=</span> <span class="token string">&quot;AudioFileWithMp3Format.mp3&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">SoundPlayerUsingJavaFx</span> soundPlayerWithJavaFx <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SoundPlayerUsingJavaFx</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token class-name"><span class="token namespace">com<span class="token punctuation">.</span>sun<span class="token punctuation">.</span>javafx<span class="token punctuation">.</span>application<span class="token punctuation">.</span></span>PlatformImpl</span><span class="token punctuation">.</span><span class="token function">startup</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Media</span> media <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Media</span><span class="token punctuation">(</span>
      soundPlayerWithJavaFx<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\`\`\`java
      <span class="token punctuation">.</span><span class="token function">getClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getResource</span><span class="token punctuation">(</span>audioFilePath<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toExternalForm</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">MediaPlayer</span> mp3Player <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MediaPlayer</span><span class="token punctuation">(</span>media<span class="token punctuation">)</span><span class="token punctuation">;</span>
    mp3Player<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;播放过程中发生错误：&quot;</span> <span class="token operator">+</span> ex<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>JavaFX API的一个优点是它可以播放WAV、MP3和MPEG音频格式。</p><h3 id="_3-2-jlayer库" tabindex="-1"><a class="header-anchor" href="#_3-2-jlayer库"><span>3.2. JLayer库</span></a></h3><p>JLayer库<strong>可以播放包括MP3在内的MPEG格式的音频</strong>。<strong>然而，它不能播放其他格式，如WAV。</strong></p><p>让我们使用Javazoom的_Player_类创建一个示例类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> audioFilePath <span class="token operator">=</span> <span class="token string">&quot;AudioFileWithMp3Format.mp3&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">SoundPlayerUsingJavaZoom</span> player <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SoundPlayerUsingJavaZoom</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token class-name">BufferedInputStream</span> buffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedInputStream</span><span class="token punctuation">(</span>
      player<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getResourceAsStream</span><span class="token punctuation">(</span>audioFilePath<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Player</span> mp3Player <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Player</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    mp3Player<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;播放过程中发生错误：&quot;</span> <span class="token operator">+</span> ex<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span><strong>4. 结论</strong></span></a></h2><p>在本文中，我们学习了如何使用Java播放声音。我们还了解了两种不同的Java声音API，<em>Clip_和_SourceDataLine</em>。后来，我们看到了_Clip_和_SourceDataLine_ API之间的区别，这将帮助我们为任何用例选择适当的API。</p><p>最后，我们看到了一些也可以播放音频并支持其他格式的第三方库，如MP3。</p><p>一如既往，本文中使用示例代码可在GitHub上找到。 OK</p>`,76),o=[e];function c(i,l){return s(),n("div",null,o)}const d=a(p,[["render",c],["__file","2024-07-18-How to Play Sound With Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-18/2024-07-18-How%20to%20Play%20Sound%20With%20Java.html","title":"如何使用Java播放声音 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Sound"],"tag":["Java Sound","Audio"],"head":[["meta",{"name":"keywords","content":"Java, Sound, Audio, Clip, SourceDataLine, JavaFX, JLayer"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-18/2024-07-18-How%20to%20Play%20Sound%20With%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何使用Java播放声音 | Baeldung"}],["meta",{"property":"og:description","content":"如何使用Java播放声音 | Baeldung 1. 概述 在本教程中，我们将学习如何使用Java播放声音。Java声音API旨在平滑且连续地播放声音，甚至是非常长的声音。 作为本教程的一部分，我们将使用Java提供的_Clip_和_SourceDataLine_声音API来播放音频文件。我们还将播放不同音频格式的文件。 此外，我们将讨论每种API的优..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-18T11:31:23.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java Sound"}],["meta",{"property":"article:tag","content":"Audio"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-18T11:31:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何使用Java播放声音 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-18T11:31:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何使用Java播放声音 | Baeldung 1. 概述 在本教程中，我们将学习如何使用Java播放声音。Java声音API旨在平滑且连续地播放声音，甚至是非常长的声音。 作为本教程的一部分，我们将使用Java提供的_Clip_和_SourceDataLine_声音API来播放音频文件。我们还将播放不同音频格式的文件。 此外，我们将讨论每种API的优..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[{"level":3,"title":"2.1. Clip API","slug":"_2-1-clip-api","link":"#_2-1-clip-api","children":[]},{"level":3,"title":"2.2. SourceDataLine API","slug":"_2-2-sourcedataline-api","link":"#_2-2-sourcedataline-api","children":[]},{"level":3,"title":"2.3. _Clip_和_SourceDataLine_的比较","slug":"_2-3-clip-和-sourcedataline-的比较","link":"#_2-3-clip-和-sourcedataline-的比较","children":[]},{"level":3,"title":"2.4. Java API对MP3格式的支持","slug":"_2-4-java-api对mp3格式的支持","link":"#_2-4-java-api对mp3格式的支持","children":[]}]},{"level":2,"title":"3. 第三方Java API播放声音","slug":"_3-第三方java-api播放声音","link":"#_3-第三方java-api播放声音","children":[{"level":3,"title":"3.1. JavaFX库","slug":"_3-1-javafx库","link":"#_3-1-javafx库","children":[]},{"level":3,"title":"3.2. JLayer库","slug":"_3-2-jlayer库","link":"#_3-2-jlayer库","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721302283000,"updatedTime":1721302283000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.56,"words":1969},"filePathRelative":"posts/baeldung/2024-07-18/2024-07-18-How to Play Sound With Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>如何使用Java播放声音 | Baeldung</h1>\\n<h2><strong>1. 概述</strong></h2>\\n<p>在本教程中，我们将学习如何使用Java播放声音。Java声音API旨在平滑且连续地播放声音，甚至是非常长的声音。</p>\\n<p>作为本教程的一部分，我们将使用Java提供的_Clip_和_SourceDataLine_声音API来播放音频文件。我们还将播放不同音频格式的文件。</p>\\n<p>此外，我们将讨论每种API的优缺点。进一步地，我们将看到一些第三方Java库也可以播放声音。</p>\\n<p>一般来说，存在于_javax.sound_包中的Java声音API提供了两种播放音频的方式。在这两种方法之间，声音文件数据的指定方式有所不同。Java声音API可以以流式传输、缓冲的方式处理音频传输，也可以以内存中、非缓冲的方式处理。</p>","autoDesc":true}');export{d as comp,k as data};

import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as t,a}from"./app-CJGTm_7y.js";const i={},s=a('<h1 id="java中读取用户输入直到满足条件" tabindex="-1"><a class="header-anchor" href="#java中读取用户输入直到满足条件"><span>Java中读取用户输入直到满足条件</span></a></h1><p>当我们编写Java应用程序以接受用户输入时，可能有两种变体：单行输入和多行输入。在单行输入的情况下，处理起来相当直接。我们读取输入直到看到行结束。然而，我们需要以不同的方式管理多行用户输入。</p><p>在本教程中，我们将讨论如何在Java中处理多行用户输入。</p><h2 id="_2-解决问题的思路" tabindex="-1"><a class="header-anchor" href="#_2-解决问题的思路"><span>2. 解决问题的思路</span></a></h2><p>在Java中，我们可以使用_Scanner_类从用户输入中读取数据。因此，从用户输入中读取数据对我们来说并不是一个挑战。但是，如果我们允许用户输入多行数据，我们应该知道何时用户已经给出了我们应该接受的所有数据。换句话说，我们需要一个事件来知道何时我们应该停止从用户输入中读取。</p><p>一个常用的方法是**检查用户发送的数据。如果数据符合一个定义的条件，我们就停止读取输入数据。**在实践中，这个条件可以根据需求而变化。</p><p>解决这个问题的一个想法是编写一个无限循环来持续逐行读取用户输入。在循环中，我们检查用户发送的每一行。一旦条件满足，我们就中断无限循环：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>while (true) {\n    String line = ... //获取一行输入\n    if (matchTheCondition(line)) {\n        break;\n    }\n    ... 保存或使用输入数据 ...\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们创建一个方法来实现我们的想法。</p><h2 id="_3-使用无限循环解决问题" tabindex="-1"><a class="header-anchor" href="#_3-使用无限循环解决问题"><span>3. 使用无限循环解决问题</span></a></h2><p>为了简单起见，<strong>在本教程中，一旦我们的应用程序接收到字符串“ <em>bye</em>”（不区分大小写），我们就停止读取输入</strong>。</p><p>因此，根据我们之前讨论的想法，我们可以创建一个方法来解决问题：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public static List``````&lt;String&gt;`````` readUserInput() {\n    List``````&lt;String&gt;`````` userData = new ArrayList``````&lt;String&gt;``````();\n    System.out.println(&quot;Please enter your data below: (send &#39;bye&#39; to exit)&quot;);\n    Scanner input = new Scanner(System.in);\n    while (true) {\n        String line = input.nextLine();\n        if (&quot;bye&quot;.equalsIgnoreCase(line)) {\n            break;\n        }\n        userData.add(line);\n    }\n    return userData;\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的代码所示，_readUserInput_方法从_System.in_读取用户输入，并将数据存储在_userData List_中。</p><p>一旦我们从用户那里接收到_“bye”_，我们就中断无限_while_循环。换句话说，我们停止读取用户输入并返回_userData_以供进一步处理。</p><p>接下来，让我们在_main_方法中调用_readUserInput_方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public static void main(String[] args) {\n    List``````&lt;String&gt;`````` userData = readUserInput();\n    System.out.printf(&quot;User Input Data:\\n%s&quot;, String.join(&quot;\\n&quot;, userData));\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们在_main_方法中看到的，调用_readUserInput_后，我们打印出接收到的用户输入数据。</p><p>现在，让我们启动应用程序，看看它是否按预期工作。</p><p>当应用程序启动时，它会提示我们输入：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Please enter your data below: (send &#39;bye&#39; to exit)\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>那么，让我们发送一些文本，并在最后发送“ <em>bye</em>”：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Hello there,\nToday is 19. Mar. 2022.\nHave a nice day!\nbye\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们输入“ <em>bye</em>”并按_Enter_后，应用程序输出我们收集到的用户输入数据并退出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>User Input Data:\nHello there,\nToday is 19. Mar. 2022.\nHave a nice day!\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，方法按预期工作。</p><h2 id="_4-对解决方案进行单元测试" tabindex="-1"><a class="header-anchor" href="#_4-对解决方案进行单元测试"><span>4. 对解决方案进行单元测试</span></a></h2><p>我们已经解决了问题并手动测试了它。然而，随着时间的推移，我们可能需要根据新的要求调整方法。因此，如果我们能够自动测试方法就好了。</p><p>编写_readUserInput_方法的单元测试与常规测试有所不同。这是因为<strong>当_readUserInput_方法被调用时，应用程序被阻塞并等待用户输入</strong>。</p><p>接下来，让我们先看看测试方法，然后解释问题是如何解决的：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test\npublic void givenDataInSystemIn_whenCallingReadUserInputMethod_thenHaveUserInputData() {\n    String[] inputLines = new String[]{\n        &quot;The first line.&quot;,\n        &quot;The second line.&quot;,\n        &quot;The last line.&quot;,\n        &quot;bye&quot;,\n        &quot;anything after &#39;bye&#39; will be ignored&quot;\n    };\n    String[] expectedLines = Arrays.copyOf(inputLines, inputLines.length - 2);\n    List``````&lt;String&gt;`````` expected = Arrays.stream(expectedLines).collect(Collectors.toList());\n\n    InputStream stdin = System.in;\n    try {\n        System.setIn(new ByteArrayInputStream(String.join(&quot;\\n&quot;, inputLines).getBytes()));\n        List``````&lt;String&gt;`````` actual = UserInputHandler.readUserInput();\n        assertThat(actual).isEqualTo(expected);\n    } finally {\n        System.setIn(stdin);\n    }\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们快速浏览一下方法并理解它的工作原理。</p><p>在最开始，我们创建了一个_String_数组_inputLines_来保存我们想要用作用户输入的行。然后，我们初始化了_expected_ <em>List</em>，包含预期的数据。</p><p>接下来，棘手的部分来了。在我们备份当前_System.in_到_stdin_变量之后，我们通过调用_System.setIn_方法重新分配了系统标准输入。</p><p>在这种情况下，<strong>我们想使用_inputLines_数组来模拟用户输入</strong>。</p><p>因此，我们将数组转换为_InputStream_，这种情况下是一个_ByteArrayInputStream_对象，并重新分配_InputStream_对象作为系统标准输入。</p><p>然后，我们可以调用目标方法并测试结果是否符合预期。</p><p>最后，<strong>我们不应该忘记将原始的_stdin_对象恢复为系统标准输入</strong>。因此，我们在_finally_块中放置_System.setIn(stdin);_，以确保无论如何都会执行。</p><p>如果我们运行测试方法，它将在没有任何手动干预的情况下通过。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了如何编写一个Java方法来读取用户输入，直到满足条件。</p><p>两个关键技术是：</p><ul><li>使用标准Java API中的_Scanner_类来读取用户输入</li><li>在无限循环中检查每一行输入；如果条件满足，就中断循环</li></ul><p>此外，我们讨论了如何编写测试方法来自动测试我们的解决方案。</p><p>如常，本教程中使用的源代码可在GitHub上获得。</p>',45),l=[s];function r(d,p){return t(),n("div",null,l)}const v=e(i,[["render",r],["__file","2024-07-20-Read User Input Until a Condition Is Met.html.vue"]]),o=JSON.parse('{"path":"/posts/baeldung/2024-07-20/2024-07-20-Read%20User%20Input%20Until%20a%20Condition%20Is%20Met.html","title":"Java中读取用户输入直到满足条件","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","编程"],"tag":["Java","用户输入","输入处理"],"head":[["meta",{"name":"keywords","content":"Java, 用户输入, 多行输入, 条件判断"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-20/2024-07-20-Read%20User%20Input%20Until%20a%20Condition%20Is%20Met.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中读取用户输入直到满足条件"}],["meta",{"property":"og:description","content":"Java中读取用户输入直到满足条件 当我们编写Java应用程序以接受用户输入时，可能有两种变体：单行输入和多行输入。在单行输入的情况下，处理起来相当直接。我们读取输入直到看到行结束。然而，我们需要以不同的方式管理多行用户输入。 在本教程中，我们将讨论如何在Java中处理多行用户输入。 2. 解决问题的思路 在Java中，我们可以使用_Scanner_类..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T12:37:53.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"用户输入"}],["meta",{"property":"article:tag","content":"输入处理"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T12:37:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中读取用户输入直到满足条件\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-20T12:37:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中读取用户输入直到满足条件 当我们编写Java应用程序以接受用户输入时，可能有两种变体：单行输入和多行输入。在单行输入的情况下，处理起来相当直接。我们读取输入直到看到行结束。然而，我们需要以不同的方式管理多行用户输入。 在本教程中，我们将讨论如何在Java中处理多行用户输入。 2. 解决问题的思路 在Java中，我们可以使用_Scanner_类..."},"headers":[{"level":2,"title":"2. 解决问题的思路","slug":"_2-解决问题的思路","link":"#_2-解决问题的思路","children":[]},{"level":2,"title":"3. 使用无限循环解决问题","slug":"_3-使用无限循环解决问题","link":"#_3-使用无限循环解决问题","children":[]},{"level":2,"title":"4. 对解决方案进行单元测试","slug":"_4-对解决方案进行单元测试","link":"#_4-对解决方案进行单元测试","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721479073000,"updatedTime":1721479073000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.83,"words":1450},"filePathRelative":"posts/baeldung/2024-07-20/2024-07-20-Read User Input Until a Condition Is Met.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>当我们编写Java应用程序以接受用户输入时，可能有两种变体：单行输入和多行输入。在单行输入的情况下，处理起来相当直接。我们读取输入直到看到行结束。然而，我们需要以不同的方式管理多行用户输入。</p>\\n<p>在本教程中，我们将讨论如何在Java中处理多行用户输入。</p>\\n<h2>2. 解决问题的思路</h2>\\n<p>在Java中，我们可以使用_Scanner_类从用户输入中读取数据。因此，从用户输入中读取数据对我们来说并不是一个挑战。但是，如果我们允许用户输入多行数据，我们应该知道何时用户已经给出了我们应该接受的所有数据。换句话说，我们需要一个事件来知道何时我们应该停止从用户输入中读取。</p>","autoDesc":true}');export{v as comp,o as data};

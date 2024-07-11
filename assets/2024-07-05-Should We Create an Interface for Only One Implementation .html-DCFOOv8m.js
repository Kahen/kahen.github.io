import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-uizvaz9h.js";const t={},p=e(`<h1 id="只为单一实现创建接口是否合适" tabindex="-1"><a class="header-anchor" href="#只为单一实现创建接口是否合适"><span>只为单一实现创建接口是否合适？</span></a></h1><p>在本教程中，我们将探讨在Java中只为单一实现创建接口的实际影响。我们将讨论这种方法的优缺点，并通过代码示例来更好地理解这一概念。到本教程结束时，我们将对是否为单一实现使用接口有一个更清晰的视角。</p><h2 id="_2-java中接口的概念" tabindex="-1"><a class="header-anchor" href="#_2-java中接口的概念"><span>2. Java中接口的概念</span></a></h2><p>Java中的接口用于定义类之间的契约，指定任何实现接口的类必须实现的一组方法。这使我们能够在代码中实现抽象和模块化，使其更加易于维护和灵活。</p><p>例如，这里有一个名为_Animal_的接口，它有一个名为_makeSound()_的抽象方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public interface Animal {
    String makeSound();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这确保了任何实现_Animal_接口的类都实现了_makeSound()_方法。</p><h3 id="_2-1-接口的目的" tabindex="-1"><a class="header-anchor" href="#_2-1-接口的目的"><span>2.1. 接口的目的</span></a></h3><p>接口在Java中扮演着至关重要的角色：</p><ul><li><strong>抽象</strong>：它们定义了一个类要实现的方法，将“是什么”与“如何做”分离。这有助于通过关注类的目的而不是实现细节来管理复杂性。</li><li><strong>模块化</strong>：接口使得代码模块化和可重用。实现接口的类可以轻松替换或扩展，而不影响系统的其他部分。</li><li><strong>强制契约</strong>：接口作为实现类和应用程序之间的契约，确保类履行其预期的角色并遵守特定行为。</li></ul><p>通过掌握Java中接口的概念和目的，我们可以更好地评估为单一实现创建接口是否合适。</p><h2 id="_3-为单一实现类使用接口的原因" tabindex="-1"><a class="header-anchor" href="#_3-为单一实现类使用接口的原因"><span>3. 为单一实现类使用接口的原因</span></a></h2><p>为单一实现类使用接口可能是有益的。让我们探讨我们可能选择这样做的原因。</p><h3 id="_3-1-解耦依赖并促进灵活性" tabindex="-1"><a class="header-anchor" href="#_3-1-解耦依赖并促进灵活性"><span>3.1. 解耦依赖并促进灵活性</span></a></h3><p><strong>为单一实现类使用接口可以通过将实现与其使用解耦来增强代码的灵活性</strong>。让我们考虑以下示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Dog</span> <span class="token keyword">implements</span> <span class="token class-name">Animal</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Dog</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">makeSound</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;Woof! My name is &quot;</span> <span class="token operator">+</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AnimalCare</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Animal</span> animal<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">AnimalCare</span><span class="token punctuation">(</span><span class="token class-name">Animal</span> animal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>animal <span class="token operator">=</span> animal<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">animalSound</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> animal<span class="token punctuation">.</span><span class="token function">makeSound</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，_AnimalCare_类通过_Animal_接口与_Dog_类松散耦合。尽管_Animal_接口只有一个实现，但它使我们能够在未来松添加更多实现，而无需更改_AnimalCare_类。</p><h3 id="_3-2-强制特定行为的契约" tabindex="-1"><a class="header-anchor" href="#_3-2-强制特定行为的契约"><span>3.2. 强制特定行为的契约</span></a></h3><p><strong>接口可以强制实现类实现特定行为的契约</strong>。在上面的例子中，_Animal_接口强制所有实现类都必须有_makeSound()_方法。这确保了与不同动物类型交互时有一致的API。</p><h3 id="_3-3-促进单元测试和模拟" tabindex="-1"><a class="header-anchor" href="#_3-3-促进单元测试和模拟"><span>3.3. 促进单元测试和模拟</span></a></h3><p><strong>接口使编写单元测试和模拟对象更容易，以进行测试目的</strong>。例如，在上面的例子中，我们可以为_Animal_接口创建一个模拟实现，以测试_AnimalCare_类，而不需要依赖实际的_Dog_实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MockAnimal</span> <span class="token keyword">implements</span> <span class="token class-name">Animal</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">makeSound</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;Mock animal sound!&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 在测试类中</span>
<span class="token class-name">MockAnimal</span> mockAnimal <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MockAnimal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> expected <span class="token operator">=</span> <span class="token string">&quot;Mock animal sound!&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">AnimalCare</span> animalCare <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AnimalCare</span><span class="token punctuation">(</span>mockAnimal<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertThat</span><span class="token punctuation">(</span>animalCare<span class="token punctuation">.</span><span class="token function">animalSound</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span>expected<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-为潜在的未来可扩展性做准备" tabindex="-1"><a class="header-anchor" href="#_3-4-为潜在的未来可扩展性做准备"><span>3.4. 为潜在的未来可扩展性做准备</span></a></h3><p><strong>尽管可能只有一个实现类，但使用接口可以为代码准备潜在的未来可扩展性</strong>。在上面的例子中，如果我们需要支持更多的动物类型，我们可以简单地添加新的Animal接口实现，而无需更改现有代码。</p><p>总之，为单一实现类使用接口可以提供解耦依赖、强制契约、促进测试和为未来可扩展性做准备等好处。然而，也有一些情况下，这样做可能不是最佳选择。接下来让我们来审视这些情况。</p><h2 id="_4-不为单一实现类使用接口的原因" tabindex="-1"><a class="header-anchor" href="#_4-不为单一实现类使用接口的原因"><span>4. 不为单一实现类使用接口的原因</span></a></h2><p>尽管为单一实现类使用接口有其好处，但在某些情况下，这可能不是最佳选择。以下是一些避免为单一实现创建接口的原因：</p><h3 id="_4-1-不必要的复杂性和开销" tabindex="-1"><a class="header-anchor" href="#_4-1-不必要的复杂性和开销"><span>4.1. 不必要的复杂性和开销</span></a></h3><p><strong>为单一实现添加接口可能会给代码引入不必要的复杂性和开销</strong>。让我们看以下示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Cat</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">makeSound</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;Meow! My name is &quot;</span> <span class="token operator">+</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们考虑一个情况，我们只想打印猫的声音。我们可以创建一个_Cat_对象并使用其_makeSound()_方法，而不需要接口。这使得代码更简单、更直接。<strong>如果没有计划添加其他实现或需要抽象，引入接口可能会增加不必要的复杂性。</strong></p><h3 id="_4-2-没有预期需要多个实现" tabindex="-1"><a class="header-anchor" href="#_4-2-没有预期需要多个实现"><span>4.2. 没有预期需要多个实现</span></a></h3><p><strong>如果没有预期需要多个实现，使用接口可能不会带来显著的好处</strong>。在上述_Cat_示例中，如果不太可能添加其他类型的猫，引入接口可能没有必要。</p><h3 id="_4-3-未来更改的重构成本较低" tabindex="-1"><a class="header-anchor" href="#_4-3-未来更改的重构成本较低"><span>4.3. 未来更改的重构成本较低</span></a></h3><p>在某些情况下，如果需要，稍后引入接口的代码重构成本可能很低。例如，如果需要添加更多猫类型，我们可以重构_Cat_类并在那时以最小的努力引入接口。</p><h3 id="_4-4-在特定情境下的有限好处" tabindex="-1"><a class="header-anchor" href="#_4-4-在特定情境下的有限好处"><span>4.4. 在特定情境下的有限好处</span></a></h3><p><strong>根据特定情境，为单一实现类使用接口的好处可能有限</strong>。例如，假设代码是小型、自包含模块的一部分，没有依赖于其他模块。在这种情况下，使用接口的优势可能不那么明显。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了是否为Java中的单一实现类创建接口的问题。</p><p>我们讨论了接口在Java编程中的角色，以及为单一实现类使用接口的原因，如解耦依赖、强制契约、促进单元测试和为潜在的未来可扩展性做准备。我们还考察了在某些情况下不使用接口的原因，包括不必要的复杂性、没有预期需要多个实现、重构成本较低和在特定情境下的有限好处。</p><p>最终，为单一实现类创建接口的决定取决于项目的特定需求和约束。通过仔细考虑优缺点，我们可以做出明智的选择，以最好地满足我们的需求，并促进可维护、灵活和健壮的代码。</p><p>如常，示例的完整源代码可在GitHub上找到。</p>`,42),l=[p];function i(c,o){return s(),a("div",null,l)}const d=n(t,[["render",i],["__file","2024-07-05-Should We Create an Interface for Only One Implementation .html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-05/2024-07-05-Should%20We%20Create%20an%20Interface%20for%20Only%20One%20Implementation%20.html","title":"只为单一实现创建接口是否合适？","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Design Patterns"],"tag":["Interfaces","Implementation"],"head":[["meta",{"name":"keywords","content":"Java, Interface, Implementation, Design Pattern"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-05/2024-07-05-Should%20We%20Create%20an%20Interface%20for%20Only%20One%20Implementation%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"只为单一实现创建接口是否合适？"}],["meta",{"property":"og:description","content":"只为单一实现创建接口是否合适？ 在本教程中，我们将探讨在Java中只为单一实现创建接口的实际影响。我们将讨论这种方法的优缺点，并通过代码示例来更好地理解这一概念。到本教程结束时，我们将对是否为单一实现使用接口有一个更清晰的视角。 2. Java中接口的概念 Java中的接口用于定义类之间的契约，指定任何实现接口的类必须实现的一组方法。这使我们能够在代码..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-05T19:57:27.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Interfaces"}],["meta",{"property":"article:tag","content":"Implementation"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-05T19:57:27.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"只为单一实现创建接口是否合适？\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-05T19:57:27.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"只为单一实现创建接口是否合适？ 在本教程中，我们将探讨在Java中只为单一实现创建接口的实际影响。我们将讨论这种方法的优缺点，并通过代码示例来更好地理解这一概念。到本教程结束时，我们将对是否为单一实现使用接口有一个更清晰的视角。 2. Java中接口的概念 Java中的接口用于定义类之间的契约，指定任何实现接口的类必须实现的一组方法。这使我们能够在代码..."},"headers":[{"level":2,"title":"2. Java中接口的概念","slug":"_2-java中接口的概念","link":"#_2-java中接口的概念","children":[{"level":3,"title":"2.1. 接口的目的","slug":"_2-1-接口的目的","link":"#_2-1-接口的目的","children":[]}]},{"level":2,"title":"3. 为单一实现类使用接口的原因","slug":"_3-为单一实现类使用接口的原因","link":"#_3-为单一实现类使用接口的原因","children":[{"level":3,"title":"3.1. 解耦依赖并促进灵活性","slug":"_3-1-解耦依赖并促进灵活性","link":"#_3-1-解耦依赖并促进灵活性","children":[]},{"level":3,"title":"3.2. 强制特定行为的契约","slug":"_3-2-强制特定行为的契约","link":"#_3-2-强制特定行为的契约","children":[]},{"level":3,"title":"3.3. 促进单元测试和模拟","slug":"_3-3-促进单元测试和模拟","link":"#_3-3-促进单元测试和模拟","children":[]},{"level":3,"title":"3.4. 为潜在的未来可扩展性做准备","slug":"_3-4-为潜在的未来可扩展性做准备","link":"#_3-4-为潜在的未来可扩展性做准备","children":[]}]},{"level":2,"title":"4. 不为单一实现类使用接口的原因","slug":"_4-不为单一实现类使用接口的原因","link":"#_4-不为单一实现类使用接口的原因","children":[{"level":3,"title":"4.1. 不必要的复杂性和开销","slug":"_4-1-不必要的复杂性和开销","link":"#_4-1-不必要的复杂性和开销","children":[]},{"level":3,"title":"4.2. 没有预期需要多个实现","slug":"_4-2-没有预期需要多个实现","link":"#_4-2-没有预期需要多个实现","children":[]},{"level":3,"title":"4.3. 未来更改的重构成本较低","slug":"_4-3-未来更改的重构成本较低","link":"#_4-3-未来更改的重构成本较低","children":[]},{"level":3,"title":"4.4. 在特定情境下的有限好处","slug":"_4-4-在特定情境下的有限好处","link":"#_4-4-在特定情境下的有限好处","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720209447000,"updatedTime":1720209447000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.64,"words":1692},"filePathRelative":"posts/baeldung/2024-07-05/2024-07-05-Should We Create an Interface for Only One Implementation .md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将探讨在Java中只为单一实现创建接口的实际影响。我们将讨论这种方法的优缺点，并通过代码示例来更好地理解这一概念。到本教程结束时，我们将对是否为单一实现使用接口有一个更清晰的视角。</p>\\n<h2>2. Java中接口的概念</h2>\\n<p>Java中的接口用于定义类之间的契约，指定任何实现接口的类必须实现的一组方法。这使我们能够在代码中实现抽象和模块化，使其更加易于维护和灵活。</p>\\n<p>例如，这里有一个名为_Animal_的接口，它有一个名为_makeSound()_的抽象方法：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>public interface Animal {\\n    String makeSound();\\n}\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};

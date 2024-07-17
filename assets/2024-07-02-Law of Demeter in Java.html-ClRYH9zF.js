import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as a,a as i}from"./app-DGS89p1j.js";const l={},t=i(`<hr><h1 id="迪米特法则在java中的应用" tabindex="-1"><a class="header-anchor" href="#迪米特法则在java中的应用"><span>迪米特法则在Java中的应用</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>迪米特法则（LoD），或最少知识原则，为模块化软件开发提供了面向对象设计原则。它有助于构建相互依赖性较低且松耦合的组件。</p><p>在本教程中，我们将深入探讨迪米特法则及其在Java中的应用。</p><h2 id="_2-理解迪米特法则" tabindex="-1"><a class="header-anchor" href="#_2-理解迪米特法则"><span>2. 理解迪米特法则</span></a></h2><p>迪米特法则是面向对象编程中的几种设计指南之一。<strong>它建议对象应避免访问其他对象的内部数据和方法</strong>。相反，对象应该只与其直接依赖项交互。</p><p>该概念最初由Karl J. Lieberherr等人在一篇论文中提出。它指出：</p><blockquote><p>对于所有类_C_，以及附加到_C_的所有方法_M_，_M_发送消息的所有对象必须是以下类别的实例：</p><ul><li><em>M_的参数类（包括_C</em>）</li><li>_C_的实例变量的类</li></ul><p>（由_M_创建的对象，或由_M_调用的函数或方法，以及全局变量中的对象被视为_M_的参数。）</p></blockquote><p>简单来说，法则规定类_C_中的方法_X_只应调用以下方法：</p><ul><li>类_C_本身</li><li>由_X_创建的对象</li><li>作为参数传递给_X_的对象</li><li>存储在_C_的实例变量中的对象</li><li>静态字段</li></ul><p>这五个要点总结了法则。</p><h2 id="_3-java中迪米特法则的示例" tabindex="-1"><a class="header-anchor" href="#_3-java中迪米特法则的示例"><span>3. Java中迪米特法则的示例</span></a></h2><p>在上一节中，我们将迪米特法则提炼成五个关键规则。让我们通过一些示例代码来说明这些要点。</p><h3 id="_3-1-第一规则" tabindex="-1"><a class="header-anchor" href="#_3-1-第一规则"><span>3.1. 第一规则</span></a></h3><p><strong>第一规则表明，类_C_中的方法_X_只应调用_C_的方法：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>class Greetings {
    String generalGreeting() {
        return &quot;Welcome&quot; + world();
    }
    String world() {
        return &quot;Hello World&quot;;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，generalGreeting()方法调用了同一类中的world()方法。这符合法则，因为它们属于同一类。</p><h3 id="_3-2-第二规则" tabindex="-1"><a class="header-anchor" href="#_3-2-第二规则"><span>3.2. 第二规则</span></a></h3><p><strong>第二规则表明，类_C_中的方法_X_只应调用由_X_创建的对象的方法：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String getHelloBrazil() {
    HelloCountries helloCountries = new HelloCountries();
    return helloCountries.helloBrazil();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们创建了HelloCountries的一个对象，并在其上调用了helloBrazil()。这符合法则，因为getHelloBrazil()方法本身创建了对象。</p><h3 id="_3-3-第三规则" tabindex="-1"><a class="header-anchor" href="#_3-3-第三规则"><span>3.3. 第三规则</span></a></h3><p>此外，<strong>第三规则指出方法_X_只应调用作为参数传递给</strong><em>X</em><strong>的对象的方法：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String getHelloIndia(HelloCountries helloCountries) {
    return helloCountries.helloIndia();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们将HelloCountries对象作为参数传递给getHelloIndia()。将对象作为参数传递给了方法，使方法能够不违反迪米特法则地调用其方法。</p><h3 id="_3-4-第四规则" tabindex="-1"><a class="header-anchor" href="#_3-4-第四规则"><span>3.4. 第四规则</span></a></h3><p><strong>类_C_中的方法_X_只应调用存储在_C_的实例变量中的对象的方法：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>// ...
HelloCountries helloCountries = new HelloCountries();

String getHelloJapan() {
    return helloCountries.helloJapan();
}
// ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们在Greetings类中创建了一个实例变量“<em>helloCountries</em>”，然后在getHelloJapan()方法中调用了实例变量上的helloJapan()方法。这符合第四规则。</p><h3 id="_3-5-第五规则" tabindex="-1"><a class="header-anchor" href="#_3-5-第五规则"><span>3.5. 第五规则</span></a></h3><p>最后，<strong>类_C_中的方法_X_可以调用在_C_中创建的静态字段的方法：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>// ...
static HelloCountries helloCountriesStatic = new HelloCountries();

String getHellStaticWorld() {
    return helloCountriesStatic.helloStaticWorld();
}
// ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，方法调用了类中创建的静态对象上的helloStaticWorld()方法。</p><h2 id="_4-违反迪米特法则" tabindex="-1"><a class="header-anchor" href="#_4-违反迪米特法则"><span>4. 违反迪米特法则</span></a></h2><p>让我们检查一些违反迪米特法则的示例代码，并查看可能的修复方法。</p><h3 id="_4-1-设置" tabindex="-1"><a class="header-anchor" href="#_4-1-设置"><span>4.1. 设置</span></a></h3><p>我们首先定义一个Employee类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>class Employee {
    private Department department = new Department();

    public Department getDepartment() {
        return department;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Employee类包含一个对象引用成员变量，并为其提供访问器方法。</p><p>接下来，定义Department类，具有以下成员变量和方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>class Department {
    private Manager manager = new Manager();

    public Manager getManager() {
        return manager;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，Manager类包含批准费用的方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>class Manager {
    public void approveExpense(Expenses expenses) {
        System.out.println(&quot;Total amounts approved&quot; + expenses.total());
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们看看Expenses类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>class Expenses {
    private double total;
    private double tax;

    public Expenses(double total, double tax) {
        this.total = total;
        this.tax = tax;
    }

    public double total() {
        return total + tax;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-使用" tabindex="-1"><a class="header-anchor" href="#_4-2-使用"><span>4.2. 使用</span></a></h3><p>这些类通过它们的关系表现出紧密耦合。<strong>我们将通过让_Manager_批准_Expenses_来演示迪米特法则的违反：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Expenses expenses = new Expenses(100, 10);
Employee employee = new Employee();
employee.getDepartment().getManager().approveExpense(expenses);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，<strong>我们有违反迪米特法则的链式调用</strong>。这些类紧密耦合，不能独立操作。</p><p>让我们通过将_Manager_类作为_Employee_的实例变量来修复这个违规。它将通过_Employee_构造函数传入。然后，我们将在_Employee_类中创建_submitExpense()<em>方法，并在其中调用_Manager_上的_approveExpense()</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>// ...
private Manager manager;
Employee(Manager manager) {
    this.manager = manager;
}

void submitExpense(Expenses expenses) {
    manager.approveExpense(expenses);
}
// ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是新的用法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Manager mgr = new Manager();
Employee emp = new Employee(mgr);
emp.submitExpense(expenses);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种修订后的方法通过减少类之间的耦合并促进更模块化的设计，符合迪米特法则。</p><h2 id="_5-迪米特法则的例外" tabindex="-1"><a class="header-anchor" href="#_5-迪米特法则的例外"><span>5. 迪米特法则的例外</span></a></h2><p>链式调用通常表示违反了迪米特法则，但也有例外。例如，<strong>如果构建器是本地实例化的，则构建器模式不违反迪米特法则</strong>。其中一条规则指出，“类_C_中的方法_X_只应调用由_X_创建的对象的方法”。</p><p>此外，Fluent APIs中的链式调用。<strong>如果链式调用是在本地创建的对象上进行的，则Fluent APIs不违反迪米特法则</strong>。但是，当链式调用是在非本地实例化的对象上进行的，或者返回一个不同的对象时，那么它就违反了迪米特法则。</p><p>还有，在我们处理数据结构时，可能会违反迪米特法则。<strong>典型的数据结构使用，如本地实例化、变异和访问它们，不违反迪米特法则</strong>。在我们从数据结构中获取的对象上调用方法的情况下，那么迪米特法则可能被违反。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们学习了迪米特法则的应用以及如何在面向对象代码中遵循它。此外，我们通过代码示例深入探讨了每条法则。迪米特法则通过限制对象交互到直接依赖项促进了松耦合。</p><p>如常，示例的完整源代码可在GitHub上找到。</p>`,62),s=[t];function r(d,o){return a(),n("div",null,s)}const c=e(l,[["render",r],["__file","2024-07-02-Law of Demeter in Java.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-02/2024-07-02-Law%20of%20Demeter%20in%20Java.html","title":"迪米特法则在Java中的应用","lang":"zh-CN","frontmatter":{"date":"2024-07-03T00:00:00.000Z","category":["Java","设计模式"],"tag":["Law of Demeter","面向对象设计"],"head":[["meta",{"name":"keywords","content":"Java, 设计原则, 模块化, 低耦合"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-02/2024-07-02-Law%20of%20Demeter%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"迪米特法则在Java中的应用"}],["meta",{"property":"og:description","content":"迪米特法则在Java中的应用 1. 概述 迪米特法则（LoD），或最少知识原则，为模块化软件开发提供了面向对象设计原则。它有助于构建相互依赖性较低且松耦合的组件。 在本教程中，我们将深入探讨迪米特法则及其在Java中的应用。 2. 理解迪米特法则 迪米特法则是面向对象编程中的几种设计指南之一。它建议对象应避免访问其他对象的内部数据和方法。相反，对象应该..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-02T19:28:17.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Law of Demeter"}],["meta",{"property":"article:tag","content":"面向对象设计"}],["meta",{"property":"article:published_time","content":"2024-07-03T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-02T19:28:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"迪米特法则在Java中的应用\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-03T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-02T19:28:17.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"迪米特法则在Java中的应用 1. 概述 迪米特法则（LoD），或最少知识原则，为模块化软件开发提供了面向对象设计原则。它有助于构建相互依赖性较低且松耦合的组件。 在本教程中，我们将深入探讨迪米特法则及其在Java中的应用。 2. 理解迪米特法则 迪米特法则是面向对象编程中的几种设计指南之一。它建议对象应避免访问其他对象的内部数据和方法。相反，对象应该..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 理解迪米特法则","slug":"_2-理解迪米特法则","link":"#_2-理解迪米特法则","children":[]},{"level":2,"title":"3. Java中迪米特法则的示例","slug":"_3-java中迪米特法则的示例","link":"#_3-java中迪米特法则的示例","children":[{"level":3,"title":"3.1. 第一规则","slug":"_3-1-第一规则","link":"#_3-1-第一规则","children":[]},{"level":3,"title":"3.2. 第二规则","slug":"_3-2-第二规则","link":"#_3-2-第二规则","children":[]},{"level":3,"title":"3.3. 第三规则","slug":"_3-3-第三规则","link":"#_3-3-第三规则","children":[]},{"level":3,"title":"3.4. 第四规则","slug":"_3-4-第四规则","link":"#_3-4-第四规则","children":[]},{"level":3,"title":"3.5. 第五规则","slug":"_3-5-第五规则","link":"#_3-5-第五规则","children":[]}]},{"level":2,"title":"4. 违反迪米特法则","slug":"_4-违反迪米特法则","link":"#_4-违反迪米特法则","children":[{"level":3,"title":"4.1. 设置","slug":"_4-1-设置","link":"#_4-1-设置","children":[]},{"level":3,"title":"4.2. 使用","slug":"_4-2-使用","link":"#_4-2-使用","children":[]}]},{"level":2,"title":"5. 迪米特法则的例外","slug":"_5-迪米特法则的例外","link":"#_5-迪米特法则的例外","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719948497000,"updatedTime":1719948497000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.26,"words":1578},"filePathRelative":"posts/baeldung/2024-07-02/2024-07-02-Law of Demeter in Java.md","localizedDate":"2024年7月3日","excerpt":"<hr>\\n<h1>迪米特法则在Java中的应用</h1>\\n<h2>1. 概述</h2>\\n<p>迪米特法则（LoD），或最少知识原则，为模块化软件开发提供了面向对象设计原则。它有助于构建相互依赖性较低且松耦合的组件。</p>\\n<p>在本教程中，我们将深入探讨迪米特法则及其在Java中的应用。</p>\\n<h2>2. 理解迪米特法则</h2>\\n<p>迪米特法则是面向对象编程中的几种设计指南之一。<strong>它建议对象应避免访问其他对象的内部数据和方法</strong>。相反，对象应该只与其直接依赖项交互。</p>\\n<p>该概念最初由Karl J. Lieberherr等人在一篇论文中提出。它指出：</p>","autoDesc":true}');export{c as comp,u as data};

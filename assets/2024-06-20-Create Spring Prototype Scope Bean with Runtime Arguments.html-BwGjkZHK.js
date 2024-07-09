import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-_uhw5edP.js";const t={},p=e(`<h1 id="在spring中使用运行时参数创建原型作用域bean" tabindex="-1"><a class="header-anchor" href="#在spring中使用运行时参数创建原型作用域bean"><span>在Spring中使用运行时参数创建原型作用域Bean</span></a></h1><p>在这篇文章中，我们将学习如何在Spring中使用运行时参数创建原型作用域的Bean。</p><p>在Spring中，有多种不同的Bean作用域，但默认的作用域是单例，这意味着单例作用域的Bean始终会产生相同的对象。</p><p>或者，如果我们每次需要从容器中获取一个新的实例，我们可以使用原型作用域的Bean。然而，在大多数情况下，如果我们想要从单例Bean中实例化原型，或者将动态参数传递给原型Bean，我们会遇到问题。</p><p>Spring提供了许多方法来实现这些目标，我们将在本教程中深入讨论。</p><p>有时我们需要使用动态参数作为输入来初始化Spring Bean。原型Bean可以通过Spring使用多种方法来分配不同的动态参数。</p><p>我们将逐一了解它们，并查看它们的优缺点。</p><p>首先，让我们创建一个原型Bean <em>Employee</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Employee</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">printName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同时，让我们为 <em>Employee</em> 原型Bean创建一个配置：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EmployeeConfig</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;Employee&quot;</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@Scope</span><span class="token punctuation">(</span><span class="token class-name">BeanDefinition</span><span class="token punctuation">.</span><span class="token constant">SCOPE_PROTOTYPE</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Employee</span> <span class="token function">createPrototype</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-1-使用应用程序上下文" tabindex="-1"><a class="header-anchor" href="#_2-1-使用应用程序上下文"><span>2.1 使用应用程序上下文</span></a></h3><p>通常，这是使用_ApplicationContext_获取原型Bean的最基本和简单的方法。</p><p>让我们将_ApplicationContext_注入到我们的组件中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UseEmployeePrototype</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">ApplicationContext</span> applicationContext<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">public</span> <span class="token class-name">UseEmployeePrototype</span><span class="token punctuation">(</span><span class="token class-name">ApplicationContext</span> applicationContext<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>applicationContext <span class="token operator">=</span> applicationContext<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">usePrototype</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Employee</span> employee <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Employee</span><span class="token punctuation">)</span> applicationContext<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token string">&quot;Employee&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;sachin&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        employee<span class="token punctuation">.</span><span class="token function">printName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们在这里看到的，我们将Bean的创建紧密耦合到_ApplicationContext_。因此，如果我们改变Bean的实现，这种方法可能会受到影响。</p><h3 id="_2-2-使用工厂方法" tabindex="-1"><a class="header-anchor" href="#_2-2-使用工厂方法"><span>2.2 使用工厂方法</span></a></h3><p>Spring提供了_ObjectFactory<code>&lt;T&gt;</code>_接口来按需生成给定类型的实例。</p><p>让我们使用_ObjectFactory_为我们的_Employee_ Bean创建一个_EmployeeFactory_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EmployeeBeanUsingObjectFactory</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">ObjectFactory</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">&gt;</span></span>\`\` employeeObjectFactory<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Employee</span> <span class="token function">getEmployee</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> employeeObjectFactory<span class="token punctuation">.</span><span class="token function">getObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，每次调用_getEmployee()_时，Spring都会返回一个新的_Employee_对象。</p><h3 id="_2-3-使用-lookup" tabindex="-1"><a class="header-anchor" href="#_2-3-使用-lookup"><span>2.3 使用_@Lookup_</span></a></h3><p>另一种方法是使用_@Lookup_注解进行方法注入，可以解决这个问题。任何我们用_@Lookup_注解注入的方法都将被Spring容器覆盖，然后返回该方法的命名Bean。</p><p>让我们创建一个组件，并创建一个带有_@Lookup_注解的方法来获取_Employee_对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EmployeeBeanUsingLookUp</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Lookup</span>
    <span class="token keyword">public</span> <span class="token class-name">Employee</span> <span class="token function">getEmployee</span><span class="token punctuation">(</span><span class="token class-name">String</span> arg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个带有_@Lookup_注解的方法，如_getEmployee_()，将被Spring覆盖。结果，每次我们调用_getEmployee_()方法时，都会返回一个新的_Employee_实例。</p><p><strong>Spring将使用CGLIB生成字节码，类和方法都不能是final。</strong></p><p>现在，让我们测试_@Lookup_方法对给定的原型Bean，并检查它是否返回不同的实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenPrototypeBean_WhenLookup_ThenNewInstanceReturn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">AbstractApplicationContext</span> context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AnnotationConfigApplicationContext</span><span class="token punctuation">(</span><span class="token class-name">EmployeeConfig</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">EmployeeBeanUsingLookUp</span> firstContext <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">EmployeeBeanUsingLookUp</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">EmployeeBeanUsingLookUp</span> secondContext <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">EmployeeBeanUsingLookUp</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Employee</span> firstInstance <span class="token operator">=</span> firstContext<span class="token punctuation">.</span><span class="token function">getEmployee</span><span class="token punctuation">(</span><span class="token string">&quot;sachin&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Employee</span> secondInstance <span class="token operator">=</span> secondContext<span class="token punctuation">.</span><span class="token function">getEmployee</span><span class="token punctuation">(</span><span class="token string">&quot;kumar&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span>firstInstance <span class="token operator">!=</span> secondInstance<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-使用-function" tabindex="-1"><a class="header-anchor" href="#_2-4-使用-function"><span>2.4 使用_Function_</span></a></h3><p>Spring提供了另一种选项，<em>Function</em>，用于在运行时创建原型Bean。我们也可以将参数应用于新创建的原型Bean实例。</p><p>首先，让我们创建一个使用_Function_的组件，其中名称字段将添加到实例中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EmployeeBeanUsingFunction</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">Function</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Employee</span><span class="token punctuation">&gt;</span></span>\`\` beanFactory<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Employee</span> <span class="token function">getEmployee</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Employee</span> employee <span class="token operator">=</span> beanFactory<span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> employee<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>进一步地，现在，让我们在我们的Bean配置中添加一个新的_beanFactory()_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EmployeeConfig</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@Scope</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;prototype&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Employee</span> <span class="token function">getEmployee</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Function</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Employee</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token function">beanFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> name <span class="token operator">-&gt;</span> <span class="token function">getEmployee</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们将检查实例是否不同：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenPrototypeBean_WhenFunction_ThenNewInstanceReturn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">AbstractApplicationContext</span> context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AnnotationConfigApplicationContext</span><span class="token punctuation">(</span><span class="token class-name">EmployeeConfig</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">EmployeeBeanUsingFunction</span> firstContext <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">EmployeeBeanUsingFunction</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">EmployeeBeanUsingFunction</span> secondContext <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">EmployeeBeanUsingFunction</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Employee</span> firstInstance <span class="token operator">=</span> firstContext<span class="token punctuation">.</span><span class="token function">getEmployee</span><span class="token punctuation">(</span><span class="token string">&quot;sachin&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Employee</span> secondInstance <span class="token operator">=</span> secondContext<span class="token punctuation">.</span><span class="token function">getEmployee</span><span class="token punctuation">(</span><span class="token string">&quot;kumar&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span>firstInstance <span class="token operator">!=</span> secondInstance<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-使用-objectprovider" tabindex="-1"><a class="header-anchor" href="#_2-5-使用-objectprovider"><span>2.5 使用_ObjectProvider_</span></a></h3><p>Spring提供了_ObjectProvider<code>&lt;T&gt;</code>_，这是现有_ObjectFactory_接口的扩展。</p><p>让我们注入_ObjectProvider_并使用_ObjectProvider_获取_Employee_对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EmployeeBeanUsingObjectProvider</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">ObjectProvider</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">&gt;</span></span>\`\` objectProvider<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Employee</span> <span class="token function">getEmployee</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Employee</span> employee <span class="token operator">=</span> objectProvider<span class="token punctuation">.</span><span class="token function">getObject</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> employee<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们测试并检查实例是否不同：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenPrototypeBean_WhenObjectProvider_ThenNewInstanceReturn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">AbstractApplicationContext</span> context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AnnotationConfigApplicationContext</span><span class="token punctuation">(</span><span class="token class-name">EmployeeConfig</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">EmployeeBeanUsingObjectProvider</span> firstContext <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">EmployeeBeanUsingObjectProvider</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">EmployeeBeanUsingObjectProvider</span> secondContext <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">EmployeeBeanUsingObjectProvider</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Employee</span> firstInstance <span class="token operator">=</span> firstContext<span class="token punctuation">.</span><span class="token function">getEmployee</span><span class="token punctuation">(</span><span class="token string">&quot;sachin&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Employee</span> secondInstance <span class="token operator">=</span> secondContext<span class="token punctuation">.</span><span class="token function">getEmployee</span><span class="token punctuation">(</span><span class="token string">&quot;kumar&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span>firstInstance <span class="token operator">!=</span> secondInstance<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-结论" tabindex="-1"><a class="header-anchor" href="#_3-结论"><span>3. 结论</span></a></h2><p>在这个简短的教程中，我们学习了在Spring中动态创建原型作用域Bean的几种方法。</p><p>正如往常一样，这个教程的完整代码可以在GitHub上找到。</p>`,46),o=[p];function c(l,i){return s(),a("div",null,o)}const k=n(t,[["render",c],["__file","2024-06-20-Create Spring Prototype Scope Bean with Runtime Arguments.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-20-Create%20Spring%20Prototype%20Scope%20Bean%20with%20Runtime%20Arguments.html","title":"在Spring中使用运行时参数创建原型作用域Bean","lang":"zh-CN","frontmatter":{"date":"2024-06-20T00:00:00.000Z","category":["Spring","Java"],"tag":["Spring Framework","Prototype Scope"],"head":[["meta",{"name":"keywords","content":"Spring, Java, Prototype Scope Bean, Runtime Arguments"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-20-Create%20Spring%20Prototype%20Scope%20Bean%20with%20Runtime%20Arguments.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Spring中使用运行时参数创建原型作用域Bean"}],["meta",{"property":"og:description","content":"在Spring中使用运行时参数创建原型作用域Bean 在这篇文章中，我们将学习如何在Spring中使用运行时参数创建原型作用域的Bean。 在Spring中，有多种不同的Bean作用域，但默认的作用域是单例，这意味着单例作用域的Bean始终会产生相同的对象。 或者，如果我们每次需要从容器中获取一个新的实例，我们可以使用原型作用域的Bean。然而，在大多..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Framework"}],["meta",{"property":"article:tag","content":"Prototype Scope"}],["meta",{"property":"article:published_time","content":"2024-06-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Spring中使用运行时参数创建原型作用域Bean\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Spring中使用运行时参数创建原型作用域Bean 在这篇文章中，我们将学习如何在Spring中使用运行时参数创建原型作用域的Bean。 在Spring中，有多种不同的Bean作用域，但默认的作用域是单例，这意味着单例作用域的Bean始终会产生相同的对象。 或者，如果我们每次需要从容器中获取一个新的实例，我们可以使用原型作用域的Bean。然而，在大多..."},"headers":[{"level":3,"title":"2.1 使用应用程序上下文","slug":"_2-1-使用应用程序上下文","link":"#_2-1-使用应用程序上下文","children":[]},{"level":3,"title":"2.2 使用工厂方法","slug":"_2-2-使用工厂方法","link":"#_2-2-使用工厂方法","children":[]},{"level":3,"title":"2.3 使用_@Lookup_","slug":"_2-3-使用-lookup","link":"#_2-3-使用-lookup","children":[]},{"level":3,"title":"2.4 使用_Function_","slug":"_2-4-使用-function","link":"#_2-4-使用-function","children":[]},{"level":3,"title":"2.5 使用_ObjectProvider_","slug":"_2-5-使用-objectprovider","link":"#_2-5-使用-objectprovider","children":[]},{"level":2,"title":"3. 结论","slug":"_3-结论","link":"#_3-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":3.74,"words":1121},"filePathRelative":"posts/baeldung/Archive/2024-06-20-Create Spring Prototype Scope Bean with Runtime Arguments.md","localizedDate":"2024年6月20日","excerpt":"\\n<p>在这篇文章中，我们将学习如何在Spring中使用运行时参数创建原型作用域的Bean。</p>\\n<p>在Spring中，有多种不同的Bean作用域，但默认的作用域是单例，这意味着单例作用域的Bean始终会产生相同的对象。</p>\\n<p>或者，如果我们每次需要从容器中获取一个新的实例，我们可以使用原型作用域的Bean。然而，在大多数情况下，如果我们想要从单例Bean中实例化原型，或者将动态参数传递给原型Bean，我们会遇到问题。</p>\\n<p>Spring提供了许多方法来实现这些目标，我们将在本教程中深入讨论。</p>\\n<p>有时我们需要使用动态参数作为输入来初始化Spring Bean。原型Bean可以通过Spring使用多种方法来分配不同的动态参数。</p>","autoDesc":true}');export{k as comp,d as data};

import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CJGTm_7y.js";const e={},p=t('<h1 id="java访问控制模型" tabindex="-1"><a class="header-anchor" href="#java访问控制模型"><span>Java访问控制模型</span></a></h1><p>在本文中，我们将探讨不同的访问控制模型以及如何在实践中实现它们。</p><h2 id="_2-什么是访问控制模型" tabindex="-1"><a class="header-anchor" href="#_2-什么是访问控制模型"><span>2. 什么是访问控制模型？</span></a></h2><p>应用程序，特别是基于Web的应用程序，通常需要满足一个共同的要求，即只有在满足一组特定条件（也称为策略）时，才能执行某些操作。这是一个非常通用的要求，让我们给出一些例子：</p><ul><li>互联网论坛：只有会员才能发布新消息或回复现有消息</li><li>电子商务网站：普通用户只能查看自己的订单</li><li>银行后台办公室：账户经理可以管理自己客户的投资组合。此外，当他们暂时不可用（例如，休假）时，账户经理还可以管理另一位账户经理客户的投资组合，并且前者充当其同行</li><li>数字钱包：在用户所在时区的20:00至08:00期间，支付限额为500美元</li></ul><p>我们将为给定应用程序采用的《访问控制模型》将负责评估传入的请求，并做出决定：要么请求可以继续，要么不行。在后一种情况下，结果通常是返回给用户的错误消息。</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/09/access-control-models-fig0.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>显然，这些例子中的每一个在授权给定请求时都需要采取不同的方法。</p><h2 id="_3-访问控制模型类型" tabindex="-1"><a class="header-anchor" href="#_3-访问控制模型类型"><span>3. 访问控制模型类型</span></a></h2><p>从前面的例子中，我们可以看到，要做出允许/拒绝决定，我们需要考虑与请求相关的不同方面：</p><ul><li>请求相关联的身份。请注意，即使是匿名访问在这里也有一种身份形式</li><li>请求针对的对象/资源</li><li>对这些对象/资源执行的操作</li><li>请求的上下文信息。一天中的时间、时区和使用的认证方法是这种上下文信息的例子</li></ul><p>我们可以将访问控制模型分为三种类型：</p><ul><li>基于角色的访问控制（RBAC）</li><li>访问控制列表（ACL）</li><li>基于属性的访问控制（ABAC）</li></ul><p>不管其类型如何，我们通常可以在模型中识别以下实体：</p><ul><li>PEP，即策略执行点：拦截请求并根据PDP返回的结果允许其继续或不继续</li><li>PDP，即策略决策点：使用策略评估请求以产生访问决定</li><li>PIP，即策略信息点：存储和/或调解PDP用于做出访问决定的信息</li><li>PAP，即策略管理点：管策略和其他与访问决策制定相关的操作方面</li></ul><p>下图显示了这些实体在逻辑上是如何相互关联的：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/09/access-control-models-fig1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p><strong>需要注意的是，尽管被描绘为自治实体，但实际上，我们会发现自己的一些或甚至所有模型元素都嵌入在应用程序本身中。</strong></p><p>此外，此模型不涉及如何建立用户的身份。尽管如此，这个方面在决定是否允许请求继续时可能会被考虑。</p><p>现在，让我们看看如何将这种通用架构应用于上述每种模型。</p><h2 id="_4-基于角色的访问控制" tabindex="-1"><a class="header-anchor" href="#_4-基于角色的访问控制"><span>4. 基于角色的访问控制</span></a></h2><p>在此模型中，PDP决策过程包括两个步骤：</p><ul><li>首先，它恢复与传入请求的身份相关联的角色。</li><li>接下来，它尝试将这些角色与请求策略匹配</li></ul><p><strong>这个模型的具体实现出现在Java EE规范中，以_@HttpConstraint_注解及其XML等价物的形式存在</strong>。这是在应用于servlet时使用注解的典型用法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@WebServlet</span><span class="token punctuation">(</span>name<span class="token operator">=</span><span class="token string">&quot;rbac&quot;</span><span class="token punctuation">,</span> urlPatterns <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;/protected&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token annotation punctuation">@DeclareRoles</span><span class="token punctuation">(</span><span class="token string">&quot;USER&quot;</span><span class="token punctuation">)</span>\n<span class="token annotation punctuation">@ServletSecurity</span><span class="token punctuation">(</span>\n  <span class="token annotation punctuation">@HttpConstraint</span><span class="token punctuation">(</span>rolesAllowed <span class="token operator">=</span> <span class="token string">&quot;USER&quot;</span><span class="token punctuation">)</span>\n<span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RBACController</span> <span class="token keyword">extends</span> <span class="token class-name">HttpServlet</span> <span class="token punctuation">{</span>\n    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">doGet</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> req<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> resp<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ServletException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>\n        resp<span class="token punctuation">.</span><span class="token function">getWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, USER&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于Tomcat服务器，我们可以将前面描述的访问控制模型实体识别如下：</p><ul><li>PEP：安全_Valve_，检查目标servlet中是否存在此注解，并调用关联的_Realm_来恢复当前请求相关联的身份</li><li>PDP：_Realm_实现，决定对给定请求应用哪些限制</li><li>PIP：特定_Realm_实现使用的后端，存储安全相关信息。对于RBAC模型，关键信息是用户的角色集，通常从LDAP存储库中检索</li><li>策略存储：在这种情况下，注解本身就是存储</li><li>PAP：Tomcat不支持动态策略更改，所以没有真正的需要。然而，通过一些想象力，我们可以将其识别为用于添加注解和/或编辑应用程序的WEB-INF/web.xml文件的任何工具。</li></ul><p>其他安全框架（例如，Spring Security）的工作方式类似。关键点是，即使某个特定框架不完全符合我们的通用模型，其实体仍然存在，即使有些伪装。</p><h3 id="_4-1-角色定义" tabindex="-1"><a class="header-anchor" href="#_4-1-角色定义"><span>4.1. 角色定义</span></a></h3><p>角色到底是什么？<strong>在实践中，角色只是一组用户可以在特定应用程序中执行的相关操作的命名集合</strong>。它们可以根据应用程序的要求粗略或精细地定义。</p><p>无论它们的粒度级别如何，将它们定义为每个映射到一组不相交的功能集是一个好习惯。这样，我们可以通过添加/删除角色来轻松管理用户配置文件，而不必担心副作用。</p><p>至于用户和角色之间的关联，我们可以使用直接或间接方法。在前者中，我们直接将角色分配给用户。在后者中，有一个中间实体，通常是用户组，我们将角色分配给它：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/09/access-control-models-fig2.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p><strong>使用组作为这种关联的中间实体的好处是，我们可以轻松地一次性重新分配许多用户的角色</strong>。这在大型组织的背景下非常重要，因为人们不断地从一个领域移动到另一个领域。</p><p>同样，间接模型还允许我们轻松更改现有角色定义，通常在重构应用程序之后。</p><h2 id="_5-访问控制列表" tabindex="-1"><a class="header-anchor" href="#_5-访问控制列表"><span>5. 访问控制列表</span></a></h2><p><strong>基于ACL的安全控制允许我们定义对个别域对象的访问限制</strong>。这与RBAC形成对比，后者通常适用于整个对象类别。在上面的论坛示例中，我们可以使用仅RBAC方法来定义可以阅读和创建新帖子。</p><p>然而，如果我们决定创建一个新功能，允许用户编辑自己的帖子，仅RBAC是不够的。在这种情况下，决策引擎需要考虑的不仅是谁，还有哪个帖子是编辑操作的目标。</p><p>对于这个简单的例子，们可以在数据库中添加一个单独的_author_列，并使用它来允许或拒绝编辑操作的访问。但是，如果我们想支持协作编辑呢？在这种情况下，我们需要存储一个可以编辑帖子的所有人的列表 - 一个ACL。</p><p>处理ACLs存在一些实际问题：</p><ul><li>我们在哪里存储ACLs？</li><li>当检索大型对象集合时，如何有效地应用ACL限制？</li></ul><p>Spring Security ACL库是ACL库的一个好例子。它使用专用数据库架构和缓存来实现ACLs，并与Spring Security紧密集成。这是一个简短的例子，改编自我们关于这个库的文章，展示了如何在对象级别实现访问控制：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@PreAuthorize</span><span class="token punctuation">(</span><span class="token string">&quot;hasPermission(#postMessage, &#39;WRITE&#39;)&quot;</span><span class="token punctuation">)</span>\n<span class="token class-name">PostMessage</span> <span class="token function">save</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">&quot;noticeMessage&quot;</span><span class="token punctuation">)</span><span class="token class-name">PostMessage</span> postMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>ACLs的另一个好例子是Windows用于保护对象的权限系统。每个_SecurableObject_（例如，文件、目录、进程，等等）都有一个附加的_SecurityDescriptor_，其中包含一个个人用户/组列表以及相关的权限：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/09/access-control-models-fig3.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>Windows ACLs非常强大（或者根据我们问的人不同，也可能很复杂），允许管理员将权限分配给个人用户和/或组。此外，每个条目都为每个可能的操作定义了允许/拒绝权限。</p><h2 id="_6-基于属性的访问控制" tabindex="-1"><a class="header-anchor" href="#_6-基于属性的访问控制"><span>6. 基于属性的访问控制</span></a></h2><p><strong>基于属性的控制模型允许基于请求相关的上下文信息，而不仅仅是基于身份、操作和目标对象做出访问决策</strong>。</p><p>XACML标准可能是这种模型最著名的例子，它使用XML文档来描述访问策略。这就是我们如何使用这个标准来描述数字钱包取款规则：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Policy</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>urn:oasis:names:tc:xacml:3.0:core:schema:wd-17<span class="token punctuation">&quot;</span></span>\n  <span class="token attr-name">PolicyId</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>urn:baeldung:atm:WithdrawalPolicy<span class="token punctuation">&quot;</span></span>\n  <span class="token attr-name">Version</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>1.0<span class="token punctuation">&quot;</span></span>\n  <span class="token attr-name">RuleCombiningAlgId</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>urn:oasis:names:tc:xacml:1.0:rule-combining-algorithm:deny-overrides<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Target</span><span class="token punctuation">/&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Rule</span> <span class="token attr-name">RuleId</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>urn:oasis:names:tc:baeldung:WithDrawalPolicy:Rule1<span class="token punctuation">&quot;</span></span> <span class="token attr-name">Effect</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Deny<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Target</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>AnyOf</span><span class="token punctuation">&gt;</span></span>`\n                `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>AllOf</span><span class="token punctuation">&gt;</span></span>`\n... 取款操作的匹配规则省略\n                `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>AllOf</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>AnyOf</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Target</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Condition</span><span class="token punctuation">&gt;</span></span>`\n... 时间和金额条件定义省略\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Condition</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Rule</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Policy</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完整的规则定义可以在线查看。</p><p>尽管它很冗长，但不难弄清楚其一般结构。<strong>一个策略包含一个或多个规则，当评估时，结果是一个_Effect_：允许或拒绝</strong>。</p><p>每个规则包含目标，这些目标使用请求的属性定义逻辑表达式。可选地，规则还可以包含一个或多个_Condition_元素，以定义其适用性。</p><p>在运行时，基于XACML的访问控制PEP创建一个_RequestContext_实例，并将其提交给PDP进行评估。然后引擎评估所有适用的规则并返回访问决定。</p><p>这个_RequestContext_中存在的信息是区分这个模型与前面模型的主要方面。让我们以一个XML表示的请求上下文为例，该请求上下文被构建用于授权我们的数字钱包应用程序中的取款：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Request</span>\n    <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>urn:oasis:names:tc:xacml:3.0:core:schema:wd-17<span class="token punctuation">&quot;</span></span>\n    <span class="token attr-name">CombinedDecision</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span>\n    <span class="token attr-name">ReturnPolicyIdList</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>false<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Attributes</span> <span class="token attr-name">Category</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>urn:oasis:names:tc:xacml:3.0:attribute-category:action<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n... 操作属性省略\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Attributes</span><span class="token punctuation">&gt;</span></span>```\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Attributes</span> <span class="token attr-name">Category</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>urn:oasis:names:tc:xacml:3.0:attribute-category:environment<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n... 环境属性（例如，当前时间）省略\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Attributes</span><span class="token punctuation">&gt;</span></span>```\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Attributes</span> <span class="token attr-name">Category</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>urn:baeldung:atm:withdrawal<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n... 取款属性省略\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Attributes</span><span class="token punctuation">&gt;</span></span>```\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Request</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们在21:00将此请求提交给XAML规则评估引擎时，预期的结果是拒绝此取款，因为它超过了夜间交易允许的最大金额。</p><p><strong>ABAC模型的关键优势在于其灵活性。</strong> 我们可以定义，更重要的是，通过简单地更改策略来修改复杂规则。根据实现方式，我们甚至可以实时进行更改。</p><h3 id="_6-1-xacml4j" tabindex="-1"><a class="header-anchor" href="#_6-1-xacml4j"><span>6.1. XACML4J</span></a></h3><p>XACML4J是XACML 3.0标准的Java开源实现。它提供了评估引擎和ABAC模型所需的相关实体的实现。其核心API是_PolicyDecisionPoint_接口，毫不意外地，它实现了PDP逻辑。</p><p>一旦我们构建了PDP，使用它需要两个步骤。首先，我们创建并用我们想要评估的请求信息填充一个_RequestContext_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> 属性类别创建省略\n<span class="token class-name">RequestContext</span> request <span class="token operator">=</span> <span class="token class-name">RequestContext</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">attributes</span><span class="token punctuation">(</span>actionCategory<span class="token punctuation">,</span>environmentCategory<span class="token punctuation">,</span>atmTxCategory<span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，每个_xxxCategory_参数包含相关_Category_的一组属性。完整的代码使用可用的构建器来创建一个测试请求，用于在21:00进行1200.00美元的取款。或者，我们也可以从任何JAXB兼容的源直接创建一个_RequestContext_对象。</p><p>接下来，我们将此对象传递给_PolicyDecisionPoint_服务的_decide()_方法进行评估：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ResponseContext</span> response <span class="token operator">=</span> pdp<span class="token punctuation">.</span><span class="token function">decide</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertTrue</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span><span class="token function">getDecision</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token class-name">Decision</span><span class="token punctuation">.</span><span class="token constant">DENY</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>返回的_ResponseContext_包含一个_Decision_对象，其中包含策略评估结果。此外，它还可能返回诊断信息以及对PEP的附加义务和/或建议。义务和建议本身就是一个话题，所以我们在这里不会涵盖；查看这个入门指南以获取更多详细信息。</p><h3 id="_6-2-无xacml的abac" tabindex="-1"><a class="header-anchor" href="#_6-2-无xacml的abac"><span>6.2. 无XACML的ABAC</span></a></h3><p><strong>XACML的复杂性通常使得它对大多数应用程序来说过于复杂。</strong> 然而，我们仍然可以在应用程序中使用其底层模型。毕竟，我们总是可以实现一个针对特定用例量身定制的简化版本，可能只外部化一些参数，对吧？</p><p>好的，任何经验丰富的开发人员都知道这将如何结束……</p><p><strong>任何ABAC实现的一个棘手方面是如何从请求的有效载荷中提取属性</strong>。插入自定义逻辑的标准方法，例如servlet过滤器或JAX-RS拦截器，在处理请求之前只有对原始有效载荷数据的访问权限。</p><p>由于现代应用程序倾向于使用JSON或类似的表示，PEP必须先对其进行解码，然后才能提取任何有效载荷属性。<strong>这意味着对CPU和内存使用有潜在的影响，特别是对于大型有效载荷。</strong></p><p>在这种情况下，使用AOP实现PEP是一个更好的方法。在这种情况下，切面处理代码可以访问解码后的有效载荷版本。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们描述了不同的访问控制模型以及应用程序如何使用它们来执行访问规则。</p><p>像往常一样，示例的完整源代码可以在GitHub上找到。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/8356e97cc1258253b4345b95412db68d?s=50&amp;r=g" alt="img" loading="lazy"></p><p>OK</p>',77),o=[p];function l(c,i){return s(),a("div",null,o)}const d=n(e,[["render",l],["__file","2024-07-26-Access Control Models.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-26/2024-07-26-Access%20Control%20Models.html","title":"Java访问控制模型","lang":"zh-CN","frontmatter":{"date":"2021-09-01T00:00:00.000Z","category":["Java","Security"],"tag":["Access Control","RBAC","ACL","ABAC"],"head":[["meta",{"name":"keywords","content":"Java, Security, Access Control, RBAC, ACL, ABAC"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-26/2024-07-26-Access%20Control%20Models.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java访问控制模型"}],["meta",{"property":"og:description","content":"Java访问控制模型 在本文中，我们将探讨不同的访问控制模型以及如何在实践中实现它们。 2. 什么是访问控制模型？ 应用程序，特别是基于Web的应用程序，通常需要满足一个共同的要求，即只有在满足一组特定条件（也称为策略）时，才能执行某些操作。这是一个非常通用的要求，让我们给出一些例子： 互联网论坛：只有会员才能发布新消息或回复现有消息 电子商务网站：普..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2021/09/access-control-models-fig0.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-26T13:32:49.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Access Control"}],["meta",{"property":"article:tag","content":"RBAC"}],["meta",{"property":"article:tag","content":"ACL"}],["meta",{"property":"article:tag","content":"ABAC"}],["meta",{"property":"article:published_time","content":"2021-09-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-26T13:32:49.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java访问控制模型\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2021/09/access-control-models-fig0.png\\",\\"https://www.baeldung.com/wp-content/uploads/2021/09/access-control-models-fig1.png\\",\\"https://www.baeldung.com/wp-content/uploads/2021/09/access-control-models-fig2.png\\",\\"https://www.baeldung.com/wp-content/uploads/2021/09/access-control-models-fig3.png\\",\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/8356e97cc1258253b4345b95412db68d?s=50&r=g\\"],\\"datePublished\\":\\"2021-09-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-26T13:32:49.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java访问控制模型 在本文中，我们将探讨不同的访问控制模型以及如何在实践中实现它们。 2. 什么是访问控制模型？ 应用程序，特别是基于Web的应用程序，通常需要满足一个共同的要求，即只有在满足一组特定条件（也称为策略）时，才能执行某些操作。这是一个非常通用的要求，让我们给出一些例子： 互联网论坛：只有会员才能发布新消息或回复现有消息 电子商务网站：普..."},"headers":[{"level":2,"title":"2. 什么是访问控制模型？","slug":"_2-什么是访问控制模型","link":"#_2-什么是访问控制模型","children":[]},{"level":2,"title":"3. 访问控制模型类型","slug":"_3-访问控制模型类型","link":"#_3-访问控制模型类型","children":[]},{"level":2,"title":"4. 基于角色的访问控制","slug":"_4-基于角色的访问控制","link":"#_4-基于角色的访问控制","children":[{"level":3,"title":"4.1. 角色定义","slug":"_4-1-角色定义","link":"#_4-1-角色定义","children":[]}]},{"level":2,"title":"5. 访问控制列表","slug":"_5-访问控制列表","link":"#_5-访问控制列表","children":[]},{"level":2,"title":"6. 基于属性的访问控制","slug":"_6-基于属性的访问控制","link":"#_6-基于属性的访问控制","children":[{"level":3,"title":"6.1. XACML4J","slug":"_6-1-xacml4j","link":"#_6-1-xacml4j","children":[]},{"level":3,"title":"6.2. 无XACML的ABAC","slug":"_6-2-无xacml的abac","link":"#_6-2-无xacml的abac","children":[]}]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1722000769000,"updatedTime":1722000769000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":11.17,"words":3351},"filePathRelative":"posts/baeldung/2024-07-26/2024-07-26-Access Control Models.md","localizedDate":"2021年9月1日","excerpt":"\\n<p>在本文中，我们将探讨不同的访问控制模型以及如何在实践中实现它们。</p>\\n<h2>2. 什么是访问控制模型？</h2>\\n<p>应用程序，特别是基于Web的应用程序，通常需要满足一个共同的要求，即只有在满足一组特定条件（也称为策略）时，才能执行某些操作。这是一个非常通用的要求，让我们给出一些例子：</p>\\n<ul>\\n<li>互联网论坛：只有会员才能发布新消息或回复现有消息</li>\\n<li>电子商务网站：普通用户只能查看自己的订单</li>\\n<li>银行后台办公室：账户经理可以管理自己客户的投资组合。此外，当他们暂时不可用（例如，休假）时，账户经理还可以管理另一位账户经理客户的投资组合，并且前者充当其同行</li>\\n<li>数字钱包：在用户所在时区的20:00至08:00期间，支付限额为500美元</li>\\n</ul>","autoDesc":true}');export{d as comp,k as data};

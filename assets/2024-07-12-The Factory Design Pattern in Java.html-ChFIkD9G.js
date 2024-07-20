import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as t,a as n}from"./app-CrnAxpzk.js";const a={},l=n(`<h1 id="java-中的工厂设计模式" tabindex="-1"><a class="header-anchor" href="#java-中的工厂设计模式"><span>Java 中的工厂设计模式</span></a></h1><p>在本教程中，我们将解释 Java 中的工厂设计模式。我们将描述两种模式，它们都是创建型设计模式：工厂方法和抽象工厂。然后我们将使用一个示例来说明这些模式。</p><h2 id="_2-工厂方法模式" tabindex="-1"><a class="header-anchor" href="#_2-工厂方法模式"><span>2. 工厂方法模式</span></a></h2><p>首先，我们需要定义一个示例。我们正在为一家汽车制造商开发一个应用程序。最初，我们只有一个客户端。这个客户端用纯燃油发动机制造汽车。因此，为了遵循单一职责原则（SRP）和开闭原则（OCP），我们将使用工厂方法设计模式。</p><p>在我们深入代码之前，我们将为这个模式定义一个默认的 UML 图：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/11/factory_design_pattern_base.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>使用上面的 UML 图作为参考，我们将定义与这个模式相关的一些主要概念。<strong>工厂方法模式通过将产品的构造代码与使用该产品的代码分离，减少了代码的耦合。</strong> 这种设计使得从应用程序的其余部分独立地提取产品构造变得容易。此外，它允许引入新产品而不会破坏现有代码。</p><p>现在让我们进入代码。首先，在我们的示例应用程序中，我们将定义 <em>MotorVehicle</em> 接口。这个接口只有一个方法 <em>build()</em>。这个方法用于构建特定的机动车辆。接口的代码片段：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public interface MotorVehicle {
    void build();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将实现实现 <em>MotorVehicle</em> 接口的具体类。我们将创建两种类型：<em>Motorcycle</em> 和 <em>Car</em>。第一个的代码是：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class Motorcycle implements MotorVehicle {
    @Override
    public void build() {
        System.out.println(&quot;构建摩托车&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <em>Car</em> 类的情况下，代码是：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class Car implements MotorVehicle {
    @Override
    public void build() {
        System.out.println(&quot;构建汽车&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们将创建 <em>MotorVehicleFactory</em> 类。这个类负责创建每一个新的车辆实例。它是一个抽象类，因为它为它的特定工厂制造特定的车辆。这个类的代码是：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public abstract class MotorVehicleFactory {
    public MotorVehicle create() {
        MotorVehicle vehicle = createMotorVehicle();
        vehicle.build();
        return vehicle;
    }
    protected abstract MotorVehicle createMotorVehicle();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，<em>create()</em> 方法调用抽象方法 <em>createMotorVehicle()</em> 来创建特定类型的机动车辆。这就是为什么每个特定的机动车辆工厂必须实现其正确的 <em>MotorVehicle</em> 类型。之前，我们实现了两种 <em>MotorVehicle</em> 类型：<em>Motorcycle</em> 和 <em>Car</em>。现在我们将从我们的基类 <em>MotorVehicleFactory</em> 扩展来实现两者。</p><p>首先是 <em>MotorcycleFactory</em> 类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class MotorcycleFactory extends MotorVehicleFactory {
    @Override
    protected MotorVehicle createMotorVehicle() {
        return new Motorcycle();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后是 <em>CarFactory</em> 类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class CarFactory extends MotorVehicleFactory {
    @Override
    protected MotorVehicle createMotorVehicle() {
        return new Car();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>就是这样；我们的应用程序是使用工厂方法模式设计的。我们现在可以添加尽可能多的新机动车辆。最后，我们需要看看我们的最终设计使用 UML 表示法的样子：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/11/factory_design_pattern_result.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_3-抽象工厂模式" tabindex="-1"><a class="header-anchor" href="#_3-抽象工厂模式"><span>3. 抽象工厂模式</span></a></h2><p>在我们的第一个应用程序迭代之后，两家新的汽车品牌公司对我们的系统感兴趣：<em>NexGen</em> 和 <em>FutureVehicle</em>。这些新公司不仅制造纯燃油汽车，还制造电动汽车。每家公司都有其车辆设计。</p><p>我们当前的系统还没有准备好处理这些新场景。我们必须支持电动汽车，并考虑到每家公司都有其设计。为了解决这些问题，我们可以使用抽象工厂模式。<strong>当我们开始使用工厂方法模式，并且我们需要将我们的系统发展到更复杂的系统时，通常使用这个模式。</strong> <strong>它将产品创建代码集中在一个地方。</strong> UML 表示是：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/11/abstract_factory_design_pattern_base.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们已经拥有 <em>MotorVehicle</em> 接口。此外，我们必须添加一个接口来表示电动汽车。新接口的代码片段是：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public interface ElectricVehicle {
    void build();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将创建我们的抽象工厂。这个新类是抽象的，因为对象创建的责任将由我们的具体工厂来承担。这种行为遵循 OCP 和 SRP。让我们进入类定义：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public abstract class Corporation {
    public abstract MotorVehicle createMotorVehicle();
    public abstract ElectricVehicle createElectricVehicle();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在我们为每家公司创建具体工厂之前，我们必须为我们的新公司实现一些车辆。让我们为 <em>FutureVehicle</em> 公司制作一些新类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class FutureVehicleMotorcycle implements MotorVehicle {
    @Override
    public void build() {
        System.out.println(&quot;未来车辆摩托车&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后是电动汽车实例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class FutureVehicleElectricCar implements ElectricVehicle {
    @Override
    public void build() {
        System.out.println(&quot;未来车辆电动汽车&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将为 <em>NexGen</em> 公司做同样的事情：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class NextGenMotorcycle implements MotorVehicle {
    @Override
    public void build() {
        System.out.println(&quot;下一代摩托车&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外，另一个电动汽车的具体实现：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class NextGenElectricCar implements ElectricVehicle {
    @Override
    public void build() {
        System.out.println(&quot;下一代电动汽车&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们准备构建我们的具体工厂。首先，我们将从 <em>FutureVehicle</em> 工厂开始：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class FutureVehicleCorporation extends Corporation {
    @Override
    public MotorVehicle createMotorVehicle() {
        return new FutureVehicleMotorcycle();
    }
    @Override
    public ElectricVehicle createElectricVehicle() {
        return new FutureVehicleElectricCar();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在另一个：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class NextGenCorporation extends Corporation {
    @Override
    public MotorVehicle createMotorVehicle() {
        return new NextGenMotorcycle();
    }
    @Override
    public ElectricVehicle createElectricVehicle() {
        return new NextGenElectricCar();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完成了。我们使用抽象工厂模式完成了实现。这是我们自定义实现的 UML 图：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/11/abstract_factory_design_pattern_result.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_4-工厂方法与抽象工厂" tabindex="-1"><a class="header-anchor" href="#_4-工厂方法与抽象工厂"><span>4. 工厂方法与抽象工厂</span></a></h2><p>总结来说，<strong>工厂方法使用继承作为设计工具</strong>。与此同时，<strong>抽象工厂使用委托</strong>。前者依赖于派生类来实现，而基类提供预期的行为。此外，<strong>它是方法而不是类</strong>。另一方面，<strong>抽象工厂应用于类</strong>。<strong>两者都遵循 OCP 和 SRP</strong>，产生松耦合的代码，为我们的代码库提供更多的未来变更灵活性。创建代码在一个地方。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们展示了工厂设计模式。我们描述了工厂方法和抽象工厂。我们提供了一个示例系统来说明这些模式的使用。最后，我们简要比较了两种模式。</p><p>像往常一样，代码片段在 GitHub 上。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&amp;r=g" alt="img" loading="lazy"></p>`,50),r=[l];function s(d,c){return t(),i("div",null,r)}const v=e(a,[["render",s],["__file","2024-07-12-The Factory Design Pattern in Java.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-12/2024-07-12-The%20Factory%20Design%20Pattern%20in%20Java.html","title":"Java 中的工厂设计模式","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Java","设计模式"],"tag":["工厂模式","设计模式"],"head":[["meta",{"name":"keywords","content":"Java, 设计模式, 工厂模式, 抽象工厂模式, 工厂方法模式"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-12/2024-07-12-The%20Factory%20Design%20Pattern%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 中的工厂设计模式"}],["meta",{"property":"og:description","content":"Java 中的工厂设计模式 在本教程中，我们将解释 Java 中的工厂设计模式。我们将描述两种模式，它们都是创建型设计模式：工厂方法和抽象工厂。然后我们将使用一个示例来说明这些模式。 2. 工厂方法模式 首先，我们需要定义一个示例。我们正在为一家汽车制造商开发一个应用程序。最初，我们只有一个客户端。这个客户端用纯燃油发动机制造汽车。因此，为了遵循单一职..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/11/factory_design_pattern_base.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-12T14:04:25.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"工厂模式"}],["meta",{"property":"article:tag","content":"设计模式"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-12T14:04:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 中的工厂设计模式\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/11/factory_design_pattern_base.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/11/factory_design_pattern_result.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/11/abstract_factory_design_pattern_base.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/11/abstract_factory_design_pattern_result.png\\",\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-12T14:04:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 中的工厂设计模式 在本教程中，我们将解释 Java 中的工厂设计模式。我们将描述两种模式，它们都是创建型设计模式：工厂方法和抽象工厂。然后我们将使用一个示例来说明这些模式。 2. 工厂方法模式 首先，我们需要定义一个示例。我们正在为一家汽车制造商开发一个应用程序。最初，我们只有一个客户端。这个客户端用纯燃油发动机制造汽车。因此，为了遵循单一职..."},"headers":[{"level":2,"title":"2. 工厂方法模式","slug":"_2-工厂方法模式","link":"#_2-工厂方法模式","children":[]},{"level":2,"title":"3. 抽象工厂模式","slug":"_3-抽象工厂模式","link":"#_3-抽象工厂模式","children":[]},{"level":2,"title":"4. 工厂方法与抽象工厂","slug":"_4-工厂方法与抽象工厂","link":"#_4-工厂方法与抽象工厂","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720793065000,"updatedTime":1720793065000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.21,"words":1564},"filePathRelative":"posts/baeldung/2024-07-12/2024-07-12-The Factory Design Pattern in Java.md","localizedDate":"2022年11月1日","excerpt":"\\n<p>在本教程中，我们将解释 Java 中的工厂设计模式。我们将描述两种模式，它们都是创建型设计模式：工厂方法和抽象工厂。然后我们将使用一个示例来说明这些模式。</p>\\n<h2>2. 工厂方法模式</h2>\\n<p>首先，我们需要定义一个示例。我们正在为一家汽车制造商开发一个应用程序。最初，我们只有一个客户端。这个客户端用纯燃油发动机制造汽车。因此，为了遵循单一职责原则（SRP）和开闭原则（OCP），我们将使用工厂方法设计模式。</p>\\n<p>在我们深入代码之前，我们将为这个模式定义一个默认的 UML 图：</p>\\n<figure><img src=\\"https://www.baeldung.com/wp-content/uploads/2022/11/factory_design_pattern_base.png\\" alt=\\"img\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>img</figcaption></figure>","autoDesc":true}');export{v as comp,m as data};

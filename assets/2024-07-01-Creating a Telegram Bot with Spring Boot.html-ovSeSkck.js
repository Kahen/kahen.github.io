import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a}from"./app-DoH5DUNC.js";const i={},s=a(`<h1 id="使用spring-boot创建telegram机器人" tabindex="-1"><a class="header-anchor" href="#使用spring-boot创建telegram机器人"><span>使用Spring Boot创建Telegram机器人</span></a></h1><p>在这个教程中，我们将使用Spring Boot创建一个Telegram机器人。</p><p><strong>Telegram机器人是在Telegram消息平台内运行的自动化程序</strong>。它使用Telegram Bot API与用户互动并执行各种任务。我们将使用Java库而不是直接与API交互。机器人帮助我们响应用户命令，提供信息，并执行自动化操作。</p><p>我们将从设置一个全新的机器人开始，然后描述如何使用Java库来实现简单的操作。</p><p>首先，我们需要在Telegram平台上创建一个新的机器人。我们可以直接使用Telegram消息应用程序，搜索栏中搜索BotFather。一旦打开，我们将输入命令<code>/newbot</code>来创建机器人并按照BotFather的指示操作。它会要求我们为机器人分配一个用户名，根据Telegram的政策，用户名需要以_bot结尾：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/08/Screenshot-2023-05-28-at-20.18.58-1-e1692534899760.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>上面，BotFather生成了一个令牌，我们必须安全地保存它，稍后用于配置我们的应用程序。</p><h2 id="_3-设置应用程序" tabindex="-1"><a class="header-anchor" href="#_3-设置应用程序"><span>3. 设置应用程序</span></a></h2><p>其次，我们必须有一个Spring Boot项目，我们希望在其中集成Telegram机器人。我们将修改_pom.xml_文件，并包括_telegrambots-spring-boot-starter_和_telegrambots-abilities_库：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`\`&lt;dependency&gt;\`\`
    \`\`&lt;groupId&gt;\`\`org.telegram\`\`&lt;/groupId&gt;\`\`
    \`\`&lt;artifactId&gt;\`\`telegrambots-spring-boot-starter\`\`&lt;/artifactId&gt;\`\`
    \`\`&lt;version&gt;\`\`6.7.0\`\`&lt;/version&gt;\`\`
\`\`&lt;/dependency&gt;\`\`
\`\`&lt;dependency&gt;\`\`
    \`\`&lt;groupId&gt;\`\`org.telegram\`\`&lt;/groupId&gt;\`\`
    \`\`&lt;artifactId&gt;\`\`telegrambots-abilities\`\`&lt;/artifactId&gt;\`\`
    \`\`&lt;version&gt;\`\`6.7.0\`\`&lt;/version&gt;\`\`
\`\`&lt;/dependency&gt;\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在幕后，<strong>AbilityBot使用webhooks与Telegrams API通信</strong>，但我们不需要担心这个。实际上，该库实现了Telegram Bot API提供的所有接口。</p><p>现在，我们可以实施我们的机器人。</p><h2 id="_4-解释pizzabot" tabindex="-1"><a class="header-anchor" href="#_4-解释pizzabot"><span>4. 解释PizzaBot</span></a></h2><p>我们将实现一个简单的机器人，模拟一个比萨店，以演示使用Spring Boot与库的结合。此外，我们将拥有一组与机器人的预定义交互：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/08/pizzabot-1024x646.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>简而言之，我们将首先询问用户的姓名。然后，我们将提示他选择比萨或饮料。在饮料的情况下，我们将显示一条消息，说我们不卖饮料。否则，我们将询问他们比萨的配料。在选择可用的配料后，我们将确认用户是否想再次订购。在这种情况下，我们将重复流程。或者，我们将感谢他们并以一条结束消息关闭聊天。</p><h2 id="_5-配置并注册pizzabot" tabindex="-1"><a class="header-anchor" href="#_5-配置并注册pizzabot"><span>5. 配置并注册PizzaBot</span></a></h2><p>让我们从为我们的新PizzaShop配置一个_AbilityBot_开始：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Component
public class PizzaBot extends AbilityBot {
    private final ResponseHandler responseHandler;
    @Autowired
    public PizzaBot(Environment env) {
        super(env.getProperty(&quot;botToken&quot;), &quot;baeldungbot&quot;);
        responseHandler = new ResponseHandler(silent, db);
    }
    @Override
    public long creatorId() {
        return 1L;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们作为环境变量在构造函数中注入_read the <em>botToken</em> property。<strong>我们必须安全地保存令牌，不要将其推入代码库</strong>。在这个例子中，我们在运行应用程序之前将其导出到我们的环境。或者，我们可以在属性文件中定义它。此外，我们必须提供一个描述我们的机器人的独特_creatorId_。</p><p>此外，我们正在扩展_AbilityBot_类，这减少了样板代码，并提供了常用的工具，如通过_ReplyFlow_的状态机。然而，我们将只使用嵌入式数据库，并在_ResponseHandler_中显式管理状态：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class ResponseHandler {
    private final SilentSender sender;
    private final Map\`&lt;Long, UserState&gt;\` chatStates;

    public ResponseHandler(SilentSender sender, DBContext db) {
        this.sender = sender;
        chatStates = db.getMap(Constants.CHAT_STATES);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-1-spring-boot-3兼容性问题" tabindex="-1"><a class="header-anchor" href="#_5-1-spring-boot-3兼容性问题"><span>5.1. Spring Boot 3兼容性问题</span></a></h3><p>当使用Spring Boot 3版本时，库不会在声明为_@Component_时自动配置机器人。因此，我们必须在主应用程序类中手动初始化它：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>TelegramBotsApi botsApi = new TelegramBotsApi(DefaultBotSession.class);
botsApi.registerBot(ctx.getBean(&quot;pizzaBot&quot;, TelegramLongPollingBot.class));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们创建一个新的_TelegramBotsApi_实例，然后提供Spring应用程序上下文中的_pizzaBot_组件实例。</p><h2 id="_6-实现pizzabot" tabindex="-1"><a class="header-anchor" href="#_6-实现pizzabot"><span>6. 实现PizzaBot</span></a></h2><p>Telegram API非常庞大，实现新命令可能会变得重复。因此，我们使用能力来简化开发新功能的过程。在设计交互流程时，我们应该考虑最终用户，必要的条件和执行过程。</p><p>在我们的PizzaBot中，我们将只使用一个能力，将与机器人的对话_/start_开始：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public Ability startBot() {
    return Ability
      .builder()
      .name(&quot;start&quot;)
      .info(Constants.START_DESCRIPTION)
      .locality(USER)
      .privacy(PUBLIC)
      .action(ctx -&gt; responseHandler.replyToStart(ctx.chatId()))
      .build();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用构建器模式来构建_Ability_。首先，我们定义能力的名字，这与能力的命令相同。其次，我们提供这个新能力描述字符串。这将有助于我们运行_/commands_命令以获取我们机器人的能力。第三，我们定义机器人的本地性和隐私。最后，我们定义接收命令时必须采取的行动。对于这个例子，我们将转发聊天的ID到_ResponseHandler_类。按照上面的图表设计，我们将询问用户的姓名并将其保存在一个映射中，以及其初始状态：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public void replyToStart(long chatId) {
    SendMessage message = new SendMessage();
    message.setChatId(chatId);
    message.setText(START_TEXT);
    sender.execute(message);
    chatStates.put(chatId, AWAITING_NAME);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个方法中，我们创建了一个_SendMessage_命令，并使用_sender_执行它。然后，我们将聊天状态设置为_AWAITING_NAME_，表示我们正在等待用户的姓名：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private void replyToName(long chatId, Message message) {
    promptWithKeyboardForState(chatId, &quot;Hello &quot; + message.getText() + &quot;. What would you like to have?&quot;,
      KeyboardFactory.getPizzaOrDrinkKeyboard(),
      UserState.FOOD_DRINK_SELECTION);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用户输入他们的姓名后，我们向他们发送一个_ReplyKeyboardMarkup_，提示他们有两个选项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public static ReplyKeyboard getPizzaToppingsKeyboard() {
    KeyboardRow row = new KeyboardRow();
    row.add(&quot;Margherita&quot;);
    row.add(&quot;Pepperoni&quot;);
    return new ReplyKeyboardMarkup(List.of(row));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将隐藏键盘并向用户显示一个带有两个按钮的界面：</p><p><img src="https://www.baeldung.com/wp-content/uploads/2023/08/Screenshot-2023-08-14-at-23.49.08.png" alt="img" loading="lazy">现在，用户可以选择比萨或饮料，我们的比萨店不提供。Telegram在选择两个选项中的任何一个时发送带有响应的文本消息。</p><p>对于上面图表中的所有绿色菱形元素，我们遵循类似的过程。因此，我们这里不会重复。相反，让我们专注于处理来自用户的按钮响应。</p><h2 id="_7-处理来自用户的回复" tabindex="-1"><a class="header-anchor" href="#_7-处理来自用户的回复"><span>7. 处理来自用户的回复</span></a></h2><p>对于所有传入的消息和当前聊天的状态，我们在_PizzaBot_类中以不同的方式处理响应：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public Reply replyToButtons() {
    BiConsumer\`&lt;BaseAbilityBot, Update&gt;\` action = (abilityBot, upd) -&gt; responseHandler.replyToButtons(getChatId(upd), upd.getMessage());
    return Reply.of(action, Flag.TEXT, upd -&gt; responseHandler.userIsActive(getChatId(upd)));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>. _replyToButtons()_获取所有的_TEXT_回复，并将它们转发到_ResponseHandler_以及_chatId_和传入的_Message_对象。然后在_ResponseHandler_中的. _replyToButtons()_方法决定如何处理消息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public void replyToButtons(long chatId, Message message) {
    if (message.getText().equalsIgnoreCase(&quot;/stop&quot;)) {
        stopChat(chatId);
    }

    switch (chatStates.get(chatId)) {
        case AWAITING_NAME -&gt; replyToName(chatId, message);
        case FOOD_DRINK_SELECTION -&gt; replyToFoodDrinkSelection(chatId, message);
        case PIZZA_TOPPINGS -&gt; replyToPizzaToppings(chatId, message);
        case AWAITING_CONFIRMATION -&gt; replyToOrder(chatId, message);
        default -&gt; unexpectedMessage(chatId);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在_switch_中，我们检查聊天的当前状态并相应地回复用户。例如，当用户的当前状态为_FOOD_DRINK_SELECTION_时，我们处理响应并移动到下一个状态，当用户点击选项_pizza_时：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private void replyToFoodDrinkSelection(long chatId, Message message) {
    SendMessage sendMessage = new SendMessage();
    sendMessage.setChatId(chatId);
    if (&quot;drink&quot;.equalsIgnoreCase(message.getText())) {
        sendMessage.setText(&quot;We don&#39;t sell drinks.\\nBring your own drink!! :)&quot;);
       sendMessage.setReplyMarkup(KeyboardFactory.getPizzaOrDrinkKeyboard());
sender.execute(sendMessage);
    } else if (&quot;pizza&quot;.equalsIgnoreCase(message.getText())) {
        sendMessage.setText(&quot;We love Pizza in here.\\nSelect the toppings!&quot;);
        sendMessage.setReplyMarkup(KeyboardFactory.getPizzaToppingsKeyboard());
        sender.execute(sendMessage);
        chatStates.put(chatId, UserState.PIZZA_TOPPINGS);
    } else {
        sendMessage.setText(&quot;We don&#39;t sell &quot; + message.getText() + &quot;. Please select from the options below.&quot;);
        sendMessage.setReplyMarkup(KeyboardFactory.getPizzaOrDrinkKeyboard());
        sender.execute(sendMessage);
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，在. <em>replyToButtons()<em>中，我们立即检查用户是否发送了</em>/stop_命令。如果是这样，我们停止聊天并从_chatStates_映射中删除_chatId</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private void stopChat(long chatId) {
    SendMessage sendMessage = new SendMessage();
    sendMessage.setChatId(chatId);
    sendMessage.setText(&quot;Thank you for your order. See you soon!\\nPress /start to order again&quot;);
    chatStates.remove(chatId);
    sendMessage.setReplyMarkup(new ReplyKeyboardRemove(true));
    sender.execute(sendMessage);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将从数据库中删除用户的状态。要再次交互，用户必须写入_/start_命令。</p><h2 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span>8. 结论</span></a></h2><p>在本教程中，我们讨论了使用Spring Boot实现Telegram机器人。</p><p>首先，我们使用BotFather在Telegram平台上创建了一个新的机器人。其次，我们设置了我们的Spring Boot项目，并解释了我们的PizzaBot的功能以及它如何与用户交互。然后，我们使用能力来简化开发新命令的过程。最后，我们处理了来自用户的回复，并根据聊天状态提供了适当的响应。</p><p>如常，本文的源代码可在GitHub上找到。</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/08/Screenshot-2023-08-14-at-23.49.08.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>OK</p>`,55),l=[s];function d(r,o){return n(),t("div",null,l)}const g=e(i,[["render",d],["__file","2024-07-01-Creating a Telegram Bot with Spring Boot.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-01/2024-07-01-Creating%20a%20Telegram%20Bot%20with%20Spring%20Boot.html","title":"使用Spring Boot创建Telegram机器人","lang":"zh-CN","frontmatter":{"date":"2023-08-14T00:00:00.000Z","category":["Spring Boot","Telegram Bot"],"tag":["Java","Spring Boot","Telegram"],"head":[["meta",{"name":"keywords","content":"Spring Boot, Telegram Bot, Java, tutorial"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-01/2024-07-01-Creating%20a%20Telegram%20Bot%20with%20Spring%20Boot.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Spring Boot创建Telegram机器人"}],["meta",{"property":"og:description","content":"使用Spring Boot创建Telegram机器人 在这个教程中，我们将使用Spring Boot创建一个Telegram机器人。 Telegram机器人是在Telegram消息平台内运行的自动化程序。它使用Telegram Bot API与用户互动并执行各种任务。我们将使用Java库而不是直接与API交互。机器人帮助我们响应用户命令，提供信息，并执..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/08/Screenshot-2023-05-28-at-20.18.58-1-e1692534899760.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-01T13:55:31.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:tag","content":"Telegram"}],["meta",{"property":"article:published_time","content":"2023-08-14T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-01T13:55:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Spring Boot创建Telegram机器人\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/08/Screenshot-2023-05-28-at-20.18.58-1-e1692534899760.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/08/pizzabot-1024x646.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/08/Screenshot-2023-08-14-at-23.49.08.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/08/Screenshot-2023-08-14-at-23.49.08.png\\"],\\"datePublished\\":\\"2023-08-14T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-01T13:55:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Spring Boot创建Telegram机器人 在这个教程中，我们将使用Spring Boot创建一个Telegram机器人。 Telegram机器人是在Telegram消息平台内运行的自动化程序。它使用Telegram Bot API与用户互动并执行各种任务。我们将使用Java库而不是直接与API交互。机器人帮助我们响应用户命令，提供信息，并执..."},"headers":[{"level":2,"title":"3. 设置应用程序","slug":"_3-设置应用程序","link":"#_3-设置应用程序","children":[]},{"level":2,"title":"4. 解释PizzaBot","slug":"_4-解释pizzabot","link":"#_4-解释pizzabot","children":[]},{"level":2,"title":"5. 配置并注册PizzaBot","slug":"_5-配置并注册pizzabot","link":"#_5-配置并注册pizzabot","children":[{"level":3,"title":"5.1. Spring Boot 3兼容性问题","slug":"_5-1-spring-boot-3兼容性问题","link":"#_5-1-spring-boot-3兼容性问题","children":[]}]},{"level":2,"title":"6. 实现PizzaBot","slug":"_6-实现pizzabot","link":"#_6-实现pizzabot","children":[]},{"level":2,"title":"7. 处理来自用户的回复","slug":"_7-处理来自用户的回复","link":"#_7-处理来自用户的回复","children":[]},{"level":2,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]}],"git":{"createdTime":1719842131000,"updatedTime":1719842131000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.81,"words":2044},"filePathRelative":"posts/baeldung/2024-07-01/2024-07-01-Creating a Telegram Bot with Spring Boot.md","localizedDate":"2023年8月14日","excerpt":"\\n<p>在这个教程中，我们将使用Spring Boot创建一个Telegram机器人。</p>\\n<p><strong>Telegram机器人是在Telegram消息平台内运行的自动化程序</strong>。它使用Telegram Bot API与用户互动并执行各种任务。我们将使用Java库而不是直接与API交互。机器人帮助我们响应用户命令，提供信息，并执行自动化操作。</p>\\n<p>我们将从设置一个全新的机器人开始，然后描述如何使用Java库来实现简单的操作。</p>\\n<p>首先，我们需要在Telegram平台上创建一个新的机器人。我们可以直接使用Telegram消息应用程序，搜索栏中搜索BotFather。一旦打开，我们将输入命令<code>/newbot</code>来创建机器人并按照BotFather的指示操作。它会要求我们为机器人分配一个用户名，根据Telegram的政策，用户名需要以_bot结尾：</p>","autoDesc":true}');export{g as comp,u as data};

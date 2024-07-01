---
date: 2023-08-14
category:
  - Spring Boot
  - Telegram Bot
tag:
  - Java
  - Spring Boot
  - Telegram
head:
  - - meta
    - name: keywords
      content: Spring Boot, Telegram Bot, Java, tutorial
---
# 使用Spring Boot创建Telegram机器人

在这个教程中，我们将使用Spring Boot创建一个Telegram机器人。

**Telegram机器人是在Telegram消息平台内运行的自动化程序**。它使用Telegram Bot API与用户互动并执行各种任务。我们将使用Java库而不是直接与API交互。机器人帮助我们响应用户命令，提供信息，并执行自动化操作。

我们将从设置一个全新的机器人开始，然后描述如何使用Java库来实现简单的操作。

首先，我们需要在Telegram平台上创建一个新的机器人。我们可以直接使用Telegram消息应用程序，搜索栏中搜索BotFather。一旦打开，我们将输入命令`/newbot`来创建机器人并按照BotFather的指示操作。它会要求我们为机器人分配一个用户名，根据Telegram的政策，用户名需要以_bot结尾：

![img](https://www.baeldung.com/wp-content/uploads/2023/08/Screenshot-2023-05-28-at-20.18.58-1-e1692534899760.png)

上面，BotFather生成了一个令牌，我们必须安全地保存它，稍后用于配置我们的应用程序。

## 3. 设置应用程序

其次，我们必须有一个Spring Boot项目，我们希望在其中集成Telegram机器人。我们将修改_pom.xml_文件，并包括_telegrambots-spring-boot-starter_和_telegrambots-abilities_库：

```
``<dependency>``
    ``<groupId>``org.telegram``</groupId>``
    ``<artifactId>``telegrambots-spring-boot-starter``</artifactId>``
    ``<version>``6.7.0``</version>``
``</dependency>``
``<dependency>``
    ``<groupId>``org.telegram``</groupId>``
    ``<artifactId>``telegrambots-abilities``</artifactId>``
    ``<version>``6.7.0``</version>``
``</dependency>``
```

在幕后，**AbilityBot使用webhooks与Telegrams API通信**，但我们不需要担心这个。实际上，该库实现了Telegram Bot API提供的所有接口。

现在，我们可以实施我们的机器人。

## 4. 解释PizzaBot

我们将实现一个简单的机器人，模拟一个比萨店，以演示使用Spring Boot与库的结合。此外，我们将拥有一组与机器人的预定义交互：

![img](https://www.baeldung.com/wp-content/uploads/2023/08/pizzabot-1024x646.png)

简而言之，我们将首先询问用户的姓名。然后，我们将提示他选择比萨或饮料。在饮料的情况下，我们将显示一条消息，说我们不卖饮料。否则，我们将询问他们比萨的配料。在选择可用的配料后，我们将确认用户是否想再次订购。在这种情况下，我们将重复流程。或者，我们将感谢他们并以一条结束消息关闭聊天。

## 5. 配置并注册PizzaBot

让我们从为我们的新PizzaShop配置一个_AbilityBot_开始：

```
@Component
public class PizzaBot extends AbilityBot {
    private final ResponseHandler responseHandler;
    @Autowired
    public PizzaBot(Environment env) {
        super(env.getProperty("botToken"), "baeldungbot");
        responseHandler = new ResponseHandler(silent, db);
    }
    @Override
    public long creatorId() {
        return 1L;
    }
}
```

我们作为环境变量在构造函数中注入_read the _botToken_ property。**我们必须安全地保存令牌，不要将其推入代码库**。在这个例子中，我们在运行应用程序之前将其导出到我们的环境。或者，我们可以在属性文件中定义它。此外，我们必须提供一个描述我们的机器人的独特_creatorId_。

此外，我们正在扩展_AbilityBot_类，这减少了样板代码，并提供了常用的工具，如通过_ReplyFlow_的状态机。然而，我们将只使用嵌入式数据库，并在_ResponseHandler_中显式管理状态：

```
public class ResponseHandler {
    private final SilentSender sender;
    private final Map`<Long, UserState>` chatStates;

    public ResponseHandler(SilentSender sender, DBContext db) {
        this.sender = sender;
        chatStates = db.getMap(Constants.CHAT_STATES);
    }
}
```

### 5.1. Spring Boot 3兼容性问题

当使用Spring Boot 3版本时，库不会在声明为_@Component_时自动配置机器人。因此，我们必须在主应用程序类中手动初始化它：

```
TelegramBotsApi botsApi = new TelegramBotsApi(DefaultBotSession.class);
botsApi.registerBot(ctx.getBean("pizzaBot", TelegramLongPollingBot.class));
```

我们创建一个新的_TelegramBotsApi_实例，然后提供Spring应用程序上下文中的_pizzaBot_组件实例。

## 6. 实现PizzaBot

Telegram API非常庞大，实现新命令可能会变得重复。因此，我们使用能力来简化开发新功能的过程。在设计交互流程时，我们应该考虑最终用户，必要的条件和执行过程。

在我们的PizzaBot中，我们将只使用一个能力，将与机器人的对话_/start_开始：

```
public Ability startBot() {
    return Ability
      .builder()
      .name("start")
      .info(Constants.START_DESCRIPTION)
      .locality(USER)
      .privacy(PUBLIC)
      .action(ctx -> responseHandler.replyToStart(ctx.chatId()))
      .build();
}
```

我们使用构建器模式来构建_Ability_。首先，我们定义能力的名字，这与能力的命令相同。其次，我们提供这个新能力描述字符串。这将有助于我们运行_/commands_命令以获取我们机器人的能力。第三，我们定义机器人的本地性和隐私。最后，我们定义接收命令时必须采取的行动。对于这个例子，我们将转发聊天的ID到_ResponseHandler_类。按照上面的图表设计，我们将询问用户的姓名并将其保存在一个映射中，以及其初始状态：

```
public void replyToStart(long chatId) {
    SendMessage message = new SendMessage();
    message.setChatId(chatId);
    message.setText(START_TEXT);
    sender.execute(message);
    chatStates.put(chatId, AWAITING_NAME);
}
```

在这个方法中，我们创建了一个_SendMessage_命令，并使用_sender_执行它。然后，我们将聊天状态设置为_AWAITING_NAME_，表示我们正在等待用户的姓名：

```
private void replyToName(long chatId, Message message) {
    promptWithKeyboardForState(chatId, "Hello " + message.getText() + ". What would you like to have?",
      KeyboardFactory.getPizzaOrDrinkKeyboard(),
      UserState.FOOD_DRINK_SELECTION);
}
```

用户输入他们的姓名后，我们向他们发送一个_ReplyKeyboardMarkup_，提示他们有两个选项：

```
public static ReplyKeyboard getPizzaToppingsKeyboard() {
    KeyboardRow row = new KeyboardRow();
    row.add("Margherita");
    row.add("Pepperoni");
    return new ReplyKeyboardMarkup(List.of(row));
}
```

这将隐藏键盘并向用户显示一个带有两个按钮的界面：

![img](https://www.baeldung.com/wp-content/uploads/2023/08/Screenshot-2023-08-14-at-23.49.08.png)现在，用户可以选择比萨或饮料，我们的比萨店不提供。Telegram在选择两个选项中的任何一个时发送带有响应的文本消息。

对于上面图表中的所有绿色菱形元素，我们遵循类似的过程。因此，我们这里不会重复。相反，让我们专注于处理来自用户的按钮响应。

## 7. 处理来自用户的回复

对于所有传入的消息和当前聊天的状态，我们在_PizzaBot_类中以不同的方式处理响应：

```
public Reply replyToButtons() {
    BiConsumer`<BaseAbilityBot, Update>` action = (abilityBot, upd) -> responseHandler.replyToButtons(getChatId(upd), upd.getMessage());
    return Reply.of(action, Flag.TEXT, upd -> responseHandler.userIsActive(getChatId(upd)));
}
```

. _replyToButtons()_获取所有的_TEXT_回复，并将它们转发到_ResponseHandler_以及_chatId_和传入的_Message_对象。然后在_ResponseHandler_中的. _replyToButtons()_方法决定如何处理消息：

```
public void replyToButtons(long chatId, Message message) {
    if (message.getText().equalsIgnoreCase("/stop")) {
        stopChat(chatId);
    }

    switch (chatStates.get(chatId)) {
        case AWAITING_NAME -> replyToName(chatId, message);
        case FOOD_DRINK_SELECTION -> replyToFoodDrinkSelection(chatId, message);
        case PIZZA_TOPPINGS -> replyToPizzaToppings(chatId, message);
        case AWAITING_CONFIRMATION -> replyToOrder(chatId, message);
        default -> unexpectedMessage(chatId);
    }
}
```

在_switch_中，我们检查聊天的当前状态并相应地回复用户。例如，当用户的当前状态为_FOOD_DRINK_SELECTION_时，我们处理响应并移动到下一个状态，当用户点击选项_pizza_时：

```
private void replyToFoodDrinkSelection(long chatId, Message message) {
    SendMessage sendMessage = new SendMessage();
    sendMessage.setChatId(chatId);
    if ("drink".equalsIgnoreCase(message.getText())) {
        sendMessage.setText("We don't sell drinks.\nBring your own drink!! :)");
       sendMessage.setReplyMarkup(KeyboardFactory.getPizzaOrDrinkKeyboard());
sender.execute(sendMessage);
    } else if ("pizza".equalsIgnoreCase(message.getText())) {
        sendMessage.setText("We love Pizza in here.\nSelect the toppings!");
        sendMessage.setReplyMarkup(KeyboardFactory.getPizzaToppingsKeyboard());
        sender.execute(sendMessage);
        chatStates.put(chatId, UserState.PIZZA_TOPPINGS);
    } else {
        sendMessage.setText("We don't sell " + message.getText() + ". Please select from the options below.");
        sendMessage.setReplyMarkup(KeyboardFactory.getPizzaOrDrinkKeyboard());
        sender.execute(sendMessage);
    }
}

```

此外，在. _replyToButtons()_中，我们立即检查用户是否发送了_/stop_命令。如果是这样，我们停止聊天并从_chatStates_映射中删除_chatId_：

```
private void stopChat(long chatId) {
    SendMessage sendMessage = new SendMessage();
    sendMessage.setChatId(chatId);
    sendMessage.setText("Thank you for your order. See you soon!\nPress /start to order again");
    chatStates.remove(chatId);
    sendMessage.setReplyMarkup(new ReplyKeyboardRemove(true));
    sender.execute(sendMessage);
}
```

这将从数据库中删除用户的状态。要再次交互，用户必须写入_/start_命令。

## 8. 结论

在本教程中，我们讨论了使用Spring Boot实现Telegram机器人。

首先，我们使用BotFather在Telegram平台上创建了一个新的机器人。其次，我们设置了我们的Spring Boot项目，并解释了我们的PizzaBot的功能以及它如何与用户交互。然后，我们使用能力来简化开发新命令的过程。最后，我们处理了来自用户的回复，并根据聊天状态提供了适当的响应。

如常，本文的源代码可在GitHub上找到。

![img](https://www.baeldung.com/wp-content/uploads/2023/08/Screenshot-2023-08-14-at-23.49.08.png)

OK
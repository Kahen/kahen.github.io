---
date: 2022-01-01
category:
  - JavaFX
  - 事件处理
tag:
  - JavaFX Button
  - 事件处理器
head:
  - - meta
    - name: keywords
      content: JavaFX, Button, 事件处理, 事件处理器
------
# JavaFX Button 事件处理器添加指南

## 1. 引言
### 1.1. 概述
在这个简短的教程中，我们将**查看JavaFX的_Button_组件，并了解如何处理用户交互**。

### 1.2. JavaFX API
在Java 8、9和10中，无需额外设置即可开始使用JavaFX库。从JDK 11开始，该项目将从JDK中移除，应将以下依赖项添加到pom.xml中：

```xml
`<dependencies>`
    ``<dependency>``
        ```<groupId>```org.openjfx```</groupId>```
        ```<artifactId>```javafx-controls```</artifactId>```
        ```<version>```${javafx.version}```</version>```
    ``</dependency>``
    ``<dependency>``
        ```<groupId>```org.openjfx```</groupId>```
        ```<artifactId>```javafx-fxml```</artifactId>```
        ```<version>```${javafx.version}```</version>```
    ``</dependency>``
`</dependencies>`

`<build>`
    `<plugins>`
        `<plugin>`
            ```<groupId>```org.openjfx```</groupId>```
            ```<artifactId>```javafx-maven-plugin```</artifactId>```
            ```<version>```${javafx-maven-plugin.version}```</version>```
            `<configuration>`
                `<mainClass>`Main`</mainClass>`
            `</configuration>`
        `</plugin>`
    `</plugins>`
`</build>`
```

## 2. 应用程序设置
首先，**让我们创建一个小型应用程序，以便专注于事件处理器**。让我们从一个包含按钮的简单FXML布局开始：

```xml
`<?xml version="1.0" encoding="UTF-8"?>`
`<?import javafx.scene.control.*?>`
`<?import javafx.scene.layout.*?>`
`<BorderPane xmlns:fx="http://javafx.com/fxml"
    xmlns="http://javafx.com/javafx"
    fx:controller="com.baeldung.button.eventhandler.ButtonEventHandlerController"
    prefHeight="200.0" prefWidth="300.0">`
    `<center>`
        `<Button fx:id="button" HBox.hgrow="ALWAYS"/>`
    `</center>`

    `<bottom>`
        `<Label fx:id="label" text="测试标签"/>`
    `</bottom>`
`</BorderPane>`
```

让我们创建_ButtonEventHandlerController_类。**这个类负责连接UI元素和应用程序逻辑**。我们将在_initialize_方法中设置按钮的标签：

```java
public class ButtonEventHandlerController {
    private static final Logger logger = LoggerFactory.getLogger(ButtonEventHandlerController.class);

    @FXML
    private Button button;

    @FXML
    private Label label;

    @FXML
    private void initialize() {
        button.setText("点击我");
    }
}
```

让我们启动应用程序。我们应该会看到一个标题为“点击我”的按钮位于窗口中心，以及一个测试标签位于窗口底部：

![img](https://www.baeldung.com/wp-content/uploads/2022/01/javafx_button_event_handler_app_preview-1.png)

## 3. 点击事件
让我们从处理简单的点击事件开始，并在initialize方法中添加一个事件处理器：

```java
button.setOnAction(new EventHandler`<ActionEvent>`() {
    @Override
    public void handle(ActionEvent event) {
        logger.info("OnAction {}", event);
    }
});
```

现在让我们测试一下。当我们点击按钮时，会显示一个新的日志消息：

```
INFO c.b.b.e.ButtonEventHandlerController - OnAction javafx.event.ActionEvent[source=Button[id=searchButton, styleClass=button]'Click me']
```

**由于事件处理器接口只有一个方法，我们可以将其视为函数式接口，并用单个lambda表达式替换这些行，使我们的代码更易于阅读**：

```java
searchButton.setOnAction(event -> logger.info("OnAction {}", event));
```

让我们尝试添加另一个点击事件处理器。我们可以简单地复制这行代码，并更改日志消息，以便在测试应用程序时能够看到差异：

```java
button.setOnAction(event -> logger.info("OnAction {}", event));
button.setOnAction(event -> logger.info("OnAction2 {}", event));
```

现在，当我们点击按钮时，我们只看到“OnAction 2”消息。这是因为第二个_setOnAction_方法调用用第二个事件处理器替换了第一个事件处理器。

## 4. 不同事件
**我们也可以处理其他类型的事件，如鼠标按下/释放、拖动和键盘事件**。

让我们为我们的按钮添加一个悬停效果。当光标开始悬停在按钮上时，我们将显示一个阴影，并在光标离开时移除效果：

```java
Effect shadow = new DropShadow();
searchButton.setOnMouseEntered(e -> searchButton.setEffect(shadow));
searchButton.setOnMouseExited(e -> searchButton.setEffect(null));
```

## 5. 重用事件处理器
在某些情况下，我们可能希望多次使用相同的事件处理器。让我们创建一个事件处理器，当我们点击鼠标的次要按钮时，将增加按钮的字体大小：

```java
EventHandler`<MouseEvent>` rightClickHandler = event -> {
    if (MouseButton.SECONDARY.equals(event.getButton())) {
        button.setFont(new Font(button.getFont().getSize() + 1));
    }
};
```

然而，它没有功能，因为我们没有将它与任何事件关联。让我们将这个事件处理器用于按钮和标签的鼠标按下事件：

```java
button.setOnMousePressed(rightClickHandler);
label.setOnMousePressed(rightClickHandler);
```

现在，当我们测试应用程序并使用鼠标的次要按钮点击标签或按钮时，我们可以看到字体大小增加。

## 6. 结论
我们学习了如何为JavaFX按钮添加事件处理器，并根据事件类型执行不同的操作。

如往常一样，代码实现可在GitHub上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g)![img](https://secure.gravatar.com/avatar/74d85e58eea7ae3bd05956bff5cb1b49?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)
---
date: 2022-08-01
category:
  - Postman
  - SOAP
tag:
  - SOAP Request
  - WSDL
head:
  - - meta
    - name: keywords
      content: Postman, SOAP, WSDL, API Testing
---
# 通过Postman发送SOAP请求

在这篇文章中，我们将学习如何通过Postman发送SOAP请求。在此之前，我们将从我们的Country SOAP服务导入WSDL到API平台。

## 2. 设置
在我们能够在Postman中发出SOAP请求之前，我们需要一个正常工作的SOAP服务。启动我们的Country SOAP服务后，端点将位于http://localhost:8080/ws，而WSDL可以在http://localhost:8080/ws/countries.wsdl找到。

## 3. 从Postman测试SOAP请求
使用Postman测试我们的端点有四个步骤。

### 3.1. 导入SOAP WSDL
从Postman 8.4.0版本开始，我们可以将WSDL导入Postman。我们可以直接将我们的countries Postman集合导入。以下是从WSDL创建新集合的几个步骤。

首先，让我们点击_集合_：

![img](https://www.baeldung.com/wp-content/uploads/2022/08/1.png)

接下来，让我们通过提供其URL来导入我们的WSDL：

![img](https://www.baeldung.com/wp-content/uploads/2022/08/2.png)

您也可以直接使用countries.wsdl WSDL文件进行导入。

我们的服务已从WSDL获取。我们将跳过高级设置，并使用默认设置进行导入：

![img](https://www.baeldung.com/wp-content/uploads/2022/08/3.png)

导入后，我们应该能够看到我们所有的SOAP服务：

![img](https://www.baeldung.com/wp-content/uploads/2022/08/3.2.png)

**Postman已经为我们设置了正确的URL、内容类型和每个请求的头部。**

### 3.2. 添加正文数据
接下来，让我们通过在信封头部添加国家名称_Spain_和_baeldung_命名空间来自定义我们的请求正文：

```
`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:gs="http://www.baeldung.com/springsoap/gen">`
    `<soapenv:Header/>`
    `<soapenv:Body>`
        `<gs:getCountryRequest>`
            `<gs:name>`Spain`</gs:name>`
        `</gs:getCountryRequest>`
    `</soapenv:Body>`
`</soapenv:Envelope>`
```

通过导入我们的WSDL，Postman已经为我们设置了适当的头部。_Content-Type_设置为_text/xml_，适用于我们的请求。_text/xml_比_application/xml_更受青睐。没有明确支持_text/xml_的MIME用户代理（和Web用户代理）会将其视为_text/plain_，例如，通过显示XML MIME实体作为纯文本。

如果请求需要另一种内容类型，我们可以取消选择Postman自动添加的_Content-Type_头部。然后，在_Key_字段中添加新的行，并将新的内容类型名称添加到_Value_字段中。

如果服务返回500状态码，我们应该添加一个额外的头部“_SOAPAction:_ _#POST_”。

### 3.4. 发送SOAP请求
最后，让我们点击_Send_按钮来调用我们的SOAP服务。如果我们的调用成功，Postman将在底部选项卡中显示包含有关Spain的信息的响应：

```
`<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">`
`<SOAP-ENV:Header/>`
`<SOAP-ENV:Body>`
    `<ns2:getCountryResponse xmlns:ns2="http://www.baeldung.com/springsoap/gen">`
        `<ns2:country>`
            `<ns2:name>`Spain`</ns2:name>`
            `<ns2:population>`46704314`</ns2:population>`
            `<ns2:capital>`Madrid`</ns2:capital>`
            `<ns2:currency>`EUR`</ns2:currency>`
        `</ns2:country>`
    `</ns2:getCountryResponse>`
`</SOAP-ENV:Body>`
`</SOAP-ENV:Envelope>`
```

这是Postman控制台中的输出：

![img](https://www.baeldung.com/wp-content/uploads/2022/08/soapConsole.png)

## 4. 结论
在这篇文章中，我们学习了如何通过Postman发送SOAP请求。我们首先看到了如何将我们的WSDL导入Postman。然后，我们成功地向我们的国家服务发送了请求。像往常一样，代码可以在GitHub上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)
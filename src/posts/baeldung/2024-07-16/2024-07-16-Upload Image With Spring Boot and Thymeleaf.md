---
date: 2024-07-16
category:
  - Spring Boot
  - Thymeleaf
tag:
  - Image Upload
  - Java Web Application
head:
  - - meta
    - name: keywords
      content: Spring Boot, Thymeleaf, Image Upload, Java Web Application
------
# 使用Spring Boot和Thymeleaf上传图片

在这个快速教程中，我们将看看如何在使用Spring Boot和Thymeleaf的Java Web应用程序中上传图片。

## **2. 依赖项**

我们只需要两个依赖项——Spring Boot Web和Thymeleaf：

```xml
``<dependency>``
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-starter-web``</artifactId>``
``</dependency>``
``<dependency>``
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-starter-thymeleaf``</artifactId>``
``</dependency>``
```

## **3. Spring Boot 控制器**

我们的第一步是创建一个Spring Boot Web控制器来处理我们的请求：

```java
@Controller public class UploadController {

    public static String UPLOAD_DIRECTORY = System.getProperty("user.dir") + "/uploads";

    @GetMapping("/uploadimage") public String displayUploadForm() {
        return "imageupload/index";
    }

    @PostMapping("/upload") public String uploadImage(Model model, @RequestParam("image") MultipartFile file) throws IOException {
        StringBuilder fileNames = new StringBuilder();
        Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY, file.getOriginalFilename());
        fileNames.append(file.getOriginalFilename());
        Files.write(fileNameAndPath, file.getBytes());
        model.addAttribute("msg", "Uploaded images: " + fileNames.toString());
        return "imageupload/index";
    }
}
```

我们定义了两个方法来处理HTTP GET请求。_displayUploadForm()_方法处理GET请求并返回Thymeleaf模板的名称，以便让用户导入图片。

_uploadImage()_方法处理图片上传。它接受一个_image_的_multipart/form-data_ POST请求并将其保存在本地文件系统中。**_MultipartFile_接口是Spring Boot提供的一种特殊数据结构，用于表示多部分请求中的上传文件。**

最后，我们创建了一个上传文件夹来存储所有上传的图片。我们还添加了一个包含上传图片名称的消息，以便在用户提交表单后显示。

## **4. Thymeleaf 模板**

第二步是创建一个我们将称之为_index.html_的Thymeleaf模板，路径为_src/main/resources/templates_。此模板显示一个HTML表单，允许用户选择并上传图片。此外，我们使用_accept="image/*"_属性，只允许用户导入图片而不是导入任何文件。

让我们看看我们的_index.html_文件的结构：

```html
`<body>`
`<section class="my-5">`
    `<div class="container">`
        `<div class="row">`
            `<div class="col-md-8 mx-auto">`
                `<h2>`上传图片示例`</h2>`
                `<p th:text="${message}" th:if="${message ne null}" class="alert alert-primary">``</p>`
                `<form method="post" th:action="@{/upload}" enctype="multipart/form-data">`
                    `<div class="form-group">`
                        `<input type="file" name="image" accept="image/*" class="form-control-file">`
                    ````</div>````
                    `<button type="submit" class="btn btn-primary">`上传图片`</button>`
                `</form>`
                `<span th:if="${msg != null}" th:text="${msg}">``</span>`
            ````</div>````
        ````</div>````
    ````</div>````
`</section>`
`</body>`
```

## **5. 自定义文件大小**

如果我们尝试上传一个大文件，将会抛出_MaxUploadSizeExceededException_异常。然而，**我们可以通过在_application.properties_文件中定义_spring.servlet.multipart.max-file-size_和_spring.servlet.multipart.max-request-size_属性来调整文件上传限制**：

```properties
spring.servlet.multipart.max-file-size = 5MB
spring.servlet.multipart.max-request-size = 5MB
```

## **6. 结论**

在这篇文章中，我们展示了如何在使用Spring Boot和Thymeleaf的Java Web应用程序中上传图片。
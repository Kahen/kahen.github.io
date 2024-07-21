---
date: 2022-04-01
category:
  - Java
  - JNI
tag:
  - JNI
  - RegisterNatives
head:
  - - meta
    - name: keywords
      content: JNI, RegisterNatives, Java, C++
---

# 如何使用JNI的RegisterNatives()方法？

在这个简短的教程中，我们将看看JNI的_RegisterNatives()_方法，它用于在Java和C++函数之间创建映射。

首先，我们将解释JNI _RegisterNatives()_是如何工作的。然后，我们将展示它在_java.lang.Object’_s_registerNatives()_方法中的使用。最后，我们将展示如何在我们自己的Java和C++代码中使用这个功能。

**JVM有两种方式找到并链接本地方法与Java代码。** 第一种方式是以一种特定的方式调用本地函数，以便JVM可以找到它。另一种方式是**使用JNI _RegisterNatives()_方法**。

正如其名，_RegisterNatives()_方法将本地方法注册到作为参数传递的类中。**通过使用这种方法，我们可以随意命名我们的C++函数**。

实际上，_java.lang.Object’_s_registerNatives()_方法使用了第二种方法。让我们看看OpenJDK 8中C语言的_java.lang.Object’_s_registerNatives()_方法实现：

```
static JNINativeMethod methods[] = {
    {"hashCode", "()I", (void *)&JVM_IHashCode},
    {"wait", "(J)V", (void *)&JVM_MonitorWait},
    {"notify", "()V", (void *)&JVM_MonitorNotify},
    {"notifyAll", "()V", (void *)&JVM_MonitorNotifyAll},
    {"clone", "()Ljava/lang/Object;", (void *)&JVM_Clone},
};

JNIEXPORT void JNICALL
Java_java_lang_Object_registerNatives(JNIEnv *env, jclass cls)
{
    (*env)->RegisterNatives(env, cls,
                            methods, sizeof(methods)/sizeof(methods[0]));
}
```

首先，_method[]_数组被初始化以存储Java和C++函数名之间的映射。然后，我们看到了一个以非常特定方式命名的方法_Java_java_lang_Object_registerNatives_。

通过这样做，JVM能够将其链接到本地_java.lang.Object’_s_registerNatives()_方法。在内部，_method[]_数组被用在_RegisterNatives()_方法调用中。

现在，让我们看看我们如何在自己的代码中使用它。

## 3. 使用_RegisterNatives_方法

让我们从Java类开始：

```
public class RegisterNativesHelloWorldJNI {
    public native void register();
    public native String sayHello();

    public static void main(String[] args) {
        RegisterNativesHelloWorldJNI helloWorldJNI = new RegisterNativesHelloWorldJNI();
        helloWorldJNI.register();
        helloWorldJNI.sayHello();
    }
}
```

我们定义了两个本地方法，_register()_和_sayHello()_。前者将使用R _egisterNatives()_方法来注册一个自定义的C++函数，以便在调用本地_sayHello()_方法时使用。

让我们看看Java的_register()_本地方法的C++实现：

```
static JNINativeMethod methods[] = {
  {"sayHello", "()Ljava/lang/String;", (void*) &hello },
};

JNIEXPORT void JNICALL Java_com_baeldung_jni_RegisterNativesHelloWorldJNI_register (JNIEnv* env, jobject thsObject) {
    jclass clazz = env->FindClass("com/baeldung/jni/RegisterNativesHelloWorldJNI");

    (env)->RegisterNatives(clazz, methods, sizeof(methods)/sizeof(methods[0]));
}
```

与_java.lang.Object_示例类似，我们首先创建一个数组来保存Java和C++方法之间的映射。

然后，我们看到了一个名为_Java_com_baeldung_jni_RegisterNativesHelloWorldJNI_register_的函数。不幸的是，它必须以这种方式调用，以便JVM能够找到并将其与Java代码链接。

该函数做了两件事。首先，它找到了所需的Java类。然后，它调用了_RegisterNatives()_方法，并传递了类和映射数组。

现在，我们可以随意调用第二个本地方法_sayHello()_：

```
JNIEXPORT jstring JNICALL hello (JNIEnv* env, jobject thisObject) {
    std::string hello = "Hello from registered native C++ !!";
    std::cout `<< hello << std::endl;
    return env->`NewStringUTF(hello.c_str());
}
```

与完全限定名不同，我们使用了更短、更有意义的名称。

最后，让我们从_RegisterNativesHelloWorldJNI_类中运行_main()_方法：

```
Hello from registered native C++ !!
```

## 4. 结论

在本文中，我们讨论了JNI _RegisterNatives()_方法。首先，我们解释了_java.lang.Object.registerNatives()_方法在幕后的作用。然后，我们讨论了使用JNI _RegisterNatives()_方法可能的用途。最后，我们展示了如何在我们自己的Java和C++代码中使用它。

如常，本文的完整源代码可在GitHub上找到。翻译已经完成，以下是剩余部分的翻译：

## 4. 结论

在这篇文章中，我们讨论了JNI的_RegisterNatives()_方法。首先，我们解释了_java.lang.Object.registerNatives()_方法的内部工作原理。然后，我们讨论了使用JNI _RegisterNatives()_方法可能很有用的原因。最后，我们展示了如何在我们自己的Java和C++代码中使用它。

如往常一样，文章的完整源代码可以在GitHub上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/1e5547403afca01f9f2e280c3320046e?s=50&r=g)![img](https://secure.gravatar.com/avatar/e10d6ff4ff6d95fd255cc95a5ab28c0e?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

OK
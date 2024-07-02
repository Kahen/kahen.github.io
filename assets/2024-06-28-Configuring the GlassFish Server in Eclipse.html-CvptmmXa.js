import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as i}from"./app-B3tK_ksD.js";const t={},p=i('<hr><h1 id="在eclipse中配置glassfish服务器" tabindex="-1"><a class="header-anchor" href="#在eclipse中配置glassfish服务器"><span>在Eclipse中配置GlassFish服务器</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p><strong>GlassFish服务器是一个用于开发和部署Java企业应用的开源应用程序服务器</strong>。此外，它还提供对Web容器、负载均衡、配置和管理的控制台等的支持。</p><p>在本教程中，我们将一步一步学习如何在Eclipse IDE中配置GlassFish服务器。</p><p>要在Eclipse IDE中配置GlassFish服务器，我们必须在我们的机器上安装Eclipse IDE for Enterprise Java and Web Developers。</p><p>Eclipse IDE for Enterprise Java Developers扩展了标准Eclipse IDE的功能。它具有额外的工具来启动Java EE/Jakarta EE应用程序。</p><h3 id="_2-1-glassfish工具" tabindex="-1"><a class="header-anchor" href="#_2-1-glassfish工具"><span>2.1. GlassFish工具</span></a></h3><p>Eclipse IDE for Enterprise Java Developers默认情况下捆绑了设置流行Web服务器如Tomcat、WebSphere等的工具。然而，GlassFish工具不是默认安装的。</p><p>Oracle Enterprise Pack for Eclipse包含了Eclipse GlassFish工具。让我们将插件仓库“<em>http://download.oracle.com/otn_software/oepe/12.2.1.8/oxygen/repository/dependencies/</em>”添加到Eclipse IDE中以安装GlassFish工具。</p><p>首先，让我们点击菜单栏上的_Help_选项，然后选择_Install New Software_。然后，让我们添加Oracle Enterprise Pack的链接以安装GlassFish工具：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/10/install_glassfishtool_from_oracle_pack.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在这里，我们添加Oracle Enterprise Pack的链接并按_Enter_键。所有可用的软件都被加载了，但我们感兴趣的是GlassFish工具。因此，我们选择GlassFish工具并点击_Next_按钮安装工具。</p><p>安装完成后，让我们重新启动Eclipse IDE并检查GlassFish工具。首先，让我们点击菜单栏上的_Windows_选项。接下来，让我们点击_Show View_选项。最后，让我们选择_Servers_选项：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/10/server_view_within_eclipse.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们现在在视图中有了_Servers_。让我们点击“<em>Create New Server</em>”链接以查看GlassFish工具：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/10/glassfish_tool_in_eclipse.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p><strong>值得注意的是，Eclipse IDE for Enterprise Java Developer当前的GlassFish工具仅支持GlassFish版本1、3和5。</strong></p><h3 id="_2-2-设置glassfish服务器" tabindex="-1"><a class="header-anchor" href="#_2-2-设置glassfish服务器"><span>2.2. 设置GlassFish服务器</span></a></h3><p>此外，让我们下载GlassFish 5.1并将其解压到一个文件夹中。<strong>值得注意的是，GlassFish 5.1仅支持Java 8。</strong></p><p>接下来，让我们在_Servers_视图中点击_Create a new server_。这将打开服务器工具，让我们选择_GlassFish_：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/10/add_new_glassfish_server_runtime.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在这里，我们点击_Create a new server_并选择GlassFish。此外，我们点击_Add_选项通过指定解压的GlassFish服务器的路径来创建GlassFish运行时环境。</p><p>或者，我们可以在_Servers_视图中右键单击并选择“<em>New</em>”选项以添加新服务器。</p><p>点击_Add_选项后，让我们指定服务器和JDK的路径：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/10/glass_fish_runtime_property.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在上面的图片中，我们定义了GlassFish服务器和JDK的路径。最后，我们点击_Finish_按钮添加GlassFish运行时属性。</p><p>接下来，让我们回到_New Server_视图并选择我们刚刚创建的GlassFish服务器运行时：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/10/select_glassfish_runtime_configuration.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p><em>Next_按钮将我们带到一个页面，定义服务器属性，如_Admin password</em>：</p><p>为了简单起见，我们没有定义管理员用户名和密码。</p><p>_Next_按钮将我们带到一个页面，向服务器添加资源：</p><p>我们的目标是设置一个服务器，所以我们让配置框保持为空并点击_Finish_。</p><p>服务器现在已完全设置好，可以从_Servers_视图中进行评估：</p><p>服务器现在已列在_Servers_视图中。接下来，让我们选择它并点击开始按钮启动服务器。</p><p>最后，让我们在浏览器中打开URL“<em>http://localhost:8080</em>”以查看运行中的服务器：</p><p>上面的图片显示了运行中服务器的索引页面。</p><h2 id="_3-结论" tabindex="-1"><a class="header-anchor" href="#_3-结论"><span>3. 结论</span></a></h2><p>在本文中，我们学习了如何通过逐步指南在Eclipse IDE中设置GlassFish服务器。</p><p>此外，我们还看到了如何通过Oracle Enterprise Pack安装Eclipse GlassFish工具。</p>',40),l=[p];function n(r,o){return a(),s("div",null,l)}const g=e(t,[["render",n],["__file","2024-06-28-Configuring the GlassFish Server in Eclipse.html.vue"]]),_=JSON.parse('{"path":"/posts/baeldung/2024-06-28/2024-06-28-Configuring%20the%20GlassFish%20Server%20in%20Eclipse.html","title":"在Eclipse中配置GlassFish服务器","lang":"zh-CN","frontmatter":{"date":"2023-10-10T00:00:00.000Z","category":["GlassFish","Eclipse"],"tag":["GlassFish Server","Java Enterprise"],"head":[["meta",{"name":"keywords","content":"GlassFish, Eclipse IDE, Java Enterprise applications, application server"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-28/2024-06-28-Configuring%20the%20GlassFish%20Server%20in%20Eclipse.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Eclipse中配置GlassFish服务器"}],["meta",{"property":"og:description","content":"在Eclipse中配置GlassFish服务器 1. 概述 GlassFish服务器是一个用于开发和部署Java企业应用的开源应用程序服务器。此外，它还提供对Web容器、负载均衡、配置和管理的控制台等的支持。 在本教程中，我们将一步一步学习如何在Eclipse IDE中配置GlassFish服务器。 要在Eclipse IDE中配置GlassFish服..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/10/install_glassfishtool_from_oracle_pack.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-28T22:52:33.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"GlassFish Server"}],["meta",{"property":"article:tag","content":"Java Enterprise"}],["meta",{"property":"article:published_time","content":"2023-10-10T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-28T22:52:33.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Eclipse中配置GlassFish服务器\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/10/install_glassfishtool_from_oracle_pack.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/10/server_view_within_eclipse.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/10/glassfish_tool_in_eclipse.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/10/add_new_glassfish_server_runtime.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/10/glass_fish_runtime_property.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/10/select_glassfish_runtime_configuration.png\\"],\\"datePublished\\":\\"2023-10-10T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-28T22:52:33.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Eclipse中配置GlassFish服务器 1. 概述 GlassFish服务器是一个用于开发和部署Java企业应用的开源应用程序服务器。此外，它还提供对Web容器、负载均衡、配置和管理的控制台等的支持。 在本教程中，我们将一步一步学习如何在Eclipse IDE中配置GlassFish服务器。 要在Eclipse IDE中配置GlassFish服..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[{"level":3,"title":"2.1. GlassFish工具","slug":"_2-1-glassfish工具","link":"#_2-1-glassfish工具","children":[]},{"level":3,"title":"2.2. 设置GlassFish服务器","slug":"_2-2-设置glassfish服务器","link":"#_2-2-设置glassfish服务器","children":[]}]},{"level":2,"title":"3. 结论","slug":"_3-结论","link":"#_3-结论","children":[]}],"git":{"createdTime":1719615153000,"updatedTime":1719615153000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.26,"words":977},"filePathRelative":"posts/baeldung/2024-06-28/2024-06-28-Configuring the GlassFish Server in Eclipse.md","localizedDate":"2023年10月10日","excerpt":"<hr>\\n<h1>在Eclipse中配置GlassFish服务器</h1>\\n<h2>1. 概述</h2>\\n<p><strong>GlassFish服务器是一个用于开发和部署Java企业应用的开源应用程序服务器</strong>。此外，它还提供对Web容器、负载均衡、配置和管理的控制台等的支持。</p>\\n<p>在本教程中，我们将一步一步学习如何在Eclipse IDE中配置GlassFish服务器。</p>\\n<p>要在Eclipse IDE中配置GlassFish服务器，我们必须在我们的机器上安装Eclipse IDE for Enterprise Java and Web Developers。</p>","autoDesc":true}');export{g as comp,_ as data};

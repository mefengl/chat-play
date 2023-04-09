(function () {
  'use strict';

  const default_menu_all = {
  };
  const menu_all = GM_getValue("menu_all", default_menu_all);
  // 菜单更新的逻辑
  const menus = [
    { checker: () => location.href.includes("book.douban"), name: "douban_book", value: true },
    { checker: () => location.href.includes("zhihu"), name: "zhihu", value: true },
    { checker: () => location.href.includes("news.ycombinator"), name: "hackernews", value: true },
    { checker: () => location.href.includes("github"), name: "github", value: true },
    { checker: () => location.href.includes("wikipedia"), name: "wikipedia", value: true },
    { checker: () => location.href.includes("nytimes.com"), name: "nytimes", value: true },
    { checker: () => location.href.includes("baidu.com"), name: "baidu", value: true },
    { checker: () => location.href.includes("reddit.com"), name: "reddit", value: true },
    { checker: () => location.href.includes("google.com"), name: "google", value: true },
    { checker: () => location.href.includes("youtube.com"), name: "youtube", value: true },
  ];

  menus.forEach(menu => {
    $(() => menu.checker() && GM_setValue(menu.name, true) && console.log(`开启 ${menu.name} 菜单`));
    if (GM_getValue(menu.name) == true) {
      default_menu_all[menu.name] = menu.value;
    }
  });

  // 检查是否有新增菜单
  for (let name in default_menu_all) {
    if (!(name in menu_all)) {
      menu_all[name] = default_menu_all[name];
    }
  }
  const menu_id = GM_getValue("menu_id", {});

  function registerMenuCommand(name, value) {
    const menuText = ` ${name}：${value ? '✅' : '❌'}`;
    const commandCallback = () => {
      menu_all[name] = !menu_all[name];
      GM_setValue('menu_all', menu_all);
      update_menu();
      location.reload();
    };
    return GM_registerMenuCommand(menuText, commandCallback);
  }
  function update_menu() {
    for (let name in menu_all) {
      const value = menu_all[name];
      if (menu_id[name]) {
        GM_unregisterMenuCommand(menu_id[name]);
      }
      menu_id[name] = registerMenuCommand(name, value);
    }
    GM_setValue('menu_id', menu_id);
  }
  update_menu();

  const douban_book_prompts = [
    ({ title, author }) => `${author}的《${title}》的主要观点列成表格会是：`,
    ({ title, author }) => `${author}的《${title}》比较重要的章节会是：`,
    ({ title, author }) => `${author}的《${title}》在哪些方面是有争议的会是：`,
    ({ title, author }) => `${author}的《${title}》当人们生活在不同的时代时，会有什么不同的观点会是：`,
    ({ title, author }) => `${author}的《${title}》综合Goodreads评分和豆瓣等各种评分和评价会是：`,
    ({ title, author }) => `${author}的《${title}》的类似书籍或文章和它们的区别会是：`,
    ({ title, author }) => `${author}的《${title}》的观点相反的书籍或文章和对应的观点会是：`,
  ]
  const question_prompts = [
    ({ question }) => `问题：${question}，暗含的观点是：`,
    ({ question }) => `问题：${question}，应该去反思：`,
    ({ question }) => `问题：${question}，想要改进或解决它，可以从这些方面入手：`,
    ({ question }) => `问题：${question}，提问者和提问者的目的是：`,
    ({ question }) => `问题：${question}，问题的相关历史是：`,
    ({ question }) => `问题：${question}，不同的国家对这个问题的看法会是：`,
    ({ question }) => `问题：${question}，类似问题和它们的区别会是：`,
    ({ question }) => `问题：${question}，观点相反的问题和对应的观点会是：`,
    ({ question }) => `问题：${question}，幽默的回答会是：`,
    ({ question }) => `问题：${question}，主要观点列成表格会是：`,
    ({ question }) => `问题：${question}，相关书籍、文章、视频或网站会是：`,
    ({ question }) => `从这个问题：${question}，可以引申出这些问题：`,
  ]
  const github_prompts = [
    ({ website }) => `${website}的最佳实践是：`,
    ({ website }) => `${website}的类似项目是：`,
    ({ website }) => `${website}的相关书籍、文章、视频或网站是：`,
  ]

  function chatgpt_trigger(prompt_prepare, prompts) {
    const prepare_data = prompt_prepare();
    const prompt_texts = prompts.map(prompt => prompt(prepare_data));
    GM_setValue("prompt_texts", prompt_texts);
  }

  const triggers = [
    {
      checker: () => menu_all.douban_book && location.href.includes("book.douban.com/subject"),
      prepare: () => {
        const title = $("meta[property='og:title']").attr("content");
        const author = $("meta[property='book:author']").attr("content");
        return { title, author };
      },
      prompts: douban_book_prompts
    },
    {
      checker: () => menu_all.zhihu && location.href.includes("zhihu.com/question"),
      prepare: () => {
        const question = $('meta[itemprop="name"]').attr('content');
        return { question };
      },
      prompts: [...question_prompts]
    },
    {
      checker: () => menu_all.hackernews && location.href.includes("news.ycombinator.com/item"),
      prepare: () => {
        const question = $('td.title > span.titleline > a').text();
        return { question };
      },
      prompts: [...question_prompts]
    },
    {
      checker: () => menu_all.github && location.href.includes("github.com"),
      prepare: () => {
        const parts = location.href.split("/");
        if (parts.length >= 5 && parts[parts.length - 2] && parts[parts.length - 1]) {
          const website = parts[parts.length - 2] + "/" + parts[parts.length - 1];
          return { website };
        }
      },
      prompts: github_prompts
    },
    {
      checker: () => menu_all.wikipedia && location.href.includes("wikipedia.org/wiki/"),
      prepare: () => {
        const title = $("h1#firstHeading").text();
        const summary = $("div.mw-parser-output p").first().text();
        return { title, summary };
      },
      prompts: [
        ({ title }) => `${title}的历史和重要事件有哪些？`,
        ({ title }) => `${title}与其他相关主题的比较和对比会是：`,
        ({ title }) => `${title}的主要观点列成表格会是：`,
        ({ title }) => `${title}的关键概念和术语是什么？`,
        ({ title }) => `${title}的类似词条或相关研究和它们的区别会是：`,
      ]
    },
    {
      checker: () => menu_all.nytimes && location.href.includes("nytimes.com"),
      prepare: () => {
        const articleTitle = $("h1").text();
        return { question: articleTitle };
      },
      prompts: [...question_prompts]
    },
    {
      checker: () => menu_all.baidu && location.href.includes("www.baidu.com/s"),
      prepare: () => {
        const keyword = $("input#kw").val();
        return { keyword };
      },
      prompts: [
        ({ keyword }) => `关于"${keyword}"的最新新闻有哪些？`,
        ({ keyword }) => `"${keyword}"的定义和解释是什么？`,
        ({ keyword }) => `对于"${keyword}"这个话题，你有什么观点或看法？`,
        ({ keyword }) => `跟"${keyword}"相关的人物或事件有哪些？`,
        ({ keyword }) => `最近跟"${keyword}"相关的热门话题是什么？`,
      ]
    },
    {
      checker: () => menu_all.reddit && location.href.includes("reddit.com"),
      prepare: () => {
        const postTitle = $("h1._eYtD2XCVieq6emjKBH3m").text();
        const postContent = $("div._3W_31WoaKsKsZfNldTiz5M").first().text();
        return { postTitle, postContent };
      },
      prompts: [
        ({ postTitle }) => `关于"${postTitle}"，你有什么想法或评论？`,
        ({ postTitle }) => `能给大家分享一些"${postTitle}"的相关信息吗？`,
        ({ postTitle }) => `在"${postTitle}"的讨论中，有哪些观点或意见最值得关注？`,
        ({ postTitle }) => `对于"${postTitle}"，你的看法是否与其他人不同？`,
        ({ postTitle }) => `请简要介绍一下"${postTitle}"的主要内容和背景。`,
      ]
    },
    {
      checker: () => menu_all.google && location.href.includes("google.com/search?q="),
      prepare: () => {
        const keyword = $("input[name='q']").val();
        return { keyword };
      },
      prompts: [
        ({ keyword }) => `关于"${keyword}"的最新搜索结果有哪些？`,
        ({ keyword }) => `对于"${keyword}"这个话题，你有什么观点或看法？`,
        ({ keyword }) => `跟"${keyword}"相关的人物或事件有哪些？`,
        ({ keyword }) => `最近跟"${keyword}"相关的热门话题是什么？`,
      ]
    },
    {
      checker: () => menu_all.youtube && location.href.includes("youtube.com/watch"),
      prepare: () => {
        const metaTitle = $('meta[name="title"]').attr('content');
        return { metaTitle };
      },
      prompts: [
        ({ metaTitle }) => `关于"${metaTitle}"的观点或评论有哪些？`,
        ({ metaTitle }) => `能给大家分享一些关于"${metaTitle}"的相关信息吗？`,
        ({ metaTitle }) => `在"${metaTitle}"的讨论中，有哪些观点或意见最值得关注？`,
        ({ metaTitle }) => `对于"${metaTitle}"，你的看法是否与其他人不同？`,
        ({ metaTitle }) => `请简要介绍一下"${metaTitle}"的主要内容和背景。`,
      ]
    }
  ];

  triggers.forEach(trigger => {
    trigger.checker() && chatgpt_trigger(trigger.prepare, trigger.prompts);
  });

  /* ************************************************************************* */
  // ChatGPT response to prompt_texts
  const get_submit_button = () => {
    const form = document.querySelector('form');
    const buttons = form.querySelectorAll('button');
    const result = buttons[buttons.length - 1]; // by textContent maybe better
    return result;
  };
  const get_textarea = () => {
    const form = document.querySelector('form');
    const textareas = form.querySelectorAll('textarea');
    const result = textareas[0];
    return result;
  };
  const get_regenerate_button = () => {
    const form = document.querySelector('form');
    const buttons = form.querySelectorAll('button');
    for (let i = 0; i < buttons.length; i++) {
      const buttonText = buttons[i].textContent.trim().toLowerCase();
      if (buttonText.includes('regenerate')) {
        return buttons[i];
      }
    }
  };

  let last_trigger_time = +new Date();
  $(() => {
    if (location.href.includes("chat.openai")) {
      console.log("ChatGPT");
      GM_addValueChangeListener("prompt_texts", (name, old_value, new_value) => {
        if (+new Date() - last_trigger_time < 500) {
          return;
        }
        last_trigger_time = new Date();
        setTimeout(async () => {
          console.log("ChatGPT页面响应prompt_texts");
          const prompt_texts = new_value;
          console.log(prompt_texts);
          if (prompt_texts.length > 0) {
            console.log("进入处理");
            // get prompt_texts from local
            let firstTime = true;
            while (prompt_texts.length > 0) {
              if (!firstTime) {
                await new Promise(resolve => setTimeout(resolve, 2000));
              }
              if (!firstTime && get_regenerate_button() == undefined) {
                continue;
              }
              firstTime = false;
              const prompt_text = prompt_texts.shift();
              console.log(prompt_text);
              // write the prompt_text
              get_textarea().value = prompt_text;
              // submit
              get_submit_button().click();
            }
          }
        }, 0);
        GM_setValue("prompt_texts", []);
      });
    }
  });
})();

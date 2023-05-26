# Chat-Octopus

[![GitHub stars](https://img.shields.io/github/stars/mefengl/chat-play?style=social)](https://github.com/mefengl/chat-play)
[![Follow on GitHub](https://img.shields.io/github/followers/mefengl?label=Follow%20%40mefengl&style=social)](https://github.com/mefengl)
[![Twitter Follow](https://img.shields.io/twitter/follow/mefengl?style=social)](https://twitter.com/mefengl)

[![Daily downloads](https://img.shields.io/greasyfork/dd/462713)](https://greasyfork.org/zh-CN/scripts/462713-chat-octopus/stats)
[![Total downloads](https://img.shields.io/greasyfork/dt/462713)](https://greasyfork.org/zh-CN/scripts/462713-chat-octopus/stats)

[![License](https://img.shields.io/greasyfork/l/462713?color=&label=License)](https://opensource.org/licenses/MIT)

Chat-Octopus is a userscript that enables you to automatically send messages between multiple AI language models, such as OpenAI's ChatGPT, Google's Bard, Microsoft Bing, and even more.

## Features

- Automatically send messages between multiple AI language models (e.g., ChatGPT, Bard, Bing, etc.)
- Customizable script settings through the userscript manager's menu
- Synchronized message sending and receiving

## Installation

1. Install a userscript manager for your browser, such as [Tampermonkey](https://www.tampermonkey.net/) or [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/).
2. Visit the [Chat-Octopus script page](https://greasyfork.org/scripts/462713-chat-octopus) on Greasy Fork.
3. Click the "Install this script" button.
4. Your userscript manager should recognize the script and prompt you to install it. Click "Install" to add the script to your userscript manager.

## Usage

After installing the script, visit the websites of the AI language models you'd like to connect (e.g., [ChatGPT](https://chat.openai.com/), [Bard](https://bard.google.com/), Bing, etc.). You can then type a prompt into one of the AI's input fields and send the message. The script will automatically relay the message to the other AI(s), allowing you to observe how the different language models interact with each other.

You can customize the script's settings through the userscript manager's menu by enabling or disabling specific features for each AI.

<!--
<iframe src="//player.bilibili.com/player.html?aid=484231810&bvid=BV18T411q7aU&cid=1073431117&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe<iframe src="//player.bilibili.com/player.html?aid=484231810&bvid=BV18T411q7aU&cid=1073431117&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="800" height="450"> </iframe>
-->
Video Demo: https://www.bilibili.com/video/BV18T411q7aU

## Adding Support for More AI Models

To add support for other AI models, you will need to modify the script and add the necessary configurations, such as URL patterns and DOM selectors, for each new AI model. The script is designed to be extensible, so you can easily add support for additional AI models.

## License

This project is licensed under the MIT License.

Respository link: [chat-play/apps/octopus](https://github.com/mefengl/chat-play)

Build code repository link: https://github.com/mefengl/chat-scripts (this repo only contains the built code for greasyfork to automatically update the script)

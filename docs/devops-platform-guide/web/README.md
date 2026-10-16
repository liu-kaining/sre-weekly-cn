# 单页 HTML 的生成与检查

最终文件为上级目录的 [index.html](../index.html)。浏览器直接打开即可阅读，转发时只需发送这个 HTML 文件。

## 更新正文

编辑上级目录的 Markdown，再在仓库根目录执行：

```sh
node docs/devops-platform-guide/web/build.mjs
```

构建使用现有 Astro 项目安装的 Markdown 处理器和 Cheerio。尚未安装仓库依赖时，先执行 `npm ci`。

## 内容完整性检查

```sh
node --test docs/devops-platform-guide/web/build.test.mjs
```

检查段落、标题、表格单元格和代码是否保留，交叉链接是否有效，搜索是否覆盖正文，以及最终 HTML 是否引用外部运行资源。

## 浏览器检查

在含 Python Playwright 与 Google Chrome 的测试环境中执行：

```sh
python docs/devops-platform-guide/web/browser_test.py
```

默认将预览截图写入 `/tmp/delivery-guide-screenshots`，可通过 `GUIDE_SCREENSHOT_DIR` 指定输出目录。测试直接读取本地 HTML，在断网条件下验证搜索、导航、移动端、保存状态、代码复制、打印样式和无 JavaScript 阅读。

## 维护说明

- `template.html`、`styles.css` 和 `reader.js` 在构建时内嵌到最终 HTML。
- 正文从 Markdown 预渲染，页面运行时无需 fetch 或其他文件。
- 三张原始 Mermaid 图转换为内嵌 SVG，图示源码仍保留在折叠区域。
- 外部官方资料链接需要联网访问；正文、搜索、图示和阅读交互可以离线使用。
- 已读、练习勾选和主题通过本地存储保存；浏览器禁用存储时，阅读和会话内操作仍可用。

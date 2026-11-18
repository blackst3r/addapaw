# addapaw

用于研究和改进 [Luna 官网](https://luna.nodesk.tech/) 的独立工作仓库，重点是首次访问体验、信息结构、文案和用户行动路径。

## 免费肖像新版

在仓库根目录运行以下命令，再打开 [本地首页](http://127.0.0.1:8001/)。

```bash
python3 -m http.server 8001 --bind 127.0.0.1 --directory prototype
```

新版包含同一只猫的原照与真实生成对照、46 款可搜索风格、按款式进入的照片检查、工作室示例下载、手机流程演示与纹理工艺页。本机照片检查在浏览器内完成。使用自己的照片生成时，页面会打开正式创作服务并保留风格，正式站仍会先出现配框步骤。

- [新版实现、正式站接入和指标](docs/free-portrait-release.md)
- [体验者测试与授权手册](docs/pilot/pilot-guide.md)
- [此前的官网审查](docs/site-audit.md)和[浏览器观察](docs/browser-review.md)

本仓库提供独立的静态展示版；GitHub 分支变更不会部署到 luna.nodesk.tech。

## 查看成果

- [现站审查与文案建议](docs/site-audit.md)：证据、优先级、具体改法和验收条件。
- [浏览器走查](docs/browser-review.md)：实际通过的路径、截图及未执行项。
- [参考研究](docs/references.md)：NNGroup、web.dev、Notion、Stripe、Linear 的具体来源和适用边界。
- [调研任务书](docs/brief.md)：原始目标、范围和证据记录。

## 运行检查工具

需要 Python 3.10+，无需安装第三方依赖。外网访问使用环境现有代理和 TLS 校验。

```bash
cd /workspace/addapaw
python3 scripts/inspect_page.py https://luna.nodesk.tech/ --output reports/luna-baseline.json
```

也可检查本地 HTML：

```bash
python3 scripts/inspect_page.py --file /path/to/page.html
```

工具收集网页标题、描述、标题层级、链接、按钮、表单数量和图片替代文本。它只分析服务器返回的 HTML，不渲染 JavaScript，不能替代浏览器检查、用户访谈、无障碍测试或真实用户性能测量。请求失败时返回非零退出码，不生成成功报告。

## 在新的 Codex 聊天中使用

新任务需选择 `blackst3r/addapaw` 仓库和可用环境。GitHub 保存源码与文档，不保存正在运行的服务器、浏览器会话或工具进程；仓库 Public/Private 也不会改变这一点。

本项目只需 Python 3 运行提案，启动命令见上文和 [AGENTS.md](AGENTS.md)。有 Python 3 的新环境检出本仓库后即可运行；无需恢复本轮浏览器检查工具和截图来启动提案。自定义环境发布成功后可复用其快照，但新任务仍需重新启动服务。当前未验证环境发布或新任务恢复。

原有 `/workspace/chenwei.github.io` 仓库保持独立，不会被替换或混入本项目。

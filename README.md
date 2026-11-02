# addapaw

用于研究和改进 [Luna 官网](https://luna.nodesk.tech/) 的独立工作仓库，重点是首次访问体验、信息结构、文案和用户行动路径。

## 当前进度

- 已在 `/workspace/addapaw` 初始化本地 Git 仓库，默认分支 `main`。
- GitHub 远程仓库尚未创建：当前代理策略阻止 `api.github.com`。
- 现站尚未读取：代理在建立到 `luna.nodesk.tech` 的连接时返回 403，不能据此判断官网是否故障。
- 此仓库目前包含调研任务书和 HTML 基线检查工具；尚无现站源码或改版页面。

具体范围和待验证项目见 [调研任务书](docs/brief.md)。所有未访问的参考案例均标记为候选，不能当作已完成的调研。

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

## 下一步

1. 在环境设置中应用已保存的域名访问配置，再验证官网与 GitHub API 访问。
2. 用现有 GitHub 身份创建私有 `addapaw` 仓库并推送，记录真实远程地址。
3. 读取现站、用户路径和实际产品能力，完成有来源的竞品/体验分析。
4. 若能取得官网源码则在此整理改进分支；否则制作独立可审阅原型，明确与正式站的差别。

原有 `/workspace/chenwei.github.io` 仓库保持独立，不会被替换或混入本项目。

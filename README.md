# addapaw

用于研究和改进 [Luna 官网](https://luna.nodesk.tech/) 的独立工作仓库，重点是首次访问体验、信息结构、文案和用户行动路径。

## 当前进度

- 已在 `/workspace/addapaw` 初始化本地 Git 仓库，默认分支 `main`。
- 官网与 GitHub API 访问已经恢复。用户已创建 [blackst3r/addapaw](https://github.com/blackst3r/addapaw)，当前可见性为 Public；现有集成有读取和推送权限。集成此前不能自行创建仓库，此限制与已有仓库的推送权限不同。
- 已读取官网的 11 个公开入口，并完成首页桌面/手机视口、手机菜单、主题列表与创作入口的浏览器检查。没有上传照片、注册、付款或修改线上站点。
- 已阅读 6 个参考来源。研究结论和交互检查分别记录，避免把案例展示当作转化效果证据。
- 尚未取得正式站源码；本仓库的首页提案是独立静态原型。

## 查看成果

- [现站审查与文案建议](docs/site-audit.md)：证据、优先级、具体改法和验收条件。
- [浏览器走查](docs/browser-review.md)：实际通过的路径、截图及未执行项。
- [参考研究](docs/references.md)：NNGroup、web.dev、Notion、Stripe、Linear 的具体来源和适用边界。
- [调研任务书](docs/brief.md)：原始目标、范围和证据记录。

最先处理：首页包邮/首单促销与实体订单尚未开放、运费未确认之间的矛盾。免费数字创作和实体产品需要分开解释；隐私、支持与示例故事也需有事实支撑。

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

## 运行首页提案

```bash
cd /workspace/addapaw
python3 -m http.server 8001 --bind 127.0.0.1 --directory prototype
```

提案保留宠物照片与暖色品牌基调，突出当前预览阶段、明确主题选择动作、区分数字设计与未来实体选项。主题链接指向现有官网；未实现上传、生成、下载或下单，不能当作产品流程已经可用的证据。图片来自现有官网，需要网络。此命令仅供内部开发使用，不代表线上部署。

## 待完成

1. 取得正式站源码及当前产品事实，确认免费范围、订单阶段、配送、照片处理、真实支持与客户故事来源，再实施正式站修改。
2. 继续验证上传、生成、修改与下载，以及键盘、慢网/失败恢复、真实用户性能和目标用户任务。本轮未完成完整创作或购买测试。
3. 云环境发布目前仅显示通用失败提示，后台未提供具体失败原因。发布成功、新任务恢复和线上改版均未获验证。

## 在新的 Codex 聊天中使用

新任务需选择 `blackst3r/addapaw` 仓库和可用环境。GitHub 保存源码与文档，不保存正在运行的服务器、浏览器会话或工具进程；仓库 Public/Private 也不会改变这一点。

本项目只需 Python 3 运行提案，启动命令见上文和 [AGENTS.md](AGENTS.md)。有 Python 3 的新环境检出本仓库后即可运行；无需恢复本轮浏览器检查工具和截图来启动提案。自定义环境发布成功后可复用其快照，但新任务仍需重新启动服务。当前未验证环境发布或新任务恢复。

原有 `/workspace/chenwei.github.io` 仓库保持独立，不会被替换或混入本项目。

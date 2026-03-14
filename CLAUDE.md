# CLAUDE.md

## 项目概述

这是 **situchen.me** 的个人作家网站，基于静态 HTML 构建，托管于 GitHub Pages。网站展示了作者的个人介绍、文学作品集、插画作品以及日常随笔博客。

---

## 技术栈

| 类别 | 技术 |
|------|------|
| 网站类型 | 纯静态 HTML5 |
| 主题模板 | HTML5 UP - Miniport |
| 样式 | SASS/SCSS → 编译为 CSS |
| 图标 | Font Awesome |
| 字体 | Google Fonts（Open Sans） |
| 前端库 | jQuery、jQuery Scrolly |
| 端到端测试 | Playwright（TypeScript） |
| 托管 | GitHub Pages（域名：situchen.me） |

> 注意：SCSS 源文件位于 `assets/sass/`，已编译好的 CSS 位于 `assets/css/main.css`。修改样式时需同时更新两处，或直接编辑 CSS 文件。

---

## 目录结构

```
/
├── index.html               # 主页（作者介绍、作品集、联系方式）
├── blog.html                # 博客列表页（分类折叠目录）
├── causes.html              # "我关心的事"页（公益/倡导议题）
├── CNAME                    # GitHub Pages 自定义域名 (situchen.me)
├── assets/
│   ├── css/main.css         # 编译后的主样式表（勿直接频繁手编）
│   ├── sass/main.scss       # SCSS 样式源文件
│   └── js/                  # jQuery 及工具脚本
├── blogs/                   # 各博文独立 HTML 页面（共 12 篇）
├── images/                  # 图片资源（作者照片、作品封面、插图等）
├── videos/                  # 视频资源（数字绘画过程视频）
└── tests/                   # Playwright E2E 测试套件
    ├── package.json
    ├── playwright.config.ts
    ├── homepage.spec.ts
    ├── blog.spec.ts
    └── contact.spec.ts
```

---

## 内容结构

### 主页 (`index.html`)
- **Hero 区块**：作者照片与简介
- **Work 区块**：书籍写作、图像小说、兴趣爱好三类展示
- **Portfolio 区块**：近期出版作品（含亚马逊链接）
- **Contact 区块**：联系表单、社交媒体链接（Amazon、Linktree、微信二维码）

### 博客列表页 (`blog.html`)
- 按分类折叠展示博文目录
- 每篇文章有独立 HTML 页面（位于 `blogs/` 目录）

### 博文（`blogs/*.html`，共 12 篇）
| 文件名 | 内容 |
|--------|------|
| `chimes-post.html` | 诗歌 |
| `crystal-want-writing-post.html` | 关于写作的随笔 |
| `digital-illustration-post.html` | 数字插画教程 |
| `disney-problems-post.html` | 迪士尼批评（上） |
| `disney-problems-post-2.html` | 迪士尼批评（下） |
| `infinite-post.html` | 哲学随笔 |
| `introvert-life-post.html` | 内向者生活（图文版） |
| `introvert-post.html` | 内向者随笔 |
| `olivias-chapter-post.html` | 叙事散文 |
| `philosophy-religion-cults-post.html` | 哲学/宗教/邪教分析 |
| `slaughterhouse-animal-abuse-post.html` | 动物权益倡导 |
| `social-media-literature-post.html` | 社交媒体与文学评论 |

### 公益页 (`causes.html`)
- 性别平等倡导
- 屠宰场动物权益议题

---

## 本地开发

### 查看网站
无需构建步骤，直接用浏览器打开 `index.html`，或启动本地服务器：

```bash
# Python
python -m http.server 8000

# Node.js
npx http-server
```

### 运行测试
```bash
cd tests
npm install              # 安装依赖
npx playwright install   # 安装浏览器（首次需要）
npm test                 # 运行全部测试
npm run test:headed      # 显示浏览器窗口运行
npm run test:ui          # 交互式 UI 模式
npm run test:debug       # 调试模式
```

> 测试配置：Playwright，仅 Chromium，视口 1280×720，超时 30 秒。

---

## 常见开发任务

### 新增博文
1. 在 `blogs/` 下创建新 HTML 文件（参考现有博文结构）
2. 在 `blog.html` 的目录列表中添加对应链接
3. 如有配套图片，添加到 `images/` 目录

### 修改样式
- 快速修改：直接编辑 `assets/css/main.css`
- 主题色（珊瑚红）：`#e44c65`
- 响应式断点：`xlarge` / `large` / `medium` / `small`

### 更新主页内容
- 编辑 `index.html` 对应区块（Hero、Work、Portfolio、Contact）

### 部署
- 推送到 GitHub `master` 分支即可自动发布（GitHub Pages）

---

## 品牌与风格

- **风格定位**：简洁、文艺、个人化
- **主色调**：珊瑚红 `#e44c65`，背景浅灰/白
- **字体**：Open Sans（正文），无衬线
- **内容语言**：中英文混合（部分博文为中文，部分为英文）
- **作者域名**：[situchen.me](https://situchen.me)

---

## Git 分支规范

- 主分支：`master`（直接对应 GitHub Pages 发布）
- 功能/修改分支：`claude/<描述>-<session-id>`
- 推送命令：`git push -u origin <branch-name>`

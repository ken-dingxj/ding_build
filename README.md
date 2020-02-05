### 开始



### 规范的 commit (Angular规范)
> commit message
- **commit message 分3个部分：head, body, footer**
    - **head**: (type) (scop): subject
        - **type**: feat, fix, docs, style, refactor, test, chore, revert, perf, build
        - **score**: 影响范围
        - **subject**: 简短描述（动词开头，首字母小写，结尾不加.）
    - **body**: 详细描述
    - **footer**: (1) 不兼容改动；(2) 关闭issue
- **revert 有特殊的格式**
 ```
 # head: revert: <要被撤销的commit的head>
# body: This reverts commit <commit-hash>.
# eg:
	revert: docs add README.md
	This reverts commit a2d04c0b914785e4ff0cdf4baeea84d8611c7a61.

 ```
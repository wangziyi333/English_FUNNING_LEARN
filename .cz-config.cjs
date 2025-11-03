module.exports = {
  types: [
    { value: "feat", name: "feat:     新功能" },
    { value: "fix", name: "fix:      修复" },
    { value: "docs", name: "docs:     文档变更" },
    { value: "style", name: "style:    代码格式" },
    { value: "refactor", name: "refactor: 重构" },
    { value: "perf", name: "perf:     性能优化" },
    { value: "test", name: "test:     测试" },
    { value: "chore", name: "chore:    工具变动" }
  ],

  scopes: [
    { name: "component" },
    { name: "utils" },
    { name: "styles" },
    { name: "config" },
    { name: "deps" },
    { name: "other" }
  ],

  messages: {
    type: "选择提交类型:",
    scope: "选择修改范围:",
    customScope: "输入自定义修改范围:",
    subject: "简短描述提交:",
    body: "详细描述 (可选):",
    breaking: "重大变更描述 (可选):",
    footer: "关联的 ISSUES (可选):",
    confirmCommit: "确认提交?"
  },

  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"],
  skipQuestions: ["body", "breaking", "footer"],
  subjectLimit: 100
};

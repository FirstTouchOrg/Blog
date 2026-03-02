export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

const translations = {
  en: {
    langName: 'English',
    meta: {
      title: 'LevelUp Platform Blog',
      description:
        'Product updates, roadmap previews, and behind-the-scenes insights from the LevelUp Platform team.'
    },
    nav: {
      home: 'Home',
      blog: 'Blog',
      changelog: 'Changelog',
      roadmap: 'Roadmap',
      platform: 'Platform',
      docs: 'Docs'
    },
    hero: {
      eyebrow: 'LevelUp Platform Blog',
      title: 'Building the Future of Mission-Driven Work',
      body: 'Product updates, engineering deep-dives, and strategic insights from the team behind LevelUp.',
      primary: 'Read Changelog',
      secondary: 'Visit Platform'
    },
    intro: {
      title: 'Why LevelUp',
      body: 'We believe the best work happens when clarity meets momentum. LevelUp transforms scattered ambitions into curated questlines — transparent progress, real-time rewards, and a community that ships.'
    },
    dna: {
      eyebrow: 'Our Mission',
      title: 'Built for operators who refuse to settle.',
      body: 'Design, build, and reward mission-critical work from a single interface. LevelUp keeps momentum visible so your best players always know what to ship next.',
      bullets: ['Curated Questlines', 'Live XP Ledger', 'Reward Vaults']
    },
    features: [
      {
        title: 'Quest-First',
        body: 'Convert messy backlogs into structured questlines with unlockable milestones and embedded context.'
      },
      {
        title: 'Signal Rich',
        body: 'Smart alerts, scorecards, and one-click demos keep stakeholders synced without micromanaging.'
      },
      {
        title: 'Reward OS',
        body: 'Native bounties, XP, and gated drops keep contributors motivated and accountable.'
      }
    ],
    posts: {
      title: 'Latest Updates',
      empty: 'New updates are on the way — stay tuned.',
      backToStories: 'Back to all posts'
    },
    postAction: 'Read More',
    footer: {
      tagline: 'Curated quests, transparent rewards, and a community that ships. This is the future of mission-driven work.',
      crafted: 'Built by the LevelUp team',
      rights: 'All rights reserved.',
      visitPlatform: 'Visit Platform',
      contentLabel: 'Content',
      socialLabel: 'Connect'
    },
    languageSwitcher: 'Lang'
  },
  zh: {
    langName: '中文',
    meta: {
      title: 'LevelUp Platform 博客',
      description: 'LevelUp Platform 的产品更新、路线图预览与幕后洞察。'
    },
    nav: {
      home: '首页',
      blog: '博客',
      changelog: '更新日志',
      roadmap: '路线图',
      platform: '平台',
      docs: '文档'
    },
    hero: {
      eyebrow: 'LevelUp Platform 博客',
      title: '构建使命驱动型工作的未来',
      body: '来自 LevelUp 团队的产品更新、工程深度解析与战略洞察。',
      primary: '查看更新日志',
      secondary: '访问平台'
    },
    intro: {
      title: '为什么选择 LevelUp',
      body: '我们相信最好的工作诞生在清晰与动力的交汇处。LevelUp 将零散的野心转化为策展式任务线 —— 透明进度、即时奖励、以及一个持续交付的社区。'
    },
    dna: {
      eyebrow: '我们的使命',
      title: '为不将就的操盘者而生。',
      body: '集中设计、制作与奖励核心任务。LevelUp 让动能可视化，团队永远知道下一步要推进什么。',
      bullets: ['策展任务线', 'XP 即时总表', '奖励库']
    },
    features: [
      {
        title: '任务优先',
        body: '把杂乱需求整理成有关卡的任务线，内建脉络与资源。'
      },
      {
        title: '信号驱动',
        body: '智能通知、评分卡与一键 Demo，让关键人始终掌握进展。'
      },
      {
        title: '奖励系统',
        body: '原生赏金、XP 与解锁式福利，使贡献者持续投入。'
      }
    ],
    posts: {
      title: '最新动态',
      empty: '新内容即将上线，敬请期待。',
      backToStories: '返回文章列表'
    },
    postAction: '阅读全文',
    footer: {
      tagline: '策展式任务、透明奖励、持续交付的社区。这是使命驱动型工作的未来。',
      crafted: '由 LevelUp 团队打造',
      rights: '保留所有权利。',
      visitPlatform: '访问平台',
      contentLabel: '内容',
      socialLabel: '社交'
    },
    languageSwitcher: '语言'
  }
} as const;

export type Translation = (typeof translations)['en'];

export const getTranslations = (locale: Locale): Translation =>
  (translations as unknown as Record<Locale, Translation>)[locale];

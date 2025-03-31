import { RiskAssessmentQuestion } from '@/types/portfolio.types';

export const riskAssessmentQuestions: RiskAssessmentQuestion[] = [
  {
    id: 'time_horizon',
    question: 'question.risk_assessment.time_horizon',
    options: [
      { value: 0, label: 'option.risk_assessment.time_horizon.less_than_1_year' },
      { value: 1, label: 'option.risk_assessment.time_horizon.1_to_3_years' },
      { value: 2, label: 'option.risk_assessment.time_horizon.3_to_5_years' },
      { value: 3, label: 'option.risk_assessment.time_horizon.5_to_10_years' },
      { value: 4, label: 'option.risk_assessment.time_horizon.more_than_10_years' }
    ],
    help: 'help.risk_assessment.time_horizon'
  },
  {
    id: 'market_decline',
    question: 'question.risk_assessment.market_decline',
    options: [
      { value: 0, label: 'option.risk_assessment.market_decline.sell_all' },
      { value: 1, label: 'option.risk_assessment.market_decline.sell_some' },
      { value: 2, label: 'option.risk_assessment.market_decline.do_nothing' },
      { value: 3, label: 'option.risk_assessment.market_decline.buy_some_more' },
      { value: 4, label: 'option.risk_assessment.market_decline.buy_significantly_more' }
    ],
    help: 'help.risk_assessment.market_decline'
  },
  {
    id: 'investment_knowledge',
    question: 'question.risk_assessment.investment_knowledge',
    options: [
      { value: 0, label: 'option.risk_assessment.investment_knowledge.none' },
      { value: 1, label: 'option.risk_assessment.investment_knowledge.limited' },
      { value: 2, label: 'option.risk_assessment.investment_knowledge.good' },
      { value: 3, label: 'option.risk_assessment.investment_knowledge.extensive' },
      { value: 4, label: 'option.risk_assessment.investment_knowledge.professional' }
    ],
    help: 'help.risk_assessment.investment_knowledge'
  },
  {
    id: 'income_stability',
    question: 'question.risk_assessment.income_stability',
    options: [
      { value: 0, label: 'option.risk_assessment.income_stability.very_unstable' },
      { value: 1, label: 'option.risk_assessment.income_stability.somewhat_unstable' },
      { value: 2, label: 'option.risk_assessment.income_stability.average' },
      { value: 3, label: 'option.risk_assessment.income_stability.stable' },
      { value: 4, label: 'option.risk_assessment.income_stability.very_stable' }
    ],
    help: 'help.risk_assessment.income_stability'
  },
  {
    id: 'financial_goals',
    question: 'question.risk_assessment.financial_goals',
    options: [
      { value: 0, label: 'option.risk_assessment.financial_goals.preserve_capital' },
      { value: 1, label: 'option.risk_assessment.financial_goals.income_generation' },
      { value: 2, label: 'option.risk_assessment.financial_goals.balanced_growth' },
      { value: 3, label: 'option.risk_assessment.financial_goals.growth' },
      { value: 4, label: 'option.risk_assessment.financial_goals.aggressive_growth' }
    ],
    help: 'help.risk_assessment.financial_goals'
  }
];

export const riskProfileDescriptions = {
  conservative: {
    title: 'profile.conservative.title',
    description: 'profile.conservative.description',
    assetAllocation: {
      stocks: 20,
      bonds: 60,
      cash: 15,
      alternatives: 5
    }
  },
  moderate: {
    title: 'profile.moderate.title',
    description: 'profile.moderate.description',
    assetAllocation: {
      stocks: 40,
      bonds: 40,
      cash: 10,
      alternatives: 10
    }
  },
  balanced: {
    title: 'profile.balanced.title',
    description: 'profile.balanced.description',
    assetAllocation: {
      stocks: 60,
      bonds: 30,
      cash: 5,
      alternatives: 5
    }
  },
  growth: {
    title: 'profile.growth.title',
    description: 'profile.growth.description',
    assetAllocation: {
      stocks: 75,
      bonds: 15,
      cash: 0,
      alternatives: 10
    }
  },
  aggressive: {
    title: 'profile.aggressive.title',
    description: 'profile.aggressive.description',
    assetAllocation: {
      stocks: 90,
      bonds: 0,
      cash: 0,
      alternatives: 10
    }
  }
}; 
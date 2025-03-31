"use client";

import React, { useEffect } from 'react';
import { usePortfolioWizardStore } from '@/lib/store/portfolio-wizard-store';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { riskAssessmentQuestions } from '@/lib/constants/risk-assessment';
import { AlertCircle, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const RiskAssessment: React.FC = () => {
  const { t } = useTranslation();
  const { 
    riskAssessment,
    setRiskAnswer,
    calculateRiskProfile,
  } = usePortfolioWizardStore();

  // Calcular el perfil de riesgo automáticamente cuando todas las preguntas
  // hayan sido respondidas
  useEffect(() => {
    const allAnswersComplete = riskAssessmentQuestions.every(
      q => riskAssessment.answers[q.id] !== undefined
    );
    
    if (allAnswersComplete) {
      calculateRiskProfile();
    }
  }, [riskAssessment.answers, calculateRiskProfile]);

  // Renderizar el perfil calculado (si existe)
  const renderCalculatedProfile = () => {
    if (!riskAssessment.calculatedProfile) return null;

    const profiles = {
      conservative: {
        title: t('profile.conservative.title'),
        description: t('profile.conservative.description'),
        color: "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800",
        textColor: "text-blue-800 dark:text-blue-200",
        icon: <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      },
      moderate: {
        title: t('profile.moderate.title'),
        description: t('profile.moderate.description'),
        color: "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800",
        textColor: "text-green-800 dark:text-green-200",
        icon: <AlertCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
      },
      balanced: {
        title: t('profile.balanced.title'),
        description: t('profile.balanced.description'),
        color: "bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800",
        textColor: "text-yellow-800 dark:text-yellow-200",
        icon: <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
      },
      growth: {
        title: t('profile.growth.title'),
        description: t('profile.growth.description'),
        color: "bg-orange-50 border-orange-200 dark:bg-orange-950 dark:border-orange-800",
        textColor: "text-orange-800 dark:text-orange-200",
        icon: <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
      },
      aggressive: {
        title: t('profile.aggressive.title'),
        description: t('profile.aggressive.description'),
        color: "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800",
        textColor: "text-red-800 dark:text-red-200",
        icon: <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
      }
    };

    const profile = profiles[riskAssessment.calculatedProfile];

    return (
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-3 text-secondary-foreground">{t('risk_assessment.your_risk_profile')}</h3>
        <Card className={`${profile.color} border shadow-sm card-enhanced`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-2">
              {profile.icon}
              <h4 className={`text-lg font-bold ${profile.textColor}`}>{profile.title}</h4>
            </div>
            <p className={`${profile.textColor} font-medium`}>{profile.description}</p>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-secondary-foreground">{t('risk_assessment.title')}</h2>
        <p className="text-secondary-foreground/90 text-base">
          {t('risk_assessment.description')}
        </p>
      </div>

      <div className="space-y-6">
        {riskAssessmentQuestions.map((question) => (
          <Card key={question.id} className="shadow-sm border-border card-enhanced">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 text-secondary-foreground">{t(question.question)}</h3>
              
              <RadioGroup 
                value={riskAssessment.answers[question.id]?.toString() || ''}
                onValueChange={(value) => setRiskAnswer(question.id, parseInt(value))}
                className="space-y-3"
              >
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-start space-x-3 relative pl-7 rounded-md hover:bg-secondary/40 p-2 -ml-2 transition-colors group">
                    <RadioGroupItem 
                      value={option.value.toString()} 
                      id={`${question.id}-${index}`}
                      className="absolute left-2 top-2.5"
                    />
                    <Label 
                      htmlFor={`${question.id}-${index}`}
                      className="font-medium cursor-pointer text-secondary-foreground text-sm group-hover:text-secondary-foreground"
                    >
                      {t(option.label)}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        ))}
      </div>

      {renderCalculatedProfile()}
      
      <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800 mt-4">
        <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0" />
        <p className="text-blue-800 dark:text-blue-200 text-sm">
          {t('risk_assessment.info_message')}
        </p>
      </div>
    </div>
  );
};

export default RiskAssessment; 

import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { languages } from '../data/scenarios';
import { Globe } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onLanguageChange }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col items-start gap-2 w-full">
      <label className="text-sm font-medium text-gray-700">Quale lingua vorresti allenare?</label>
      <div className="flex items-center gap-2 w-full">
        <Globe className="h-4 w-4 text-muted-foreground" />
        <Select value={selectedLanguage} onValueChange={onLanguageChange}>
          <SelectTrigger className={isMobile ? "w-full max-w-[180px]" : "w-[220px]"}>
            <SelectValue placeholder="Scegli lingua" />
          </SelectTrigger>
          <SelectContent>
            {languages.map(language => (
              <SelectItem key={language.id} value={language.id}>
                <span className="flex items-center gap-2">
                  <span>{language.flag}</span>
                  <span>{isMobile ? language.name : language.nativeName}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default LanguageSelector;

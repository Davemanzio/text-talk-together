
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
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <Select value={selectedLanguage} onValueChange={onLanguageChange}>
        <SelectTrigger className={isMobile ? "w-[120px]" : "w-[150px]"}>
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
  );
};

export default LanguageSelector;

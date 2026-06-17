import React from 'react';
import Contact from '../components/website/Contact.tsx';

interface ContactPageProps {
  onLoginClick: () => void;
  onStartTrialClick: () => void;
}

export default function ContactPage({
  onLoginClick,
  onStartTrialClick
}: ContactPageProps) {
  return (
    <Contact 
      onLoginClick={onLoginClick} 
      onStartTrialClick={onStartTrialClick} 
    />
  );
}

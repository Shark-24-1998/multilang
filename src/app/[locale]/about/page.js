import { useTranslations } from 'next-intl'
import React from 'react'

const About = () => {  
  const t = useTranslations("HomePage")
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <h1 className="text-4xl font-semibold text-gray-800">
        {t('about')}
      </h1>
    </div>
  )
}

export default About

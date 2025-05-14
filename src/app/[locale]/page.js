import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <h1 className="text-4xl font-semibold text-gray-800">
        {t('title')}
      </h1>
    </div>
  );
}

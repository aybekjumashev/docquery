export type Language = 'en' | 'kaa' | 'ru' | 'uz';

export const languageOptions: { value: Language; label: string }[] = [
    { value: 'en', label: 'English' },
    { value: 'kaa', label: 'Qaraqalpaqsha' },
    { value: 'ru', label: 'Русский' },
    { value: 'uz', label: 'Oʻzbekcha' },
];

export const translations: Record<Language, Record<string, string>> = {
  en: {
    appTitle: 'DocQuery',
    appSubtitle: 'Get an instant summary and ask questions about your documents.',
    dragAndDrop: 'Drag & drop your document here',
    orClick: 'or click to select a file (PDF, DOCX, TXT)',
    summary: 'Summary',
    startOver: 'Start Over',
    askQuestions: 'Ask Questions',
    askAnything: 'Ask anything about the document content.',
    chatPlaceholder: 'Chat history will appear here.',
    typeYourQuestion: 'Type your question...',
    errorOccurred: 'An Error Occurred',
    tryAgain: 'Try again',
    parsingMessage: 'Parsing document...',
    summaryMessage: 'Generating summary...',
    chatMessage: 'Initializing chat...',
    developedBy: 'Developed by Aybek Jumashev'
  },
  kaa: {
    appTitle: 'DocQuery',
    appSubtitle: 'Hújjetlerińizdiń qısqasha mazmunın alıń hám sorawlar beriń.',
    dragAndDrop: 'Hújjetti usı jerge súyrep álıp keliń',
    orClick: 'yamasa fayldı saylaw ushın basıń (PDF, DOCX, TXT)',
    summary: 'Mazmunı',
    startOver: 'Qaytadan baslaw',
    askQuestions: 'Sorawlar beriw',
    askAnything: 'Hújjet mazmunı haqqında soraw beriń.',
    chatPlaceholder: 'Sáwbet tariyxı usı jerde kórinedi.',
    typeYourQuestion: 'Sorawıńızdı jazıń...',
    errorOccurred: 'Qátelik júz berdi',
    tryAgain: 'Qaytadan urınıp kóriń',
    parsingMessage: 'Hújjet analiz etilmekte...',
    summaryMessage: 'Mazmunı tayarlanbaqta...',
    chatMessage: 'Sáwbet baslanbaqta...',
    developedBy: 'Islep shıǵarıwshı: Aybek Jumashev'
  },
  ru: {
    appTitle: 'DocQuery',
    appSubtitle: 'Получите краткое изложение и задайте вопросы по вашим документам.',
    dragAndDrop: 'Перетащите ваш документ сюда',
    orClick: 'или нажмите, чтобы выбрать файл (PDF, DOCX, TXT)',
    summary: 'Краткое изложение',
    startOver: 'Начать сначала',
    askQuestions: 'Задать вопросы',
    askAnything: 'Задайте любой вопрос по содержанию документа.',
    chatPlaceholder: 'История чата появится здесь.',
    typeYourQuestion: 'Введите ваш вопрос...',
    errorOccurred: 'Произошла ошибка',
    tryAgain: 'Попробовать снова',
    parsingMessage: 'Анализ документа...',
    summaryMessage: 'Создание резюме...',
    chatMessage: 'Инициализация чата...',
    developedBy: 'Разработчик: Айбек Жумашев'
  },
  uz: {
    appTitle: 'DocQuery',
    appSubtitle: 'Hujjatlaringiz haqida tezkor xulosa oling va savollar bering.',
    dragAndDrop: 'Hujjatingizni shu yerga sudrab olib keling',
    orClick: 'yoki faylni tanlash uchun bosing (PDF, DOCX, TXT)',
    summary: 'Xulosa',
    startOver: 'Boshidan boshlash',
    askQuestions: 'Savollar berish',
    askAnything: 'Hujjat mazmuni boʻyicha istalgan savolni bering.',
    chatPlaceholder: 'Chat tarixi shu yerda paydo boʻladi.',
    typeYourQuestion: 'Savolingizni yozing...',
    errorOccurred: 'Xatolik yuz berdi',
    tryAgain: 'Qayta urinib ko\'ring',
    parsingMessage: 'Hujjat tahlil qilinmoqda...',
    summaryMessage: 'Xulosa yaratilmoqda...',
    chatMessage: 'Chat boshlanmoqda...',
    developedBy: 'Aybek Jumashev tomonidan ishlab chiqilgan'
  }
};
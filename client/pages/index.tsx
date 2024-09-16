const HomePage = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-96 h-96 rounded-full bg-blue-500/60 filter blur-[120px] opacity-40"></div>
      </div>
      <div className="relative z-10 text-center">
        <img
          src={'/images/logo.svg'}
          alt="Logo"
          className="mx-auto mb-6 w-40 h-40 object-contain" 
        />
        <p className="text-3xl font-bold xl:text-5xl leading-normal xl:leading-[72px] px-6">
          نظام إدارة الشقق والوحدات الفندقية
          <br className="hidden xl:block" />
          لمدراء ومستثمري العقار في السياحة
        </p>
        <p className="w-full px-6 text-base text-center text-gray-600 xl:text-lg xl:w-1/2 mt-4 mx-auto">
          إدارة فعالة لوحداتك وحجوزاتك مع سهولة إصدار العقود والسندات، وتحكم كامل في التوافرية والأسعار عبر قنوات الحجز الإلكترونية.
          تحكم في الإشغال وتحليل أداء القنوات والتقارير المالية في نظام واحد.
        </p>
      </div>
    </div>
  );
};

export default HomePage;

import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Sidebar from '../../../assestComponent/Sidebar';

const ProfileExplorer = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] mx-auto mt-20">
      <Sidebar/>
      <h1 className="text-3xl font-bold mb-4 text-right">استكشف الملفات الشخصية</h1>
      <p className="text-gray-600 mb-6 text-right">إليك الأدوات التي تحتاج إلى معرفتها.</p>
      
      <div className="bg-green-100 rounded-full h-2 mb-4">
        <div className="bg-green-500 rounded-full h-2 w-0"></div>
      </div>
      
      <p className="text-sm text-gray-500 mb-6 text-right">0% مكتمل</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h3 className="font-bold mb-2 text-right">أدوات التدريس</h3>
          <p className="text-sm text-right">قم بإعداد درس وشاهد مدى سهولة مشاركته مع طلابك.</p>
        </div>
        
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="font-bold mb-2 text-right">مواعيد الاستشارة المثالية</h3>
          <p className="text-sm text-right">جدولة الاستشارات تلقائيًا عندما يكون عملاؤك أكثر تفاعلاً.</p>
        </div>
        
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="font-bold mb-2 text-right">نظرة عامة على الأداء</h3>
          <p className="text-sm text-right">شاهد كيف تؤدي جميع ملفاتك الشخصية في مكان واحد.</p>
        </div>
        
        <button className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
          <ChevronRight className="h-6 w-6 text-gray-600" />
        </button>
        
        <button className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
          <ChevronLeft className="h-6 w-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default ProfileExplorer;
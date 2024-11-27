exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('teacher').del()
      .then(function () {
          // Inserts seed entries
          return knex('teacher').insert([
              {
                  name: 'Ali Ahmed',
                  email: 'ali.ahmed@example.com',
                  password: 'hashed_password_1', // تأكد من استخدام كلمة مرور مشفرة
                  gender: 'male',
                  school_name: 'International School',
                  university_name: 'University of Education',
                  certificate_img: 'https://example.com/certificate1.png',
                  teacher_img: 'https://example.com/teacher1.png',
                  grade: '8',
                  isActivate: true,
                  otp: null,
                  national_id: '123456789',
                  role: 'teacher',
                  language: 'Arabic',
                  phone_number: '1234567890',
                  facebook: 'https://facebook.com/ali.ahmed',
                  instagram: 'https://instagram.com/ali.ahmed',
                  linkedin: 'https://linkedin.com/in/ali-ahmed',
                  consultation_fee: 50.00,
                  years_of_experience: 5,
                  specialization: 'Mathematics',
                  services: ['Tutoring', 'Consultation'],
                  quiz_payment: 10.00,
              },
              {
                  name: 'Sara Al-Farsi',
                  email: 'sara.farsi@example.com',
                  password: 'hashed_password_2', // تأكد من استخدام كلمة مرور مشفرة
                  gender: 'female',
                  school_name: 'City High School',
                  university_name: 'College of Arts',
                  certificate_img: 'https://example.com/certificate2.png',
                  teacher_img: 'https://example.com/teacher2.png',
                  grade: '10',
                  isActivate: true,
                  otp: null,
                  national_id: '987654321',
                  role: 'consultant',
                  language: 'Arabic',
                  phone_number: '0987654321',
                  facebook: 'https://facebook.com/sara.farsi',
                  instagram: 'https://instagram.com/sara.farsi',
                  linkedin: 'https://linkedin.com/in/sara-farsi',
                  consultation_fee: 75.00,
                  years_of_experience: 8,
                  specialization: 'Physics',
                  services: ['Consultation', 'Workshops'],
                  quiz_payment: 15.00,
              }
              // يمكنك إضافة المزيد من المعلمين كما تحتاج
          ]);
      });
};

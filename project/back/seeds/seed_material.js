exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('materials').del()
    .then(function () {
      // Inserts seed entries
      return knex('materials').insert([
        { name: 'Math' },
        { name: 'Science' },
        { name: 'English' },
        { name: 'History' },
        { name: 'Geography' },
        { name: 'Physics' },
        { name: 'Chemistry' },
        { name: 'Music' },
        { name: 'Philosophy' },
        { name: 'Art' },
        { name: 'Biology' },
        { name: 'Computer Science' },
        { name: 'Physical Education' },
        { name: 'Economics' },
        { name: 'Sociology' },
        { name: 'Psychology' },
        { name: 'Political Science' },
        { name: 'Business Studies' },
        { name: 'Environmental Science' },
        { name: 'Drama' },
        { name: 'Foreign Languages' },
        { name: 'Engineering' },
        { name: 'Literature' },
      ]);
    });
};

              
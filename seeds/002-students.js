
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Max M', cohort_id: 2},
        {name: 'Ben M', cohort_id: 1},
        {name: 'Rick D', cohort_id: 3},
      ]);
    });
};

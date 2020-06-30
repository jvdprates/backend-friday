exports.up = function(knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments();
        table.string('firebase_id').notNullable();
        table.string('name').notNullable();
        table.string('surname').notNullable();
        table.string('email').notNullable();
        table.date('birthdate').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('bars', function (table) {
        table.increments();
        table.string('firebase_id').notNullable();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.string('email').notNullable();
        table.string('image_id');
        table.enu('price_range', [0 , 1 , 2, 3, 4]).notNullable();
        table.string('zipcode').notNullable();
        table.string('phonenumber');
        table.string('state').notNullable();
        table.string('city').notNullable();
        table.string('neighborhood').notNullable();
        table.string('street').notNullable();
        table.string('number').notNullable();
        table.string('complement');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('bars')
    .dropTable('users');
};

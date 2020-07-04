exports.up = function(knex) {
    return knex.schema.createTable('users', function (table) {
        table.string('id').primary().notNullable();
        table.string('payment_cards_id').references('id').inTable('payment_cards').onDelete('SET NULL');
        table.string('firebase_id').notNullable();
        table.string('name').notNullable();
        table.string('surname').notNullable();
        table.string('email').notNullable();
        table.date('birthdate').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('payment_cards', function (table) {
        table.string('id').primary().notNullable();
        table.string('asas_id').notNullable();
    })
    .createTable('bars', function (table) { 
        table.string('id').primary().notNullable();
        table.string('firebase_id').notNullable();
        table.string('name').notNullable();
        table.string('image_id');
        table.string('description');
        table.string('phone').notNullable();
        table.string('email').notNullable();
        table.string('postal_code').notNullable();
        table.string('state').notNullable();
        table.string('city').notNullable();
        table.string('neighborhood').notNullable();
        table.string('street').notNullable();
        table.integer('number').notNullable();
        table.string('complement');
        table.float('lat').notNullable();
        table.float('long').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable(('categories'), function (table) {
        table.string('id').primary().notNullable();
        table.string('category_name').notNullable();
    })
    .createTable(('bars_categories'), function (table) {
        table.increments();
        table.string('bars_id').references('id').inTable('bars').onDelete('CASCADE').notNullable();
        table.string('categories_id').references('id').inTable('categories').onDelete('CASCADE').notNullable();
    })
    .createTable(('products'), function (table) {
        table.string('id').primary().notNullable();
        table.string('bars_id').references('id').inTable('bars').onDelete('CASCADE').notNullable();
        table.string('image_id');
        table.float('price').notNullable();
        table.string('description').notNullable();
        table.string('name').notNullable();
    })
    .createTable(('events'), function (table) {
        table.increments();
        table.string('bars_id').references('id').inTable('bars').onDelete('CASCADE').notNullable();
        table.string('description'); 
        table.string('img_link');
        table.string('category'); 
    })
    .createTable(('comments'), function (table) {
        table.increments();
        table.string('bars_id').references('id').inTable('bars').onDelete('CASCADE').notNullable();
        table.string('users_id').references('id').inTable('users').onDelete('CASCADE').notNullable();
        table.string('comment').notNullable();
    })
    .createTable(('avaliations'), function (table) {
        table.increments();
        table.string('bars_id').references('id').inTable('bars').onDelete('CASCADE').notNullable();
        table.string('users_id').references('id').inTable('users').onDelete('CASCADE').notNullable();
        table.integer('bar_space');
        table.integer('bar_service');
        table.integer('bar_cleaning');
        table.integer('bar_foods');
        table.integer('bar_drinks');
        table.integer('bar_price');
    })
    .createTable(('tables'), function (table) {
        table.string('id').primary().notNullable();
        table.string('bars_id').references('id').inTable('bars').onDelete('CASCADE').notNullable();
        table.integer('table_number').notNullable();
    })
    .createTable(('order_sheets'), function (table){
        table.string('id').primary().notNullable();
        table.string('user_id').references('id').inTable('users').onDelete('SET NULL').notNullable();
        table.string('payment_method').notNullable();
        table.boolean('paid').defaultTo(false);
        table.boolean('checking_out').defaultTo(false);
        table.string('tables_id').references('id').inTable('tables').notNullable();
    })
    .createTable(('orders'), function (table){
        table.string('id').primary().notNullable();
        table.string('products_id').references('id').inTable('products').notNullable();
        table.string('order_sheets_id').references('id').inTable('order_sheets').notNullable();
        table.enu('status', ['waiting','preparing','delivered']).notNullable();
        table.integer('amount').notNullable();
        table.float('price').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('orders')
    .dropTable('order_sheets')
    .dropTable('tables')
    .dropTable('avaliations')
    .dropTable('comments')
    .dropTable('events')
    .dropTable('products')
    .dropTable('bars_categories')
    .dropTable('categories')
    .dropTable('bars')
    .dropTable('payment_cards')
    .dropTable('users');
};

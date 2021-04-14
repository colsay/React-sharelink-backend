exports.up = function (knex) {
    return knex.schema.createTable("sharelink", (table) => {
        table.increments();
        table.string("title").notNull();
        table.string("url").unique();
        table.string("tags");
        table.string("vvid");
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("sharelink");
};

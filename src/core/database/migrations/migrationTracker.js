const MigrationTracker = {

  hasRun(name) {

    const rows = DBInstance.table("migrations")
      .where("migration", name);

    return rows.length > 0;
  },

  log(name) {

    DBInstance.table("migrations").insert({
      id: Utilities.getUuid(),
      migration: name,
      executed_at: new Date()
    });

  }
};
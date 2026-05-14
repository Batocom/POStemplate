function runMigrations() {

  const schemas = getSchemaRegistry();

  // STEP 1 — ENSURE MIGRATIONS TABLE EXISTS FIRST
  const migrationSchema = schemas.find(
    s => s.table === "migrations"
  );

  const migrationSheet = createSheetIfNotExists(
    migrationSchema.table
  );

  setSheetHeaders(
    migrationSheet,
    migrationSchema.columns
  );

  Logger.log("Migration table ready");

  // STEP 2 — RUN ALL OTHER MIGRATIONS
  schemas.forEach(schema => {

    // SKIP migrations table (already handled)
    if (schema.table === "migrations") {
      return;
    }

    // SKIP already executed migrations
    if (MigrationTracker.hasRun(schema.table)) {

      Logger.log(`Skipped: ${schema.table}`);

      return;
    }

    // CREATE TABLE
    const sheet = createSheetIfNotExists(
      schema.table
    );

    setSheetHeaders(sheet, schema.columns);

    // LOG MIGRATION
    MigrationTracker.log(schema.table);

    Logger.log(`Migrated: ${schema.table}`);

  });

}
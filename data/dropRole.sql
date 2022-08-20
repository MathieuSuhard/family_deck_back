BEGIN; -- début de la transaction

DROP TABLE IF EXISTS "family", "member", "member_data", "role", "todolist", "item", "family_has_member", "member_has_todolist", "member_has_role" ;

CREATE TABLE "role" (
  "role_id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "role_label" TEXT NOT NULL, 
  "role_icon" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

COMMIT;
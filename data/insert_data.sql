BEGIN; -- début de la transaction

DROP TABLE IF EXISTS "family", "member", "member_data", "role", "todolist", "item", "family_has_member", "member_has_todolist", "member_has_role" ;

-- table membre liste tous les membres 

CREATE TABLE "member" (
  "member_id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "member_lastname" TEXT NOT NULL,
  "member_firstname" TEXT NOT NULL,
  "member_email" TEXT NOT NULL,
  "member_password" VARCHAR(255) NOT NULL,
  "member_username" TEXT NOT NULL, 
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);


COMMIT; -- fin de la transaction
BEGIN; -- début de la transaction

DROP TABLE IF EXISTS "family", "member_data", "role", "todolist", "item", "family_has_member", "member_has_todolist", "member_has_role" ;

-- table famille

CREATE TABLE "family" (
  "family_id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "family_name" TEXT NOT NULL,
  "family_description" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

-- table member__data regroupe les infos utilies des membres

CREATE TABLE "member_data" (
  "member_data_id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "member_data_date_birth" DATE,
  "member_data_size" SMALLINT,
  "member_data_top_size" TEXT,
  "member_data_bottom_size" TEXT,
  "member_data_shoes_size" SMALLINT,
  "member_data_school" TEXT,
  "member_data_hobbies" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ,
  "member_id" INTEGER NOT NULL REFERENCES "member"("member_id") ON DELETE CASCADE
);

-- table role regroupe le rôle de chaque membre

CREATE TABLE "role" (
  "role_id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "role_label" TEXT NOT NULL, 
  "role_icon" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

-- table todolist 

CREATE TABLE "todolist" (
  "todolist_id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "todolist_title" TEXT NOT NULL,
  "todolist_color" TEXT,
  "todolist_position" SMALLINT NOT NULL DEFAULT 0,
  "todolist_status" BOOLEAN NOT NULL DEFAULT FALSE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ,
  "member_id" INTEGER NOT NULL REFERENCES "member"("member_id") ON DELETE CASCADE
);

-- table item  

CREATE TABLE "item" (
  "item_iD" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "item_title" TEXT NOT NULL,
  "item_color" TEXT,
  "item_position" SMALLINT NOT NULL DEFAULT 0,
  "item_deadline" TEXT,
  "item_status" BOOLEAN NOT NULL DEFAULT FALSE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ,
  "todolist_id" INTEGER NOT NULL REFERENCES "todolist"("todolist_id") ON DELETE CASCADE
);

-- table jonction family / member

CREATE TABLE "family_has_member" (
  "family_has_member_id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "family_has_member_family_id" INTEGER NOT NULL REFERENCES "family"("family_id") ON DELETE CASCADE,
  "family_has_member_member_id" INTEGER NOT NULL REFERENCES "member"("member_id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- table jonction member / todolist_

CREATE TABLE "member_has_todolist" (
   "member_has_todolist_Id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   "family_has_member_member_id" INTEGER NOT NULL REFERENCES "family"("family_id") ON DELETE CASCADE,
   "family_has_member_todolist_id" INTEGER NOT NULL REFERENCES "todolist"("todolist_id") ON DELETE CASCADE,
   "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- table jonction member / role

CREATE TABLE "member_has_role" (
    "member_has_role_id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "member_has_role_member_id" INTEGER NOT NULL REFERENCES "member"("member_id") ON DELETE CASCADE,
    "member_has_role_role_id" INTEGER NOT NULL REFERENCES "role"("role_id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);



COMMIT; -- fin de la transaction
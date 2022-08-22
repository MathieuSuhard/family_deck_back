BEGIN;

DROP TABLE IF EXISTS "family_has_member", "family_has_todolist", "member_has_role" ;


-- table jonction family / member

CREATE TABLE "family_has_member" (
  "family_has_member_id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "family_has_member_family_id" INTEGER NOT NULL REFERENCES "family"("family_id") ON DELETE CASCADE,
  "family_has_member_member_id" INTEGER NOT NULL REFERENCES "member"("member_id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- table jonction member / role

CREATE TABLE "member_has_role" (
    "member_has_role_id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "member_has_role_member_id" INTEGER NOT NULL REFERENCES "member"("member_id") ON DELETE CASCADE,
    "member_has_role_role_id" INTEGER NOT NULL REFERENCES "role"("role_id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- table jonction family / todolist

CREATE TABLE "family_has_todolist" (
   "family_has_todolist_Id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   "family_has_todolist_family_id" INTEGER NOT NULL REFERENCES "family"("family_id") ON DELETE CASCADE,
   "family_has_todolist_todolist_id" INTEGER NOT NULL REFERENCES "todolist"("todolist_id") ON DELETE CASCADE,
   "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


INSERT INTO "family_has_member"("family_has_member_family_id", "family_has_member_member_id") VALUES 
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(2, 5);

INSERT INTO "member_has_role"("member_has_role_member_id", "member_has_role_role_id") VALUES 
(1, 1),
(2, 3),
(3, 2),
(4, 1),
(5, 3);

INSERT INTO "family_has_todolist"("family_has_todolist_family_id", "family_has_todolist_todolist_id") VALUES 
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(2, 5),
(1, 6);

COMMIT; -- fin de la transaction























BEGIN;

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

INSERT INTO "todolist"("todolist_title", "todolist_color", "todolist_position", "todolist_status", "member_id") VALUES 
('post1', '#ff00ff', 1, FALSE, 1),
('post2', '#ff00ff', 1, FALSE, 2),
('post3', '#ff00ff', 1, FALSE, 3);

INSERT INTO "item"("item_title", "item_color", "item_position", "item_deadline", "item_status", "todolist_id") VALUES 
('repas', '#ff00ff', 1, '30/09/2022', FALSE, 1),
('course', '#ff00ff', 2, '25/08/2022', FALSE, 1),
('jardin', '#ff00ff', 1, '30/09/2022', FALSE, 2);

COMMIT; -- fin de la transaction
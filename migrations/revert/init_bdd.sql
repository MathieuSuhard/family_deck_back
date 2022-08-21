-- Revert family_deck:init_bdd from pg

BEGIN; -- début de la transaction

DROP TABLE IF EXISTS "family", "member", "member_data", "role", "todolist", "item", "family_has_member", "member_has_todolist", "member_has_role" ;

COMMIT; -- fin de la transaction


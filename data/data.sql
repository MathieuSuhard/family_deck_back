BEGIN;

INSERT INTO "family"("family_name", "family_description") VALUES 
('hobbit', null),
('superman', 'famille de super héro du dev');

INSERT INTO "role"("role_label", "role_icon") VALUES 
('papa', '/icone/papa.png'),
('maman', '/icone/maman.png'),
('enfant', '/icone/enfant.png');

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

INSERT INTO "member_data"("member_data_date_birth", "member_data_size", "member_data_top_size", "member_data_bottom_size", "member_data_shoes_size", "member_data_school", "member_data_hobbies" ,"member_id") VALUES 
('25/01/1980', 180, 'xl', '40', 46, 'Oclock', 'rien', 1),
('25/01/2000', 160, 'xxl', '40', 46, 'Oclock', 'rien', 2),
('25/01/1000', 100, 'xxxl', '50', 45, 'la baron', 'rien', 3);

INSERT INTO "role"("role_label", "role_icon") VALUES 
('papa', '/icone/papa.png'),
('maman', '/icone/maman.png'),
('enfant', '/icone/enfant.png');

INSERT INTO "todolist"("todolist_title", "todolist_color", "todolist_position", "todolist_status", "member_id") VALUES 
('post1', '#ff00ff', 1, FALSE, 1),
('post2', '#ff00ff', 1, FALSE, 2),
('post3', '#ff00ff', 1, FALSE, 3);

INSERT INTO "item"("item_title", "item_color", "item_position", "item_deadline", "item_status", "todolist_id") VALUES 
('repas', '#ff00ff', 1, '30/09/2022', FALSE, 1),
('course', '#ff00ff', 2, '25/08/2022', FALSE, 1),
('jardin', '#ff00ff', 1, '30/09/2022', FALSE, 2);

INSERT INTO "member_has_todolist"("family_has_member_member_id", "family_has_member_todolist_id") VALUES 
(1, 1),
(1, 2),
(2, 3);

COMMIT; -- fin de la transaction
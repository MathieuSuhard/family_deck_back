

/* requete recuper membre d une meme famille*/

SELECT family.family_name, family.family_id, member.* AS family
FROM family_has_member
JOIN family
    ON family_has_member.family_has_member_family_id = family.family_id
JOIN member
	ON family_has_member.family_has_member_member_id = member.member_id
WHERE family.family_id = 1
;

/* requete recuper tout les membres avec leurs roles*/

SELECT family.*, member.*,role.* AS family
FROM family_has_member
JOIN family
    ON family_has_member.family_has_member_family_id = family.family_id
JOIN member
	ON family_has_member.family_has_member_member_id = member.member_id
JOIN member_has_role
    ON member.member_id = member_has_role.member_has_role_member_id
JOIN role
	ON member_has_role.member_has_role_role_id = role.role_id		
;

/* requete recuper tout les membres avec leurs roles et les todolistes*/

SELECT DISTINCT family.family_name, todolist.todolist_id
FROM family_has_member
JOIN family
    ON family_has_member.family_has_member_family_id = family.family_id
JOIN member
	ON family_has_member.family_has_member_member_id = member.member_id
JOIN member_has_role
    ON member.member_id = member_has_role.member_has_role_member_id
JOIN role
	ON member_has_role.member_has_role_role_id = role.role_id
JOIN member_has_todolist
    ON member.member_id = member_has_todolist.family_has_member_member_id
JOIN todolist
	ON member_has_todolist.family_has_member_todolist_id = todolist.todolist_id
JOIN item
	ON todolist.todolist_id = item.todolist_id
WHERE family.family_id = 2	
;

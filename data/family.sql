BEGIN;

DROP TABLE IF EXISTS "family", "member", "member_data", "role", "todolist", "item", "family_has_member", "member_has_todolist", "member_has_role" ;

CREATE TABLE "family" (
  "family_id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "family_name" TEXT NOT NULL,
  "family_description" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

INSERT INTO "family"("family_name", "family_description") VALUES 
('hobbit', null),
('superman', 'famille de super héro du dev');

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

BEGIN;

INSERT INTO "member"
(
    "member_lastname",
    "member_firstname",
    "member_email",
    "member_password",
    "member_username"
)
VALUES
(
		'Sacquet',
		'Bilbo',
		'terremilieu@free.fr',
		'$2b$10$w/QpWSe.oZcOX2KoWfC.u.hrRK4wNrTFxSkTcza4HRpR4erLli.2e',
		'terremilieu@free.fr'

        ), -- superpass
        (

		'Sacquet',
		'Frodon',
		'terrehobbit@free.fr',
		'$2b$10$3NmoaKrTDQpRgndT8GM7w.j9VMisebIbXpCKG1O/XSsMoUjoYubZi',
		'terrehobbit@free.fr'

        ), -- superpass
        (

		'Brandibouc',
		'Amaranth',
		'Gorbadoc@free.fr',
		'$2b$10$6KuNZlNeE3aCVQCNPWr5nuo8IPVRsXVNNiNovz75dYF7d4lzMUslW',
		'Gorbadoc@free.fr'

        ), -- superpass
        (

		'Bolgeurre',
		'Odovacar',
		'Bolgeurre@free.fr',
		'$2b$10$I26oizHPor2sUwPHS1YEquz8027vE4.F2Cr.pLI4oT.87k4zIpTTC',
		'Bolgeurre@free.fr'
         
        ), -- superpass
        (

		'Bolgeurre',
		'Jule',
		'BolgeurreJule@free.fr',
		'$2b$10$AAbM4KcifObhL.VyWdC4Xu7T3/Z70K4ck/WASBONIgAv8qoKSMMe.',
		'BolgeurreJule@free.fr'

);

COMMIT; -- fin de la transaction

<# scrpit de deploy #>

psql -d postgres://pdsahmow:WyYMkNV1CZLZCLEoGwSUqBhOkhqsfNmK@abul.db.elephantsql.com/pdsahmow -f projet-02-family-deck-back\data\family.sql

psql -d postgres://pdsahmow:WyYMkNV1CZLZCLEoGwSUqBhOkhqsfNmK@abul.db.elephantsql.com/pdsahmow -f projet-02-family-deck-back\data\role.sql

psql -d postgres://pdsahmow:WyYMkNV1CZLZCLEoGwSUqBhOkhqsfNmK@abul.db.elephantsql.com/pdsahmow -f projet-02-family-deck-back\data\todolist.sql

psql -d postgres://pdsahmow:WyYMkNV1CZLZCLEoGwSUqBhOkhqsfNmK@abul.db.elephantsql.com/pdsahmow -f projet-02-family-deck-back\data\table_jonction.sql




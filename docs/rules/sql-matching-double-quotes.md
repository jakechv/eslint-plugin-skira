## SQL: Matching Double Quotes

Checks if you have incorrectly formatted double quotes for a postgres query.

- OK: select "tableName"."fieldName" from "tableName";
- BAD: select tableName"."fieldName" from "tableName"; || select "tableName."fieldName" from "tableName";

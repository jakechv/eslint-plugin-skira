# eslint-plugin-skira

Custom eslint rules created by and used by the Skira development team

### Install command with esling-config-skira

`yarn add --dev https://github.com/plantaseed/eslint-config-skira.git https://github.com/plantaseed/eslint-plugin-skira.git`

### How the sql linting works

To get the sql linting rules to work you must tag the template strings containing sql with a sql tag.
It can either be one that has extra logic or something as simple as `const sql = x => x;`.

We provide an sql function by default that you can import, but you can also define your own.

#### Example

```javascript
sql`SELECT * FROM "table_name"`;
```

### Rules

Plugins with a check mark are enabled by default with the `plugin:skira/recommended` configuration.

|     | Rule ID                                                                    | Description                                                     |
| :-- | :------------------------------------------------------------------------- | :-------------------------------------------------------------- |
| ✅  | [sql/formatting](./docs/rules/sql-formatting.md)                           | Prevent assigning return values of cy calls                     |
| ✅  | [sql/matching-double-quotes](./docs/rules/sql-matching-double-quotes.md)   | Prevent waiting for arbitrary time periods                      |

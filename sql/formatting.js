const formatting = {
    meta: {
        fixable: true,
    },

    create: function (context) {
        const sourceCode = context.getSourceCode();

        const isWhitespace = /[\s]/;
        const isNotWhiteSpace = /[^\s]/;
        const templateLiteralExtractor = /\${(.*)}/gs;

        return {
            TemplateLiteral(node) {
                const sqlTagIsPresent =
                      node.parent.tag && node.parent.tag.name === 'sql';

                if (sqlTagIsPresent) {
                    const tokens = sourceCode.getTokens(node);
                    const raw = tokens.map(({ value }) => value).join('');

                    let indentation = '';

                    const rawSql = raw
                          .slice(
                              raw[1] === '\n' ? 2 : 1,
                              raw.length - (raw[raw.length - 2] === '\n' ? 2 : 1),
                          )
                          .split('\n')
                          .map((value, index) => {
                              if (index === 0) {
                                  const matches = isNotWhiteSpace.exec(value);

                                  if (matches) {
                                      indentation = new Array(matches.index).fill(' ').join('');
                                  }
                              }

                              return isWhitespace.test(value[0])
                                  ? value.slice(indentation.length)
                                  : value;
                          })
                          .join('\n')
                          .trim();

                    const literals = [...rawSql.matchAll(templateLiteralExtractor)];

                    const rawSQLWithoutLiterals = literals.reduce(
                        (reduced, [literal]) => {
                            return reduced.replace(literal, 'Δ');
                        },
                        rawSql,
                    );

                    const formattedSql = sqlFormatter.format(rawSQLWithoutLiterals);

                    const formatSqlForFixer = () => {
                        const literalsToPutback = literals
                              .map(([literal]) => literal)
                              .reverse();

                        let toWrite = formattedSql
                            .split('\n')
                            .map(value => `${indentation}${value}`)
                            .join('\n');

                        while (toWrite.includes('Δ')) {
                            toWrite = toWrite.replace('Δ', literalsToPutback.pop());
                        }

                        return toWrite;
                    };

                    if (formattedSql !== rawSQLWithoutLiterals) {
                        context.report({
                            node,
                            loc: { start: node.loc.start, end: node.loc.start },
                            message: 'Format the query',
                            fix: fixer =>
                                fixer.replaceTextRange(
                                    [
                                        node.quasis[0].range[0],
                                        node.quasis[node.quasis.length - 1].range[1],
                                    ],
                                    '`\n' + formatSqlForFixer() + '\n' + indentation + '`',
                                ),
                        });
                    }
                }
            },
        };
    },
};

module.exports = {
    formatting
};

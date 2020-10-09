const independentPromises = {
    meta: {
        fixable: false
    },

    create: function(context) {
        const sourceCode = context.getSourceCode();

        return {
            TemplateLiteral(node) {
                
            }:
        };
    },

    // in all chunks of code:
    // - for each expressionStatement:
    // - if it's an awaitExpression:
    // -


    /* Get all of the literals in an argument list. */
    const flattenArguments = (arguments) => 
        arguments.reduce((acc, argument) => {
            switch(argument.type) {
                case 'Identifier':
                    return acc.append(argument.name);
                case 'Literal':
                    return acc;
                case 'ArrayExpression':
                    return acc.append(flattenArguments(argument.elements));
                default:
                    return acc;
            }
        }, []);

    // ASSUME:
    // - CallExpression
    // - in 'await'

    /* Determine whether this call expression is independent. */
    const isIndependentCallExpression = (expression, acc) =>
          flattenArguments(expression.arguments).reduce((prev, arg) => arg in acc && prev, true);
}

module.exports = {
    independentPromises,
};

/* Collects all of the literals in an argument list.
 * These arguments should be in scope. */
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

/* Determine whether this call expression is independent
 * (it has no arguments in the flattened argument list). */
const isIndependentCallExpression = (expression, acc) =>
        flattenArguments(expression.arguments).reduce((prev, arg) => arg in acc && prev, true);

/* Determines whether this node is an 'await'. */
const isAwait = node => null;

/* Determine whether this node is an assignment to a variable from an 'await'. */
const isAwaitWithAssignment = node => null;

const getVariableAssignedTo = node => {
    if(isAwaitWithAssignment(node)) {
    }
}

// linearly, we:
// - check scope of variables on right side of expression, then
// - collect variables on left side of expression
// - if we *do not* see any of the variables we've selected,
//   and we see more than one independent call,
//   we provide a warning stating that the independent calls can be coupled
//
// it's not that simple!
//
// consider
// x = await fun(a);
// y = fun(x)
// z = await fun(y)
//
// This logic would say that these are independent,
// but they definitely are not
// we have to construct a dependency graph of function expressions and their arguments,
// then determine if an anscestor of any current variable was an 'await' expression

// we also don't have any information about incoming arguments;
// what if an incoming argument is an awaited expression that hasn't been evaluated?
// I suppose we can ignore it, but that isn't very good form; it would be better to be more robust.

// problem!
// const func = (x, y, z) => z;
// func(x = 1, y = x) evaluates to 1

// This means that arguments can be dependent on other arguments at the same level

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
}

module.exports = {
    independentPromises,
};

// our question:
// For each argument in this `await` expression,
// have we seen the argument as a result of a previous `await` expressions?
//
// if yes, we do not warn
// if no, we warn: these independent calls should be part of a Promise.all call.

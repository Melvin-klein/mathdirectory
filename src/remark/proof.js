const unified = require("unified");
const html = require("rehype-parse");
const visit = require("unist-util-visit");

const NEWLINE = "\n";

const types = {
    // base types
    proof: {},
};

// default options for plugin
const defaultOptions = {
    tag: ":::",
};

// override default options
const configure = options => {
    // No override
    return {
        ...defaultOptions,
        types
    }
};

// escape regex special characters
function escapeRegExp(s) {
    return s.replace(new RegExp(`[-[\\]{}()*+?.\\\\^$|/]`, "g"), "\\$&");
}

// helper: recursively replace nodes
const _nodes = ({
    tagName: hName,
    properties: hProperties,
    position,
    children
}) => {
    return {
        type: "proofHTML",
        data: {
            hName,
            hProperties
        },
        position,
        children: children.map(_nodes)
    };
};

// convert HTML to MDAST (must be a single root element)
const nodes = markup => {
    return _nodes(
        unified()
            .use(html)
            .parse(markup).children[0].children[1].children[0]
    );
};

// create a simple text node
const text = value => {
    return {
        type: "text",
        value
    };
};

// create a node that will compile to HTML
const element = (tagName, classes = [], children = []) => {
    return {
        type: "proofHTML",
        data: {
            hName: tagName,
            hProperties: classes.length
            ? {
                className: classes
                }
            : {}
        },
        children
    };
};

// changes the first character of a keyword to uppercase so that custom title
// styles may omit `text-transform: uppercase`.
const formatKeyword = keyword =>
    keyword.charAt(0).toUpperCase() + keyword.slice(1);

// passed to unified.use()
module.exports = function attacher(options) {
    const config = configure(options);

    // match to determine if the line is an opening tag
    const keywords = Object.keys(config.types)
        .map(escapeRegExp)
        .join("|");

    const tag = escapeRegExp(config.tag);
    const regex = new RegExp(`${tag}(${keywords})(?: *(.*))?\n`);
    const escapeTag = new RegExp(escapeRegExp(`\\${config.tag}`), "g");

    // the tokenizer is called on blocks to determine if there is a proof present and create tags for it
    function blockTokenizer(eat, value, silent) {
        // stop if no match or match does not start at beginning of line
        const match = regex.exec(value);
        if (!match || match.index !== 0) return false;
        // if silent return the match
        if (silent) return true;

        const now = eat.now();
        const [opening, keyword, title] = match;
        const food = [];
        const content = [];

        // consume lines until a closing tag
        let idx = 0;
        while ((idx = value.indexOf(NEWLINE)) !== -1) {
            // grab this line and eat it
            const next = value.indexOf(NEWLINE, idx + 1);
            const line =
                next !== -1 ? value.slice(idx + 1, next) : value.slice(idx + 1);
            food.push(line);
            value = value.slice(idx + 1);
            // the closing tag is NOT part of the content
            if (line.startsWith(config.tag)) break;
            content.push(line);
        }

        // consume the processed tag and replace escape sequences
        const contentString = content.join(NEWLINE).replace(escapeTag, config.tag);
        const add = eat(opening + food.join(NEWLINE));

        // parse the content in block mode
        const exit = this.enterBlock();
        const contentNodes = element(
            "div",
            ["proof-content"],
            this.tokenizeBlock(contentString, now)
        );
        exit();
        // parse the title in inline mode
        const titleNodes = this.tokenizeInline(
            title || formatKeyword(keyword),
            now
        );
        // build the nodes for the full markup
        const proof = element(
            "details",
            ["proof-details"],
            [
                element("summary", [], titleNodes),
                contentNodes
            ]
        );

        return add(proof);
    }

    // add tokenizer to parser after fenced code blocks
    const Parser = this.Parser.prototype;
    Parser.blockTokenizers.proof = blockTokenizer;
    Parser.blockMethods.splice(
        Parser.blockMethods.indexOf("fencedCode") + 1,
        0,
        "proof"
    );
    Parser.interruptParagraph.splice(
        Parser.interruptParagraph.indexOf("fencedCode") + 1,
        0,
        ["proof"]
    );
    Parser.interruptList.splice(
        Parser.interruptList.indexOf("fencedCode") + 1,
        0,
        ["proof"]
    );
    Parser.interruptBlockquote.splice(
        Parser.interruptBlockquote.indexOf("fencedCode") + 1,
        0,
        ["proof"]
    );

    const transformer = async (ast) => {
        visit(
            ast,
            node => {
                return node.type !== "proofHTML";
            },
            function visitor(node) {
                if (node.value) node.value = node.value.replace(escapeTag, config.tag);
                return node;
            }
        )
    }

    return transformer;
}
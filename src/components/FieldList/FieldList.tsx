import React from 'react'
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';

export default function FieldList() {
    return (
        <article className="margin-top--lg">
            <section className="row">
                <article className="field-item col col--6 margin-bottom--lg">
                    <Link className="card padding--lg" to="/docs/category/algebra">
                        <h2 title="Algebra">
                            <Translate id="fields.algebra" />
                        </h2>
                    </Link>
                </article>
                <article className="field-item col col--6 margin-bottom--lg">
                    <Link className="card padding--lg" to="/docs/category/probabilities">
                        <h2 title="Algebra">
                            <Translate id="fields.probabilities" />
                        </h2>
                    </Link>
                </article>
            </section>
        </article>
    );
}

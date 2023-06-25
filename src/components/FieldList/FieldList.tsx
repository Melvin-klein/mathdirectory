import React from 'react'
import {useDocsSidebar} from "@docusaurus/theme-common/internal";
import GithubSlugger from 'github-slugger';

export default function FieldList() {
    const sidebar = useDocsSidebar();
    const githubSlugger = new GithubSlugger();
    return (
        <article className="margin-top--lg">
            <section className="row">
                {sidebar.items.map(item => {
                    if (item.type === 'category') {
                        return (
                            <article className="field-item col col--6 margin-bottom--lg">
                                <a className="card padding--lg" href={"/docs/category/" + githubSlugger.slug(item.label, {maintainCase: true})}>
                                    <h2 className="text--truncate" title="Vector spaces">📄️ {item.label}</h2>
                                </a>
                            </article>
                        )
                    }
                })}
            </section>
        </article>
    );
}

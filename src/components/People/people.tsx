import React from 'react';
import PropTypes from 'prop-types'; 
import { Person } from '@site/src/models/Person';

interface PeopleProps {
    person: Person
}

export function People(props: PeopleProps) {
    return (
        <div className="col col--6 authorCol_node_modules-@docusaurus-theme-classic-lib-theme-BlogPostItem-Header-Authors-styles-module">
            <div className="avatar margin-bottom--sm">
                <a href={props.person.link} target="_blank" rel="noopener noreferrer" className="avatar__photo-link">
                    <img className="avatar__photo" src={props.person.photo} alt={"Photo de " + props.person.name}/>
                </a>
                <div className="avatar__intro" itemProp="author" itemScope={true} itemType="https://schema.org/Person">
                    <div className="avatar__name">
                        <a href={props.person.link} target="_blank" rel="noopener noreferrer" itemProp="url">
                            <span itemProp="name">{props.person.name}</span>
                        </a>
                    </div>
                    <small className="avatar__subtitle" itemProp="description">{props.person.position}</small>
                </div>
            </div>
        </div>
    )
}

People.propTypes = {
    person: PropTypes.object
}

interface PeopleListProps {
    people: Person[]
}

export function PeopleList(props: PeopleListProps) {
    return (
        <div>
            {props.people.map(person => (<People person={person} />))}
        </div>
    )
}

PeopleList.propTypes = {
    personList: PropTypes.array
}

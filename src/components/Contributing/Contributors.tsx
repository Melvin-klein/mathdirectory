import React from "react";
import { Person } from "@site/src/models/Person";
import { PeopleList } from "../People/people";

const contributors: Person[] = [
    {
        name: "Melvine Nargeot",
        photo: "https://avatars.githubusercontent.com/u/14358809?v=4",
        link: "https://github.com/Melvin-klein",
        position: "Main contributor & founder"
    }
];

export function Contributors() {
    return <PeopleList people={contributors} />;
}

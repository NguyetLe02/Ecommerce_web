import React from 'react'
import useBreadcrumbs from 'use-react-router-breadcrumbs'

const Breadcrumb = () => {
    const breadcrumbs = useBreadcrumbs()
    const userNamesById = { 1: "John" };

    const DynamicUserBreadcrumb = ({ match }) => (
        <span>{userNamesById[match.params.userId]}</span>
    );

    const routes = [
        { path: "/users/:userId", breadcrumb: DynamicUserBreadcrumb },
        { path: "/example", breadcrumb: "Custom Example" },
    ];

    return (
        <div>
            Breadcrumb
        </div>
    )
}

export default Breadcrumb

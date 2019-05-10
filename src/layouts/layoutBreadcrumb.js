import NavLink from 'umi/navlink';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import React from 'react';
import { Breadcrumb, Icon } from 'antd';

const routes = [
    { path: '/', breadcrumb: 'Home',icontype: 'home'},
    { path: '/application', breadcrumb: '鸽历',icontype:'calendar' },
  ]

export default withBreadcrumbs(routes)(({ breadcrumbs }) => (
    <Breadcrumb style={{ margin: '16px 0' }}>
        {breadcrumbs.map((match,breadcrumb) => (
            <Breadcrumb.Item href={match.key} key={breadcrumb} >
                <Icon type={match.icontype} />
                <span>{match.breadcrumb}</span>
            </Breadcrumb.Item>
        ))}
    </Breadcrumb>
));


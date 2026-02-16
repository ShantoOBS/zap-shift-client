import React from 'react';
import useAuth from '../Hooks/useAuth';
import Loading from '../page/Shared/Loading';
import useRole from '../Hooks/useRole';
import Forbidden from '../page/Shared/Forbidden';

const AdminRoute = ({ children }) => {
    const { loading } = useAuth();
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'admin') {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default AdminRoute;
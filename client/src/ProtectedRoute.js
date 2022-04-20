import { Redirect } from 'react-router-dom'

function ProtectedRoute({ user, children }) {
    if (!user) {
        return <Redirect to="/" />;
    }

    return children;
}

export default ProtectedRoute
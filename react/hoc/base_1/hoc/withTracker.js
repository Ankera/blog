import React from 'react';
import MouseTracker from "../component/tracker";

function withMouseTracker(WrappedComponent) {
    return props => (
        <MouseTracker render={
            params => <WrappedComponent {...props} {...params} />
        } />
    )
}

export default withMouseTracker;
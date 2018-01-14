import React from 'react';

const DefaultLayout = (Wrapped) => (props) => {
  return(
    <div className="page">
        <Wrapped {...props} />
    </div>
  );
};

export default DefaultLayout;
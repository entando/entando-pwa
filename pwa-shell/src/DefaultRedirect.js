import React from 'react';
import { Redirect } from 'react-router-dom';

const DefaultRedirect = () => (
  <Redirect to={'/content/'} />
);

export default DefaultRedirect;

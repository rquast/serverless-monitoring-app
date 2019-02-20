import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import { Button, Container } from 'semantic-ui-react';

const api = process.env.REACT_APP_REST_API || '';

const Refresh = () => {
  const [loading, setLoading] = useState(false);

  async function onClick() {
    try {
      setLoading(true);
      const credentials = await Auth.currentSession();
      const idToken = credentials.getIdToken().getJwtToken();
      await fetch(`${api}/fanout`, {
        headers: { Authorization: idToken },
        method: 'POST',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container textAlign="center">
      <Button loading={loading} onClick={onClick} positive={true}>
        Refresh
      </Button>
    </Container>
  );
};

export default Refresh;
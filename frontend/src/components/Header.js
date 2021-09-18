import React from 'react';
import Row from 'react-bootstrap/Row';

const Header = () => {
    return (
        <Row className='justify-content-center'>
          <div className='text-center mt-4'>
            <h1>Vidya</h1>
            <p className='mx-4'>
                Summarize your video lectures!
            </p>
          </div>
        </Row>
      );
}

export default Header;
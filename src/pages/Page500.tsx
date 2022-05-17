import React from 'react';
import { Errorlayout } from '../layouts/Errorlayout';
import error500 from '../assets/error500.svg';

export function Page500(): React.ReactElement {
    return (
        <Errorlayout
            title="serverErrorPageTitle"
            subtitle="unauthorizedPageSubTitle"
            image={error500}
        />
    );
}

import React from 'react';
import { Errorlayout } from '../layouts/Errorlayout';
import error401 from '../assets/error401.svg';

export function Page401(): React.ReactElement {
    return (
        <Errorlayout
            title="unauthorizedPageTitle"
            subtitle="pageNotFoundSubtitle"
            image={error401}
        />
    );
}

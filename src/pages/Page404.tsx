import React from 'react';
import { Errorlayout } from '../layouts/Errorlayout';
import error404 from '../assets/error404.svg';

export function Page404(): React.ReactElement {
    return (
        <Errorlayout title="pageNotFoundTitle" subtitle="pageNotFoundSubtitle" image={error404} />
    );
}

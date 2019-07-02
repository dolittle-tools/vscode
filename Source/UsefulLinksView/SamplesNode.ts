/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import path from 'path';
import { LinkNode } from "../index";

export class SamplesNode extends LinkNode {
    constructor() {
        super('Samples', 'dolittle.usefulLinksView.samples', 'Samples', 'Look at a dolittle sample projects', 
            path.join(__filename, '..', '..', '..', 'Resources', 'GitHub-Mark-Light-32px.png')
        );
    }
}

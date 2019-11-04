/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import path from 'path';
import { LinkNode } from "../index";

export class TweetNode extends LinkNode {
    constructor() {
        super('Tweet', 'dolittle.usefulLinksView.tweet', 'Tweet', 'Report issue', 
            path.join(__filename, '..', '..', '..', 'Resources', 'Twitter_Social_Icon_Circle_Color.png')
        );
    }
}
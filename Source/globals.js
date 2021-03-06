/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {boilerPlatesManager, applicationsManager, boundedContextsManager, artifactsManager, dependenciesManager, logger, folders, dolittleConfig } from '@dolittle/tooling.common';
import { loadProjectConfiguration, ProjectConfiguration } from './Configuration/ProjectConfiguration';
import { CommonToolingManager } from './CommonToolingManager';
import { PromptManager } from './PromptManager';
import { EventEmitter } from 'vscode';
import { BoundedContextNodeProvider } from './Explorer/BoundedContextNodeProvider';

const vscode = require('vscode');
const dolittleOutputChannelName = 'Dolittle';
const dolittleProjectOutputChannelName = 'Dolittle Project';
const dolittleDebugOutputChannelName = 'Dolittle Debug';
class globals {
    #projectConfiguration: ProjectConfiguration;
    #dolittleOutputChannel;
    #dolittleProjectOutputChannel;
    #dolittleDebugOutputChannel;
    #commonToolingManager: CommonToolingManager;
    #promptManager: PromptManager;
    #boundedContextNodeProvider: BoundedContextNodeProvider;

    #configurationLoaded: EventEmitter;

    constructor() {
        this.#projectConfiguration = null;
        this.#dolittleOutputChannel = vscode.window.createOutputChannel(dolittleOutputChannelName);
        this.#dolittleProjectOutputChannel = vscode.window.createOutputChannel(dolittleProjectOutputChannelName);
        this.#dolittleDebugOutputChannel = vscode.window.createOutputChannel(dolittleDebugOutputChannelName);
        this.#promptManager = new PromptManager(dependenciesManager, logger);
        this.#commonToolingManager = new CommonToolingManager(boilerPlatesManager, applicationsManager, boundedContextsManager, artifactsManager, dependenciesManager, folders, dolittleConfig, this.#promptManager, logger);
        this.#configurationLoaded = new vscode.EventEmitter();

        this.#boundedContextNodeProvider = new BoundedContextNodeProvider();


    }
    get onConfigurationLoaded() {
        return this.#configurationLoaded.event;
    }
    /**
     *
     *
     * @readonly
     * @memberof globals
     */
    get projectConfiguration() {
        return this.#projectConfiguration;
    }
    /**
     *
     *
     * @readonly
     * @memberof globals
     */
    get dolittleOutputChannel() {
        return this.#dolittleOutputChannel;
    }
    /**
     * 
     *
     * @readonly
     * @memberof globals
     */
    get dolittleProjectOutputChannel() {
        return this.#dolittleProjectOutputChannel;
    }
    /**
     * 
     *
     * @readonly
     * @memberof globals
     */
    get dolittleDebugOutputChannel() {
        return this.#dolittleDebugOutputChannel;
    }
    /**
     *
     *
     * @readonly
     * @memberof globals
     */
    get promptManager() {
        return this.#promptManager;
    }
    /**
     *
     *
     * @readonly
     * @memberof globals
     */
    get commonToolingManager() {
        return this.#commonToolingManager;
    }
    /**
     * 
     *
     * @readonly
     * @memberof globals
     */
    get boundedContextNodeProvider() {
        return this.#boundedContextNodeProvider;
    }
    /**
     *
     *
     * @memberof globals
     */
    async setProjectConfiguration() {
        let config = await loadProjectConfiguration();
        if (config === undefined) throw new Error('Project configuration was undefined');
        this.#projectConfiguration = config;
        this.#configurationLoaded.fire();
        
    }
}
export default new globals();
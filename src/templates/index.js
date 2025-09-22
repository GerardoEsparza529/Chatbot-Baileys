import { createFlow } from '@builderbot/bot';
import { welcomeFlow } from './welcomeFlow.js'
import { gptFlow } from './gptFlow.js';
import { mainFlow } from './mainFlow.js';
import { DetectIntention } from './intentiosFlow.js';

export default createFlow([
    welcomeFlow,
    gptFlow,
    mainFlow,
    DetectIntention
]);

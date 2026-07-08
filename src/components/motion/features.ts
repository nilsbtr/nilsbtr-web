import { domAnimation } from "motion/react";

/**
 * Motion feature bundle, loaded as a separate async chunk by MotionProvider
 * so the animation runtime stays out of the initial JS payload.
 */
export default domAnimation;

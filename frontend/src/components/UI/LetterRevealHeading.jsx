import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * LetterRevealHeading
 * Renders scroll-triggered, letter-by-letter reveal animation for section headers:
 * - Eyebrow reveals first with upward fade
 * - Main heading letters reveal in sequence with subtle upward movement & opacity
 * - Divider (if present) reveals
 * - Description/subtitle reveals afterward
 * - Replays every time the section enters the viewport (viewport={{ once: false, amount: 0.2 }})
 * - Groups letters by words with whitespace-nowrap to preserve responsive wrapping & prevent layout shifts
 */
export const LetterRevealHeading = ({
  eyebrow,
  eyebrowClass = 'text-xs md:text-sm uppercase tracking-[0.18em] text-blue-600 font-semibold',
  eyebrowContainer,
  title,
  highlight,
  highlightClass = 'bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent',
  segments: customSegments,
  headingTag: HeadingTag = 'h2',
  headingClass = 'mt-3 text-3xl md:text-4xl font-extrabold text-slate-900',
  supportingHeading,
  supportingHeadingTag: SupportingHeadingTag = 'h3',
  supportingHeadingClass = 'mt-4 text-lg md:text-xl font-bold text-slate-800 leading-relaxed',
  subtitle,
  subtitleClass = 'mt-4 text-slate-600 leading-relaxed',
  divider,
  className = 'mx-auto max-w-3xl text-center',
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Build segments if not explicitly passed
  const segments = useMemo(() => {
    if (customSegments && customSegments.length > 0) {
      return customSegments;
    }
    const list = [];
    if (title) {
      list.push({ text: title, className: '' });
    }
    if (highlight) {
      list.push({ text: highlight, className: highlightClass });
    }
    return list;
  }, [customSegments, title, highlight, highlightClass]);

  // Build plain text for accessibility
  const fullPlainText = useMemo(() => {
    return segments.map((s) => s.text).join(' ').trim();
  }, [segments]);

  // Parse words and characters
  const { wordTokens, totalChars } = useMemo(() => {
    let charCount = 0;
    const tokens = [];

    segments.forEach((seg) => {
      if (!seg.text) return;
      const rawWords = seg.text.trim().split(/\s+/);
      rawWords.forEach((word) => {
        const chars = Array.from(word).map((char) => ({
          char,
          index: charCount++,
        }));
        tokens.push({
          word,
          chars,
          className: seg.className || '',
          hasTrailingSpace: true,
        });
      });
    });

    if (tokens.length > 0) {
      tokens[tokens.length - 1].hasTrailingSpace = false;
    }

    return { wordTokens: tokens, totalChars: charCount };
  }, [segments]);

  // Calculate dynamic timing for continuous, smooth flow
  const startDelay = 0.03;
  const staggerDelay = totalChars > 50 ? 0.010 : 0.012;
  const lettersDuration = totalChars * staggerDelay;
  const dividerDelay = startDelay + lettersDuration * 0.75;
  const supportingDelay = startDelay + lettersDuration + 0.05;
  const descDelay = supportingHeading
    ? supportingDelay + 0.14
    : startDelay + lettersDuration + 0.06;

  // Eyebrow animation variants
  const eyebrowVariants = useMemo(
    () =>
      shouldReduceMotion
        ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
        : {
            hidden: {
              opacity: 0,
              y: 8,
              transition: { duration: 0.12 },
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.02,
              },
            },
          },
    [shouldReduceMotion]
  );

  // Letter animation variants
  const letterVariants = useMemo(
    () =>
      shouldReduceMotion
        ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
        : {
            hidden: {
              opacity: 0,
              y: 8,
              transition: { duration: 0.12 },
            },
            visible: (idx) => ({
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.24,
                delay: startDelay + idx * staggerDelay,
                ease: [0.22, 1, 0.36, 1],
              },
            }),
          },
    [shouldReduceMotion, startDelay, staggerDelay]
  );

  // Supporting heading animation variants
  const supportingVariants = useMemo(
    () =>
      shouldReduceMotion
        ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
        : {
            hidden: {
              opacity: 0,
              y: 8,
              transition: { duration: 0.12 },
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.38,
                delay: supportingDelay,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          },
    [shouldReduceMotion, supportingDelay]
  );

  // Divider animation variants
  const dividerVariants = useMemo(
    () =>
      shouldReduceMotion
        ? { hidden: { opacity: 1, scale: 1 }, visible: { opacity: 1, scale: 1 } }
        : {
            hidden: {
              opacity: 0,
              scale: 0.9,
              transition: { duration: 0.12 },
            },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.35,
                delay: dividerDelay,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          },
    [shouldReduceMotion, dividerDelay]
  );

  // Description animation variants
  const descVariants = useMemo(
    () =>
      shouldReduceMotion
        ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
        : {
            hidden: {
              opacity: 0,
              y: 10,
              transition: { duration: 0.12 },
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.42,
                delay: descDelay,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          },
    [shouldReduceMotion, descDelay]
  );

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      className={className}
    >
      {/* 1. Small Label / Eyebrow */}
      {eyebrow && (
        <motion.div variants={eyebrowVariants} className="mb-2">
          {eyebrowContainer ? (
            eyebrowContainer(eyebrow)
          ) : (
            <p className={eyebrowClass}>{eyebrow}</p>
          )}
        </motion.div>
      )}

      {/* 2. Main Heading (Letter-by-Letter) */}
      <HeadingTag className={headingClass} aria-label={fullPlainText}>
        <span className="sr-only">{fullPlainText}</span>
        <span aria-hidden="true" className="inline">
          {wordTokens.map((token, tIdx) => (
            <React.Fragment key={tIdx}>
              <span className={`inline-block whitespace-nowrap ${token.className}`}>
                {token.chars.map(({ char, index }) => (
                  <motion.span
                    key={index}
                    custom={index}
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
              {token.hasTrailingSpace && ' '}
            </React.Fragment>
          ))}
        </span>
      </HeadingTag>

      {/* Optional Divider (Section 4) */}
      {divider && (
        <motion.div variants={dividerVariants}>
          {divider}
        </motion.div>
      )}

      {/* Optional Supporting Heading */}
      {supportingHeading && (
        <motion.div variants={supportingVariants}>
          <SupportingHeadingTag className={supportingHeadingClass}>
            {supportingHeading}
          </SupportingHeadingTag>
        </motion.div>
      )}

      {/* 3. Description / Subtitle */}
      {subtitle && (
        <motion.p variants={descVariants} className={subtitleClass}>
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default LetterRevealHeading;

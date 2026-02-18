/// <reference types="@figma/plugin-typings" />

// Vietnam Visa Instagram Ads - Friendly & Informative
// Help travelers understand they need pre-approval before flying

// Brand Colors - Warm and Trustworthy
const COLORS = {
  primary: { r: 0.0, g: 0.47, b: 0.75, a: 1 },      // Calm Blue - trust
  secondary: { r: 1, g: 0.75, b: 0.1, a: 1 },        // Warm Gold
  accent: { r: 0.2, g: 0.7, b: 0.5, a: 1 },          // Friendly Green
  dark: { r: 0.15, g: 0.18, b: 0.22, a: 1 },
  white: { r: 1, g: 1, b: 1, a: 1 },
  lightBg: { r: 0.96, g: 0.97, b: 0.98, a: 1 },
  softRed: { r: 0.85, g: 0.12, b: 0.15, a: 1 },      // Vietnam flag red (subtle)
  warmGray: { r: 0.55, g: 0.55, b: 0.58, a: 1 },
};

// Dimensions
const DIMENSIONS = {
  stories: { width: 1080, height: 1920 },
  feedPortrait: { width: 1080, height: 1350 },
  feedSquare: { width: 1080, height: 1080 },
};

// Friendly, informative ad variants
const AD_VARIANTS = [
  {
    id: "do-you-have",
    topQuestion: "Flying to Vietnam? 🇻🇳",
    headline: "Do You Have Your",
    highlight: "Visa Approval Letter?",
    explanation: "Vietnam requires e-Visa pre-approval before boarding",
    fact: "Most nationalities need this document to check in",
    helpText: "Check your visa status or apply now",
    cta: "Check My Status",
    bottomNote: "Takes only 2 minutes",
  },
  {
    id: "quick-check",
    topQuestion: "Quick Check ✈️",
    headline: "Vietnam e-Visa",
    highlight: "Ready for Your Flight?",
    explanation: "Your approval letter should be in your email",
    fact: "No letter = airline may deny boarding",
    helpText: "Don't have one yet? We can help",
    cta: "Get Approval Letter",
    bottomNote: "Processing from 1 hour",
  },
  {
    id: "good-to-know",
    topQuestion: "Good to Know 💡",
    headline: "Vietnam Visa",
    highlight: "Needs Pre-Approval",
    explanation: "\"Visa on Arrival\" still requires approval BEFORE you fly",
    fact: "80+ countries need this step",
    helpText: "Get your approval letter online",
    cta: "Learn More",
    bottomNote: "Simple online process",
  },
  {
    id: "before-you-fly",
    topQuestion: "Before You Board ✓",
    headline: "Got Your Vietnam",
    highlight: "Approval Letter?",
    explanation: "Airlines check visa status at check-in counter",
    fact: "Apply online → Get letter → Fly with confidence",
    helpText: "We help travelers get approved fast",
    cta: "Apply Now",
    bottomNote: "24/7 Support Available",
  },
  {
    id: "travel-tip",
    topQuestion: "Travel Tip 🌏",
    headline: "Vietnam Entry",
    highlight: "Requires 2 Steps",
    explanation: "1. Get approval letter online\n2. Get visa stamp on arrival",
    fact: "Step 1 must be done BEFORE your flight",
    helpText: "We handle step 1 for you",
    cta: "Start Application",
    bottomNote: "Trusted by 10,000+ travelers",
  },
];

// Helper functions
function solidPaint(color: { r: number; g: number; b: number; a: number }): Paint[] {
  return [{ type: "SOLID", color: { r: color.r, g: color.g, b: color.b }, opacity: color.a }];
}

async function loadFonts() {
  await figma.loadFontAsync({ family: "Inter", style: "Black" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
  await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
}

// Create friendly badge/pill
function createPill(parent: FrameNode, text: string, x: number, y: number, bgColor: typeof COLORS.primary, textColor: typeof COLORS.white): FrameNode {
  const pill = figma.createFrame();
  pill.name = "Pill";
  pill.layoutMode = "HORIZONTAL";
  pill.primaryAxisAlignItems = "CENTER";
  pill.counterAxisAlignItems = "CENTER";
  pill.paddingLeft = 28;
  pill.paddingRight = 28;
  pill.paddingTop = 14;
  pill.paddingBottom = 14;
  pill.cornerRadius = 30;
  pill.fills = solidPaint(bgColor);

  const pillText = figma.createText();
  pillText.characters = text;
  pillText.fontSize = 24;
  pillText.fontName = { family: "Inter", style: "Semi Bold" };
  pillText.fills = solidPaint(textColor);
  pill.appendChild(pillText);

  pill.x = x;
  pill.y = y;
  parent.appendChild(pill);

  return pill;
}

// Create CTA button - friendly rounded
function createCTAButton(parent: FrameNode, text: string, x: number, y: number, width: number): FrameNode {
  const button = figma.createFrame();
  button.name = "CTA Button";
  button.resize(width, 72);
  button.x = x;
  button.y = y;
  button.fills = solidPaint(COLORS.accent);
  button.cornerRadius = 36;
  button.effects = [
    {
      type: "DROP_SHADOW",
      color: { r: 0.2, g: 0.7, b: 0.5, a: 0.3 },
      offset: { x: 0, y: 6 },
      radius: 16,
      spread: 0,
      visible: true,
      blendMode: "NORMAL",
    },
  ];

  const ctaText = figma.createText();
  ctaText.characters = text;
  ctaText.fontSize = 28;
  ctaText.fontName = { family: "Inter", style: "Bold" };
  ctaText.fills = solidPaint(COLORS.white);
  button.appendChild(ctaText);
  ctaText.x = (width - ctaText.width) / 2;
  ctaText.y = (72 - ctaText.height) / 2;

  parent.appendChild(button);
  return button;
}

// Create info card
function createInfoCard(parent: FrameNode, text: string, x: number, y: number, width: number, icon: string): FrameNode {
  const card = figma.createFrame();
  card.name = "Info Card";
  card.resize(width, 80);
  card.x = x;
  card.y = y;
  card.fills = solidPaint({ r: 1, g: 1, b: 1, a: 0.12 });
  card.cornerRadius = 16;

  const iconText = figma.createText();
  iconText.characters = icon;
  iconText.fontSize = 28;
  iconText.fontName = { family: "Inter", style: "Regular" };
  iconText.fills = solidPaint(COLORS.secondary);
  card.appendChild(iconText);
  iconText.x = 20;
  iconText.y = 24;

  const cardText = figma.createText();
  cardText.characters = text;
  cardText.fontSize = 22;
  cardText.fontName = { family: "Inter", style: "Medium" };
  cardText.fills = solidPaint(COLORS.white);
  cardText.textAutoResize = "HEIGHT";
  cardText.resize(width - 80, 60);
  card.appendChild(cardText);
  cardText.x = 60;
  cardText.y = 20;

  parent.appendChild(card);
  return card;
}

// Create Stories Ad (1080x1920) - Friendly Design
function createStoriesAd(variant: typeof AD_VARIANTS[0], index: number): FrameNode {
  const frame = figma.createFrame();
  frame.name = `Stories - ${variant.id}`;
  frame.resize(DIMENSIONS.stories.width, DIMENSIONS.stories.height);
  frame.x = index * (DIMENSIONS.stories.width + 80);
  frame.y = 0;

  // Soft gradient background
  frame.fills = [
    {
      type: "GRADIENT_LINEAR",
      gradientStops: [
        { position: 0, color: { r: 0.12, g: 0.15, b: 0.2, a: 1 } },
        { position: 0.5, color: { r: 0.08, g: 0.1, b: 0.14, a: 1 } },
        { position: 1, color: { r: 0.05, g: 0.07, b: 0.1, a: 1 } },
      ],
      gradientTransform: [[0, 1, 0], [-1, 0, 1]],
    },
  ];

  // Top decorative element - Vietnam colors subtle
  const topDeco = figma.createFrame();
  topDeco.resize(1080, 8);
  topDeco.x = 0;
  topDeco.y = 260;
  topDeco.fills = [
    {
      type: "GRADIENT_LINEAR",
      gradientStops: [
        { position: 0, color: { r: 0.85, g: 0.12, b: 0.15, a: 1 } },
        { position: 0.5, color: { r: 1, g: 0.75, b: 0.1, a: 1 } },
        { position: 1, color: { r: 0.85, g: 0.12, b: 0.15, a: 1 } },
      ],
      gradientTransform: [[1, 0, 0], [0, 1, 0]],
    },
  ];
  frame.appendChild(topDeco);

  // Top question/context
  const topQuestion = figma.createText();
  topQuestion.characters = variant.topQuestion;
  topQuestion.fontSize = 36;
  topQuestion.fontName = { family: "Inter", style: "Medium" };
  topQuestion.fills = solidPaint(COLORS.secondary);
  topQuestion.textAlignHorizontal = "CENTER";
  topQuestion.textAutoResize = "WIDTH_AND_HEIGHT";
  frame.appendChild(topQuestion);
  topQuestion.x = (1080 - topQuestion.width) / 2;
  topQuestion.y = 310;

  // Main headline
  const headline = figma.createText();
  headline.characters = variant.headline;
  headline.fontSize = 52;
  headline.fontName = { family: "Inter", style: "Semi Bold" };
  headline.fills = solidPaint(COLORS.white);
  headline.textAlignHorizontal = "CENTER";
  headline.textAutoResize = "WIDTH_AND_HEIGHT";
  frame.appendChild(headline);
  headline.x = (1080 - headline.width) / 2;
  headline.y = 400;

  // Highlight text (the key question)
  const highlight = figma.createText();
  highlight.characters = variant.highlight;
  highlight.fontSize = 56;
  highlight.fontName = { family: "Inter", style: "Black" };
  highlight.fills = solidPaint(COLORS.secondary);
  highlight.textAlignHorizontal = "CENTER";
  highlight.textAutoResize = "WIDTH_AND_HEIGHT";
  frame.appendChild(highlight);
  highlight.x = (1080 - highlight.width) / 2;
  highlight.y = 470;

  // Visual: Document/Letter icon
  const docFrame = figma.createFrame();
  docFrame.name = "Document Visual";
  docFrame.resize(320, 400);
  docFrame.x = 380;
  docFrame.y = 580;
  docFrame.fills = solidPaint({ r: 1, g: 1, b: 1, a: 0.95 });
  docFrame.cornerRadius = 20;
  docFrame.effects = [
    {
      type: "DROP_SHADOW",
      color: { r: 0, g: 0, b: 0, a: 0.2 },
      offset: { x: 0, y: 8 },
      radius: 24,
      spread: 0,
      visible: true,
      blendMode: "NORMAL",
    },
  ];
  frame.appendChild(docFrame);

  // Document header
  const docHeader = figma.createFrame();
  docHeader.resize(320, 60);
  docHeader.x = 0;
  docHeader.y = 0;
  docHeader.fills = solidPaint(COLORS.softRed);
  docHeader.topLeftRadius = 20;
  docHeader.topRightRadius = 20;
  docFrame.appendChild(docHeader);

  const docTitle = figma.createText();
  docTitle.characters = "VIETNAM";
  docTitle.fontSize = 22;
  docTitle.fontName = { family: "Inter", style: "Bold" };
  docTitle.fills = solidPaint(COLORS.white);
  docHeader.appendChild(docTitle);
  docTitle.x = 110;
  docTitle.y = 18;

  // Approval text
  const approvalText = figma.createText();
  approvalText.characters = "E-VISA\nAPPROVAL\nLETTER";
  approvalText.fontSize = 32;
  approvalText.fontName = { family: "Inter", style: "Bold" };
  approvalText.fills = solidPaint(COLORS.dark);
  approvalText.textAlignHorizontal = "CENTER";
  docFrame.appendChild(approvalText);
  approvalText.x = 70;
  approvalText.y = 100;

  // Checkmark
  const checkCircle = figma.createEllipse();
  checkCircle.resize(80, 80);
  checkCircle.x = 120;
  checkCircle.y = 280;
  checkCircle.fills = solidPaint(COLORS.accent);
  docFrame.appendChild(checkCircle);

  const checkMark = figma.createText();
  checkMark.characters = "✓";
  checkMark.fontSize = 48;
  checkMark.fontName = { family: "Inter", style: "Bold" };
  checkMark.fills = solidPaint(COLORS.white);
  docFrame.appendChild(checkMark);
  checkMark.x = 140;
  checkMark.y = 292;

  // Explanation text
  const explanation = figma.createText();
  explanation.characters = variant.explanation;
  explanation.fontSize = 28;
  explanation.fontName = { family: "Inter", style: "Medium" };
  explanation.fills = solidPaint(COLORS.white);
  explanation.textAlignHorizontal = "CENTER";
  explanation.textAutoResize = "HEIGHT";
  explanation.resize(900, 80);
  frame.appendChild(explanation);
  explanation.x = 90;
  explanation.y = 1020;

  // Fact/info box
  createInfoCard(frame, variant.fact, 90, 1120, 900, "💡");

  // Help text
  const helpText = figma.createText();
  helpText.characters = variant.helpText;
  helpText.fontSize = 26;
  helpText.fontName = { family: "Inter", style: "Regular" };
  helpText.fills = solidPaint({ r: 0.8, g: 0.8, b: 0.82, a: 1 });
  helpText.textAlignHorizontal = "CENTER";
  helpText.textAutoResize = "WIDTH_AND_HEIGHT";
  frame.appendChild(helpText);
  helpText.x = (1080 - helpText.width) / 2;
  helpText.y = 1240;

  // CTA Button
  createCTAButton(frame, variant.cta, 240, 1320, 600);

  // Bottom note
  const bottomNote = figma.createText();
  bottomNote.characters = variant.bottomNote;
  bottomNote.fontSize = 22;
  bottomNote.fontName = { family: "Inter", style: "Medium" };
  bottomNote.fills = solidPaint(COLORS.warmGray);
  bottomNote.textAlignHorizontal = "CENTER";
  bottomNote.textAutoResize = "WIDTH_AND_HEIGHT";
  frame.appendChild(bottomNote);
  bottomNote.x = (1080 - bottomNote.width) / 2;
  bottomNote.y = 1420;

  // Website
  const website = figma.createText();
  website.characters = "vietnamvisahelp.com";
  website.fontSize = 26;
  website.fontName = { family: "Inter", style: "Semi Bold" };
  website.fills = solidPaint(COLORS.secondary);
  website.textAlignHorizontal = "CENTER";
  website.textAutoResize = "WIDTH_AND_HEIGHT";
  frame.appendChild(website);
  website.x = (1080 - website.width) / 2;
  website.y = 1480;

  return frame;
}

// Create Feed Portrait Ad (1080x1350)
function createFeedPortraitAd(variant: typeof AD_VARIANTS[0], index: number): FrameNode {
  const frame = figma.createFrame();
  frame.name = `Feed Portrait - ${variant.id}`;
  frame.resize(DIMENSIONS.feedPortrait.width, DIMENSIONS.feedPortrait.height);
  frame.x = index * (DIMENSIONS.feedPortrait.width + 80);
  frame.y = DIMENSIONS.stories.height + 150;

  // Clean gradient
  frame.fills = [
    {
      type: "GRADIENT_LINEAR",
      gradientStops: [
        { position: 0, color: { r: 0.0, g: 0.35, b: 0.6, a: 1 } },
        { position: 1, color: { r: 0.0, g: 0.25, b: 0.45, a: 1 } },
      ],
      gradientTransform: [[0, 1, 0], [-1, 0, 1]],
    },
  ];

  // Top question
  createPill(frame, variant.topQuestion, 360, 50, { r: 1, g: 1, b: 1, a: 0.2 }, COLORS.white);

  // Headline
  const headline = figma.createText();
  headline.characters = variant.headline;
  headline.fontSize = 48;
  headline.fontName = { family: "Inter", style: "Semi Bold" };
  headline.fills = solidPaint(COLORS.white);
  headline.textAlignHorizontal = "CENTER";
  headline.textAutoResize = "WIDTH_AND_HEIGHT";
  frame.appendChild(headline);
  headline.x = (1080 - headline.width) / 2;
  headline.y = 140;

  // Highlight
  const highlight = figma.createText();
  highlight.characters = variant.highlight;
  highlight.fontSize = 52;
  highlight.fontName = { family: "Inter", style: "Black" };
  highlight.fills = solidPaint(COLORS.secondary);
  highlight.textAlignHorizontal = "CENTER";
  highlight.textAutoResize = "WIDTH_AND_HEIGHT";
  frame.appendChild(highlight);
  highlight.x = (1080 - highlight.width) / 2;
  highlight.y = 210;

  // Document visual (simplified)
  const docVisual = figma.createFrame();
  docVisual.resize(260, 340);
  docVisual.x = 410;
  docVisual.y = 310;
  docVisual.fills = solidPaint(COLORS.white);
  docVisual.cornerRadius = 16;
  docVisual.effects = [
    {
      type: "DROP_SHADOW",
      color: { r: 0, g: 0, b: 0, a: 0.15 },
      offset: { x: 0, y: 6 },
      radius: 20,
      spread: 0,
      visible: true,
      blendMode: "NORMAL",
    },
  ];
  frame.appendChild(docVisual);

  // Doc header
  const docHead = figma.createFrame();
  docHead.resize(260, 50);
  docHead.x = 0;
  docHead.y = 0;
  docHead.fills = solidPaint(COLORS.softRed);
  docHead.topLeftRadius = 16;
  docHead.topRightRadius = 16;
  docVisual.appendChild(docHead);

  const docLabel = figma.createText();
  docLabel.characters = "VIETNAM";
  docLabel.fontSize = 18;
  docLabel.fontName = { family: "Inter", style: "Bold" };
  docLabel.fills = solidPaint(COLORS.white);
  docHead.appendChild(docLabel);
  docLabel.x = 85;
  docLabel.y = 14;

  const approvalLabel = figma.createText();
  approvalLabel.characters = "E-VISA\nAPPROVAL";
  approvalLabel.fontSize = 28;
  approvalLabel.fontName = { family: "Inter", style: "Bold" };
  approvalLabel.fills = solidPaint(COLORS.dark);
  approvalLabel.textAlignHorizontal = "CENTER";
  docVisual.appendChild(approvalLabel);
  approvalLabel.x = 65;
  approvalLabel.y = 80;

  // Green check
  const checkBg = figma.createEllipse();
  checkBg.resize(70, 70);
  checkBg.x = 95;
  checkBg.y = 220;
  checkBg.fills = solidPaint(COLORS.accent);
  docVisual.appendChild(checkBg);

  const check = figma.createText();
  check.characters = "✓";
  check.fontSize = 42;
  check.fontName = { family: "Inter", style: "Bold" };
  check.fills = solidPaint(COLORS.white);
  docVisual.appendChild(check);
  check.x = 112;
  check.y = 230;

  // Explanation
  const explanation = figma.createText();
  explanation.characters = variant.explanation;
  explanation.fontSize = 26;
  explanation.fontName = { family: "Inter", style: "Medium" };
  explanation.fills = solidPaint(COLORS.white);
  explanation.textAlignHorizontal = "CENTER";
  explanation.textAutoResize = "HEIGHT";
  explanation.resize(900, 70);
  frame.appendChild(explanation);
  explanation.x = 90;
  explanation.y = 700;

  // Fact
  const factBg = figma.createFrame();
  factBg.resize(900, 70);
  factBg.x = 90;
  factBg.y = 800;
  factBg.fills = solidPaint({ r: 1, g: 1, b: 1, a: 0.15 });
  factBg.cornerRadius = 12;
  frame.appendChild(factBg);

  const factText = figma.createText();
  factText.characters = "💡 " + variant.fact;
  factText.fontSize = 22;
  factText.fontName = { family: "Inter", style: "Medium" };
  factText.fills = solidPaint(COLORS.white);
  factBg.appendChild(factText);
  factText.x = 20;
  factText.y = 22;

  // Help text
  const help = figma.createText();
  help.characters = variant.helpText;
  help.fontSize = 24;
  help.fontName = { family: "Inter", style: "Regular" };
  help.fills = solidPaint({ r: 0.9, g: 0.9, b: 0.92, a: 1 });
  help.textAlignHorizontal = "CENTER";
  help.textAutoResize = "WIDTH_AND_HEIGHT";
  frame.appendChild(help);
  help.x = (1080 - help.width) / 2;
  help.y = 910;

  // CTA
  createCTAButton(frame, variant.cta, 240, 980, 600);

  // Bottom note
  const note = figma.createText();
  note.characters = variant.bottomNote;
  note.fontSize = 20;
  note.fontName = { family: "Inter", style: "Medium" };
  note.fills = solidPaint({ r: 0.8, g: 0.8, b: 0.82, a: 1 });
  note.textAlignHorizontal = "CENTER";
  note.textAutoResize = "WIDTH_AND_HEIGHT";
  frame.appendChild(note);
  note.x = (1080 - note.width) / 2;
  note.y = 1080;

  // Website
  const site = figma.createText();
  site.characters = "vietnamvisahelp.com";
  site.fontSize = 24;
  site.fontName = { family: "Inter", style: "Semi Bold" };
  site.fills = solidPaint(COLORS.secondary);
  site.textAlignHorizontal = "CENTER";
  site.textAutoResize = "WIDTH_AND_HEIGHT";
  frame.appendChild(site);
  site.x = (1080 - site.width) / 2;
  site.y = 1130;

  // Bottom accent
  const bottomBar = figma.createRectangle();
  bottomBar.resize(1080, 6);
  bottomBar.x = 0;
  bottomBar.y = 1344;
  bottomBar.fills = solidPaint(COLORS.secondary);
  frame.appendChild(bottomBar);

  return frame;
}

// Create Feed Square Ad (1080x1080)
function createFeedSquareAd(variant: typeof AD_VARIANTS[0], index: number): FrameNode {
  const frame = figma.createFrame();
  frame.name = `Feed Square - ${variant.id}`;
  frame.resize(DIMENSIONS.feedSquare.width, DIMENSIONS.feedSquare.height);
  frame.x = index * (DIMENSIONS.feedSquare.width + 80);
  frame.y = DIMENSIONS.stories.height + DIMENSIONS.feedPortrait.height + 300;

  // Light/clean background
  frame.fills = solidPaint({ r: 0.98, g: 0.98, b: 0.99, a: 1 });

  // Top colored bar
  const topBar = figma.createRectangle();
  topBar.resize(1080, 10);
  topBar.x = 0;
  topBar.y = 0;
  topBar.fills = [
    {
      type: "GRADIENT_LINEAR",
      gradientStops: [
        { position: 0, color: { r: 0.85, g: 0.12, b: 0.15, a: 1 } },
        { position: 0.5, color: { r: 1, g: 0.75, b: 0.1, a: 1 } },
        { position: 1, color: { r: 0.85, g: 0.12, b: 0.15, a: 1 } },
      ],
      gradientTransform: [[1, 0, 0], [0, 1, 0]],
    },
  ];
  frame.appendChild(topBar);

  // Top question pill
  createPill(frame, variant.topQuestion, 350, 40, COLORS.primary, COLORS.white);

  // Headline
  const headline = figma.createText();
  headline.characters = variant.headline;
  headline.fontSize = 42;
  headline.fontName = { family: "Inter", style: "Semi Bold" };
  headline.fills = solidPaint(COLORS.dark);
  headline.textAlignHorizontal = "CENTER";
  headline.textAutoResize = "WIDTH_AND_HEIGHT";
  frame.appendChild(headline);
  headline.x = (1080 - headline.width) / 2;
  headline.y = 120;

  // Highlight
  const highlight = figma.createText();
  highlight.characters = variant.highlight;
  highlight.fontSize = 46;
  highlight.fontName = { family: "Inter", style: "Black" };
  highlight.fills = solidPaint(COLORS.softRed);
  highlight.textAlignHorizontal = "CENTER";
  highlight.textAutoResize = "WIDTH_AND_HEIGHT";
  frame.appendChild(highlight);
  highlight.x = (1080 - highlight.width) / 2;
  highlight.y = 180;

  // Simple document icon
  const docIcon = figma.createFrame();
  docIcon.resize(180, 220);
  docIcon.x = 450;
  docIcon.y = 280;
  docIcon.fills = solidPaint(COLORS.white);
  docIcon.cornerRadius = 12;
  docIcon.strokes = [{ type: "SOLID", color: { r: 0.85, g: 0.85, b: 0.87 }, opacity: 1 }];
  docIcon.strokeWeight = 2;
  docIcon.effects = [
    {
      type: "DROP_SHADOW",
      color: { r: 0, g: 0, b: 0, a: 0.08 },
      offset: { x: 0, y: 4 },
      radius: 12,
      spread: 0,
      visible: true,
      blendMode: "NORMAL",
    },
  ];
  frame.appendChild(docIcon);

  // Doc header bar
  const docBar = figma.createFrame();
  docBar.resize(180, 40);
  docBar.x = 0;
  docBar.y = 0;
  docBar.fills = solidPaint(COLORS.softRed);
  docBar.topLeftRadius = 12;
  docBar.topRightRadius = 12;
  docIcon.appendChild(docBar);

  const docText = figma.createText();
  docText.characters = "E-VISA";
  docText.fontSize = 16;
  docText.fontName = { family: "Inter", style: "Bold" };
  docText.fills = solidPaint(COLORS.white);
  docBar.appendChild(docText);
  docText.x = 58;
  docText.y = 10;

  // Lines representing text
  for (let i = 0; i < 4; i++) {
    const line = figma.createRectangle();
    line.resize(140, 8);
    line.x = 20;
    line.y = 60 + i * 25;
    line.fills = solidPaint({ r: 0.9, g: 0.9, b: 0.92, a: 1 });
    line.cornerRadius = 4;
    docIcon.appendChild(line);
  }

  // Check badge
  const checkBadge = figma.createEllipse();
  checkBadge.resize(50, 50);
  checkBadge.x = 65;
  checkBadge.y = 160;
  checkBadge.fills = solidPaint(COLORS.accent);
  docIcon.appendChild(checkBadge);

  const checkIcon = figma.createText();
  checkIcon.characters = "✓";
  checkIcon.fontSize = 28;
  checkIcon.fontName = { family: "Inter", style: "Bold" };
  checkIcon.fills = solidPaint(COLORS.white);
  docIcon.appendChild(checkIcon);
  checkIcon.x = 78;
  checkIcon.y = 168;

  // Explanation
  const explanation = figma.createText();
  explanation.characters = variant.explanation;
  explanation.fontSize = 24;
  explanation.fontName = { family: "Inter", style: "Medium" };
  explanation.fills = solidPaint(COLORS.dark);
  explanation.textAlignHorizontal = "CENTER";
  explanation.textAutoResize = "HEIGHT";
  explanation.resize(900, 60);
  frame.appendChild(explanation);
  explanation.x = 90;
  explanation.y = 530;

  // Fact in pill
  const factBg = figma.createFrame();
  factBg.resize(900, 60);
  factBg.x = 90;
  factBg.y = 620;
  factBg.fills = solidPaint({ r: 0.95, g: 0.95, b: 0.97, a: 1 });
  factBg.cornerRadius = 12;
  frame.appendChild(factBg);

  const fact = figma.createText();
  fact.characters = "💡 " + variant.fact;
  fact.fontSize = 20;
  fact.fontName = { family: "Inter", style: "Medium" };
  fact.fills = solidPaint(COLORS.dark);
  factBg.appendChild(fact);
  fact.x = 20;
  fact.y = 18;

  // Help
  const help = figma.createText();
  help.characters = variant.helpText;
  help.fontSize = 22;
  help.fontName = { family: "Inter", style: "Regular" };
  help.fills = solidPaint(COLORS.warmGray);
  help.textAlignHorizontal = "CENTER";
  help.textAutoResize = "WIDTH_AND_HEIGHT";
  frame.appendChild(help);
  help.x = (1080 - help.width) / 2;
  help.y = 720;

  // CTA
  createCTAButton(frame, variant.cta, 265, 780, 550);

  // Bottom info
  const bottomInfo = figma.createText();
  bottomInfo.characters = variant.bottomNote + "  •  vietnamvisahelp.com";
  bottomInfo.fontSize = 20;
  bottomInfo.fontName = { family: "Inter", style: "Medium" };
  bottomInfo.fills = solidPaint(COLORS.warmGray);
  bottomInfo.textAlignHorizontal = "CENTER";
  bottomInfo.textAutoResize = "WIDTH_AND_HEIGHT";
  frame.appendChild(bottomInfo);
  bottomInfo.x = (1080 - bottomInfo.width) / 2;
  bottomInfo.y = 880;

  // Bottom bar
  const bottomBar = figma.createRectangle();
  bottomBar.resize(1080, 10);
  bottomBar.x = 0;
  bottomBar.y = 1070;
  bottomBar.fills = [
    {
      type: "GRADIENT_LINEAR",
      gradientStops: [
        { position: 0, color: { r: 0.85, g: 0.12, b: 0.15, a: 1 } },
        { position: 0.5, color: { r: 1, g: 0.75, b: 0.1, a: 1 } },
        { position: 1, color: { r: 0.85, g: 0.12, b: 0.15, a: 1 } },
      ],
      gradientTransform: [[1, 0, 0], [0, 1, 0]],
    },
  ];
  frame.appendChild(bottomBar);

  return frame;
}

// Main
async function main() {
  await loadFonts();

  // Section labels
  const labels = [
    { text: "INSTAGRAM STORIES / REELS (1080×1920)", y: -80 },
    { text: "INSTAGRAM FEED PORTRAIT (1080×1350)", y: DIMENSIONS.stories.height + 70 },
    { text: "INSTAGRAM FEED SQUARE (1080×1080)", y: DIMENSIONS.stories.height + DIMENSIONS.feedPortrait.height + 220 },
  ];

  labels.forEach((label) => {
    const labelText = figma.createText();
    labelText.characters = label.text;
    labelText.fontSize = 36;
    labelText.fontName = { family: "Inter", style: "Bold" };
    labelText.fills = solidPaint({ r: 0.4, g: 0.4, b: 0.4, a: 1 });
    labelText.x = 0;
    labelText.y = label.y;
  });

  // Generate all ads
  AD_VARIANTS.forEach((variant, index) => {
    createStoriesAd(variant, index);
    createFeedPortraitAd(variant, index);
    createFeedSquareAd(variant, index);
  });

  // Zoom to see all
  figma.viewport.scrollAndZoomIntoView(figma.currentPage.children);

  figma.notify(`✅ Created ${AD_VARIANTS.length * 3} friendly Instagram ads!`);
  figma.closePlugin();
}

main();

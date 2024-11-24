// Variant 1 Text Only

import { BULLET_TEXTS, CHART_DATA, LAYOUT_OPTIONS } from "../data";

const SLIDE_TITLE_OPTIONS = {
  x: 0.6, // Inside the border
  y: 0.8,
  fontSize: 28, // Smaller font size
  bold: true,
  color: "6058d0",
  align: "left",
};

// this add a title on the slide
function addTitleIntoSlide(slide, title, options) {
  console.log("localStorage.getItem()", localStorage.getItem("bgColor"));
  slide.background = { color: localStorage.getItem("PPT_BG") };
  slide.addText(title, {
    ...SLIDE_TITLE_OPTIONS,
  });
}

export function generateTextAndTableSlideV1(pptx, config) {
  let slide = pptx.addSlide();

  // for adding title
  addTitleIntoSlide(slide, config?.title, SLIDE_TITLE_OPTIONS);

  console.log("config in v1", config);

  // for loop 1 loop through
  config?.slideDataArray?.forEach((slideItem, index) => {
    console.log("slideItem", slideItem);

    if (slideItem?.type == "text") {
      // Add bullet points text with meaningful content
      slide.addText(slideItem.data, {
        ...LAYOUT_OPTIONS.LAYOUT_1_FULL_MAX_TEXT_OPTIONS,
      });
    }
    if (slideItem?.type == "table") {
      slide.addTable(slideItem.data, {
        ...LAYOUT_OPTIONS.LAYOUT_1_MEDIA_FULL_OPTIONS_TABLE,
      });
    }
    if (slideItem?.type == "chart") {
      slide.addChart(pptx.ChartType.line, slideItem.data, {
        ...LAYOUT_OPTIONS.LAYOUT_1_MEDIA_FULL_OPTIONS_CHART,
      });
    }
    if (slideItem?.type == "image") {
      // override path
      slide.addImage({
        ...LAYOUT_OPTIONS.LAYOUT_1_MEDIA_FULL_OPTIONS_IMAGE,
        path: slideItem.path,
      });
    }
  });
}

// Variant 2 Max Text + one media 50-50
export function generateTextAndTableSlideV2(pptx, config) {
  let slide = pptx.addSlide();
  slide.background = { color: "EFF212" };

  // for adding title
  addTitleIntoSlide(slide, config?.title, SLIDE_TITLE_OPTIONS);

  config?.slideDataArray?.forEach((slideItem, index) => {
    console.log("slideItem", slideItem);

    if (slideItem?.type == "text") {
      // Add bullet points text with meaningful content
      slide.addText(slideItem.data, {
        ...LAYOUT_OPTIONS.LAYOUT_2_MAX_TEXT_LEFT_OPTIONS_BULLET,
      });
    }
    if (slideItem?.type == "table") {
      slide.addTable(slideItem.data, {
        ...LAYOUT_OPTIONS.LAYOUT_2_MEDIA_RIGHT_FULL_OPTIONS_TABLE,
      });
    }
    if (slideItem?.type == "chart") {
      slide.addChart(pptx.ChartType.line, slideItem.data, {
        ...LAYOUT_OPTIONS.LAYOUT_2_MEDIA_RIGHT_FULL_OPTIONS_CHART,
      });
    }
    if (slideItem?.type == "image") {
      // override path
      slide.addImage({
        ...LAYOUT_OPTIONS.LAYOUT_2_MEDIA_RIGHT_FULL_OPTIONS_IMAGE,
        path: slideItem.path,
      });
    }
  });
}

// ---------------v 2 all variants done above

// Variant 3 50 50 : Max text : 2 Media ( P + L)  V3
export function generateTextAndTableSlideV3(pptx, reordered) {
  let slide = pptx.addSlide();

  // Add a big heading on top
  slide.addText("50 50 :Max text : 2M ( P + L)  V3", {
    x: 0.2, // X-position
    y: 0.5, // Y-position
    fontSize: 36,
    bold: true,
    color: "000000",
  });

  // Add text on the left side (50% of the width)
  slide.addText(BULLET_TEXTS, {
    x: 0.5, // Inside the border
    y: 3, // Y-position inside the border
    w: 4.8, // Slightly smaller width
    fontSize: 14, // Smaller font size for bullet points
    color: "000000",
    bullet: true,
    align: "left",
    autoFit: true,
    lineSpacing: 24, // Add vertical spacing between lines
  });
  // Add an image on the top-right
  slide.addImage({
    path: "https://media.istockphoto.com/id/1241682184/photo/bird-on-top-of-a-stick.jpg?s=2048x2048&w=is&k=20&c=kFLLe-NPodHtMIlvHbtNMNXUfTJyddny_BMpGY9diFE=", // Replace with your image path
    x: 5, // Start at 50% width
    y: 1.5, // Below the title
    w: 2.5, // 50% of slide width
    h: 2, // Height of the image
  });

  // Add a table (or chart) below the image
  let tableData = [
    [
      { text: "Header 1", options: { bold: true } },
      { text: "Header 2", options: { bold: true } },
    ],
    ["Row 1 Col 1", "Row 1 Col 2"],
    ["Row 2 Col 1", "Row 2 Col 2"],
  ];

  slide.addTable(tableData, {
    x: 5, // Start at 50% width
    y: 3.7, // Just below the image
    w: 4.5, // Full width of the right-side space
    border: { pt: 1, color: "000000" },
  });
}

// Variant 4 Title +  [table + chart] +  Image// Variant 3 50 50 : Max text : 2 Media ( L+ L)  V3
// 💡 Active
export function generateTextAndTableSlideV4(pptx, config) {
  let slide = pptx.addSlide();

  console.log("LAYOUT 4444444444444444", config);

  // for adding title
  addTitleIntoSlide(slide, config?.title, SLIDE_TITLE_OPTIONS);

  config?.slideDataArray?.forEach((slideItem, index) => {
    console.log("slideItem ABCD", slideItem);

    if (slideItem?.type == "text") {
      // Add bullet points text with meaningful content
      slide.addText(slideItem.data, {
        ...LAYOUT_OPTIONS.LAYOUT_2_MAX_TEXT_LEFT_OPTIONS_BULLET,
      });
    }
    if (slideItem?.type == "table") {
      slide.addTable(slideItem.data, {
        ...{
          x: 5, // Start at 50% width
          y: index == 1 ? 1.3 : 3.5, // Just below the image
          w: 4.5, // Full width of the right-side space
          border: { pt: 1, color: "000000" },
        },
      });
    }
    if (slideItem?.type == "chart") {
      slide.addChart(pptx.ChartType.line, slideItem.data, {
        ...{
          x: 5, // Start at 50% width
          y: index == 1 ? 1.3 : 3.5, // Just below the image
          w: 4.5, // Full width of the right-side space
        },
      });
    }
    if (slideItem?.type == "image") {
      // override path
      slide.addImage({
        ...{
          x: 5, // Start at 50% width
          y: index == 1 ? 1.3 : 3.5, // Below the title
          w: 4.5, // 50% of slide width
          h: 2, // Height of the image
        },
        path: slideItem.path,
      });
    }
  });
}

// v5 50 50:Max text :2M( P + P) V5
export function generateTextAndTableSlideV5(pptx, reordered) {
  let slide = pptx.addSlide();

  // Add a big heading on top
  slide.addText("50 50:Max text :2M( P + P) V5", {
    x: 0.2, // X-position
    y: 0.5, // Y-position
    fontSize: 36,
    bold: true,
    color: "000000",
  });

  // Add text on the left side (50% of the width)
  slide.addText(BULLET_TEXTS, {
    x: 0.5, // Inside the border
    y: 3, // Y-position inside the border
    w: 4.8, // Slightly smaller width
    fontSize: 14, // Smaller font size for bullet points
    color: "000000",
    bullet: true,
    align: "left",
    autoFit: true,
    lineSpacing: 24, // Add vertical spacing between lines
  });
  // Add an image on the top-right
  slide.addImage({
    path: "https://media.istockphoto.com/id/1241682184/photo/bird-on-top-of-a-stick.jpg?s=2048x2048&w=is&k=20&c=kFLLe-NPodHtMIlvHbtNMNXUfTJyddny_BMpGY9diFE=", // Replace with your image path
    x: 5, // Start at 50% width
    y: 1.5, // Below the title
    w: 2.5, // 50% of slide width
    h: 2, // Height of the image
  });

  // Add a table (or chart) below the image
  let tableData = [
    [
      { text: "Header 1", options: { bold: true } },
      { text: "Header 2", options: { bold: true } },
    ],
    ["Row 1 Col 1", "Row 1 Col 2"],
    ["Row 2 Col 1", "Row 2 Col 2"],
  ];

  slide.addTable(tableData, {
    x: 5, // Start at 50% width
    y: 3.7, // Just below the image
    w: 2.5, // Full width of the right-side space
    border: { pt: 1, color: "000000" },
  });
}

// Variant 6  Less Text 1M P large v5
export function generateTextAndTableSlideV6(pptx, reordered) {
  let slide = pptx.addSlide();

  // Add a big heading on top
  slide.addText("Less Text 1M P large v6", {
    x: 0.2, // X-position
    y: 0.5, // Y-position
    fontSize: 36,
    bold: true,
    color: "000000",
  });

  // Add text on the left side (50% of the width)

  slide.addText(BULLET_TEXTS, {
    fontSize: 14, // Smaller font size for bullet points

    align: "left",
    autoFit: true,
    x: 0.5, // Left margin
    y: 0.8, // Below the title
    w: 2.5, // 50% of slide width
    h: 4, // Adjusted height
    color: "000000",
    bullet: true,

    lineSpacing: 24, // Add vertical spacing between lines
  });

  slide.addImage({
    path: "https://media.istockphoto.com/id/1241682184/photo/bird-on-top-of-a-stick.jpg?s=2048x2048&w=is&k=20&c=kFLLe-NPodHtMIlvHbtNMNXUfTJyddny_BMpGY9diFE=", // Replace with your image path
    x: 3, // Start at 50% width
    y: 1, // Below the title
    w: 6.5, // 50% of slide width
    h: 4, // Height of the image
  });
}

// Variant 7 Less Text 1M L  v7

export function generateTextAndTableSlideV7(pptx, reordered) {
  let slide = pptx.addSlide();

  // Add a big heading on top
  slide.addText("Less Text 1M L  v7", {
    x: 0.2, // X-position
    y: 0.5, // Y-position
    fontSize: 36,
    bold: true,
    color: "000000",
  });

  // Add text on the left side (50% of the width)
  slide.addText(BULLET_TEXTS, {
    fontSize: 14, // Smaller font size for bullet points

    align: "left",
    autoFit: true,
    x: 0.5, // Left margin
    y: 0.8, // Below the title
    w: 2.5, // 50% of slide width
    h: 4, // Adjusted height
    color: "000000",
    bullet: true,

    lineSpacing: 24, // Add vertical spacing between lines
  });
  slide.addImage({
    path: "https://media.istockphoto.com/id/1241682184/photo/bird-on-top-of-a-stick.jpg?s=2048x2048&w=is&k=20&c=kFLLe-NPodHtMIlvHbtNMNXUfTJyddny_BMpGY9diFE=", // Replace with your image path
    x: 3, // Start at 50% width
    y: 1, // Below the title
    w: 6.5, // 50% of slide width
    h: 2, // Height of the image
  });
}
// Variant 8 Less Text 2M L + P

export function generateTextAndTableSlideV8(pptx, reordered) {
  let slide = pptx.addSlide();

  // Add a big heading on top
  slide.addText("Less Text 2M L L v9", {
    x: 0.2, // X-position
    y: 0.5, // Y-position
    fontSize: 36,
    bold: true,
    color: "000000",
  });

  // Add text on the left side (50% of the width)
  slide.addText(
    [
      { text: "Teamwork achieves goals.\n", options: {} },
      { text: "Communication drives success.\n", options: {} },
      { text: "Adaptability ensures growth.\n", options: {} },
      { text: "Focus on learning.\n", options: {} },
      { text: "Customer-first approach.\n", options: {} },
      { text: "Innovation sparks progress.", options: {} },
    ],
    {
      fontSize: 14, // Smaller font size for bullet points

      align: "left",
      autoFit: true,
      x: 0.5, // Left margin
      y: 0.8, // Below the title
      w: 2.5, // 50% of slide width
      h: 4, // Adjusted height
      color: "000000",
      bullet: true,

      lineSpacing: 24, // Add vertical spacing between lines
    }
  );

  slide.addImage({
    path: "https://media.istockphoto.com/id/1241682184/photo/bird-on-top-of-a-stick.jpg?s=2048x2048&w=is&k=20&c=kFLLe-NPodHtMIlvHbtNMNXUfTJyddny_BMpGY9diFE=", // Replace with your image path
    x: 3, // Start at 50% width
    y: 1, // Below the title
    w: 6.5, // 50% of slide width
    h: 2, // Height of the image
  });
  slide.addImage({
    path: "https://media.istockphoto.com/id/1241682184/photo/bird-on-top-of-a-stick.jpg?s=2048x2048&w=is&k=20&c=kFLLe-NPodHtMIlvHbtNMNXUfTJyddny_BMpGY9diFE=", // Replace with your image path
    x: 3, // Start at 50% width
    y: 3.2, // Below the title
    w: 2.5, // 50% of slide width
    h: 2, // Height of the image
  });
}

// Variant 9 Less Text 2M L + L

export function generateTextAndTableSlideV9(pptx, config) {
  let slide = pptx.addSlide();
  addTitleIntoSlide(slide, config?.title, SLIDE_TITLE_OPTIONS);
  console.log("configv9 config",config);

  config?.slideDataArray?.forEach((slideItem, index) => {
    console.log("slideItem", slideItem);

    // if (slideItem?.type == "text") {
    //   // Add bullet points text with meaningful content
    //   slide.addText(slideItem.data, {
    //     ...LAYOUT_OPTIONS.LAYOUT_2_MAX_TEXT_LEFT_OPTIONS_BULLET,
    //   });
    // }
    if (slideItem?.type == "table") {
      slide.addTable(slideItem.data, {
        x: 1, // Start at 50% width
        y: index == 0 ? 1.3 : 3.5, // Just below the image
        w: 8.5, // Full width of the right-side space
        border: { pt: 1, color: "000000" },
      });
    }
    if (slideItem?.type == "chart") {
      slide.addChart(pptx.ChartType.line, slideItem.data, {
        ...{
          x: 1, // Start at 50% width
          y: index == 0 ? 1.3 : 3.5, // Just below the image
          w: 8.5, // 50% of slide width
          h: 2,
        },
      });
    }
    if (slideItem?.type == "image") {
      // override path
      slide.addImage({
        x: 1, // Start at 50% width
        y: index == 0 ? 1.3 : 3.5, // Just below the image
        w: 8.5, // 50% of slide width
        h: 2,
        path: slideItem.path,
      });
    }
  });

  // // Add a big heading on top
  // slide.addText("Less Text 2M L L v9", {
  //   x: 0.2, // X-position
  //   y: 0.5, // Y-position
  //   fontSize: 36,
  //   bold: true,
  //   color: "000000",
  // });

  // // Add text on the left side (50% of the width)
  // slide.addText(
  //   [
  //     { text: "Teamwork achieves goals.\n", options: {} },
  //     { text: "Communication drives success.\n", options: {} },
  //     { text: "Adaptability ensures growth.\n", options: {} },
  //     { text: "Focus on learning.\n", options: {} },
  //     { text: "Customer-first approach.\n", options: {} },
  //     { text: "Innovation sparks progress.", options: {} },
  //   ],
  //   {
  //     fontSize: 14, // Smaller font size for bullet points

  //     align: "left",
  //     autoFit: true,
  //     x: 0.5, // Left margin
  //     y: 0.8, // Below the title
  //     w: 2.5, // 50% of slide width
  //     h: 4, // Adjusted height
  //     color: "000000",
  //     bullet: true,

  //     lineSpacing: 24, // Add vertical spacing between lines
  //   }
  // );

  // slide.addImage({
  //   path: "https://media.istockphoto.com/id/1241682184/photo/bird-on-top-of-a-stick.jpg?s=2048x2048&w=is&k=20&c=kFLLe-NPodHtMIlvHbtNMNXUfTJyddny_BMpGY9diFE=", // Replace with your image path
  //   x: 3, // Start at 50% width
  //   y: 1, // Below the title
  //   w: 6.5, // 50% of slide width
  //   h: 2, // Height of the image
  // });
  // slide.addImage({
  //   path: "https://media.istockphoto.com/id/1241682184/photo/bird-on-top-of-a-stick.jpg?s=2048x2048&w=is&k=20&c=kFLLe-NPodHtMIlvHbtNMNXUfTJyddny_BMpGY9diFE=", // Replace with your image path
  //   x: 3, // Start at 50% width
  //   y: 3.2, // Below the title
  //   w: 6.5, // 50% of slide width
  //   h: 2, // Height of the image
  // });
}

// Variant 10 Less Text 2M P + P
export function generateTextAndTableSlideV10(pptx, reordered) {
  let slide = pptx.addSlide();

  // Add a big heading on top
  slide.addText("Less Text 2M P P v10", {
    x: 0.2, // X-position
    y: 0.5, // Y-position
    fontSize: 36,
    bold: true,
    color: "000000",
  });

  // Add text on the left side (50% of the width)
  slide.addText(
    [
      { text: "Teamwork achieves goals.\n", options: {} },
      { text: "Communication drives success.\n", options: {} },
      { text: "Adaptability ensures growth.\n", options: {} },
      { text: "Focus on learning.\n", options: {} },
      { text: "Customer-first approach.\n", options: {} },
      { text: "Innovation sparks progress.", options: {} },
    ],
    {
      fontSize: 14, // Smaller font size for bullet points

      align: "left",
      autoFit: true,
      x: 0.5, // Left margin
      y: 0.8, // Below the title
      w: 2.5, // 50% of slide width
      h: 4, // Adjusted height
      color: "000000",
      bullet: true,

      lineSpacing: 24, // Add vertical spacing between lines
    }
  );

  slide.addImage({
    path: "https://media.istockphoto.com/id/1241682184/photo/bird-on-top-of-a-stick.jpg?s=2048x2048&w=is&k=20&c=kFLLe-NPodHtMIlvHbtNMNXUfTJyddny_BMpGY9diFE=", // Replace with your image path
    x: 3, // Start at 50% width
    y: 1, // Below the title
    w: 2.5, // 50% of slide width
    h: 2, // Height of the image
  });
  slide.addImage({
    path: "https://media.istockphoto.com/id/1241682184/photo/bird-on-top-of-a-stick.jpg?s=2048x2048&w=is&k=20&c=kFLLe-NPodHtMIlvHbtNMNXUfTJyddny_BMpGY9diFE=", // Replace with your image path
    x: 6, // Start at 50% width
    y: 1, // Below the title
    w: 2.5, // 50% of slide width
    h: 2, // Height of the image
  });
}

// v6 Text + one media L

export function generateTextAndTableSlideV11(pptx, reordered) {
  let slide = pptx.addSlide();

  // Add a big heading on top
  slide.addText("Less Text 1M L large v11", {
    x: 0.2, // X-position
    y: 0.5, // Y-position
    fontSize: 36,
    bold: true,
    color: "000000",
  });

  slide.addImage({
    path: "https://media.istockphoto.com/id/1241682184/photo/bird-on-top-of-a-stick.jpg?s=2048x2048&w=is&k=20&c=kFLLe-NPodHtMIlvHbtNMNXUfTJyddny_BMpGY9diFE=", // Replace with your image path
    x: 0.2, // Start at 50% width
    y: 1, // Below the title
    w: 9, // 50% of slide width
    h: 4, // Height of the image
  });
}

export const LAYOUT_OPTIONS = {
  // Layout 1  full text with Heading
  LAYOUT_1_FULL_MAX_TEXT_OPTIONS: {
    x: 0.5, // Inside the border
    y: 3, // Y-position inside the border
    w: 8.8, // Slightly smaller width
    fontSize: 14, // Smaller font size for bullet points
    color: "000000",
    bullet: true,
    align: "left",
    lineSpacing: 24, // Add vertical spacing between lines
  },
  LAYOUT_1_MEDIA_FULL_OPTIONS_TABLE: {
    x: 0.2, // Start at 50% width
    y: 1, // Below the title
    w: 9, // 50% of slide width
    h: 4, // Height of the image
    border: { pt: 1, color: "000000" },
  },
  // Layout 2 Right side  full Chart
  LAYOUT_1_MEDIA_FULL_OPTIONS_CHART: {
    x: 0.2, // Start at 50% width
    y: 1, // Below the title
    w: 9, // 50% of slide width
    h: 4, // Height of the image
  },
  // Layout 2 Right side  full Image
  LAYOUT_1_MEDIA_FULL_OPTIONS_IMAGE: {
    path: "https://media.istockphoto.com/id/1241682184/photo/bird-on-top-of-a-stick.jpg?s=2048x2048&w=is&k=20&c=kFLLe-NPodHtMIlvHbtNMNXUfTJyddny_BMpGY9diFE=", // Replace with your image path
    x: 0.2, // Start at 50% width
    y: 1, // Below the title
    w: 9, // 50% of slide width
    h: 4, // Height of the image
  },

  // Layout 1 Ends

  // Layout 2 Half Text Options : Left side ( its for bullets)
  LAYOUT_2_MAX_TEXT_LEFT_OPTIONS_BULLET: {
    x: 0.5, // Inside the border-
    y: 3, // Y-position inside the border
    w: 4.8, // Slightly smaller width
    fontSize: 14, // Smaller font size for bullet points
    color: "000000",
    bullet: true,
    align: "left",
    autoFit: true,
    lineSpacing: 24, // Add vertical spacing between lines
  },
  // Layout 2 Right side full Table
  LAYOUT_2_MEDIA_RIGHT_FULL_OPTIONS_TABLE: {
    x: 5, // Start at 50% width
    y: 1.5, // Below the title
    w: 4.5, // 50% of slide width
    border: { pt: 1, color: "000000" },
  },
  // Layout 2 Right side  full Chart
  LAYOUT_2_MEDIA_RIGHT_FULL_OPTIONS_CHART: { x: 5, y: 1.5, w: 4.5, h: 4 },
  // Layout 2 Right side  full Image
  LAYOUT_2_MEDIA_RIGHT_FULL_OPTIONS_IMAGE: {
    path: "https://media.istockphoto.com/id/1241682184/photo/bird-on-top-of-a-stick.jpg?s=2048x2048&w=is&k=20&c=kFLLe-NPodHtMIlvHbtNMNXUfTJyddny_BMpGY9diFE=", // Replace with your image path
    x: 5, // Start at 50% width
    y: 1, // Below the title
    w: 4.5, // 50% of slide width
    h: 4, // Height of the image
  },
};

export const CHART_DATA = [
  {
    name: "Actual Sales",
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    values: [
      1500, 4600, 5156, 3167, 8510, 8009, 6006, 7855, 12102, 12789, 10123,
      15121,
    ],
  },
  {
    name: "Projected Sales",
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    values: [
      1000, 2600, 3456, 4567, 5010, 6009, 7006, 8855, 9102, 10789, 11123, 12121,
    ],
  },
];

export const BULLET_TEXTS = [
  {
    text: " The importance of teamwork in achieving goals.\n",
    options: {},
  },
  { text: " Effective communication drives collaboration.\n", options: {} },
  { text: " Adaptability is key to overcoming challenges.\n", options: {} },
  { text: " Focus on continuous learning and growth.\n", options: {} },
  {
    text: "Maintain a customer-centric approach in business.",
    options: {},
  },
  { text: " Focus on continuous learning and growth.\n", options: {} },
  {
    text: "Maintain a customer-centric approach in business.",
    options: {},
  },
  { text: " Effective communication drives collaboration.\n", options: {} },
  { text: " Adaptability is key to overcoming challenges.\n", options: {} },
  { text: " Adaptability is key to overcoming challenges.", options: {} },
];
export const TABLE_DATA = [
  [
    { text: "Header 1", options: { bold: true } },
    { text: "Header 2", options: { bold: true } },
  ],
  ["Row 1 Col 1", "Row 1 Col 2"],
  ["Row 2 Col 1", "Row 2 Col 2"],
];

// leftText meta data
export const leftText30PercentMetaData = {
  type: "text",
  data: BULLET_TEXTS,
  //options depends on the layout
  options: { ...LAYOUT_OPTIONS.LAYOUT_1_FULL_MAX_TEXT_OPTIONS },
};
export const leftText50PercentMetaData = {
  type: "text",
  data: BULLET_TEXTS,
  //options depends on the layout
  options: { ...LAYOUT_OPTIONS.LAYOUT_1_FULL_MAX_TEXT_OPTIONS },
};
// PREPARING DEFAULT TABLE/ CHART/TEXT AND IMAGE  OBJECT THAT CAN BE UED LATER IN Preparing NEW SLIDES]
// Note: this is just default data for all three types and this is pointing to the full width and height objects under title
// if we will use this instead of layout v1 . then we need to override options or sure.
// so keep in mind when we are changing the layout , we need to change options and the path/ dataset of media/text
// this is p1 ( default object ) which will be used in default slide data, in these object we should override options and dataset
// and change the layout accordingly
export const DEFAULT_TEXT_OBJECT = {
  type: "text",
  data: BULLET_TEXTS,
  //options depends on the layout
  options: { ...LAYOUT_OPTIONS.LAYOUT_1_FULL_MAX_TEXT_OPTIONS },
};
export const DEFAULT_TABLE_OBJECT = {
  type: "table",
  tableTitle: "Sample Table",
  data: TABLE_DATA,
  //options depends on the layout
  options: { ...LAYOUT_OPTIONS.LAYOUT_1_MEDIA_FULL_OPTIONS_TABLE },
};
export const DEFAULT_CHART_OBJECT = {
  type: "chart",
  chartType: "line",
  data: CHART_DATA,
  chartTitle: "Sample Chart",
  //options depends on the layout
  options: { ...LAYOUT_OPTIONS.LAYOUT_1_MEDIA_FULL_OPTIONS_CHART },
};

export const DEFAULT_IMAGE_OBJECT = {
  ...LAYOUT_OPTIONS.LAYOUT_1_MEDIA_FULL_OPTIONS_IMAGE,
  type: "image",
};

export const defaultSlideData = {
  slideId: 1,
  order: 0,
  layout: "v1",
  template: 1,
  maxText: true,
  bgColor: localStorage.getItem("bgColor"),
  title: "",
  // if tis config is used for v1 then then default type is text can be overridden with image, chart and table
  // metadata: {
  //   bgColor: "#FFFFFF",
  //   fontSize: "16px",
  //   fontFamily: "Arial",
  // },
  // tell is there left right combination or not
  // leftText: true,
  // leftText: {
  //   ...leftText50PercentMetaData,
  // },
  slideDataArray: [
    // {
    //   ...DEFAULT_TEXT_OBJECT
    // },
    // {
    //  ...DEFAULT_IMAGE_OBJECT
    // },
    // {
    //   ...DEFAULT_TABLE_OBJECT,
    // },
    // {
    //   ...DEFAULT_CHART_OBJECT
    // }
  ],
};

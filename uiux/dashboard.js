am4core.ready(function () {
  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  am4core.options.autoSetClassName = true;

  // Create chart instance
  var chart = am4core.create("chartdiv", am4charts.XYChart);

  chart.colors.step = 2;
  chart.maskBullets = false;

  // Add data
  chart.data = [
    {
      date: "2020-12-01",
      distance: 348,
      townName: "New York",
      townName2: "New York",
      townSize: 12,
      latitude: 40.71,
      duration: 267,
    },
    {
      date: "2020-12-02",
      distance: 350,
      townName: "Washington",
      townSize: 7,
      latitude: 38.89,
      duration: 310,
    },
    {
      date: "2020-12-03",
      distance: 352,
      townName: "Wilmington",
      townSize: 3,
      latitude: 34.22,
      duration: 326,
    },
    {
      date: "2020-12-04",
      distance: 371,
      townName: "Jacksonville",
      townSize: 3.5,
      latitude: 30.35,
      duration: 360,
    },
    {
      date: "2020-12-05",
      distance: 390,
      townName: "Miami",
      townName2: "Miami",
      townSize: 5,
      latitude: 25.83,
      duration: 386,
    },
    {
      date: "2020-12-06",
      distance: 413,
      townName: "Tallahassee",
      townSize: 3.5,
      latitude: 30.46,
      duration: 406,
    },
    {
      date: "2020-12-07",
      distance: 435,
      townName: "New Orleans",
      townSize: 5,
      latitude: 29.94,
      duration: 428,
    },
    {
      date: "2020-12-08",
      distance: 400,
      townName: "Houston",
      townName2: "Houston",
      townSize: 8,
      latitude: 29.76,
      duration: 388,
    },
    {
      date: "2020-12-09",
      distance: 390,
      townName: "Dalas",
      townSize: 8,
      latitude: 32.8,
      duration: 378,
    },
    {
      date: "2020-12-10",
      distance: 375,
      townName: "Oklahoma City",
      townSize: 5,
      latitude: 35.49,
      duration: 358,
    },
    {
      date: "2020-12-11",
      distance: 353,
      townName: "Kansas City",
      townSize: 5,
      latitude: 39.1,
      duration: 332,
    },
    {
      date: "2020-12-12",
      distance: 394,
      townName: "Denver",
      townName2: "Denver",
      townSize: 9,
      latitude: 39.74,
      duration: 380,
    },
    {
      date: "2020-12-13",
      townName: "Salt Lake City",
      townSize: 6,
      distance: 425,
      duration: 420,
      latitude: 40.75,
      dashLength: 8,
      alpha: 0.4,
    },
    {
      date: "2020-12-14",
      latitude: 36.1,
      duration: 450,
      distance: 462,
      townName: "Las Vegas",
      townName2: "Las Vegas",
    },
    {
      date: "2020-12-15",
      latitude: 36.1,
      duration: 400,
      distance: 402,
      townName: "Las Vegas",
      townName2: "Las Vegas",
    },
    {
      date: "2020-12-16",
      latitude: 36.1,
      duration: 430,
      distance: 452,
      townName: "Las Vegas",
      townName2: "Las Vegas",
    },
    {
      date: "2020-12-17",
    },
  ];

  // Create axes
  var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.dataFields.category = "category";
  dateAxis.renderer.grid.template.location = 0;
  dateAxis.renderer.minGridDistance = 50;
  dateAxis.renderer.grid.template.disabled = true;
  dateAxis.renderer.fullWidthTooltip = true;

  var distanceAxis = chart.yAxes.push(new am4charts.ValueAxis());
  distanceAxis.title.text = "Số từ";
  distanceAxis.renderer.grid.template.disabled = true;

  var durationAxis = chart.yAxes.push(new am4charts.DurationAxis());
  durationAxis.title.text = "Thời gian";
  durationAxis.baseUnit = "minute";
  durationAxis.renderer.grid.template.disabled = true;
  durationAxis.renderer.opposite = true;

  durationAxis.durationFormatter.durationFormat = "hh'h' mm'min'";

  var latitudeAxis = chart.yAxes.push(new am4charts.ValueAxis());
  latitudeAxis.renderer.grid.template.disabled = true;
  latitudeAxis.renderer.labels.template.disabled = true;

  // Create series
  var distanceSeries = chart.series.push(new am4charts.ColumnSeries());
  distanceSeries.id = "g1";
  distanceSeries.dataFields.valueY = "distance";
  distanceSeries.dataFields.dateX = "date";
  distanceSeries.yAxis = distanceAxis;
  // distanceSeries.tooltipText = "{valueY} miles";
  distanceSeries.name = "Từ đơn";
  distanceSeries.columns.template.fillOpacity = 0.7;

  var disatnceState = distanceSeries.columns.template.states.create("hover");
  disatnceState.properties.fillOpacity = 0.9;

  var durationSeries = chart.series.push(new am4charts.LineSeries());
  durationSeries.id = "g3";
  durationSeries.dataFields.valueY = "duration";
  durationSeries.dataFields.dateX = "date";
  durationSeries.yAxis = durationAxis;
  durationSeries.name = "Thời gian";
  durationSeries.strokeWidth = 2;
  durationSeries.tooltipText = "{valueY.formatDuration()}";

  var durationBullet = durationSeries.bullets.push(new am4charts.Bullet());
  var durationRectangle = durationBullet.createChild(am4core.Rectangle);
  durationBullet.horizontalCenter = "middle";
  durationBullet.verticalCenter = "middle";
  durationBullet.width = 7;
  durationBullet.height = 7;
  durationRectangle.width = 7;
  durationRectangle.height = 7;

  var durationState = durationBullet.states.create("hover");
  durationState.properties.scale = 1.2;

  // var latitudeSeries = chart.series.push(new am4charts.LineSeries());
  // latitudeSeries.id = "g2";
  // latitudeSeries.dataFields.valueY = "latitude";
  // latitudeSeries.dataFields.dateX = "date";
  // latitudeSeries.yAxis = latitudeAxis;
  // latitudeSeries.name = "Duration";
  // latitudeSeries.strokeWidth = 2;
  // latitudeSeries.tooltipText = "Latitude: {valueY} ({townName})";

  // var latitudeBullet = latitudeSeries.bullets.push(new am4charts.CircleBullet());
  // latitudeBullet.circle.fill = am4core.color("#fff");
  // latitudeBullet.circle.strokeWidth = 2;
  // latitudeBullet.circle.propertyFields.radius = "townSize";

  // var latitudeState = latitudeBullet.states.create("hover");
  // latitudeState.properties.scale = 1.2;

  // var latitudeLabel = latitudeSeries.bullets.push(new am4charts.LabelBullet());
  // latitudeLabel.label.text = "{townName2}";
  // latitudeLabel.label.horizontalCenter = "left";
  // latitudeLabel.label.dx = 14;

  // Add legend
  chart.legend = new am4charts.Legend();

  // Add cursor
  chart.cursor = new am4charts.XYCursor();
  chart.cursor.fullWidthLineX = true;
  chart.cursor.xAxis = dateAxis;
  chart.cursor.lineX.strokeOpacity = 0;
  chart.cursor.lineX.fill = am4core.color("#000");
  chart.cursor.lineX.fillOpacity = 0.1;
}); // end am4core.ready()

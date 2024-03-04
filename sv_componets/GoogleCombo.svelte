<script>
    import { onMount } from "svelte";
    // Define variables
    let combo_title = "combo_title";
    let hAxis = "hAxis";
    let chartContainer;
    let chart;
	
    let initialized = false;
    // Exported props
    export let combo_id = 'G-Combo-001';
    export let combo_height = "59vh";
    export let combo_width = "98vw";
    export let stacked = true;
		export let chartSeriesType = ["line", "bars", "bars", "line", "bars", "line"];
    export let chartData = [
        [
            "Month",
            "Bolivia",
            "Ecuador",
            "Madagascar",
            "Papua New Guinea",
            "Rwanda",
            "Average",
        ],
        ["2004/05", 165, 938, 522, 998, 450, 614.6],
        ["2005/06", 135, 1120, 599, 1268, 288, 682],
        ["2006/07", 157, 1167, 587, 807, 397, 623],
        ["2007/08", 139, 1110, 615, 968, 215, 609.4],
        ["2008/09", 136, 691, 629, 1026, 366, 569.6],
    ];

   
	// Define chart series types
    let series = {};

    // Function to draw the chart
    function drawChart() {
        // Convert data to DataTable
        let data = google.visualization.arrayToDataTable(chartData);

        // Assign series types
        chartSeriesType.forEach((type, index) => {
            series[index] = { type: type === "line" ? "line" : "bars" };
        });

        // Define chart options
        let options = {
            animation: {
                startup: true,
                duration: 1000,
                easing: "linear",
            },
            chartArea: {
                width: "100%",
            },
            isStacked: stacked,
            title: combo_title,
            vAxis: {
                title: "",
            },
            /*hAxis: {
                title: hAxis,
                slantedText: true,
                slantedTextAngle: 45,
            },*/
            series: series,
            legend: {
                position: "top",
                maxLines: 3,
            },
        };

        // Create and draw the chart
        chart = new google.visualization.ComboChart(chartContainer);
        chart.draw(data, options);
    }

    // Function to initialize the chart
    function initializeChart() {
        // Load Google Charts library
        google.charts.load("current", { packages: ["corechart"] });
        initialized = true;
        google.charts.setOnLoadCallback(drawChart);
    }

    // Run initialization on component mount
    onMount(() => {
        initializeChart();
    });

    // Watch for changes in chart data
    $: chartDataChanged(chartData);
    function chartDataChanged(chartData) {
        // Redraw the chart if initialized
        if (initialized) {
            drawChart();
        }
    }
</script>


<svelte:head>
    <!-- Load Google Charts library -->
    <script
        type="text/javascript"
        src="https://www.gstatic.com/charts/loader.js"
        on:load={initializeChart}
    ></script>
</svelte:head>

<!-- Chart container -->
<div
    bind:this={chartContainer}
    id={combo_id}
    style="height: {combo_height}; width: {combo_width};"
></div>

<style>
    /* Add CSS styles if needed */
	div{
		border : solid grey;
		width :90%;
		margin: auto;
	}
</style>

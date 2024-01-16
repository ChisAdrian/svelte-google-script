<script>
  /*
  // Code.gs
    function doGet(e) {
    return HtmlService.createTemplateFromFile('index.html')
      .evaluate().setTitle('Title')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
  }
  
  function googlescr_fetchData_Input(some_input) {
    var spreadsheet = SpreadsheetApp.getActive();
    var ssConstants = spreadsheet.getSheetByName(some_input)
    if (ssConstants === null) {
      return false;
    }
  
    let data_H  = JSON.stringify(ssConstants.getRange("A1:B1").getDisplayValues());
    let data_Body  = JSON.stringify(ssConstants.getRange("A2:B7").getDisplayValues());
    return [data_H , data_Body]
  }
  */

    import DataTable from "./DataTable.svelte";

     let tbl_data_h;
     let tbl_data_b;
    let itemsPerPage = 10;

    let loading = false;
    let returneData;
    export async function fetchData_Input(some_input) {
        loading = true;
        returneData = null;
        return new Promise((resolve, reject) => {
            // @ts-ignore
            google.script.run
                .withSuccessHandler((receivedData) => {
                    resolve(receivedData);
                  //  returneData = JSON.parse(receivedData);
                  tbl_data_h = JSON.parse( receivedData[0])[0];
                  tbl_data_b = JSON.parse(receivedData[1]);
                    console.log(tbl_data_h);
                    console.log(tbl_data_b);
                    loading = false;
                })
                .withFailureHandler((error) => {
                    reject(error);
                })
                .googlescr_fetchData_Input(some_input);
                // Function from Code.gs 
        });
    }
</script>

<main>
    <button on:click={() => fetchData_Input("DataSh")}> TEST_DATA</button>
    {#if loading}
        <p>Please Wait ....</p>
    {/if}
    {#if returneData}
        {returneData}
    {/if}

    {#if tbl_data_b}
        <DataTable  itemsPerPage = {itemsPerPage} tbl_data_cols = {tbl_data_h}  tbl_data_rows = {tbl_data_b} />
    {/if}

</main>

<style>
</style>

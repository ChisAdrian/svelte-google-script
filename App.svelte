<script>
    let loading = false;
    let returneData;
    export async function fetchData_Input(some_input) {
        loading = true;
        returneData = null;
        return new Promise((resolve, reject) => {
            // @ts-ignore
            google.script.run
                .withSuccessHandler((receivedData) => {
                    resolve(JSON.parse(receivedData));
                    returneData = JSON.parse(receivedData);
                    console.log(JSON.parse(receivedData));
                    loading = false;
                })
                .withFailureHandler((error) => {
                    reject(error);
                })
                .googlescr_fetchData_Input(some_input);
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
</main>

<style>
</style>

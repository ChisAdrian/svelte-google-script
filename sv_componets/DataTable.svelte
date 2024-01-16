<script>
    import { afterUpdate } from "svelte";
    export let tbl_data_cols;
    export let tbl_data_rows;
    export let itemsPerPage; // Adjust this according to your preference
    let currentPage = 1;
    let intern_tbl_data_rows = [];
    let sortByCol = null;
    let ascending = true;
    /*
      beforeUpdate(() => {
          console.log('the component is going to be updated');	
          });
  */
    afterUpdate(() => {
        //console.log('the component has been updated');
        goToPage(currentPage);
        //  sortByCol = 0;
    });

    function goToPage(page) {
        currentPage = page;
        intern_tbl_data_rows = getPaginatedData();
    }

    function isNumber(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }

    function sort(column) {
        sortByCol = column;
        ascending = !ascending;
        tbl_data_rows = tbl_data_rows.sort((a, b) => {
            let sortModifier = ascending ? 1 : -1;
            let aValue = a[column];
            let bValue = b[column];

            if (aValue === undefined) aValue = "";
            if (bValue === undefined) bValue = "";

            return isNumber(aValue)
                ? sortModifier * (aValue - bValue)
                : aValue.localeCompare(bValue) * sortModifier;
        });

        goToPage(1);
    }

    function getPaginatedData() {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return tbl_data_rows.slice(start, end);
    }
</script>

<div class="parent-tbl">
    <table>
        <thead>
            <tr
                ><th colspan={tbl_data_cols.length}>
                    <div class="paginations">
                        NrRows: {tbl_data_rows.length} #
                        <label for="pgNum">Rows/Page </label>
                        <input
                            on:change={() => goToPage(1)}
                            style="text-align: center;"
                            name="pgNum"
                            type="number"
                            bind:value={itemsPerPage}
                            min="1"
                            max="100"
                        />
                        <button
                            on:click={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}>Previous</button
                        >
                        <span
                            >Page {currentPage} of {Math.ceil(
                                tbl_data_rows.length / itemsPerPage,
                            )}</span
                        >
                        <button
                            on:click={() => goToPage(currentPage + 1)}
                            disabled={currentPage ===
                                Math.ceil(tbl_data_rows.length / itemsPerPage)}
                            >Next</button
                        >
                    </div>
                </th>
            </tr><tr>
                {#each tbl_data_cols as th, i}
                    <th
                        on:click={() => sort(i)}
                        class:selected={sortByCol === i}
                        class:asc={sortByCol === i && ascending}
                        class:desc={sortByCol === i && !ascending}
                    >
                        {th}
                    </th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each intern_tbl_data_rows as row, i}
                <tr>
                    {#each row as c}
                        <td>{c}</td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    .parent-tbl {
        overflow: auto;
        max-height: 99%;
    }

    .selected {
        font-weight: bold;
        background-color: antiquewhite;
        color: black;
    }

    .asc::after {
        content: "\2193";
        color: inherit;
    }

    .desc::after {
        content: "\2191";
        color: inherit;
    }

    thead {
        position: sticky;
        top: 0;
        background-color: black;
        color: white;
    }

    table {
        width: 99%;
        margin: auto;

        background-color: aliceblue;
        overflow: auto;
    }

    table,
    th,
    td {
        border: 1px solid black;
        border-collapse: collapse;
    }

    td {
        text-align: center;
    }

    table {
        border: solid 3px #0f7391;
    }
    .paginations {
        background-color: aliceblue;
        border: solid 2px #0f7391;
        color: black;
        text-align: left;
        padding-left: 1%;
    }
</style>

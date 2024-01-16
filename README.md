#Starter from Svelte with google HtmlService
<h2>Setup in VSCode</h2>
<p>npm create vite@latest</p>
<p>cd my-awesome-sfa</p>
<p>npm install</p>
<p>npm install @sveltejs/vite-plugin-svelte  vite-plugin-singlefile</p>
<p>npm run dev</p>
<p>Edit vite.config.js as</p>

    import { defineConfig } from 'vite';
    import { svelte } from '@sveltejs/vite-plugin-svelte';
    import { viteSingleFile } from 'vite-plugin-singlefile';
    export default defineConfig(({ command }) => ({
    	plugins: [
    		svelte({
    			/* plugin options */
    		}),
    		command === 'build' &&
    			viteSingleFile({
    				removeViteModuleLoader: true
    			})
    	],
    	build: {
    		minify: false
    	}
    }));
 <p>Edit main.js as</p>

    import App from './App.svelte'
    
    const app = new App({
      target: document.getElementById('app'),
    })
    
    export default app

  <p>Edit App.svelte as</p>
  
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
                    // Function from Code.gs 
            });
        }
    </script>

    <main>
        <button on:click={() => fetchData_Input("DataSh")}> TEST_DATA</button>
        <!-- in my case DataSh is name of sheet where data is stored -->
        {#if loading}
            <p>Please Wait ....</p>
        {/if}
        {#if returneData}
            {returneData}
        {/if}
    </main>

  <p>run  npm run build </p>
  <p>This should create index.html in folder dist  </p>
   
<h2>Setup google sheets</h2>
  <p>Create an google Sheet </p>
  <p>Rename Sheet1 to DataSh </p>
  <p>Access scripts via Ectensions -> Apps Scripts </p>
  <p>Add file of tipe html named index and <br>
          copy content of  index.html from folder dist to index.html from Apps Scripts </p>
  <p>Edit file (from Apps Scripts) Code.gs as  </p>
  
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
    
      let data  = ssConstants.getRange("A1:B5").getDisplayValues();
      return JSON.stringify(data);
    }
      
  <p>In  Apps Script access Deploy -> New deployment  </p>
  <p>Select type  Web app make configurations if you wish so and push Deploy </p>
   <p>This will generate and link to your Web app  </p>

<li>https://docs.google.com/spreadsheets/d/1wYwv1X0zOTS-FVgGmBbSF1D8oxJoJBX7tYcOAI4tyUs/edit#gid=0</li>

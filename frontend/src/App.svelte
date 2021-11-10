<script>
  import Content from "./lib/Content.svelte";

  import Header from "./lib/Header/Header.svelte";
  import EditModeProvider from "./lib/provider/EditModeProvider.svelte";
  import Sidebar from "./lib/Sidebar/Sidebar.svelte"

</script>

<EditModeProvider>
  <div class="w-full h-screen overflow-hidden flex flex-col">
    <Header />
    <div class="flex flex-grow" style="max-height: calc(100vh - 64px)">
      <Sidebar />
      <Content />
    </div>
  </div>
</EditModeProvider>

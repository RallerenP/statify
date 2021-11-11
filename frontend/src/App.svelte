<script>
  import Router from "./lib/components/Router.svelte";

  import Content from "./lib/Content.svelte";

  import Header from "./lib/Header/Header.svelte";
  import Sidebar from "./lib/Sidebar/Sidebar.svelte"

</script>

<Router />
<div class="w-full h-screen overflow-hidden flex flex-col">
  <Header />
  <div class="flex flex-grow" style="max-height: calc(100vh - 64px)">
    <Sidebar />
    <Content />
  </div>
</div>

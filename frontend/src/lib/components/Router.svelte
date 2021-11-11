<script>
  import router from "page";
  import { url } from "../../stores/stores";
  
  router('*', (ctx) => url.set(ctx.path));

  router.start();
</script>
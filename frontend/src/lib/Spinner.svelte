<script>
  let klass = "";

  export { klass as class }
</script>

<div class="spinner before:bordered before:border-4 before:border-base-300 before:border-b-base-content {klass}"></div>

<style lang="scss">
  @keyframes spinner {
      0% {
          transform: translate3d(-50%, -50%, 0) rotate(0deg);
      }
      100% {
          transform: translate3d(-50%, -50%, 0) rotate(360deg);
      }
  }
  .spinner {
  opacity: 1;
  position: relative;
  transition: opacity linear 0.1s;        
  
  &::before {
      animation: 2s linear infinite spinner;
      border-radius: 50%;
      content: "";
      height: 40px;
      left: 50%;
      opacity: inherit;
      position: absolute;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
      transform-origin: center;
      width: 40px;
      will-change: transform;
  }
}
</style>
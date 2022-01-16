<script>
  let name = "world"

  const handleClick = () => {
    name = "KEA!"
  }
</script>

<h1>Hello {name}!</h1>
<button on:click={handleClick}></button>
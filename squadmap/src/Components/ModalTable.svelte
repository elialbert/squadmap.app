<table class="table">
  <thead>
  </thead>
  <tbody>
    <slot></slot>
  </tbody>
</table>

<style>
  :global(table.table th) {
    padding: .25rem;
    vertical-align: middle;
  }
  :global(table.table th h6) {
    margin-bottom: 0px;
  }
  :global(table.table td) {
    padding: .25rem;
    vertical-align: middle;
  }
  :global(table.table td h6) {
    margin-bottom: 0px;
  }
</style>

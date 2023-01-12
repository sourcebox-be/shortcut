<script lang="ts">
  import logo from './assets/shortcut.svg'
  import ShortenUrl from "./lib/ShortenUrl.svelte";
</script>

<main>
  <div class="hero min-h-screen">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <div class="flex flex-col items-center justify-center">
          <img src={logo} class="logo" alt="Shortcut by Sourcebox">
        </div>

        <p class="py-6">
          Shrink links, expand possibilities. Effortlessly share and track with <strong>Shortcut</strong> by <strong>Sourcebox</strong>
        </p>

        <div class="mt-5 flex flex-col items-center justify-center">
          <ShortenUrl />
        </div>
      </div>
    </div>
  </div>
</main>

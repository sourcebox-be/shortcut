<script lang="ts">
  import type {ActionData, PageData} from './$types';
  import {enhance} from "$app/forms";

  export let data: PageData;
  export let form: ActionData;

  let copied: boolean = false;

  const copy = () => {
    if (!data.url) {
      return;
    }

    navigator.clipboard.writeText(data.url)
    copied = true
  }

  const restart = () => {
    data = {};
    form = null;
    copied = false;
  }
</script>

<main>
  <div class="hero min-h-screen">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <div class="flex flex-col items-center justify-center">
          <img src="/shortcut.svg" class="logo" alt="Shortcut by Sourcebox">
        </div>

        <p class="py-6">
          Shrink links, expand possibilities. Effortlessly share and track with <strong>Shortcut</strong> by <strong>Sourcebox</strong>
        </p>

        <div class="mt-5 mb-5 flex flex-col items-center justify-center">
          <form method="POST" use:enhance>
            <div class="form-control">
              <div class="input-group">
                {#if !form?.success }
                  <span class="bg-neutral/30">
                    <img class="h-7 w-7" src="/link.svg" alt="restart">
                  </span>

                  <input required name="url" value={form?.data?.url ?? ''} type="text" placeholder="https://example.com" class="input input-bordered border-neutral/30 w-full max-w-xs" />

                  <button class="btn btn-secondary" type="submit">
                    shorten
                  </button>
                {:else}
                  <a class="btn bg-neutral/30 border-neutral/30" on:click|preventDefault={restart} href="#restart">
                    <img class="h-7 w-7" src="/restart.svg" alt="restart">
                  </a>

                  <input value="{data?.url}" class="input input-bordered border-neutral/30 w-full max-w-xs" />

                  <a class="btn btn-primary" on:click|preventDefault={copy} href="#copy">
                    {#if copied}
                      copied!
                    {:else}
                      <img class="mr-2 h-6 w-6" src="/copy.svg" alt="copy"> copy
                    {/if}
                  </a>
                {/if}
              </div>
            </div>

            {#if form?.error}
              <p class="text-error">{form.error}</p>
            {/if}
          </form>
        </div>
      </div>
    </div>
  </div>
</main>

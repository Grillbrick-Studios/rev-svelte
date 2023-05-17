<script lang="ts">
	import {
		ColorTheme,
		colorTheme,
		fontFamily,
		fontSize,
		lineHeight,
	} from '$lib/settings';
	import '$lib/styles/fonts.css';
	import '$lib/styles/style.scss';
	import Header from './Header.svelte';

	function setBodyClass(node: HTMLElement) {
		switch ($colorTheme) {
			case ColorTheme.Dark:
				node.classList.remove('sepia', 'dark');
				node.classList.add('dark');
				break;

			case ColorTheme.Sepia:
				node.classList.remove('sepia', 'dark');
				node.classList.add('sepia');
				break;

			default:
				node.classList.remove('sepia', 'dark');
				break;
		}
	}
</script>

<svelte:body use:setBodyClass />
<div class={$colorTheme}>
	<!-- svelte-ignore a11y-missing-content -->
	<a id="toptop" />

	<Header />

	<div
		style:font-family={$fontFamily}
		style:font-size="{$fontSize}em"
		style:line-height="{$lineHeight}em"
		class={$colorTheme}
		id="view"
	>
		<slot><!-- optional fallback --></slot>
	</div>
</div>

<svelte:head>
	<style>
		#view {
			top: 56px;
			position: absolute;
			padding-left: 24px;
			padding-right: 24px;
			left: 0;
			margin: 0;
			clear: both;
			right: 0;
			min-height: 90%;
		}

		:root {
			--text-color: #000;
			--background-color: #fff;
		}

		.dark {
			--text-color: #dddddd;
			--background-color: #000;
		}

		.sepia {
			--text-color: #5f4b32;
			--background-color: #fbf0d9;
		}

		body {
			background-color: var(--background-color);
			color: var(--text-color);
		}
	</style>
</svelte:head>

<script lang="ts">
	import nextIcon from '$lib/assets/next_icon.png';
	import prevIcon from '$lib/assets/prev_icon.png';
	import { colorTheme } from '$lib/settings';
</script>

<a href="http://" target="_blank" rel="noopener noreferrer"
	><img src={prevIcon} alt="prev" /></a
>

<input
	class="{$colorTheme} srchtext"
	type="text"
	id="srchtext"
	maxlength="24"
	autocomplete="off"
	style="height:34px;font-size:130%;"
/>

<a href="http://" target="_blank" rel="noopener noreferrer"
	><img src={nextIcon} alt="next" /></a
>

<style>
	* {
		border: 0;
		height: 32px;
		vertical-align: middle;
	}

	.srchtext {
		padding: 2px;
		margin: 3px;
		width: 60%;
		text-align: center;
		vertical-align: middle;
		cursor: pointer;
		border: 0;
		color: #666;
		background-color: #f0f0f0;
	}

	.srchtext.dark {
		color: #eee;
		background-color: #444;
	}

	.srchtext.sepia {
		color: #5f4b32;
		background-color: #dbd0b9;
	}
</style>

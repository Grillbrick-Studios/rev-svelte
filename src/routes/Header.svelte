<script lang="ts">
	import historyImage from '$lib/icons/mnu_history.png';
	import menuIcon from '$lib/icons/mnu_menu_dot.png';
	import blank from '$lib/icons/rev_blank.png';
	import { colorTheme } from '$lib/settings';
	import SearchBar from './SearchBar.svelte';
</script>

<div id="header" class={$colorTheme}>
	<table>
		<tbody>
			<tr style="width:100%">
				<td style="width:10%;white-space:nowrap">
					<a on:click={() => {}} title="menu">
						<img src={menuIcon} alt="menu" />
					</a>
					<span class="rev">REV<span class="bible">Bible</span></span></td
				>
				<td
					style="width:80%;text-align:center;vertical-align:middle;white-space:nowrap"
				>
					<!-- Search Field -->
					<SearchBar />
				</td>
				<td style="width:10%;text-align:right;white-space:nowrap;">
					<img
						src={blank}
						alt="blank"
						style="height:34px;vertical-align:middle;padding-right:30px;"
					/>
					<a href=""><img src={historyImage} alt="prefs" /></a>
					<!-- History -->
				</td>
			</tr>
		</tbody>
	</table>
</div>

<style>
	#header.dark {
		background-color: #000;
		box-shadow: 4px 4px 4px 0 #444;
	}

	#header.sepia {
		background-color: #fbf0d9;
		box-shadow: 4px 4px 4px 0 #dbd0b9;
	}

	#header {
		background-color: var(--background-color);
		position: fixed;
		display: block;
		top: 0;
		left: 0;
		right: 0;
		z-index: 98;
		background-color: #fdfdfd;
		box-shadow: 4px 4px 4px 0 #ddd;
	}

	table {
		margin: 0;
		padding: 0;
		border-spacing: 0;
		width: 100%;
		height: 56px;
	}

	img {
		border: 0;
		height: 32px;
		vertical-align: middle;
		padding: 0 6px;
		margin: 0 0 0 3px;
	}

	.rev {
		display: inline-block;
		font-family: merriweather, serif;
		vertical-align: middle;
		padding-left: 30px;
		font-size: 1.3em;
		color: #337efe;
		white-space: nowrap;
		border-spacing: 0;
		line-height: 1;
	}

	.bible {
		color: var(--text-color);
		font-family: merriweather, serif;
		font-size: 1.3em;
		line-height: 1;
		white-space: nowrap;
		border-spacing: 0;
	}
</style>

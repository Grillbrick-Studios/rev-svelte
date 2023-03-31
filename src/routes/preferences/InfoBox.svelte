<script lang="ts">
	import moreInfo from '$lib/assets/moreinfo.png';
	let showInfo = false;
</script>

<tr>
	<!-- The main Table data -->
	<td class="name">
		<slot name="name"><!-- optional fallback --></slot>
	</td>
	<td class="options">
		<slot name="options"><!-- optional fallback --></slot>
	</td>
	<td class="info-icon">
		<input
			type="image"
			alt="moreinfo"
			name="help"
			src={moreInfo}
			on:click={() => (showInfo = !showInfo)}
		/>
	</td>
</tr>

{#if showInfo}
	<tr class="moreinfo">
		<slot name="info"><!-- optional fallback --></slot>
	</tr>
{/if}

<tr>
	<td class="settd_spc" colspan="3" />
</tr>

<style>
	tr {
		font-size: 80%;
	}

	.name {
		font-weight: bold;
		vertical-align: top;
		text-align: left;
	}

	.options {
		width: 65%;
		vertical-align: top;
	}

	.info-icon {
		width: 5%;
		vertical-align: top;
	}

	.settd_spc {
		border-top: 1px dashed #aaaaaa;
		height: 11px;
	}
</style>

<script lang="ts">
	import moreInfo from '$lib/assets/moreinfo.png';
	import type { OptionType } from '$lib/settings';

	type Option = {
		type: OptionType;
		name: string;
		isChecked: () => boolean;
		onClick: () => void;
	};

	export let name: string;
	export let options: Option[] | Option = [];
	export let multiselect = false;
	const selectType = multiselect ? 'checkbox' : 'radio';
	let showInfo = false;
</script>

<tr>
	<!-- The main Table data -->
	<td class="name">
		{name}
	</td>
	<td class="options">
		<table cellspacing={0} cellpadding={0} border={0}>
			{#if Array.isArray(options) && options.length > 1}
				{#each options as option}
					<tr>
						<td>
							<input
								type={selectType}
								name={option.name}
								checked={option.isChecked()}
								on:click={option.onClick}
							/>
						</td>
						<td>{option.name}</td>
					</tr>
				{/each}
			{:else if Array.isArray(options) && options.length === 1}
				{@const option = options[0]}
				<tr>
					<td>
						<input
							type="checkbox"
							name={option.name}
							checked={option.isChecked()}
							on:click={option.onClick}
						/>
					</td>
				</tr>
			{:else if !Array.isArray(options)}
				{@const option = options}
				<tr>
					<td>
						<input
							type="checkbox"
							name={option.name}
							checked={option.isChecked()}
							on:click={option.onClick}
						/>
					</td>
				</tr>
			{/if}
		</table>
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
		<slot><!-- optional fallback --></slot>
	</tr>
{/if}

<tr>
	<td class="spacer" colspan="3" />
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

	.spacer {
		border-top: 1px dashed #aaaaaa;
		height: 11px;
	}
</style>

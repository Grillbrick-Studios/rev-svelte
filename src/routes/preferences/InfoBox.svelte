<script lang="ts">
	import moreInfo from '$lib/images/moreinfo.png';
	import { OptionType } from '$lib/settings';

	type Option<T> = {
		name: string;
		value?: T;
		isChecked?: () => boolean;
		onSelect: (value: T) => void;
	};

	export let optionType: OptionType | null = null;

	export let name: string;
	export let options: Option<unknown>[] | Option<unknown> = [];
	export let multiselect = false;
	const selectType =
		multiselect || (Array.isArray(options) && options.length > 1)
			? 'checkbox'
			: 'radio';
	let showInfo = false;
</script>

<tr class="settr">
	<!-- The main Table data -->
	<td class="settd1">
		{name}
	</td>
	<td class="settd3">
		<table cellspacing={0} cellpadding={0} border={0}>
			{#if optionType === OptionType.Button}
				<!-- content here -->
			{:else if optionType === OptionType.Dropdown}
				<!-- else if content here -->
			{:else if optionType === OptionType.RaiseLowerReset}
				<!-- else if content here -->
			{:else if Array.isArray(options) && options.length > 1}
				{#each options as option}
					<tr>
						<td>
							<input
								type={selectType}
								name={option.name}
								value={option.value}
								checked={option.isChecked ? option.isChecked() : false}
								on:click={() => option.onSelect(option.value)}
							/>
						</td>
						<td>{option.name}</td>
					</tr>
				{/each}
			{:else if !Array.isArray(options)}
				{@const option = options}
				<tr>
					<td>
						<input
							type="checkbox"
							name={option.name}
							value={option.value}
							checked={option.isChecked ? option.isChecked() : false}
							on:click={() => option.onSelect(option.value)}
						/>
					</td>
				</tr>
			{/if}
		</table>
	</td>
	<td style="width:5%;vertical-align:top;">
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
	<td class="settd_spc" colspan="3" />
</tr>

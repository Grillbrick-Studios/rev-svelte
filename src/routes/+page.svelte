<script lang="ts">
	import { fontFamily, fontSize, lineHeight, type Font } from '$lib/settings';

	const setFont = (f: Font) => ($fontFamily = f);
	const increaseFontSize = () => ($fontSize += 0.1);
	const decreaseFontSize = () => ($fontSize -= 0.1);
	const increaseLineHeight = () => ($lineHeight += 0.1);
	const decreaseLineHeight = () => ($lineHeight -= 0.1);
</script>

<p>
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur dicta
	quis aut blanditiis eaque accusamus repudiandae laborum cumque incidunt,
	necessitatibus magnam tempore iste tenetur nostrum? Consequatur molestiae
	suscipit laborum. Qui!
</p>

<table>
	<tr>
		<td>Size: </td>
		<td>
			<input type="button" value="+" on:click={() => increaseFontSize()} />
			<input type="button" value="-" on:click={() => decreaseFontSize()} />
			<input type="button" value="reset" on:click={() => ($fontSize = 1)} />
		</td>
	</tr>
	<tr>
		<td>Spacing: </td>
		<td>
			<input type="button" value="+" on:click={increaseLineHeight} />
			<input type="button" value="-" on:click={decreaseLineHeight} />
			<input type="button" value="reset" on:click={() => ($lineHeight = 1.3)} />
		</td>
	</tr>
</table>

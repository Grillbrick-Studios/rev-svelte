<script lang="ts">
	import moreInfo from '$lib/assets/moreinfo.png';
	import { BibleTextMode, bibleTextMode } from '$lib/settings';
	import InfoBox from './InfoBox.svelte';
</script>

<p>
	Here are several preferences or settings you can change in order to customize
	the way this website looks and works. Click the icon (<img
		src={moreInfo}
		alt="moreinfo"
		style="width: 1em;"
	/>) on the right of each setting for more information on that setting.
</p>

<p>
	All the website settings are "sticky," and so when you change your
	preferences, the website will remember whatever settings you choose, even if
	you close your web browser and come back later.
</p>

<table style="width: 100%;">
	<InfoBox>
		<div slot="name">Bible Text Mode</div>
		<table slot="options" cellspacing="0" cellpadding="0" border="0">
			<tr>
				<td>
					<input
						type="radio"
						name={BibleTextMode.VerseBreak}
						checked={$bibleTextMode === BibleTextMode.VerseBreak}
						on:click={() => ($bibleTextMode = BibleTextMode.VerseBreak)}
					/>
				</td>
				<td>Verse Break</td>
			</tr>
			<tr>
				<td>
					<input
						type="radio"
						name={BibleTextMode.Paragraph}
						checked={$bibleTextMode === BibleTextMode.Paragraph}
						on:click={() => ($bibleTextMode = BibleTextMode.Paragraph)}
					/>
				</td>
				<td>Paragraph</td>
			</tr>
			<tr>
				<td>
					<input
						type="radio"
						name={BibleTextMode.Reading}
						checked={$bibleTextMode === BibleTextMode.Reading}
						on:click={() => ($bibleTextMode = BibleTextMode.Reading)}
					/>
				</td>
				<td>Reading</td>
			</tr>
		</table>
		<div
			id="prefhelpdiv0"
			slot="info"
			style="display: inline-block; font-size: 90%; padding-bottom: 7px; overflow: hidden; height: 245px;"
		>
			<p class="style1">
				This setting controls how the Bible text is presented.
			</p>
			<p class="style1">
				If “Verse Break” is selected, each verse will begin on a new line.
			</p>
			<p class="style1">
				If “Paragraph” is selected, the Bible will be presented in paragraph
				format, with one verse right after another, breaking only on new
				paragraphs.
			</p>
			<p class="style1">
				If “Reading” is selected, the Bible will be presented in prose format,
				with one verse right after another, breaking only on new paragraphs. The
				verse numbers will <span style="color:red;">not</span> be displayed.
			</p>
		</div>
	</InfoBox>
</table>

<style>
	p.style1 {
		text-indent: 0;
		text-align: left;
		display: block;
		font-size: 90%;
	}
</style>

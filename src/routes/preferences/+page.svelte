<script lang="ts">
	import moreInfo from '$lib/images/moreinfo.png';
	import {
		BibleTextMode,
		ColorTheme,
		Font,
		OptionType,
		bibleTextMode,
		bibleTextOnly,
		bibleViewColumns,
		colorTheme,
		differentBibleFont,
		fontFamily,
		oldEnglishOnFirstVerse,
		paragraphStyle,
	} from '$lib/settings';
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
	<InfoBox
		name="Bible Text Mode"
		options={[
			{
				name: 'Verse Break',
				isChecked() {
					return $bibleTextMode === BibleTextMode.VerseBreak;
				},
				onSelect() {
					$bibleTextMode = BibleTextMode.VerseBreak;
				},
			},
			{
				name: 'Paragraph',
				isChecked() {
					return $bibleTextMode === BibleTextMode.Paragraph;
				},
				onSelect() {
					$bibleTextMode = BibleTextMode.Paragraph;
				},
			},
			{
				name: 'Reading',
				isChecked() {
					return $bibleTextMode === BibleTextMode.Reading;
				},
				onSelect() {
					$bibleTextMode = BibleTextMode.Reading;
				},
			},
		]}
	>
		<div
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
	<InfoBox
		name="Bible Text Only"
		options={[
			{
				name: 'No',
				isChecked: () => !$bibleTextOnly,
				onSelect: () => ($bibleTextOnly = false),
			},
			{
				name: 'Yes',
				isChecked: () => $bibleTextOnly,
				onSelect: () => ($bibleTextOnly = true),
			},
		]}
	>
		<div
			id="prefhelpdiv1"
			style="display: inline-block; font-size: 90%; padding-bottom: 7px; overflow: hidden; height: 287px;"
		>
			<p class="style1">
				Activating this feature removes all links to the REV commentary,
				disables all MyREV functionality, and temporarily hides any markup
				(i.e., highlighting) in the text. What you are left with is a clean
				version of only the REV Bible text for ease of reading. All user notes
				and highlights are saved and accessible again once this feature is
				turned off.
			</p>
			<p class="style1">
				The purpose for this setting is two-fold. 1) If you are on a mobile or
				touchscreen device and just want to read the Bible, sometimes it's too
				easy to inadvertently activate a link instead of scroll the screen. If
				this setting is on, all links are deactivated so that cannot happen. 2)
				If you are doing a presentation or teaching and have many verses
				highlighted, your highlights may be distracting to your audience. This
				setting will turn your highlights off.
			</p>
			<p class="style1">
				If you are a MyREV user and this setting is on, your notes and
				highlighted verses are still accessible on the MyREV page.
			</p>
		</div>
	</InfoBox>
	<InfoBox
		name="Old English on First Verse"
		options={{
			name: '',
			isChecked: () => $oldEnglishOnFirstVerse,
			onSelect: () => ($oldEnglishOnFirstVerse = !$oldEnglishOnFirstVerse),
		}}
	/>
	<InfoBox
		name="Paragraph style"
		multiselect
		options={[
			{
				name: 'Indented',
				isChecked: () => $paragraphStyle.Indented,
				onSelect: () => ($paragraphStyle.Indented = !$paragraphStyle.Indented),
			},
			{
				name: 'Justified',
				isChecked: () => $paragraphStyle.Justified,
				onSelect: () =>
					($paragraphStyle.Justified = !$paragraphStyle.Justified),
			},
		]}
	/>
	<InfoBox
		name="Bible View Columns"
		optionType={OptionType.Dropdown}
		options={[
			{
				name: '1 Column',
				isChecked: () => $bibleViewColumns === 1,
				onSelect: () => ($bibleViewColumns = 1),
			},
			{
				name: '2 Columns',
				isChecked: () => $bibleViewColumns === 2,
				onSelect: () => ($bibleViewColumns = 2),
			},
			{
				name: '3 Columns',
				isChecked: () => $bibleViewColumns === 3,
				onSelect: () => ($bibleViewColumns = 3),
			},
			{
				name: '4 Columns',
				isChecked: () => $bibleViewColumns === 4,
				onSelect: () => ($bibleViewColumns = 4),
			},
			{
				name: '5 Columns',
				isChecked: () => $bibleViewColumns === 5,
				onSelect: () => ($bibleViewColumns = 5),
			},
		]}
	/>
	<InfoBox
		name="Different Bible Font"
		options={{
			name: '',
			onSelect: () => ($differentBibleFont = !$differentBibleFont),
			isChecked: () => $differentBibleFont,
		}}
	/>
	<InfoBox
		name="System Font"
		optionType={OptionType.Dropdown}
		options={[
			{
				name: 'Merriweather',
				isChecked: () => $fontFamily === Font.Merriweather,
				onSelect: () => ($fontFamily = Font.Merriweather),
			},
			{
				name: 'Times New Roman',
				isChecked: () => $fontFamily === Font.TimesNewRoman,
				onSelect: () => ($fontFamily = Font.TimesNewRoman),
			},
			{
				name: 'Caladea',
				isChecked: () => $fontFamily === Font.Caladea,
				onSelect: () => ($fontFamily = Font.Caladea),
			},
			{
				name: 'IBM Plex Serif',
				isChecked: () => $fontFamily === Font.IBMPlexSerif,
				onSelect: () => ($fontFamily = Font.IBMPlexSerif),
			},
			{
				name: 'Arial',
				isChecked: () => $fontFamily === Font.Arial,
				onSelect: () => ($fontFamily = Font.Arial),
			},
			{
				name: 'Roboto',
				isChecked: () => $fontFamily === Font.Roboto,
				onSelect: () => ($fontFamily = Font.Roboto),
			},
			{
				name: 'Montserrat',
				isChecked: () => $fontFamily === Font.Montserrat,
				onSelect: () => ($fontFamily = Font.Montserrat),
			},
			{
				name: 'Balsamiq Sans',
				isChecked: () => $fontFamily === Font.BalsamiqSans,
				onSelect: () => ($fontFamily = Font.BalsamiqSans),
			},
		]}
	/>
	<InfoBox
		name="Line Height"
		optionType={OptionType.RaiseLowerReset}
		options={[]}
	/>
	<InfoBox
		name="Color Theme"
		options={[
			{
				name: 'Normal',
				isChecked: () => $colorTheme === ColorTheme.Light,
				onSelect: () => ($colorTheme = ColorTheme.Light),
			},
			{
				name: 'Sepia',
				isChecked: () => $colorTheme === ColorTheme.Sepia,
				onSelect: () => ($colorTheme = ColorTheme.Sepia),
			},
			{
				name: 'Dark',
				isChecked: () => $colorTheme === ColorTheme.Dark,
				onSelect: () => ($colorTheme = ColorTheme.Dark),
			},
		]}
	/>
</table>

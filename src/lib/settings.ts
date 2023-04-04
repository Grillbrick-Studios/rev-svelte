import { writable } from 'svelte/store';

/// The keys for storing the values in local storage
enum Keys {
	bibleTextMode = 'bibleTextMode',
	bibleTextOnly = 'bibleTextOnly',
	oldEnglishOnFirstVerse = 'oldEnglishOnFirstVerse',
	paragraphStyle = 'paragraphStyle',
	bibleViewColumns = 'bibleViewColumns',
	differentBibleFont = 'differentBibleFont',
	fontFamily = 'fontFamily',
	fontSize = 'fontSize',
	lineHeight = 'lineHeight',
	commentaryLinkStyle = 'commentaryLinkStyle',
	strongsLexiconSite = 'strongsLexiconSite',
	openCommentaryLinksInNewTab = 'openCommentaryLinksInNewTab',
	chapterHeadingLinks = 'chapterHeadingLinks',
	alwaysShowChapterHeadingLinks = 'alwaysShowChapterHeadingLinks',
	uppercaseOTQuotes = 'uppercaseOTQuotes',
	animation = 'animation',
	colorTheme = 'colorTheme',
	showExportIcons = 'showExportIcons',
	exportFontSize = 'exportFontSize',
	exportGutter = 'exportGutter',
}

/// Enums and Classes to be used in the settings

export enum BibleTextMode {
	VerseBreak = 'VerseBreak',
	Paragraph = 'Paragraph',
	Reading = 'Reading',
}

export enum OptionType {
	Select,
	Dropdown,
	Boolean,
	RaiseLowerReset,
	Button,
}

export class ParagraphStyle {
	Indented = false;
	Justified = false;

	static fromString(value: string): ParagraphStyle {
		const p = new ParagraphStyle();
		p.Indented = value.includes('i');
		p.Justified = value.includes('j');
		return p;
	}

	toString(): string {
		let result = '';
		if (this.Indented) result += 'i';
		if (this.Justified) result += 'j';
		return result;
	}
}

export enum Font {
	Merriweather = 'merriweather',
	TimesNewRoman = 'times new roman',
	Caladea = 'caladea',
	IBMPlexSerif = 'ibm plex serif',
	Arial = 'arial',
	Roboto = 'roboto',
	Montserrat = 'montserrat',
	BalsamiqSans = 'balsamiq sans',
}

export enum CommentaryLinkStyle {
	RedVerseNumberOnly = 'RedVerseNumberOnly',
	YellowOnHover = 'YellowOnHover',
	UnderlineOnHover = 'UnderlineOnHover',
	YellowAndUnderlineOnHover = 'YellowAndUnderlineOnHover',
}

export enum StrongsLexiconSite {
	BlueLetterBible = 'BlueLetterBible.org',
	BibleHub = 'BibleHub.com',
	StudyLight = 'StudyLight.org',
}

export enum ChapterHeadingLinks {
	ChapterLinks = 'ChapterLinks',
	VerseLinks = 'VerseLinks',
	Both = 'Both',
}

export enum ColorTheme {
	Dark = 'dark',
	Light = 'light',
	Sepia = 'sepia',
}

export enum Sizes {
	Small = 'Small',
	Medium = 'Medium',
	Large = 'Large',
}

export enum GutterOptions {
	None = 'None',
	ForSingleSidedPrinting = 'ForSingleSidedPrinting',
	ForDoubleSidedPrinting = 'ForDoubleSidedPrinting',
}

/// The actual settings.

export const bibleTextMode = writable(
	(localStorage?.getItem(Keys.bibleTextMode) as BibleTextMode) ||
		BibleTextMode.VerseBreak,
);

bibleTextMode.subscribe((val) =>
	localStorage?.setItem(Keys.bibleTextMode, val),
);

export const bibleTextOnly = writable(
	localStorage?.getItem(Keys.bibleTextOnly) == 'true',
);

bibleTextOnly.subscribe((val) =>
	localStorage?.setItem(Keys.bibleTextOnly, val.toString()),
);

export const oldEnglishOnFirstVerse = writable(
	localStorage?.getItem(Keys.oldEnglishOnFirstVerse) === 'true',
);

oldEnglishOnFirstVerse.subscribe((val) =>
	localStorage?.setItem(Keys.oldEnglishOnFirstVerse, val.toString()),
);

export const paragraphStyle = writable(
	ParagraphStyle.fromString(localStorage?.getItem(Keys.paragraphStyle) || ''),
);

paragraphStyle.subscribe((val) =>
	localStorage?.setItem(Keys.paragraphStyle, val.toString()),
);

const bvc_int = parseInt(localStorage?.getItem(Keys.bibleViewColumns) || '1');
type NumColumns = 1 | 2 | 3 | 4 | 5;
export const bibleViewColumns = writable<NumColumns>(
	bvc_int > 5 ? 5 : bvc_int < 1 ? 1 : (bvc_int as NumColumns),
);

bibleViewColumns.subscribe((val) =>
	localStorage?.setItem(Keys.bibleViewColumns, val.toString()),
);

export const differentBibleFont = writable(
	localStorage?.getItem(Keys.differentBibleFont) === 'true',
);

differentBibleFont.subscribe((val) =>
	localStorage?.setItem(Keys.differentBibleFont, val.toString()),
);

export const fontFamily = writable(
	(localStorage?.getItem(Keys.fontFamily) as Font) || Font.Merriweather,
);

fontFamily.subscribe((val) => localStorage?.setItem(Keys.fontFamily, val));

// Increment by .1 em
export const fontSize = writable(
	parseFloat(localStorage?.getItem(Keys.fontSize) || '1.0'),
);

fontSize.subscribe((val) =>
	localStorage?.setItem(Keys.fontSize, val.toString()),
);

// Increment by .1 em
export const lineHeight = writable(
	parseFloat(localStorage?.getItem(Keys.lineHeight) || '1.3'),
);

lineHeight.subscribe((val) =>
	localStorage?.setItem(Keys.lineHeight, val.toString()),
);

export const commentaryLinkStyle = writable(
	(localStorage?.getItem(Keys.commentaryLinkStyle) as CommentaryLinkStyle) ||
		CommentaryLinkStyle.RedVerseNumberOnly,
);

commentaryLinkStyle.subscribe((val) =>
	localStorage?.setItem(Keys.commentaryLinkStyle, val),
);

export const strongsLexiconSite = writable(
	(localStorage?.getItem(Keys.strongsLexiconSite) as StrongsLexiconSite) ||
		StrongsLexiconSite.BlueLetterBible,
);

strongsLexiconSite.subscribe((val) =>
	localStorage?.setItem(Keys.strongsLexiconSite, val),
);

export const openCommentaryLinksInNewTab = writable(
	localStorage?.getItem(Keys.openCommentaryLinksInNewTab) === 'true',
);

openCommentaryLinksInNewTab.subscribe((val) =>
	localStorage?.setItem(Keys.openCommentaryLinksInNewTab, val.toString()),
);

export const chapterHeadingLinks = writable(
	(localStorage?.getItem(Keys.chapterHeadingLinks) as ChapterHeadingLinks) ||
		ChapterHeadingLinks.VerseLinks,
);

chapterHeadingLinks.subscribe((val) =>
	localStorage?.setItem(Keys.chapterHeadingLinks, val),
);

export const alwaysShowChapterHeadingLinks = writable(
	localStorage?.getItem(Keys.alwaysShowChapterHeadingLinks) === 'true',
);

alwaysShowChapterHeadingLinks.subscribe((val) =>
	localStorage?.setItem(Keys.alwaysShowChapterHeadingLinks, val.toString()),
);

export const uppercaseOTQuotes = writable(
	localStorage?.getItem(Keys.uppercaseOTQuotes) !== 'false',
);

uppercaseOTQuotes.subscribe((val) =>
	localStorage?.setItem(Keys.uppercaseOTQuotes, val.toString()),
);

export const animation = writable(
	localStorage?.getItem(Keys.animation) !== 'false',
);

animation.subscribe((val) =>
	localStorage?.setItem(Keys.animation, val.toString()),
);

export const colorTheme = writable(
	(localStorage?.getItem(Keys.colorTheme) as ColorTheme) || ColorTheme.Dark,
);

colorTheme.subscribe((val) => localStorage?.setItem(Keys.colorTheme, val));

export const showExportIcons = writable(
	localStorage?.getItem(Keys.showExportIcons) !== 'false',
);

showExportIcons.subscribe((val) =>
	localStorage?.setItem(Keys.showExportIcons, val.toString()),
);

export const exportFontSize = writable(
	(localStorage?.getItem(Keys.exportFontSize) as Sizes) || Sizes.Medium,
);

exportFontSize.subscribe((val) =>
	localStorage?.setItem(Keys.exportFontSize, val),
);

export const exportGutter = writable(
	(localStorage?.getItem(Keys.exportGutter) as GutterOptions) ||
		GutterOptions.None,
);

exportGutter.subscribe((val) => localStorage?.setItem(Keys.exportGutter, val));

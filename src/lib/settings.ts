import { writable } from 'svelte/store';

/// Enums and Classes to be used in the settings

export enum BibleTextMode {
	VerseBreak,
	Paragraph,
	Reading,
}

export class ParagraphStyle {
	Indented = false;
	Justified = false;
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
	RedVerseNumberOnly,
	YellowOnHover,
	UnderlineOnHover,
	YellowAndUnderlineOnHover,
}

export enum StrongsLexiconSite {
	BlueLetterBible = 'BlueLetterBible.org',
	BibleHub = 'BibleHub.com',
	StudyLight = 'StudyLight.org',
}

export enum ChapterHeadingLinks {
	ChapterLinks,
	VerseLinks,
	Both,
}

export enum ColorTheme {
	Dark = 'dark',
	Light = 'light',
	Sepia = 'sepia',
}

export enum Sizes {
	Small,
	Medium,
	Large,
}

export enum GutterOptions {
	None,
	ForSingleSidedPrinting,
	ForDoubleSidedPrinting,
}

/// The actuall settings.

export const bibleTextMode = writable(BibleTextMode.VerseBreak);

export const BibleTextOnly = writable(false);

export const oldEnglishOnFirstVerse = writable(false);

export const paragraphStyle = writable(new ParagraphStyle());

export const bibleViewColumns = writable<1 | 2 | 3 | 4 | 5>(1);

export const differentBibleFont = writable(false);

export const fontFamily = writable(Font.Merriweather);

// TODO find the defaults for fontSize and lineHeight

// Increment by .1 em
export const fontSize = writable(1.0);

// Increment by .1 em
export const lineHeight = writable(1.3);

export const commentaryLinkStyle = writable(
	CommentaryLinkStyle.RedVerseNumberOnly,
);

export const strongsLexiconSite = writable(StrongsLexiconSite.BlueLetterBible);

export const openCommentaryLinksInNewTab = writable(false);

export const chapterHeadingLinks = writable(ChapterHeadingLinks.VerseLinks);

export const alwaysShowChapterHeadingLinks = writable(false);

export const uppercaseOTQuotes = writable(false);

export const animation = writable(true);

export const colorTheme = writable(ColorTheme.Dark);

export const showExportIcons = writable(true);

export const exportFontSize = writable(Sizes.Medium);

export const exportGutter = writable(GutterOptions.None);

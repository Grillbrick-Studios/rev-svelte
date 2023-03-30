<script lang="ts">
	import { fontFamily, fontSize, lineHeight } from '$lib/settings';
</script>

<div
	style:font-family={$fontFamily}
	style:font-size="{$fontSize}em"
	style:line-height="{$lineHeight}em"
>
	<slot><!-- optional fallback --></slot>
</div>

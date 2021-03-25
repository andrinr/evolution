<script lang="ts">
	import * as math from "mathjs";

	import {
		Content,
		Breadcrumb,
		BreadcrumbItem,
		Grid,
		Row,
		Column,
		Tabs,
		TabContent,
		Tab,
		Select,
		SelectItem,
	} from "carbon-components-svelte";
	import "carbon-components-svelte/css/g90";

	import Evolution from './Evolution.svelte'
</script>

<main>
	<Evolution></Evolution>
</main>

<style global>
	@import "carbon-components-svelte/css/g90";
	main {
		width: 100vw;
	}
</style>

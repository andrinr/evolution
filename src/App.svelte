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
	import { Brain } from "./logic/Brain";
import { Layer } from "./logic/Layer";

	const brain = new Brain({layers : [
		new Layer({breadth: 5}),
		new Layer({breadth: 10}),
		new Layer({breadth: 10}),
		new Layer({breadth: 3})
	]});
	console.log(brain.process(math.random([5])));
</script>

<main>
	<Grid>
		<Row>
			<Column lg={16}>
				<Breadcrumb noTrailingSlash aria-label="Page navigation">
					<BreadcrumbItem href="/">Getting started</BreadcrumbItem>
				</Breadcrumb>
				<h1 style="margin-bottom: 1.5rem">
					Design &amp; build with Carbon
				</h1>
			</Column>
		</Row>

		<Row>
			<Column noGutter>
				<Tabs aria-label="Tab navigation">
					<Tab label="About" />
					<Tab label="Design" />
					<Tab label="Develop" />
					<div slot="content" class="tabbed-content">
						<Grid as fullWidth let:props>
							<TabContent {...props}>
								<Row>
									<Column md={4} lg={7}>
										<p>
											Carbon is IBM’s open-source design
											system for digital products and
											experiences. With the IBM Design
											Language as its foundation, the
											system consists of working code,
											design tools and resources, human
											interface guidelines, and a vibrant
											community of contributors.
										</p>
									</Column>
								</Row>
							</TabContent>
							<TabContent {...props}>
								<Row>
									<Column md={4} lg={7}>
										<p>
											Rapidly build beautiful and
											accessible experiences. The Carbon
											kit contains all resources you need
											to get started.
										</p>
									</Column>
								</Row>
							</TabContent>
							<TabContent {...props}>
								<Row>
									<Column md={4} lg={7}>
										<p>
											Carbon provides styles and
											components in Vanilla, React,
											Angular, Vue and Svelte for anyone
											building on the web.
										</p>
									</Column>
								</Row>
							</TabContent>
						</Grid>
					</div>
				</Tabs>
			</Column>
		</Row>
	</Grid>
</main>

<style global>
	@import "carbon-components-svelte/css/g90";
	main {
		width: 100vw;
	}
</style>

<script lang="ts">
	import type { Vote } from '$lib/types';
	import chartjs, { elements } from 'chart.js/auto';
	let chartData;
	import { onMount } from 'svelte';
	import ChartDataLabels from 'chartjs-plugin-datalabels';
	export let votes: Vote[];
	votes = votes.filter(
		(vote, index, self) => index === self.findIndex((v) => v.userIDFS === vote.userIDFS)
	);

	let answers = votes.map((vote) => vote.vote);

	answers = answers.filter((answer) => answer !== "undefined");

	const occurences = answers.reduce((acc: { [key: string]: number }, curr) => {
		return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
	}, {});

	let chartValues = Object.values(occurences);
	let chartLabels = Object.keys(occurences);
	let ctx;
	let chartCanvas: HTMLCanvasElement;
	let voteCount = chartValues.reduce((a, b) => a + b, 0);

	const getColour = () => {
		let barColor: string[] = [];
		for (const val in chartValues) {
			if (chartValues[val] === Math.max(...chartValues)) {
				barColor.push(`hsl(${getComputedStyle(document.body).getPropertyValue('--p')})`);
			} else {
				barColor.push(`hsl(${getComputedStyle(document.body).getPropertyValue('--s')})`);
			}
		}
		return barColor;
	};

	onMount(async () => {
		ctx = chartCanvas.getContext('2d');
		var chart = new chartjs(ctx ?? '', {
			type: 'pie',
			data: {
				labels: chartLabels,
				datasets: [
					{
						backgroundColor: getColour(),
						data: chartValues
					}
				]
			},
			plugins: [ChartDataLabels],
			options: {
				responsive: true,
				plugins: {
					tooltip: {
						enabled: false
					},
					legend: {
						display: false
					},
					datalabels: {
						color: `hsl(${getComputedStyle(document.body).getPropertyValue('--bc')})`,
						labels: {
							title: {
								font: function (context) {
									var width = context.chart.width;
									var size = Math.round(width / 32);

									return {
										weight: 'bold',
										size: size,
									};
								},
								textAlign: 'center',
							},
						},
						formatter: function (value, context) {
							if (context.chart.data.labels) {
								return [context.chart.data.labels[context.dataIndex], Math.round(value/voteCount*100) + '%'];
							}
						}
					}
				}
			}
		});
	});
</script>

{#if votes.length === 0}
	<div class="flex justify-center">
		<p class="text-xl">Noch keine Abstimmungen 😥</p>
	</div>
{:else}
	<canvas bind:this={chartCanvas} class="" id="myChart" />
{/if}

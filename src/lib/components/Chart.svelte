<script lang="ts">
	import type { Vote } from '$lib/types';
	import chartjs, { elements } from 'chart.js/auto';
	let chartData;
	import { onMount } from 'svelte';
	export let votes: Vote[];
	let answers = votes.map((vote) => vote.vote);

	const occurences = answers.reduce((acc: { [key: string]: number }, curr) => {
		return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
	}, {});

	let chartValues = Object.values(occurences);
	let chartLabels = Object.keys(occurences);
	let ctx;
	let chartCanvas: HTMLCanvasElement;

	const getColour = () => {
		let barColor: string[] = []
		for (const val in chartValues) {
			if (chartValues[val] === Math.max(...chartValues)) {
				barColor.push(`hsl(${getComputedStyle(document.body).getPropertyValue('--p')})`)
			} else {
				barColor.push(`hsl(${getComputedStyle(document.body).getPropertyValue('--s')})`)
			}
		}
		return barColor;
	}

	onMount(async () => {
		ctx = chartCanvas.getContext('2d');
		var chart = new chartjs(ctx ?? '', {
			type: 'bar',
			data: {
				labels: chartLabels,
				datasets: [
					{
						backgroundColor: getColour(),
						data: chartValues,
						borderRadius:
							parseFloat(getComputedStyle(document.body).getPropertyValue('--rounded-box')) * 16
					}
				]
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						enabled: false
					}
				},
				scales: {
					x: {
						grid: {
							display: false
						}
					},
					y: {
						grid: {
							display: false
						},
						ticks: {
							precision: 0
						}
					}
				},
				elements: {
					bar: {
						borderRadius: 0
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
	<canvas bind:this={chartCanvas} id="myChart" />
{/if}
